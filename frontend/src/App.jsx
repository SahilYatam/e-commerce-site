import HomePage from "./pages/HomePage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SearchPage from "./pages/SearchPage.jsx"
import CartPage from "./pages/CartPage.jsx"
import OrdersPage from "./pages/OrdersPage.jsx"
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute.jsx"
import AppLayout from "./components/layout/AppLayout.jsx"
import AdminRoute from "./components/admin/AdminRoute.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"



const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
            { path: "search", element: <SearchPage /> },
            { path: "product/:id", element: <ProductDetailsPage /> },

            // 🔒 User-protected routes
            {
                path: "cart",
                element: (
                    <ProtectedRoute>
                        <CartPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "orders",
                element: (
                    <ProtectedRoute>
                        <OrdersPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "admin",
                element: (
                    <ProtectedRoute>
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    </ProtectedRoute>
                ),
            }


        ]
    }
])

function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App
