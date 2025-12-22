import { Cart } from "../models/cart.model.js"
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/responses/ApiError.js"

const addToCart = async (userId, productId, quantity = 1) => {

    if (quantity <= 0) throw new ApiError(400, "Quantity must be greater than 0");

    const cartProduct = await Cart.findOne({ userId, productId });

    if (cartProduct) {
        cartProduct.quantity += quantity;

        await cartProduct.save();
        return cartProduct;
    }

    const newCartProduct = new Cart({
        userId,
        productId,
        quantity
    });

    await newCartProduct.save();

    return newCartProduct;
}

const updateCartQuantity = async (userId, productId, newQuantity) => {
    if (newQuantity < 0) throw new ApiError(400, "Quantity cannot be negetive");

    const cartProduct = await Cart.findOne({ userId, productId });
    if (!cartProduct) throw new ApiError(404, "Product not found in cart");

    // IF new quantity is 0, remove from cart
    if (newQuantity === 0) {
        await Cart.findByIdAndDelete(cartProduct._id);
        return { message: "Product removed from cart", removed: true };
    }

    // Checking stock availability
    const product = await Product.findById(productId);
    if (newQuantity > product.stock) {
        throw new ApiError(400, `Only ${product.stock} items available in stock`);
    }

    cartProduct.quantity = newQuantity;

    await cartProduct.save();
    await cartProduct.populate("productId")

    return cartProduct;
}


const removeFromcart = async (userId, cartItemId) => {
    const removedProduct = await Cart.findOneAndDelete({ userId, _id: cartItemId });

    if (!removedProduct) throw new ApiError(404, "Product not found in cart");

    return removedProduct;
}

const getCartItems = async (userId) => {
    const cartItems = await Cart.find({ userId })
        .populate({
            path: "productId",
            select: "productName productImage price category"
        });

    const cartWithTotals = cartItems.map(item => ({
        ...item.toObject(),
        itemTotal: item.productId.price * item.quantity
    }));

    const grandTotal = cartWithTotals.reduce(
        (sum, item) => sum + item.itemTotal,
        0
    );

    return { cartItems: cartWithTotals, grandTotal }
}


export const cartService = {
    addToCart,
    updateCartQuantity,
    removeFromcart,
    getCartItems
}