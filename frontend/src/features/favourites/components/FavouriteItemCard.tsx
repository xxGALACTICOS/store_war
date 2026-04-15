import ButtonGradient from '@/ui/ButtonGradient'
import { Card, CardContent } from '@/ui/card'
import TrashButton from '@/ui/TrashButton'
import { ShoppingCart } from 'lucide-react'

interface Props {
    id: number
    name: string
    image: string
    brand: string
    price: number
    category: string
    removeItem: (id: number) => void
}


const FavouriteItemCard = (item: Props) => {
    return (
        <Card
            key={item.id}
            className="border border-zinc-200 hover:border-zinc-300 transition-colors"
        >
            <CardContent className="p-4">
                {/* Image */}
                <div className="w-full h-40 bg-zinc-100 mb-3">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info */}
                <p className="text-xs text-zinc-400 uppercase mb-1">
                    {item.brand}
                </p>
                <h3 className="text-sm font-semibold text-zinc-900">
                    {item.name}
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                    {item.category}
                </p>

                {/* Price */}
                <p className="font-bold text-zinc-900 mt-2">
                    ${item.price.toFixed(2)}
                </p>

                {/* Actions */}
                <div className="flex justify-between items-center mt-3">
                    <ButtonGradient className="gap-1 bg-main" color="hover:bg-second">
                        <ShoppingCart className="w-4 h-4" />
                        Add to cart
                    </ButtonGradient>

                    <TrashButton onRemove={item.removeItem} id={item.id} />
                </div>
            </CardContent>
        </Card>
    )
}

export default FavouriteItemCard
