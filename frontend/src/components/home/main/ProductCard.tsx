import { StarIcon } from '@heroicons/react/16/solid'
import ProdImage from '../../../../assets/Product.jpg'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

interface Props {
    name: string,
    rate: number,
    price: number
}
////////////////////////////////////////////
const ProdVoters = 100
////////////////////////////////////////////
const ProductCard = ({ name, rate, price }: Props) => {
    return <>
        <div className='m-2 h-70 rounded-lg shadow-md cursor-pointer'>
            <div className="w-full flex justify-center items-center">
                <img src={ProdImage} alt={name} className='h-40 object-cover rounded-t-lg' />
            </div>
            <div className="ml-5">
                <p className='mt-3 text-xl font-bold truncate w-full'>{name}</p>
                <div className="flex">
                    <StarIcon className='size-5 mr-1' />
                    <p className='font-bold pr-1'>{rate}</p>
                    <p className='text-[10px] mt-2 text-gray-500'>({ProdVoters})</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex mt-3">
                        <p className='text-gray-500 mt-1'>EGP</p>
                        <p className='text-[20px] font-bold'>{price}</p>
                    </div>
                    <button className='group flex items-center gap-1.5 bg-gradient-to-r from-[#014e7c] to-[#011c40] hover:from-[#015f96] hover:to-[#012850] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition-all duration-200 active:scale-95 mr-1'>
                        <ShoppingCartIcon className='size-3.5' />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default ProductCard
