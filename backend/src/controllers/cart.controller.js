import { asyncHandler } from "../utils/handlers/asyncHandler.js"
import { ApiResponse } from "../utils/responses/ApiResponse.js"

import { cartService } from "../services/cart.service.js"

const addToCart = asyncHandler(async(req, res) => {
    const userId = req.user?._id.toString()
    if(!userId)
        return res.status(401).
            json(new ApiResponse(401, null, "User must be logged in to add product to cart"));

    const productId = req.params.id;
    const {quantity = 1} = req.body

    const cartProduct = await cartService.addToCart(userId, productId, quantity);

    return res.status(200).json(new ApiResponse(200, {cartProduct}, "Product added to cart successfully"))
})

const updateQuantity = asyncHandler(async(req, res) => {
    const userId = req.user?._id;
    const productId = req.params.id;
    const {quantity} = req.body

    const result = await cartService.updateCartQuantity(userId, productId, quantity)

    if(result.removed){
        return res.status(200).json(
            new ApiResponse(200, {
                productId: result.productId,
                removed: true
            }, result.message)
        )
    }

    return res.status(200).json(new ApiResponse(200, {
        cartProduct: result,
        productId: productId,
        removed: false
    }, "Cart updated successfully"));
});

const removeFromcart = asyncHandler(async(req, res) => {
    const userId = req.user?._id;
    const cartItemId = req.params.id;

    await cartService.removeFromcart(userId, cartItemId);

    return res.status(200).json(new ApiResponse(200, {}, "Product removed from cart"))
});

const getCartItems = asyncHandler(async(req, res) => {
    const userId = req.user?._id;

    const {cartItems, grandTotal} = await cartService.getCartItems(userId);

    return res.status(200).json(new ApiResponse(200, {cartItems, grandTotal}, "Cart items fetched successfully"));
})

export const cartController = {
    addToCart,
    updateQuantity,
    removeFromcart,
    getCartItems
}
