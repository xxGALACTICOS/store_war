import ProductCard from "./ProductCard"
import { useProducts } from "../hooks/useProducts"
import { useSearchParams } from "react-router"
import NotFoundPage from "@/features/common/pages/NotFoundPage"

interface Product {
    name: string
    rate: number
    price: number
    vendor: string
    voters: number
    coverPoster: string
    mainCategory: string
    subCategory: string
}



////////////////////////////////////////////////////////////////////////////
const mockProducts: Product[] = [
    // Electronics
    { name: "iPhone 14", rate: 4.7, price: 45000, vendor: "Apple", voters: 120, coverPoster: '11', mainCategory: "Electronics", subCategory: "Mobile Phones" },
    { name: "Dell XPS 13", rate: 4.8, price: 35000, vendor: "Dell", voters: 95, coverPoster: '11', mainCategory: "Electronics", subCategory: "Laptops" },
    { name: "iPad Air", rate: 4.6, price: 28000, vendor: "Apple", voters: 80, coverPoster: '11', mainCategory: "Electronics", subCategory: "Tablets" },
    { name: "Canon EOS 90D", rate: 4.5, price: 30000, vendor: "Canon", voters: 60, coverPoster: '11', mainCategory: "Electronics", subCategory: "Cameras" },
    { name: "Sony WH-1000XM5", rate: 4.9, price: 9000, vendor: "Sony", voters: 200, coverPoster: '11', mainCategory: "Electronics", subCategory: "Headphones" },

    // Clothing
    { name: "Men T-Shirt", rate: 4.2, price: 300, vendor: "Zara", voters: 50, coverPoster: '11', mainCategory: "Clothing", subCategory: "Men" },
    { name: "Women Dress", rate: 4.4, price: 800, vendor: "H&M", voters: 70, coverPoster: '11', mainCategory: "Clothing", subCategory: "Women" },
    { name: "Kids Jacket", rate: 4.3, price: 500, vendor: "LC Waikiki", voters: 40, coverPoster: '11', mainCategory: "Clothing", subCategory: "Kids" },
    { name: "Running Shoes", rate: 4.6, price: 1200, vendor: "Nike", voters: 110, coverPoster: '11', mainCategory: "Clothing", subCategory: "Shoes" },
    { name: "Leather Belt", rate: 4.1, price: 250, vendor: "Generic", voters: 30, coverPoster: '11', mainCategory: "Clothing", subCategory: "Accessories" },

    // Home & Kitchen
    { name: "Sofa", rate: 4.5, price: 15000, vendor: "IKEA", voters: 25, coverPoster: '11', mainCategory: "Home & Kitchen", subCategory: "Furniture" },
    { name: "Cookware Set", rate: 4.4, price: 2000, vendor: "Tefal", voters: 60, coverPoster: '11', mainCategory: "Home & Kitchen", subCategory: "Cookware" },
    { name: "Bed Sheets", rate: 4.3, price: 700, vendor: "Generic", voters: 45, coverPoster: '11', mainCategory: "Home & Kitchen", subCategory: "Bedding" },
    { name: "Desk Lamp", rate: 4.2, price: 400, vendor: "Philips", voters: 35, coverPoster: '11', mainCategory: "Home & Kitchen", subCategory: "Lighting" },
    { name: "Storage Box", rate: 4.1, price: 200, vendor: "Generic", voters: 20, coverPoster: '11', mainCategory: "Home & Kitchen", subCategory: "Storage" },

    // Sports & Outdoors
    { name: "Dumbbells", rate: 4.7, price: 1500, vendor: "Generic", voters: 90, coverPoster: '11', mainCategory: "Sports & Outdoors", subCategory: "Fitness" },
    { name: "Camping Tent", rate: 4.5, price: 3000, vendor: "Decathlon", voters: 55, coverPoster: '11', mainCategory: "Sports & Outdoors", subCategory: "Camping" },
    { name: "Mountain Bike", rate: 4.6, price: 8000, vendor: "Giant", voters: 40, coverPoster: '11', mainCategory: "Sports & Outdoors", subCategory: "Cycling" },
    { name: "Swimming Goggles", rate: 4.3, price: 250, vendor: "Speedo", voters: 25, coverPoster: '11', mainCategory: "Sports & Outdoors", subCategory: "Swimming" },
    { name: "Football", rate: 4.4, price: 300, vendor: "Adidas", voters: 70, coverPoster: '11', mainCategory: "Sports & Outdoors", subCategory: "Team Sports" },

    // Books
    { name: "Novel Book", rate: 4.5, price: 150, vendor: "Generic", voters: 80, coverPoster: '11', mainCategory: "Books", subCategory: "Fiction" },
    { name: "Science Book", rate: 4.6, price: 200, vendor: "Generic", voters: 60, coverPoster: '11', mainCategory: "Books", subCategory: "Science" },

    // Beauty
    { name: "Face Cream", rate: 4.3, price: 350, vendor: "Nivea", voters: 75, coverPoster: '11', mainCategory: "Beauty & Personal Care", subCategory: "Skincare" },
    { name: "Perfume", rate: 4.7, price: 1200, vendor: "Dior", voters: 90, coverPoster: '11', mainCategory: "Beauty & Personal Care", subCategory: "Fragrances" },

    // Toys
    { name: "Puzzle Game", rate: 4.2, price: 180, vendor: "Generic", voters: 30, coverPoster: '11', mainCategory: "Toys & Games", subCategory: "Puzzles" },
    { name: "Action Figure", rate: 4.5, price: 400, vendor: "Marvel", voters: 65, coverPoster: '11', mainCategory: "Toys & Games", subCategory: "Action Figures" },

    // Automotive
    { name: "Car Oil", rate: 4.6, price: 500, vendor: "Shell", voters: 50, coverPoster: '11', mainCategory: "Automotive", subCategory: "Oils & Fluids" },
    { name: "Car Charger", rate: 4.3, price: 150, vendor: "Anker", voters: 40, coverPoster: '11', mainCategory: "Automotive", subCategory: "Electronics" },

    // Health
    { name: "Vitamins", rate: 4.5, price: 300, vendor: "Centrum", voters: 70, coverPoster: '11', mainCategory: "Health & Wellness", subCategory: "Vitamins" },
    { name: "Blood Pressure Monitor", rate: 4.6, price: 900, vendor: "Omron", voters: 55, coverPoster: '11', mainCategory: "Health & Wellness", subCategory: "Medical Devices" },

    // Food
    { name: "Chocolate", rate: 4.7, price: 50, vendor: "Cadbury", voters: 120, coverPoster: '11', mainCategory: "Food & Groceries", subCategory: "Snacks" },
    { name: "Milk", rate: 4.4, price: 30, vendor: "Juhayna", voters: 90, coverPoster: '11', mainCategory: "Food & Groceries", subCategory: "Dairy" },
]
////////////////////////////////////////////////////////////////////////////


interface Props {
    onSelectProduct: (name: string, vendor: string) => void
}

const ProductsGrid = ({ onSelectProduct }: Props) => {
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const query = searchParams.get('q')?.toLowerCase().trim()

    const validSlugs = new Set(
        mockProducts.map((p) =>
            p.mainCategory.toLowerCase().replace(/\s+/g, '-') + '/' +
            p.subCategory.toLowerCase().replace(/\s+/g, '-')
        )
    )

    if (category && !validSlugs.has(category)) {
        return (<NotFoundPage />)

    }

    const filtered = mockProducts.filter((p) => {
        const slug =
            p.mainCategory.toLowerCase().replace(/\s+/g, '-') + '/' +
            p.subCategory.toLowerCase().replace(/\s+/g, '-')

        const matchesCategory = category ? slug === category : true
        const matchesQuery = query
            ? p.name.toLowerCase().includes(query) || p.vendor.toLowerCase().includes(query)
            : true

        return matchesCategory && matchesQuery
    })

    if (filtered.length === 0) {
        return (<NotFoundPage />)
    }

    return (
        <div className="min-h-screen bg-beige grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 p-3 h-full">
            {filtered.map((product) =>
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
