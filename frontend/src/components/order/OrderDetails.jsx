import { formatDate } from "../../utils/formDate";

const OrderDetails = ({ quantity, date, price }) => {
    const totalAmount = price * quantity;

    return (
        <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold text-gray-800">{quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-semibold text-gray-800">{formatDate(date)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-xl font-bold text-gray-800">${totalAmount.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default OrderDetails;