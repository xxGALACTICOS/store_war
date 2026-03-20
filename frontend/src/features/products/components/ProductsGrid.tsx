import ProductCard from "./ProductCard"
import { useProducts } from "../hooks/useProducts"

interface Product {
    name: string
    rate: number
    price: number
    vendor: string
    voters: number
    coverPoster: string
}



////////////////////////////////////////////////////////////////////////////
const mockProducts: Product[] = [
    { name: "Keyboard", rate: 4.5, price: 1200, vendor: "Samsung", voters: 100, coverPoster: '11' },
    { name: "Mouse", rate: 4.2, price: 600, vendor: "Logitech", voters: 100, coverPoster: '11' },
    { name: "Laptop", rate: 4.8, price: 32000, vendor: "Dell", voters: 100, coverPoster: '11' },
    { name: "Headphones", rate: 4.4, price: 2000, vendor: "Sony", voters: 100, coverPoster: '11' },
    { name: "Monitor", rate: 4.6, price: 8500, vendor: "LG", voters: 100, coverPoster: '11' },
]
////////////////////////////////////////////////////////////////////////////


interface Props {
    onSelectProduct: (name: string, vendor: string) => void
}

const ProductsGrid = ({ onSelectProduct }: Props) => {
    const data = useProducts<Product>('Electronics', 'Mobile Phones')
    if (!data) return <div>Loading...</div>; // wait for API

    console.log(data.message)


    return (
        <div className="bg-beige grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 p-3 h-screen">
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
