import { Order } from "../models/order.model.js"
import { Product } from "../models/product.model.js"
import { ApiError } from "../utils/responses/ApiError.js"

const buyProduct = async (userId, productId, quantity = 1) => {
    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");

    const order = new Order ({
        userId,
        productId,
        quantity,
        priceAtPurchase: product.price
    });
    
    await order.save()

    return order;
}

const cancelOrder = async(userId, productId) => {
    const canceledOrder = await Order.findOneAndUpdate(
        {userId, productId, status: {$ne: "canceled"}}, 
        {status: "canceled"}, 
        {new: true, runValidators: true}
    );
    if (!canceledOrder) throw new ApiError(404, "Active order not found for cancellation");

    return canceledOrder;
}

const getOrders = async() => {
    const orders = await Order.find({})
    .populate("productId", "productName price category productImage")
    .populate("userId", "name email");

    return orders;
}

const removeOrder = async(orderId) => {
    const removedOrder = await Order.findByIdAndDelete(orderId);
    if(!removedOrder) throw new ApiError(404, "Product not found");

    return removedOrder
}

export const orderService = {
    buyProduct,
    cancelOrder,
    getOrders,
    removeOrder
}