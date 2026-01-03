import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { searchProducts } from "../../features/products/productThunks";
import { logoutUser } from "../../features/auth/authThunks";

import { IoIosMenu, IoMdClose } from "react-icons/io";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector((state) => state.auth);

    const isAuthenticated = Boolean(user)

    const [searchValue, setSearchValue] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /* ---------------- Search Debounce ---------------- */
    useEffect(() => {
        if (!searchValue.trim()) return;

        const timer = setTimeout(() => {
            dispatch(searchProducts(searchValue));
            navigate("/search");
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue, dispatch, navigate]);

    /* ---------------- Auth Handler ---------------- */

    // Listen for logout event from axios interceptor
    useEffect(() => {
        const handleAuthLogout = () => {
            dispatch({type: "auth/logout"});
            navigate("/login")
        }
        window.addEventListener("auth:logout", handleAuthLogout);

        return () => {
            window.removeEventListener("auth:logout", handleAuthLogout);
        }
    }, [dispatch, navigate]);

    const handleAuthClick = () => {
        if (loading) return;
        if (isAuthenticated) {
            // Call logout thunk which clears state first, then backend
            dispatch(logoutUser());
            navigate("/login");
        } else {
            navigate("/login");
        }
    };

    const AuthButton = () => {
        if (loading) return null;

        return (
            <button
                type="button"
                onClick={handleAuthClick}
                className={`w-28 cursor-pointer rounded-full text-white py-1
                ${isAuthenticated
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {isAuthenticated ? "Logout" : "Login"}
            </button>
        );
    };
    

const AdminButton = () => {
    if (!user || user?.role !== "seller") return null;

    return (
        <button
            type="button"
            onClick={() => navigate("/admin")}
            className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full cursor-pointer"
        >
            Admin Dashboard
        </button>
    );
}

return (
    <>
        {/* ================= NAVBAR ================= */}
        <nav className="bg-neutral-900 text-white w-full min-h-16 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-24 py-3">
                {/* Brand */}
                <header
                    className="text-2xl sm:text-3xl text-[#8b5cf6] font-bold cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    QuickMart
                </header>

                {/* Search */}
                <div className="w-60 md:w-80 relative">
                    <IoSearchOutline className="h-6 w-6 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search Products"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full rounded-3xl pl-12 pr-12 py-2 border border-gray-300 outline-none"
                    />
                    {searchValue && (
                        <IoMdClose
                            onClick={() => setSearchValue("")}
                            className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        />
                    )}
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-10 items-center">
                    <button type="button" onClick={() => navigate("/")}>
                        <AiOutlineHome className="h-6 w-6 cursor-pointer" name="Home"/>
                    </button>

                    {isAuthenticated && (
                        <>
                            <button type="button" onClick={() => navigate("/cart")}>
                                <AiOutlineShoppingCart className="h-6 w-6 cursor-pointer" />
                            </button>

                            <button type="button" onClick={() => navigate("/orders")}>
                                <BsBoxSeam className="h-5 w-5 cursor-pointer" />
                            </button>
                        </>
                    )}

                    <AuthButton />
                    <AdminButton />

                </div>

                {/* Mobile Menu Toggle */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden"
                >
                    {isMenuOpen ? (
                        <IoMdClose className="h-6 w-6" />
                    ) : (
                        <IoIosMenu className="h-6 w-6" />
                    )}
                </button>
            </div>
        </nav>

        {/* ================= MOBILE MENU ================= */}
        {isMenuOpen && (
            <div className="md:hidden bg-white w-full px-6 py-4 space-y-3 border-t">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center w-full text-gray-700"
                >
                    <AiOutlineHome className="h-6 w-6" />
                </button>

                {isAuthenticated && (
                    <>
                        <button
                            type="button"
                            onClick={() => navigate("/cart")}
                            className="flex items-center w-full text-gray-700"
                        >
                            <AiOutlineShoppingCart className="h-6 w-6" />
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/orders")}
                            className="flex items-center w-full text-gray-700"
                        >
                            <BsBoxSeam className="h-5 w-5" />
                        </button>
                    </>
                )}

                <AuthButton />
                <AdminButton />
            </div>
        )}
    </>
);
};

export default Navbar;
