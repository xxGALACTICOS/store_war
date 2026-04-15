import NavBar from '@/features/common/components/navbar/NavBar'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import type { FavouriteItem } from '../utils/types.ts'
import FavouriteItemCard from '../components/FavouriteItemCard.tsx'
import HeaderPage from '@/features/common/pages/HeaderPage.tsx'
import EmptyCard from '@/features/common/components/EmptyCard.tsx'

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
                <HeaderPage length={favourites.length} message='Your Favourites'>
                    <Heart className="w-6 h-6 text-zinc-500" />
                </HeaderPage>

                {favourites.length === 0 ? (
                    <EmptyCard message='No favourites yet'>
                        <Heart className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
                    </EmptyCard>
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