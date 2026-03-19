import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
const SearchBar = () => {
    return (
        <div className="relative w-100 h-12 ml-10">
            <MagnifyingGlassIcon className="absolute w-6 left-2 top-4 text-gray-300" />
            <input type="text" placeholder="Search a product or company..." className="bg-gray-100 h-full w-full text-[15px] h-8 rounded-full pl-10 pr-3 pt-0.7 focus:outline-none mt-1 font-semibold" />
        </div>
    )
}

export default SearchBar