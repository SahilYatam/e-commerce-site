import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js"
import { Product } from "../models/product.model.js"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/responses/ApiError.js"
import { cartService } from "./cart.service.js";

const buyNow = async (userId, productId, quantity, deliveryAddress) => {
    const product = await Product.findById(productId);
    if(!product) throw new ApiError(404, "Product not found");

    if(!deliveryAddress || deliveryAddress.trim() === ""){
        throw new ApiError(400, "Delivery address is required");
    }

    const itemTotal = product.price * quantity;

    // Creating order with single item
    const order = new Order({
        userId,
        items: [{
            productId: product._id,
            productName: product.productName,
            quantity,
            priceAtPurchase: product.price,
            itemTotal
        }],
        totalAmount: itemTotal,
        deliveryAddress,
        paymentStatus: "unpaid",
        status: "pending"
    });

    await order.save();

    // Updating user's last used address
    await User.findByIdAndUpdate(userId, {
        lastUsedAddress: deliveryAddress
    })

    return order;
}

const createOrderFromCart = async (userId, deliveryAddress) => {
    // All cart items
    const {cartItems, grandTotal} = await cartService.getCartItems(userId);

    if(cartItems.length === 0) throw new ApiError(400, "Cart is empty");

    if (!deliveryAddress || deliveryAddress.trim() === '') {
        throw new ApiError(400, "Delivery address is required");
    }

    // Prepare order items
    const orderItems = cartItems.map(item => ({
        productId: item.productId._id,
        productName: item.productId.productName,
        quantity: item.quantity,
        priceAtPurchase: item.productId.price,
        itemTotal: item.itemTotal
    }));

    const order = new Order({
        userId,
        items: orderItems,
        totalAmount: grandTotal,
        deliveryAddress,
        paymentStatus: "unpaid",
        status: "pending"
    })
    await order.save();

    // Clear cart after successful order
    await Cart.deleteMany({userId})

    await User.findByIdAndUpdate(userId, {
        lastUsedAddress: deliveryAddress
    });

    return order;
}

const cancelOrder = async(userId, orderId) => {
    const canceledOrder = await Order.findOneAndUpdate(
        {userId, _id: orderId, status: {$ne: "canceled"}}, 
        {status: "canceled"}, 
        {new: true, runValidators: true}
    );
    if (!canceledOrder) throw new ApiError(404, "Active order not found for cancellation");

    return canceledOrder;
}

const hideOrder = async(userId, orderId) => {
    const hiddenOrder = await Order.findOneAndUpdate(
        {_id: orderId, userId, status: "canceled"},
        { isHiddenByUser: true, hiddenAt: new Date() },
        {new: true}
    )

    if (!hiddenOrder) {
        throw new ApiError(404, "Canceled order not found");
    }

    return hiddenOrder;
}

const getAllOrdersForUser = async(userId) => {
    const orders = await Order.find({userId, isHiddenByUser: false})
    .populate("items.productId", "productName price category productImage description")
    .sort({ createdAt: -1 })

    return orders
}

const getOrders = async() => {
    const orders = await Order.find({status: {$ne: "canceled"}})
    .populate("items.productId", "productName price category productImage description")
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

    return orders;
}

const confirmOrder = async( orderId ) => {
    const order = await Order.findOneAndUpdate(
        {_id: orderId, status: "pending"},
        { status: "confirmed" },
        { new: true, runValidators: true }
    ).populate('items.productId', 'productName price category productImage description');

    if(!order) throw new ApiError(404, "Pending order not found or already confirmed");
    
    return order
}

const rejectOrder = async(orderId) => {
    const order = await Order.findOneAndUpdate(
        {_id: orderId, status: "pending"},
        { status: "reject" },
        { new: true, runValidators: true }
    ).populate('items.productId', 'productName price category productImage description');

    if(!order) throw new ApiError(404, "Pending order not found or already confirmed");
    
    return order
}

const removeOrder = async(orderId) => {
    const removedOrder = await Order.findByIdAndDelete(orderId);
    if(!removedOrder) throw new ApiError(404, "Product not found");

    return removedOrder
}

export const orderService = {
    buyNow,
    createOrderFromCart,
    cancelOrder,
    hideOrder,
    getAllOrdersForUser,
    getOrders,
    confirmOrder,
    rejectOrder,
    removeOrder
}