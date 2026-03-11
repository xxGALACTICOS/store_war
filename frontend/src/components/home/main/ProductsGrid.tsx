import { useEffect, useState } from "react"
import { getProducts } from '../../../services/index'
import ProductCard from "./ProductCard"

interface Product {
    name: string,
    rate: number,
    price: number
}

const Home = () => {
    const [data, setData] = useState<Product[]>([])
    useEffect(() => {
        getProducts().then(data => setData(data))
    })
    return (
        <div className="w-[85%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 p-3">
            {data.map((product) => {
                const name = product.name
                const rate = product.rate
                const price = product.price
                return <ProductCard key={name} name={name} rate={rate} price={price} />
            })}
        </div>
    )
}

export default Home
