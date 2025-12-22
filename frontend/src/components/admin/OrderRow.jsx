import { X, Check } from 'lucide-react';

const OrderRow = ({ order, onConfirm, onReject }) => {
    const item = order.items?.[0];
    const product = item?.productId;

    if (!item || !product) return null;

    const total = product.price * item.quantity;

    return (
        <tr>
            {/* Order Id */}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order._id}</td>

            {/* Customer */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.userId?.name || "Unknown"}</td>

            {/* Product */}
            <td className="px-6 py-4 text-sm text-gray-900 flex items-center gap-2">
                <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-8 h-8 rounded object-cover"
                />
                <span>{product.productName}</span>
            </td>


            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${total}</td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</td>

            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    order.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                    {order.status}
                </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-sm">
                {order.status === "pending" && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onConfirm(order._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center"
                        >
                            <Check size={14} className="mr-1" />
                            Confirm
                        </button>

                        <button
                            onClick={() => onReject(order._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center"
                        >
                            <X size={14} className="mr-1" />
                            Reject
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};
export default OrderRow;