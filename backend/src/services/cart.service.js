import { Cart } from "../models/cart.model.js"
import { ApiError } from "../utils/responses/ApiError.js"

const addToCart = async (userId, productId, quantity = 1) => {
    if(quantity <= 0) throw new ApiError(400, "Quantity must be greater than 0");

    const cartProduct = await Cart.findOne({userId, productId})
    if(cartProduct){
        cartProduct.quantity += quantity;

        await cartProduct.save();
        return cartProduct;
    }

    const newCartProduct = new Cart({
        userId,
        productId,
        quantity
    });

    await newCartProduct.save()

    return newCartProduct
}

const decreaseQuantity = async(userId, productId, quantity = 1) => {
    if(quantity <= 0) throw new ApiError(400, "Quantity must be greater than 0");

    const cartProduct = await Cart.findOne({userId, productId})
    if(!cartProduct) throw new ApiError(404, "Product not found in cart");

    if(cartProduct.quantity <= quantity){
        // if user reduces more than available quantity then remove item completely
        await Cart.findOneAndDelete({userId, productId});
        return {message: "Product removed from cart"}
    };

    cartProduct.quantity -= quantity;
    await cartProduct.save();

    return cartProduct;
}

const removeFromcart = async(userId, productId) => {
    const removedProduct = await Cart.findOneAndDelete({userId, productId});
    if(!removedProduct) throw new ApiError(404, "Product not found in cart");
        
    return removedProduct
}

const getCartItems = async(userId) => {
    const cartItems = await Cart.findOne({userId}).
        populate("productId", "productName price category productImage");
    return cartItems
}

export const cartService = {
    addToCart,
    decreaseQuantity,
    removeFromcart,
    getCartItems
}