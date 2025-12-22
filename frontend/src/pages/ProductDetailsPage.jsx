import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getProductById } from "../features/products/productThunks.js";
import ProductGrid from "../components/home/ProductGrid.jsx";
import ProductInfo from "../components/productDetails/ProductInfo.jsx";
import ProductAction from "../components/productDetails/ProductAction.jsx";
import ProductImageGallery from "../components/productDetails/ProductImageGallery.jsx";

const ProductDetailsPage = () => {
    const dispatch = useDispatch()
    const {id} = useParams()

    const { product, relatedProducts, loading, error } = useSelector((state) => state.product)


    useEffect(() => {
        if (id) {
            dispatch(getProductById(id))
        }
    }, [dispatch, id])


    if (loading) {
        return <p className="text-center">Loading product...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!product) {
        return <p className="text-center">Product not found</p>;
    }


    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10">

                    {/* Left: Images */}
                    <div className="w-full md:w-3/5 lg:w-1/2">
                        <ProductImageGallery product={product} />
                    </div>

                    {/* Right: Info + Actions */}
                    <div className="w-full md:w-2/5 lg:w-1/2 flex flex-col gap-6">
                        <ProductInfo product={product} />
                        <ProductAction product={product} />
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts?.length > 0 && (
                    <div className="bg-gray-50 py-12 mt-12">
                        <div className="max-w-7xl mx-auto px-4 md:px-6">
                            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                                Similar Products
                            </h2>
                            <ProductGrid products={relatedProducts} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default ProductDetailsPage