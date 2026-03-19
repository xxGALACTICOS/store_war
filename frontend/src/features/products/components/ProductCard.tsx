import { StarIcon } from '@heroicons/react/16/solid'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
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
    return (
        <Card
            onClick={() => onClick(name, vendor)}
            className="m-2 h-80 cursor-pointer shadow-md"
        >
            <div className="flex items-center justify-center w-full">
                <img
                    src={ProdImage}
                    alt={name}
                    className="h-40 object-contain rounded-t-lg"
                />
            </div>

            <CardContent className="px-5 pb-4">
                <p className="mt-3 text-xl font-bold truncate w-full">{name}</p>

                <div className="flex items-center">
                    <StarIcon className="size-5 mr-1" />
                    <p className="font-bold pr-1 text-lg">{rate}</p>
                    <p className="text-[10px] mt-1 text-gray-500">
                        ({ProdVoters})
                    </p>
                </div>

                <div className="flex justify-between items-end mt-3">
                    <div className="flex">
                        <p className="text-gray-500 mt-1 mr-1">EGP</p>
                        <p className="text-[20px] font-bold">{price}</p>
                    </div>

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
            </CardContent>
        </Card>
    )
}

export default ProductCard