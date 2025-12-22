import { Edit2, Trash2 } from 'lucide-react';


const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow p-3 hover:shadow-md transition-shadow">
            <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-sm font-semibold mb-1 truncate">{product.productName}</h3>
            <p className="text-gray-600 text-xs mb-2 line-clamp-2">{product.description}</p>
            <div className="space-y-0.5 mb-3 text-xs text-black">
                <p><span className="font-medium">Price:</span> ${product.price}</p>
                <p><span className="font-medium">Category:</span> {product.category}</p>
                <p><span className="font-medium">Stock:</span> {product.stock}</p>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => onEdit(product)}
                    className="flex-1 bg-yellow-500 text-white px-2 py-1.5 text-xs rounded hover:bg-yellow-600 flex items-center justify-center"
                >
                    <Edit2 size={12} className="mr-1" />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(product._id)}
                    className="flex-1 bg-red-500 text-white px-2 py-1.5 text-xs rounded hover:bg-red-600 flex items-center justify-center"
                >
                    <Trash2 size={12} className="mr-1" />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ProductCard;