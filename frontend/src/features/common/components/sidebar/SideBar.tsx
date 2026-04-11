import { ChevronRightIcon } from "@heroicons/react/16/solid"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router"

//////////////////////////////////////////////////
const data = [
    { name: "Electronics", children: ["Mobile Phones", "Laptops", "Tablets", "Cameras", "Headphones"] },
    { name: "Clothing", children: ["Men", "Women", "Kids", "Shoes", "Accessories"] },
    { name: "Home & Kitchen", children: ["Furniture", "Cookware", "Bedding", "Lighting", "Storage"] },
    { name: "Sports & Outdoors", children: ["Fitness", "Camping", "Cycling", "Swimming", "Team Sports"] },
    { name: "Books", children: ["Fiction", "Non-Fiction", "Science", "History", "Comics"] },
    { name: "Beauty & Personal Care", children: ["Skincare", "Haircare", "Makeup", "Fragrances", "Tools"] },
    { name: "Toys & Games", children: ["Board Games", "Action Figures", "Puzzles", "Outdoor Toys", "Educational"] },
    { name: "Automotive", children: ["Car Parts", "Tools", "Accessories", "Oils & Fluids", "Electronics"] },
    { name: "Health & Wellness", children: ["Vitamins", "Medical Devices", "Personal Care", "Diet", "Mental Health"] },
    { name: "Food & Groceries", children: ["Snacks", "Beverages", "Dairy", "Bakery", "Organic"] },
]
////////////////////////////////////////////////////
const SideBar = () => {
    const [openCategory, setOpenCategory] = useState([''])
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const query = searchParams.get('category')

    const CategoryToggle = (name: string) => {
        setOpenCategory((arr) =>
            arr.includes(name) ? arr.filter((category) => category !== name) : [...arr, name]
        );
    }
    return (
        <div className="bg-main p-3 text-white hidden md:block h-full">
            <p className="font-bold text-lg mb-3">Category</p>
            <div
                className={`text-sm pb-2 mb-1 cursor-pointer select-none border-b border-white/20
                    ${!query ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => navigate('/home')}
            >
                All Categories
            </div>
            {data.map((category) => {
                const isOpened = openCategory.includes(category.name)
                return (
                    <div key={category.name} className="text-sm text-gray-400 pb-1 transition-all duration-200 whitespace-nowrap overflow-hidden">
                        <div className="flex select-none hover:text-gray-300" onClick={() => CategoryToggle(category.name)}>
                            <p>{category.name}</p>
                            <ChevronRightIcon className={`size-5 transition-transform duration-300 ${isOpened ? "rotate-90" : ""}`} />
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${isOpened ? "max-h-50" : "max-h-0"}`}>
                            {isOpened && category.children.map((name) => {
                                const endpoint = category.name.toLowerCase().replace(/\s+/g, '-') + '/' + name.toLowerCase().replace(/\s+/g, '-')
                                return (
                                    <p
                                        key={name}
                                        className={`ml-5 cursor-pointer hover:underline
                                            ${query === endpoint ? 'text-white font-semibold' : 'text-gray-300'}`}
                                        onClick={() => setSearchParams({ category: endpoint })}
                                    >
                                        {name}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SideBar
