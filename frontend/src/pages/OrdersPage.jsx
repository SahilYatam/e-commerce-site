import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderPageHeader from "../components/layout/OrderPageHeader";
import OrdersList from "../components/order/OrderList";

import { getAllOrdersForUser } from "../features/order/orderThunks";
import { clearMessages } from "../features/order/orderSlice";

const OrdersPage = () => {
    const dispatch = useDispatch();

    const { orders, loading, error, successMessage } = useSelector(state => state.order)

    const safeOrder = Array.isArray(orders) ? orders : [];

    useEffect(() => {
        dispatch(getAllOrdersForUser())
    }, [dispatch])

    useEffect(() => {
        if (error || successMessage) {
            const timer = setTimeout(() => {
                dispatch(clearMessages())
            }, 300);
            return () => clearTimeout(timer)
        }
    }, [error, successMessage, dispatch])

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <OrderPageHeader
                    title="My Orders"
                    subtitle="Track and manage your orders"
                />

                {loading && <p className="text-center">Loading orders...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && safeOrder.length === 0 && (
                    <p className="text-center text-gray-500">
                        You have no orders yet
                    </p>
                )}

                {safeOrder.length > 0 && <OrdersList orders={orders} />}
            </div>
        </div>
    );
};

export default OrdersPage;