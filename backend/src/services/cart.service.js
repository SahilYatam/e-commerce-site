import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/responses/ApiError.js";

const addToCart = async (userId, productId, quantity = 1) => {
    if (quantity <= 0) throw new ApiError(400, "Quantity must be greater than 0");

    const product = await Product.findById(productId, { stock: 1 }).lean();
    if (!product) throw new ApiError(404, "Product not found");

    const cartItem = await Cart.findOneAndUpdate(
        { userId, productId },
        { $inc: { quantity } },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }
    );

    if (cartItem.quantity > product.stock) {
        throw new ApiError(400, `Only ${product.stock} items available in stock`);
    }

    return cartItem;
};

const updateCartQuantity = async (userId, productId, newQuantity) => {
    if (newQuantity < 0) {
        throw new ApiError(400, "Quantity cannot be negative");
    }

    // Remove item if quantity is 0
    if (newQuantity === 0) {
        const removed = await Cart.findOneAndDelete({ userId, productId });
        if (!removed) throw new ApiError(404, "Product not found in cart");

        return { message: "Product removed from cart", removed: true };
    }

    // Check stock
    const product = await Product.findById(productId, { stock: 1 }).lean();
    if (!product) throw new ApiError(404, "Product not found");

    if (newQuantity > product.stock) {
        throw new ApiError(400, `Only ${product.stock} items available in stock`);
    }

    const updated = await Cart.findOneAndUpdate(
        { userId, productId },
        { $set: { quantity: newQuantity } },
        { new: true }
    );

    if (!updated) throw new ApiError(404, "Product not found in cart");

    return updated;
};

const removeFromcart = async (userId, cartItemId) => {
    const removed = await Cart.findOneAndDelete({
        _id: cartItemId,
        userId,
    });

    if (!removed) {
        throw new ApiError(404, "Product not found in cart");
    }

    return removed;
};

const getCartItems = async (userId) => {
    const cartItems = await Cart.find({ userId })
        .populate({
            path: "productId",
            select: "productName productImage price category",
        })
        .lean();

    let grandTotal = 0;

    const cartWithTotals = cartItems.map((item) => {
        const itemTotal = item.productId.price * item.quantity;
        grandTotal += itemTotal;

        return {
            ...item,
            itemTotal,
        };
    });

    return { cartItems: cartWithTotals, grandTotal };
};

export const cartService = {
    addToCart,
    updateCartQuantity,
    removeFromcart,
    getCartItems,
};
