import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"

interface Product {
    name: string,
    rate: number,
    price: number
}

const Home = () => {
    const [data, setData] = useState<Product[]>([])
    useEffect(() => {
        fetch('http://localhost:4000/products/hamdy')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err))
    })
    return (
        <div className="w-[85%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
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
