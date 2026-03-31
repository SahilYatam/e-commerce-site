import ProductCard from "../common/ProductCard"
import Button from "../common/Button"
import { useNavigate } from "react-router-dom"

const ProductGrid = ({ products }) => {
    const navigate = useNavigate()
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-6 mt-5 mb-6 px-2 sm:px-4 max-w-7xl mx-auto">
            {products.map((product) => (
                <ProductCard key={product._id} product={product}>
                    {/* Default action for Home/Search */}
                    <Button onClick={() => navigate(`/product/${product._id}`)} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors duration-200 active:transform active:scale-95 cursor-pointer">
                        View Product
                    </Button>
                </ProductCard>
            ))}
        </div>
    )
}

export default ProductGrid