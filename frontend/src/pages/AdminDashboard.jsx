import { useState } from "react";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct, deleteProduct, loadAllProducts } from "../features/products/productThunks.js";
import { confirmOrder, getOrdersForSeller, rejectOrder } from "../features/order/orderThunks.js";
import { clearMessages } from "../features/products/productSlice.js";
import { clearMessages as orderClearMessages } from "../features/order/orderSlice.js";
import Navigation from "../components/admin/Navigation.jsx";
import ProductsTab from "../components/admin/ProductsTab.jsx";
import OrdersTab from "../components/admin/OrdersTab.jsx";
import Modal from "../components/admin/Modal.jsx";
import ProductForm from "../components/admin/ProductForm.jsx";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const dispatch = useDispatch();

    const { products, loading, error, successMessage } = useSelector((state) => state.product);
    const {
        orders,
        loading: ordersLoading,
        error: orderError,
        successMessage: orderSuccessMessage
    } = useSelector((state) => state.order);


    const [activeTab, setActiveTab] = useState('products');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        productImage: null
    });

    useEffect(() => {
        dispatch(loadAllProducts())
        dispatch(getOrdersForSeller())
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            alert(successMessage)
            dispatch(clearMessages())
        }
        if (error) {
            alert(error)
            dispatch(clearMessages())
        }
    }, [successMessage, error, dispatch]);


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (orderSuccessMessage) {
            alert(orderSuccessMessage);
            dispatch(orderClearMessages());
        }
        if (orderError) {
            alert(orderError);
            dispatch(orderClearMessages());
        }
    }, [orderSuccessMessage, orderError, dispatch]);

    const handleSubmit = async () => {

        if (editingProduct) {
            await dispatch(updateProduct({
                id: editingProduct._id || editingProduct.id,
                productName: formData.productName,
                price: parseFloat(formData.price),
                description: formData.description,
                category: formData.category
            }))
        } else {
            // Add new product
            await dispatch(addProduct({
                productImage: formData.productImage,
                productName: formData.productName,
                price: Number(formData.price),
                stock: Number(formData.stock),
                description: formData.description,
                category: formData.category
            }));
        }


        resetForm();
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', price: '', category: '', stock: '', image: '' });
        setEditingProduct(null);
        setShowModal(false);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            productName: product.productName || product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            productImage: product.productImage || product.image
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await dispatch(deleteProduct({ id }));
        }
    };

    const handleOrderConfirm = async (orderId) => {
        await dispatch(confirmOrder(orderId)).unwrap()
            .then(() => {
                toast.success("Order confirm!");
            })
            .catch(() => {
                toast.error("Failed to confirm the order");
            });
    };

    const handleOrderReject = async (orderId) => {
        await dispatch(rejectOrder(orderId)).unwrap()
            .then(() => {
                toast.success("Order rejected!");
            })
            .catch(() => {
                toast.error("Failed to reject the order");
            });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {(loading || ordersLoading) && (
                    <div className="text-center py-4">
                        <p className="text-gray-600">Loading...</p>
                    </div>
                )}

                {activeTab === 'products' && (
                    <ProductsTab
                        products={products}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onAddClick={() => setShowModal(true)}
                    />
                )}

                {activeTab === 'orders' && (
                    <OrdersTab
                        orders={orders || []}
                        onConfirm={handleOrderConfirm}
                        onReject={handleOrderReject}
                    />
                )}
            </main>

            <Modal
                isOpen={showModal}
                onClose={resetForm}
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
            >
                <ProductForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onCancel={resetForm}
                    isEditing={!!editingProduct}
                />
            </Modal>
        </div>
    );
};

export default AdminDashboard;