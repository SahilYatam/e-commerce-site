import { BsCartPlusFill } from "react-icons/bs";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addItemInCart } from "../../features/cart/cartThunks.js";
import { toast } from "react-toastify";

const ProductCard = ({ product, children, showAddToCart = true }) => {
    const dispatch = useDispatch()
    
    const handleAddToCart = () => {
        dispatch(addItemInCart({
            productId: product._id,
            quantity: 1
        })).unwrap()
            .then(() => {
                toast.success("Product added to cart");
            })
            .catch(() => {
                toast.error("Failed to add product to cart");
            });
    }

    return (
        <div className="relative w-full max-w-60 mx-auto rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white group overflow-hidden">
            {/* Add to Cart Button */}
            {showAddToCart && (
                <Button onClick={handleAddToCart} className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 z-10 opacity-0 group-hover:opacity-100 cursor-pointer">
                    <BsCartPlusFill className="w-4 h-4 text-gray-700 hover:text-blue-600" />
                </Button>
            )}

            {/* Product Image */}
            <div className="relative overflow-hidden">
                <img
                    loading="lazy"
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-48 object-fill rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col gap-3">
                <h3 className="text-2xl font-medium text-gray-800 line-clamp-2 leading-tight">
                    {product.productName}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                </p>

                {/* Price Section */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                    </span>
                </div>

                {/* Children (slot for buttons / extra UI) */}
                {children}
            </div>
        </div>
    )
}

export default ProductCard