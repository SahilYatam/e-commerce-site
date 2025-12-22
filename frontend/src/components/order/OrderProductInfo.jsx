const OrderProductInfo = ({ image, product, description }) => {
    return (
        <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-4xl">
                {image ? (
                    <img
                        src={image}
                        alt={product}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                )}
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{product}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{description || "No description available"}</p>
            </div>
        </div>
    );
};

export default OrderProductInfo;