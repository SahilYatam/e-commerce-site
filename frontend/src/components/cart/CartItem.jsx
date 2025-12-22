import Button from "../common/Button";
import ProductCard from "../common/ProductCard";
import { FiTrash2 } from "react-icons/fi"


const CartItem = ({ item, onIncrease, onDecrease, onRemove, updating }) => {
    const product = item.product;
    if(!product) return null;

    return (
        <ProductCard product={product} showAddToCart={false}>
            <div className="flex flex-col gap-3 text-black">

                <div className="flex justify-between items-center">
                    <Button disable={updating} onClick={onDecrease} className="bg-red-600 px-2 rounded">-</Button>
                    <span className="font-semibold">{item.quantity}</span>
                    <Button disable={updating} onClick={onIncrease} className="px-2 rounded">+</Button>
                </div>

                <p className="font-semibold">
                    Quantity: {item.quantity}
                </p>

                <p className="font-semibold">
                    Subtotal: ${item.itemTotal}
                </p>

                <Button
                    onClick={onRemove}
                    className="text-red-500 flex items-center gap-1"
                >
                    <FiTrash2 /> Remove
                </Button>

            </div>
        </ProductCard>
    );
};


export default CartItem