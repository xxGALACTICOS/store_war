import { StarIcon as StarIconSolid } from '@heroicons/react/16/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import ProdImage from '../../../../assets/Product.jpg'
import { toast } from "react-toastify"
import ButtonGradient from '@/ui/ButtonGradient'

import { Card, CardContent } from "@/ui/card"
import { useState } from 'react'

interface Props {
    name: string
    rate: number
    price: number
    vendor: string
    onClick: (name: string, vendor: string) => void
}




////////////////////////////////////////////
const ProdVoters = 100
const isLoggedIn = true
////////////////////////////////////////////

const ProductCard = ({ name, rate, price, vendor, onClick }: Props) => {
    const [added, setAdded] = useState(false)
    const [favourite, setFavourite] = useState(false)
    const renderStars = () => {
        const stars = []
        const fullStars = Math.floor(rate)
        const hasHalfStar = rate % 1 >= 0.5

        for (let i = 0; i < 5; i++) {
            const delay = i * 0.05
            if (i < fullStars) {
                stars.push(
                    <StarIconSolid
                        key={i}
                        className="w-3.5 h-3.5 text-amber-400 drop-shadow-sm"
                        style={{ animationDelay: `${delay}s`, animation: 'star-pop 0.4s ease-out forwards' }}
                    />
                )
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative w-3.5 h-3.5" style={{ animationDelay: `${delay}s`, animation: 'star-pop 0.4s ease-out forwards' }}>
                        <StarIconOutline className="absolute w-3.5 h-3.5 text-gray-300" />
                        <div className="absolute overflow-hidden w-1/2">
                            <StarIconSolid className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                    </div>
                )
            } else {
                stars.push(
                    <StarIconOutline
                        key={i}
                        className="w-3.5 h-3.5 text-gray-300"
                        style={{ animationDelay: `${delay}s`, animation: 'star-pop 0.4s ease-out forwards' }}
                    />
                )
            }
        }
        return stars
    }
    return (
        <Card
            onClick={() => onClick(name, vendor)}
            className="m-2 h-85 cursor-pointer shadow-md relative"
        >
            <div className="flex items-center justify-center w-full">
                <img
                    src={ProdImage}
                    alt={name}
                    className="h-40 object-contain rounded-t-lg"
                />
            </div>

            <CardContent className="px-5 pb-4">
                <h3 className="mt-3 text-base font-bold leading-tight line-clamp-2 min-h-[2.5rem]">{name}</h3>

                <div className="flex items-center">
                    {renderStars()}
                    <p className="font-bold pr-1 text-lg">{rate}</p>
                    <p className="text-[10px] mt-1 text-gray-500">
                        ({ProdVoters})
                    </p>
                </div>

                <div className="flex justify-between items-end mt-3">
                    <span className="text-xl font-bold text-gray-900">
                        EGP {price}
                    </span>

                    <ButtonGradient
                        onClick={(e) => {
                            e.stopPropagation()


                            if (!isLoggedIn) {
                                toast.error("You must be logged in!")
                                return
                            }
                            else {
                                if (!added) {
                                    console.log({ name })
                                    toast.success("Added Succesfully!")
                                    setAdded(true)
                                    return
                                }
                            }

                        }}
                        color="bg-main hover:bg-second"
                        className='h-10'
                        disabled={added}

                    >
                        <ShoppingCartIcon className="size-3.5" />
                        {added ? <p>Added to Cart</p>
                            : <p>Add to Cart</p>}
                    </ButtonGradient>
                </div>
                <button
                    className='bg-gray-100 rounded-full w-8 h-8 absolute top-8 right-2 flex justify-center items-center'
                    onClick={(e) => {
                        e.stopPropagation()

                        if (!isLoggedIn) {
                            toast.error("You must be logged in!")
                            return
                        }

                        const newState = !favourite
                        setFavourite(newState)

                        if (newState) {
                            toast.success("Added to favourites")
                        } else {
                            toast.info("Removed from favourites")
                        }
                    }}                >
                    {favourite ? (
                        <HeartSolid className='size-6 text-red-500' />
                    ) : (
                        <HeartOutline className='size-6 text-gray-400' />
                    )}
                </button>
            </CardContent>

        </Card>
    )
}

export default ProductCard
