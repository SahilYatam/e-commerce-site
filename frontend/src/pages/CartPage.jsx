import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react"

import CartItem from "../components/cart/CartItem.jsx"
import Button from "../components/common/Button.jsx";

import { useSelector, useDispatch } from "react-redux";
import { saveDeliveryAddress } from "../features/order/orderSlice.js";
import { checkoutCart } from "../features/order/orderThunks.js";
import { updateCartQuantity, getCartItems, removeCartItem } from "../features/cart/cartThunks.js";
import { clearMessages } from "../features/cart/cartSlice.js";
import DeliveryAddressModal from "../components/order/DeliveryAddressModal.jsx";
import { toast } from "react-toastify";

const CartPage = () => {
    const dispatch = useDispatch()
    const { cartItems, loading, error, grandTotal, successMessage, updating } = useSelector((state) => state.cart);
    const { deliveryAddress, loading: orderLoading } = useSelector(state => state.order);

    const [showModal, setShowModal] = useState(false);

    const items = Array.isArray(cartItems) ? cartItems : [];

    const handleCheckout = () => {
        if(!deliveryAddress){
            setShowModal(true)
            return
        }
        dispatch(checkoutCart({deliveryAddress}))
    }

    const handleAddressSubmit = (address) => {
        dispatch(saveDeliveryAddress(address))
        dispatch(checkoutCart({deliveryAddress: address}))
        setShowModal(false)
    }

    useEffect(() => {
        dispatch(getCartItems())
    }, [dispatch])

    useEffect(() => {
        if (error || successMessage) {
            const timer = setTimeout(() => {
                dispatch(clearMessages());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, successMessage, dispatch]);

    const increaseQty = (productId, quantity) => {
        dispatch(updateCartQuantity({ productId, quantity: quantity + 1 }))
    };

    const decreaseQty = (productId, quantity) => {
        dispatch(updateCartQuantity({ productId, quantity: quantity - 1 }))
    };

    const removeItem = (cartItemId) => {
        dispatch(removeCartItem(cartItemId)).unwrap()
                    .then(() => {
                        toast.success("Product removed from cart!");
                    })
                    .catch(() => {
                        toast.error("Failed to remove cart product!");
                    });
    }

    if (loading) {
        return <LoaderCircle className="animate-spin mx-auto" />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl text-black font-bold mb-6">Shopping Cart</h1>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-600">{successMessage}</p>}

            {items.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500">Your cart is empty</p>
                </div>
            ) : (
                <>
                    {updating && <LoaderCircle className="w-4 h-4 animate-spin" />}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                        {items.map(item => (
                            
                            <CartItem
                                key={item._id}
                                item={item}
                                onIncrease={() => increaseQty(item.product._id, item.quantity)}
                                onDecrease={() => decreaseQty(item.product._id, item.quantity)}
                                onRemove={() => removeItem(item._id)}
                            />
                        ))}
                        
                    </div>

                    <div className="flex justify-center text-black">
                        <div className="w-60 bg-gray-100 p-6 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-semibold">Total:</span>
                                <span className="text-2xl font-bold">${grandTotal}</span>
                            </div>
                            <Button disabled={orderLoading}
                            onClick={handleCheckout} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                                Proceed to Checkout
                            </Button>
                            {showModal && (
                                <DeliveryAddressModal
                                onSubmit={handleAddressSubmit}
                                onClose={() => setShowModal(false)}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default CartPage