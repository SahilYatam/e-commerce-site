import footerImg from '../../assets/hero_section_img/hero4.jpg';

const Footer = () => {
    return (
        <footer >
            <div
                className="relative h-42 bg-cover bg-black/15 bg-top"
                style={{
                    backgroundImage: `url(${footerImg})`
                }}
            >
                <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                    <h2 className="relative text-3xl text-center md:text-5xl font-extrabold text-white">"Let's Shop Beyond Boundries"</h2>
                </div>
            </div>
            <div className="w-full h-65 bg-[#1D242D] grid grid-cols-1 md:grid-cols-4 gap-8 p-5 justify-center items-center">
                <div>
                    <h2 className="text-[#8b5cf6] font-bold text-2xl md:text-3xl">QuickMart</h2>
                    <p className="mt-2 text-1xl text-white">"Let's Shop Beyond Boundaries"</p>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-white font-semibold text-2xl md:text-3xl">Navigation</h2>
                    <a href="/" className="mt-2 text-1xl text-white">Home</a>
                    <a href="/" className="mt-2 text-1xl text-white">About Us</a>
                    <a href="/" className="mt-2 text-1xl text-white">Contact / Support</a>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-white font-semibold text-2xl md:text-3xl">Customer Service</h2>
                    <p className="mt-2 text-1xl text-white">Shipping & Returns</p>
                    <p className="mt-2 text-1xl text-white">Order Tracking</p>
                    <p className="mt-2 text-1xl text-white">Payment Options</p>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-white font-semibold text-2xl md:text-3xl">Legal / Compliance</h2>
                    <p className="mt-2 text-1xl text-white">Privacy Policy</p>
                    <p className="mt-2 text-1xl text-white">Terms & Conditions</p>
                    <p className="mt-2 text-1xl text-white">Refund Policy</p>
                </div>
                <span className="col-span-1 sm:my-5 md:col-span-4 flex justify-center items-center">
                    <p className="text-center text-white">&copy; 2025 - 2026, QuickMart.com</p>
                </span>
            </div>
        </footer>
    )
}

export default Footer