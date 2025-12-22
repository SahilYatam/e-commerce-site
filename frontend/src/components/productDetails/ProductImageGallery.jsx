
const ProductImageGallery = ({product}) => {
    return (
        <div className="w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <div className="aspect-square">
                <img 
                    src={product.productImage} 
                    className="w-full h-full object-cover" 
                    alt={product.productName}
                />
            </div>
        </div>
    )
}
export default ProductImageGallery