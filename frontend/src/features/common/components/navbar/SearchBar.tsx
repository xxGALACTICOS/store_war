import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { useSearchParams } from 'react-router'

const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div className="relative w-100 h-12 ml-10">
            <MagnifyingGlassIcon className="absolute w-6 left-2 top-4 text-gray-300" />
            <input
                type="text"
                placeholder="Search a product or company..."
                defaultValue={searchParams.get('q') ?? ''}
                onChange={(e) => {
                    const val = e.target.value.trim()
                    setSearchParams((prev) => {
                        const next = new URLSearchParams(prev)
                        if (val) next.set('q', val)
                        else next.delete('q')
                        return next
                    })
                }}
                className="bg-gray-100 h-full w-full text-[15px] rounded-full pl-10 pr-3 focus:outline-none mt-1 font-semibold"
            />
        </div>
    )
}

export default SearchBar