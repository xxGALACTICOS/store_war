export interface CartItem {
    id: number
    name: string
    brand: string
    price: number
    originalPrice?: number
    quantity: number
    image: string
    category: string
    stock: number
}