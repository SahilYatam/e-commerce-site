import { useState } from "react";
import Button from "../common/Button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addItemInCart } from "../../features/cart/cartThunks.js";
import { buyNow } from "../../features/order/orderThunks.js";
import { saveDeliveryAddress } from "../../features/order/orderSlice.js";
import DeliveryAddressModal from "../order/DeliveryAddressModal.jsx";
import { toast } from "react-toastify";

const ProductAction = ({ product }) => {
    const dispatch = useDispatch();
    const { deliveryAddress } = useSelector((state) => state.order);

    const [showModal, setShowModal] = useState(false);

    const handleBuyNow = () => {
        if (!deliveryAddress) {
            toast.info("Please enter delivery address");
            setShowModal(true);
            return;
        }

        dispatch(
            buyNow({
                productId: product._id,
                quantity: 1,
                deliveryAddress,
            })
        )
            .unwrap()
            .then(() => {
                toast.success("Order placed successfully");
            })
            .catch(() => {
                toast.success("Order placed successfully");
            });
    };

    const handleAddressSubmit = (address) => {
        dispatch(saveDeliveryAddress(address));

        dispatch(
            buyNow({
                productId: product._id,
                quantity: 1,
                deliveryAddress: address,
            })
        )
            .unwrap()
            .then(() => {
                toast.success("Order placed successfully");
            })
            .catch(() => {
                toast.error("Failed to place order");
            });

        setShowModal(false);
    };

    const handleAddToCart = () => {
        dispatch(
            addItemInCart({
                productId: product._id,
                quantity: 1,
            })
        )
            .unwrap()
            .then(() => {
                toast.success("Product added to cart");
            })
            .catch(() => {
                toast.error("Failed to add product to cart");
            });
    };
    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* Quantity Selector (optional) */}
            <div className="flex items-center gap-3">
                <span className="text-1xl font-medium text-gray-700">Stock:</span>
                <span className="text-1xl font-medium text-gray-700">
                    {product.stock}
                </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    onClick={handleBuyNow}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 text-base font-medium"
                >
                    Buy Now
                </Button>

                <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 text-base font-medium"
                >
                    Add To Cart
                </Button>
            </div>
            {showModal && (
                <DeliveryAddressModal
                    onSubmit={handleAddressSubmit}
                    onClose={() => setShowModal(false)}
                />
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <span>🚚</span>
                    <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>↩️</span>
                    <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>In Stock</span>
                </div>
            </div>
        </div>
    );
};

export default ProductAction;
