import NavBar from '@/features/common/components/navbar/NavBar'
import { Card, CardContent } from '@/ui/card'
import { Badge } from '@/ui/badge'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import type { FavouriteItem } from '../utils/types.ts'
import FavouriteItemCard from '../components/FavouriteItemCard.tsx'

const initialFavourites: FavouriteItem[] = [
    {
        id: 1,
        name: 'Wireless Noise-Cancelling Headphones',
        brand: 'SoundCore',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
        category: 'Electronics',
        stock: 5,
    },

    {
        id: 2,
        name: 'Slim Fit Merino Wool Sweater',
        brand: 'Arket',
        price: 89.0,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop',
        category: 'Clothing',
        stock: 3,
    },
]

const FavouritePage = () => {
    const [favourites, setFavourites] = useState<FavouriteItem[]>(initialFavourites)

    const removeItem = (id: number) => {
        setFavourites(prev => prev.filter(item => item.id !== id))
    }

    return (
        <div className="min-h-screen bg-beige">
            <NavBar />

            <div className="max-w-5xl mx-auto pt-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Heart className="w-6 h-6 text-zinc-500" />
                    <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
                        Your Favourites
                    </h1>
                    <Badge variant="secondary" className="ml-1">
                        {favourites.length} items
                    </Badge>
                </div>

                {favourites.length === 0 ? (
                    <Card className="text-center py-20">
                        <CardContent>
                            <Heart className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
                            <p className="text-zinc-500 text-lg">No favourites yet</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {favourites.map(item => (
                            <FavouriteItemCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                brand={item.brand}
                                price={item.price}
                                category={item.category}
                                removeItem={removeItem}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FavouritePage