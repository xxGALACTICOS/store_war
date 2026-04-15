import NavBar from '@/features/common/components/navbar/NavBar'
import { Card, CardContent } from '@/ui/card'
import { Badge } from '@/ui/badge'
import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import type { CartItem } from '@/features/cart/utils/types'
import CartItemCard from '../components/CartItemCard'
import OrderSummary from '../components/OrderSummary'


//////////////////////////////////////////////////////
const initialCart: CartItem[] = [
    {
        id: 1,
        name: 'Wireless Noise-Cancelling Headphones',
        brand: 'SoundCore',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
        category: 'Electronics',
        stock: 5,
    },
    {
        id: 2,
        name: 'Slim Fit Merino Wool Sweater',
        brand: 'Arket',
        price: 89.0,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop',
        category: 'Electronics',
        stock: 3,
    },
    {
        id: 3,
        name: 'Leather Minimalist Wallet',
        brand: 'Bellroy',
        price: 75.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop',
        category: 'Electronics',
        stock: 12,
    },
]
//////////////////////////////////////////////////////////////////////////

const CartPage = () => {
    const [cart, setCart] = useState<CartItem[]>(initialCart)

    const updateQty = (id: number, delta: number) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, Math.min(item.stock, item.quantity + delta)) }
                    : item
            )
        )
    }

    const removeItem = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const savings = 0
    const shipping = 9.99
    const total = subtotal + shipping

    return (
        <div className="min-h-screen bg-zinc-50">
            <NavBar />
            <div className="max-w-5xl mx-auto pt-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingBag className="w-6 h-6 text-zinc-500" />
                    <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
                        Your Cart
                    </h1>
                    <Badge variant="secondary" className="ml-1">
                        {cart.length} items
                    </Badge>
                </div>

                {cart.length === 0 ? (
                    <Card className="text-center py-20">
                        <CardContent>
                            <ShoppingBag className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
                            <p className="text-zinc-500 text-lg">Your cart is empty</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex flex-row gap-6">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-3">
                            {cart.map(item => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onUpdateQty={updateQty}
                                    onRemove={removeItem}
                                />
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="w-72 flex-shrink-0">
                            <OrderSummary subtotal={subtotal} savings={savings} shipping={shipping} total={total} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage