import { Plus } from 'lucide-react';
import ProductCard from './ProductCard.jsx';

const ProductsTab = ({ products, onEdit, onDelete, onAddClick }) => {
    return (
        <div>
            <div className="mb-6">
                <button
                    onClick={onAddClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                    <Plus size={20} className="mr-2" />
                    Add New Product
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};
export default ProductsTab;
