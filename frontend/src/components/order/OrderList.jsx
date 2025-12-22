import OrderCard from "./OrderCard";

const OrdersList = ({ orders }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
                <OrderCard key={order._id} order={order} />
            ))}
        </div>
    );
};

export default OrdersList;
