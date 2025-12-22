import { useSelector } from "react-redux";
import ProductGrid from "../components/home/ProductGrid";

const SearchPage = () => {
    const { searchResults, relatedProducts, loading } = useSelector(
        (state) => state.product
    );

    if (loading) {
        return <p className="text-center mt-10">Searching products...</p>;
    }

    return (
        <>
            {searchResults?.length > 0 && (
                <ProductGrid products={searchResults} />
            )}

            {relatedProducts?.length > 0 && (
                <ProductGrid products={relatedProducts} />
            )}
        </>
    );
};

export default SearchPage;
