import { asyncHandler } from "../utils/handlers/asyncHandler.js"
import { ApiResponse } from "../utils/responses/ApiResponse.js"

import { orderService } from "../services/order.service.js"
import { ApiError } from "../utils/responses/ApiError.js";

const buyNow = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) throw new ApiError(401, "Login to purchase items");

    const { quantity, deliveryAddress } = req.body;

    const productId = req.params.id;
    const order = await orderService.buyNow(userId, productId, quantity, deliveryAddress)

    return res.status(201).json(new ApiResponse(201, { order }, "Order placed successfully"));
});

const checkoutCart = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const {deliveryAddress} = req.body;

    const order = await orderService.createOrderFromCart(userId, deliveryAddress)

    return res.status(201).json(
        new ApiResponse(201, { order }, "Order placed successfully from cart")
    );
})

const cancelOrder = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const orderId = req.params.id;
    const order = await orderService.cancelOrder(userId, orderId)

    return res.status(200).json(new ApiResponse(200, { order }, "Order canceled successfully"));
});

const hideOrder = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const orderId = req.params.id;
    await orderService.hideOrder(userId, orderId);

    return res.status(200).json(new ApiResponse(200, {}, "Order removed from your list"));
})

const getAllOrdersForUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id
    if (!userId) throw new ApiError(404, "User not exist");

    const orders = await orderService.getAllOrdersForUser(userId)

    if (!orders || orders.length === 0) {
        return res.status(200)
            .json(new ApiResponse(200, [], "No orders have been placed yet."));
    }

    return res.status(200).json(new ApiResponse(200, { orders }, "Orders fetched successfully"));
})

const getOrders = asyncHandler(async (req, res) => {
    const orders = await orderService.getOrders();
    if (!orders || orders.length === 0) {
        return res.status(200)
            .json(new ApiResponse(200, [], "No orders found"));
    }

    return res.status(200).json(new ApiResponse(200, { orders }, "Orders fetched successfully"));
});

const confirmOrder = asyncHandler(async(req, res) => {
    const orderId = req.params.id;

    const order = await orderService.confirmOrder(orderId);

    return res.status(200).json(new ApiResponse(200, { order }, "Order confirmed"));
})

const rejectOrder = asyncHandler(async(req, res) => {
    const orderId = req.params.id;

    const order = await orderService.rejectOrder(orderId);

    return res.status(200).json(new ApiResponse(200, { order }, "Order rejected"));
})

const removeOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const removedOrder = await orderService.removeOrder(orderId);

    return res.status(200).json(new ApiResponse(200, { removedOrder }, "Order removed successfully"));
});

export const orderController = {
    buyNow,
    checkoutCart,
    cancelOrder,
    hideOrder,
    getAllOrdersForUser,
    getOrders,
    confirmOrder,
    rejectOrder,
    removeOrder
}