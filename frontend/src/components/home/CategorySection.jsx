import category1 from "../../assets/category_img/bag1.jpg"
import category2 from "../../assets/category_img/tshirt1.jpeg"
import category3 from "../../assets/category_img/jacket1.jpg"
import category4 from "../../assets/category_img/watch1.jpeg"
import category5 from "../../assets/category_img/cap1.jpg"
import category6 from "../../assets/category_img/shoes1.jpg"
import category7 from "../../assets/category_img/mobile1.jpg"
import category8 from "../../assets/category_img/jeans1.jpg"


const categories = [
    { id: 1, img: category1, name: "Bag" },
    { id: 2, img: category2, name: "T-shirt" },
    { id: 3, img: category3, name: "Jacket" },
    { id: 4, img: category4, name: "Watch" },
    { id: 5, img: category5, name: "Cap" },
    { id: 6, img: category6, name: "Shoes" },
    { id: 7, img: category7, name: "Mobile" },
    { id: 8, img: category8, name: "Jeans" },
];

const CategorySection = () => {
    return (
        <div className="w-full bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] py-6">
            <div className="flex justify-center items-center gap-8 md:gap-12 px-4">
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className="flex flex-col items-center cursor-pointer group transition-transform hover:scale-105"
                    >
                        <div className="relative mb-2">
                            <img
                                src={category.img}
                                alt={`category ${category.name}`}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-gray-100 group-hover:border-blue-300 transition-colors shadow-md"
                            />
                        </div>
                        <span className="text-xs md:text-sm text-gray-700 font-medium text-center whitespace-nowrap">
                            {category.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategorySection