import HeroSection from '../components/home/HeroSection'
import ProductGrid from '../components/home/ProductGrid.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllProducts } from '../features/products/productThunks'


import { useEffect } from 'react'

const HomePage = () => {
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(loadAllProducts())
    }, [dispatch])

    if (loading) {
        return <p className="text-center">Loading product...</p>;
    }

    if (error) {
        return (
            <p className="text-center text-red-500">
                {error?.response?.data?.message || error?.message || "Error occurred"}
            </p>
        );
    }


    if (!Array.isArray(products) || products.length === 0) {
        return <p className="text-center">Add Products...</p>
    }

    return (
        <>
            <HeroSection />
            <ProductGrid products={products} />
        </>
    )
}

export default HomePage