import { asyncHandler } from "../utils/handlers/asyncHandler.js"
import { ApiResponse } from "../utils/responses/ApiResponse.js"

import { cartService } from "../services/cart.service.js"

const addToCart = asyncHandler(async(req, res) => {
    const userId = req.user?.id
    if(!userId)
        return res.status(401).
            json(new ApiResponse(401, null, "User must be logged in to add product to cart"));

    const productId = req.params.id;
    const {quantity = 1} = req.body

    const cartProduct = await cartService.addToCart(userId, productId, quantity);

    return res.status(200).json(new ApiResponse(200, {cartProduct}, "Product added to cart successfully"))
})

const decreaseQuantity = asyncHandler(async(req, res) => {
    const userId = req.user?.id;
    const productId = req.params.id;
    const {quantity = 1} = req.body

    const cartProduct = await cartService.decreaseQuantity(userId, productId, quantity);

    return res.status(200).json(new ApiResponse(200, {cartProduct}, "Product quantity decreased in cart"));
});

const removeFromcart = asyncHandler(async(req, res) => {
    const userId = req.user?.id;
    const productId = req.params.id;

    const removedProduct = await cartService.removeFromcart(userId, productId);

    return res.status(200).json(new ApiResponse(200, {removedProduct}, "Product removed from cart"))
});

const getCartItems = asyncHandler(async(req, res) => {
    const userId = req.user?.id;

    const cartItems = await cartService.getCartItems(userId);

    return res.status(200).json(new ApiResponse(200, {cartItems}, "Cart items fetched successfully"));
})

export const cartController = {
    addToCart,
    decreaseQuantity,
    removeFromcart,
    getCartItems
}
