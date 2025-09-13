import { asyncHandler } from "../utils/handlers/asyncHandler.js"
import { ApiResponse } from "../utils/responses/ApiResponse.js"

import { orderService } from "../services/order.service.js"

const buyProduct = asyncHandler(async(req, res) => {
    const userId = req.user?.id;
    const productId = req.params.id;
    const orderdItem = await orderService.buyProduct(userId, productId)

    return res.status(200).json(new ApiResponse(200, {orderdItem}, "Order placed successfully"));
});

const cancelOrder = asyncHandler(async(req, res) => {
    const userId = req.user?.id;
    const productId = req.params.id;
    const canceledOrder = await orderService.cancelOrder(userId, productId)

    return res.status(200).json(new ApiResponse(200, {canceledOrder}, "Order canceled successfully"));
});

const getOrders = asyncHandler(async(req, res) => {
    const order = await orderService.getOrders();
    if(!order || order.length === 0) {
        return res.status(200)
        .json(new ApiResponse(200, [], "No orders found"));
    }

    return res.status(200).json(new ApiResponse(200, {order}, "Orders fetched successfully"));
});

const removeOrder = asyncHandler(async(req, res) => {
    const orderId = req.params.id;
    const removedOrder = await orderService.removeOrder(orderId);

    return res.status(200).json(new ApiResponse(200, {removedOrder}, "Order removed successfully"));
});

export const orderController = {
    buyProduct,
    cancelOrder,
    getOrders,
    removeOrder
}