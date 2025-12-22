import Navbar from "./Navbar.jsx";
import Footer from "../common/Footer.jsx";
import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
    return (
        <div className="min-h-screen max-w-full bg-zinc-300 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    draggable
                />

            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;
