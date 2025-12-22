const ProductInfo = ({product}) => {
    return (
        <div className="w-full flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
                {product.productName}
            </h1>
            
            <p className="text-base text-gray-600 leading-relaxed">
                {product.description}
            </p>
            
            <div className="flex items-baseline gap-3 mt-2">
                <span className="text-3xl font-bold text-red-600">${product.price}</span>
            </div>

            {/* Optional: Add rating */}
            <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                    ★★★★★
                </div>
                <span className="text-sm text-gray-600">(128 reviews)</span>
            </div>
        </div>
    )
}

export default ProductInfo