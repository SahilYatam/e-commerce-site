import { Clock, CheckCircle, XCircle, Package } from 'lucide-react';

const OrderStatus = ({ orderId, status }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'pending':
                return {
                    icon: <Clock className="w-4 h-4" />,
                    text: 'Pending',
                    bgColor: 'bg-yellow-100',
                    textColor: 'text-yellow-700',
                    borderColor: 'border-yellow-300'
                };
            case 'confirmed':
                return {
                    icon: <CheckCircle className="w-4 h-4" />,
                    text: 'Confirmed',
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-700',
                    borderColor: 'border-green-300'
                };
            case 'canceled':
                return {
                    icon: <XCircle className="w-4 h-4" />,
                    text: 'Canceled',
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-700',
                    borderColor: 'border-red-300'
                };
            case 'reject':
                return {
                    icon: <XCircle className="w-4 h-4" />,
                    text: 'Rejected',
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-700',
                    borderColor: 'border-red-300'
                };
            default:
                return {
                    icon: <Package className="w-4 h-4" />,
                    text: 'Unknown',
                    bgColor: 'bg-gray-100',
                    textColor: 'text-gray-700',
                    borderColor: 'border-gray-300'
                };
        }
    };

    const statusConfig = getStatusConfig(status);


    return (
        <div className="flex items-start justify-between mb-4">
            <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Order ID</p>
                <p className="text-lg font-bold text-gray-800">{orderId}</p>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}>
                {statusConfig.icon}
                <span className="text-sm font-semibold">{statusConfig.text}</span>
            </div>
        </div>
    )
}

export default OrderStatus