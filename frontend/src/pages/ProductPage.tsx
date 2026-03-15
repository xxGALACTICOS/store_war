import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import ProdImage from '../../assets/Product.jpg'
import Button from '../components/ui/Button'
import { CreditCardIcon, HeartIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/16/solid'

interface Props {
    product: string | null
    vendor: string | null
    goBack: () => void
}

const ProductPage = ({ product, vendor, goBack }: Props) => {

    return (
        <div className='bg-beige'>
            <ArrowLongLeftIcon className='size-15 ml-3 mt-1 hover:bg-gray-300 rounded-full text-gray-500' onClick={goBack} />
            <div className="flex">

                <div className='ml-20 flex'>
                    <div>
                        <img src={ProdImage} alt={`${product}`} className='w-150 flex-1' />
                    </div>
                    <div className="ml-30 w-xl">
                        <div className="flex items-center flex-col mb-7">
                            <h1 className="text-[60px] font-bold tracking-tight leading-15 pb-2">{product}</h1>
                            <p className="text-lg">Vendor: {vendor}</p>
                        </div>
                        <div className="mr-1">
                            <div>
                                <span className='font-bold'>
                                    Description:
                                </span>
                                <span className='ml-2'>Apple AirPods are wireless earbuds made by Apple that connect to devices using Bluetooth. They're designed mainly for iPhone, iPad, and Mac users but can work with other Bluetooth devices too.</span>
                            </div>
                            <div className="flex items-baseline justify-around">
                                <div>
                                    <span className='font-bold'>
                                        Price:
                                    </span>
                                    <span className='ml-2 text-[10px]'>EGP</span>
                                    <span className='font-semibold text-2xl'>450</span>
                                </div>
                                <div>
                                    <span className='font-bold'>Items in stock: </span>
                                    <span className='text-lg font-semibold'>20</span>
                                    <span className='pl-1'>pieces</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center w-full flex-col items-center gap-3">
                            <Button color='bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br' className='flex justify-center mt-5 w-100'>
                                <HeartIcon className='size-6' />
                                Add to favourites
                            </Button>
                            <Button className='w-100 flex justify-center'>
                                <ShoppingCartIcon className='size-6' />
                                Add to cart
                            </Button>
                            <Button className='w-100 flex justify-center' color='bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br'>
                                <CreditCardIcon className='size-6' />
                                Buy now
                            </Button>
                        </div>
                        <div className="flex items-center mt-5">
                            <StarIcon className='size-10 text-yellow-500' />
                            <span className='font-bold text-2xl'>4.5</span>
                            <span className='pl-2 pt-1'>out of <span className='font-bold'>100</span> voters</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 border-t text-gray-400" />
            <div className="flex justify-center">
                <h1 className='text-4xl font-bold mt-3'>Reviews section</h1>
            </div>
        </div>
    )
}

export default ProductPage