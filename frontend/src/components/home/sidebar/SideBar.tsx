//////////////////////////////////////////////////
const data = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Sports & Outdoors",
    "Books",
    "Beauty & Personal Care",
    "Toys & Games",
    "Automotive",
    "Health & Wellness",
    "Food & Groceries",
]
////////////////////////////////////////////////////
const SideBar = () => {
    return (
        <div className="w-[15%] bg-gradient-to-b from-[#011c40] to-[#014e7c] p-3 text-white hidden md:block">
            <p className="font-bold text-lg mb-3">Category</p>
            {data.map((category) => {
                return <p className="text-sm text-gray-400 hover:underline cursor-pointer pb-1"> {category} </p>
            })}
        </div>
    )
}

export default SideBar
