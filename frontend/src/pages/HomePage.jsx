import HeroSection from "../components/home/HeroSection";
import ProductGrid from "../components/home/ProductGrid.jsx";
import { useSelector, useDispatch } from "react-redux";
import { loadAllProducts } from "../features/products/productThunks";

import { useEffect, useState } from "react";
import {Pagination} from "../components/layout/Pagination.jsx";

const HomePage = () => {
    const dispatch = useDispatch();
    const { products, loading, error, pagination } = useSelector(
        (state) => state.product,
    );

    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        dispatch(loadAllProducts({ page, limit }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [dispatch, page]);

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

    if ((!loading && !Array.isArray(products)) || products.length === 0) {
        return <p className="text-center">No Products Found</p>;
    }

    return (
        <>
            <HeroSection />
            <ProductGrid products={products} />

            {/* Pagination UI */}
            <Pagination
                page={page}
                totalPages={pagination?.totalPages || 1}
                onPageChange={setPage}
            />
        </>
    );
};

export default HomePage;
