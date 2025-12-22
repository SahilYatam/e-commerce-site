import ProductCard from "../common/ProductCard"
import Button from "../common/Button"
import { useNavigate } from "react-router-dom"

const ProductGrid = ({ products }) => {
    const navigate = useNavigate()
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-5 justify-center mb-6 px-4">
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