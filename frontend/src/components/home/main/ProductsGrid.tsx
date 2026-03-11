import ProductCard from "./ProductCard"

const data = [1, 2, 3, 4, 5, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
const Home = () => {
    return (
        <div className="w-[85%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {data.map(() => {
                return <ProductCard />
            })}
        </div>
    )
}

export default Home
