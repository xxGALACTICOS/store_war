import { useEffect, useState } from "react"
import { getProducts } from '../../../services/index'
import ProductCard from "./ProductCard"

interface Product {
    name: string,
    rate: number,
    price: number
    vendor: string

}



////////////////////////////////////////////////////////////////////////////
const mockProducts: Product[] = [
    { name: "Keyboard", rate: 4.5, price: 1200, vendor: "Samsung" },
    { name: "Mouse", rate: 4.2, price: 600, vendor: "Logitech" },
    { name: "Laptop", rate: 4.8, price: 32000, vendor: "Dell" },
    { name: "Headphones", rate: 4.4, price: 2000, vendor: "Sony" },
    { name: "Monitor", rate: 4.6, price: 8500, vendor: "LG" },
]
////////////////////////////////////////////////////////////////////////////


interface Props {
    onSelectProduct: (name: string, vendor: string) => void
}

const ProductsGrid = ({ onSelectProduct }: Props) => {
    const [data, setData] = useState<Product[]>([])
    useEffect(() => {
        getProducts().then(data => setData(data))
    })



    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 p-3">
            {mockProducts.map((product) =>
                <ProductCard
                    key={product.name}
                    name={product.name}
                    rate={product.rate}
                    price={product.price}
                    vendor={product.vendor}
                    onClick={onSelectProduct}
                />
            )}
        </div>
    )
}

export default ProductsGrid
