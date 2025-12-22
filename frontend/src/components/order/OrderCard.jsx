import { useDispatch } from "react-redux";
import { cancelOrder, hideOrder } from "../../features/order/orderThunks";

import OrderDetails from "./OrderDetails.jsx";
import OrderProductInfo from "./OrderProductInfo.jsx";
import OrderStatus from "./OrderStatus.jsx";
import { toast } from "react-toastify";

const OrderCard = ({ order }) => {
    const dispatch = useDispatch();

    const item = order.items?.[0];
    const product = item?.productId;
    const quantity = item?.quantity;
    if(!product) return null;

    const handleCancel = () => {
        dispatch(cancelOrder(order._id)).unwrap()
            .then(() => {
                toast.success("Order canceled successfully!");
            })
            .catch(() => {
                toast.error("Failed to cancel the order!");
            });
    }

    const handleHide = () => {
        dispatch(hideOrder(order._id)).unwrap()
            .then(() => {
                toast.success("Cancel order hided!");
            })
            .catch(() => {
                toast.error("Failed to hide cancel order!");
            });
    }

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6">
                <OrderStatus orderId={order._id} status={order.status} />

                <OrderProductInfo
                    image={product.productImage}
                    product={product.productName}
                    description={product.description}
                />

                <OrderDetails
                    quantity={quantity}
                    date={order.createdAt}
                    price={product.price}
                />

                {order.status === "pending" && (
                    <button
                        onClick={handleCancel}
                        className="w-full bg-red-500 text-white py-2 rounded-xl mb-2"
                    >
                        Cancel Order
                    </button>
                )}

                {order.status === "canceled" && (
                    <button
                        onClick={handleHide}
                        className="w-full bg-gray-400 text-white py-2 rounded-xl"
                    >
                        Hide Order
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderCard;