import { useState } from 'react'
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

const Navbar = () => {
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false); // Start with user not logged in
    const [searchValue, setSearchValue] = useState(""); // Track search input value

    const handleAuthClick = () => setIsLogin(isLogin); // Toggle login state

    const AuthButton = () => {
        return (<button onClick={handleAuthClick}
            className={` w-28 rounded-full text-white py-1 cursor-pointer ${isLogin ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
        >
            {isLogin ? "Logout" : "Login"}
        </button>)
    }


    return (
        <>
            <nav className="bg-white w-full min-h-16 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-24 py-3">
                    {/* Brand */}
                    <header className="text-2xl sm:text-3xl text-[#8b5cf6] font-bold">
                        QuickMart
                    </header>

                    {/* Search */}
                    <div className="w-60 md:w-80 relative">
                        <IoSearchOutline className="h-6 w-6 text-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2"/>
                        <input
                            type="text"
                            placeholder="Search Products"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full rounded-3xl pl-12 pr-12 py-2 border border-gray-300
                       outline-none focus:outline-[2px] focus:outline-black focus:outline-offset-0"
                        />
                        {searchValue && (
                            <IoMdClose
                                onClick={() => setSearchValue("")}
                                className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-gray-700"/>
                        )}
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-10 text-lg sm:text-xl font-medium items-center">
                        <a href="/" ><AiOutlineHome className="h-6 w-6 text-gray-700" />
                        </a>
                        <a href="/">
                            <AiOutlineShoppingCart className="h-6 w-6 text-gray-700" />
                        </a>
                        <a href="/">
                            <BsBoxSeam className="h-5 w-5 text-gray-700" />
                        </a>
                        <AuthButton/>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setisMenuOpen(!isMenuOpen)}
                        className="md:hidden cursor-pointer"
                    >
                        {isMenuOpen ? (
                            <IoMdClose className="h-6 w-6 text-gray-700" />
                        ) : (
                            <IoIosMenu className="h-6 w-6 text-gray-700" />
                        )}
                    </button>

                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden bg-white w-full min-h-26 px-6 border-t bg py-2 space-y-2">
                    <button className="flex items-center w-full text-left px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <AiOutlineHome className="h-6 w-6 text-gray-700" />
                    </button>

                    <button className="flex items-center w-full text-left px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors relative">
                        <AiOutlineShoppingCart className="h-6 w-6 text-gray-700" />
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            3
                        </span>
                    </button>

                    <button className="flex items-center w-full text-left px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <BsBoxSeam className="h-5 w-5 text-gray-700" />
                    </button>

                    <div className="flex justify-start">
                        <AuthButton />
                    </div>
                </div>
            )}

        </>
    );
};


export default Navbar