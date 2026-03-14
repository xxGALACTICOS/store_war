import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import ProdImage from '../../assets/Product.jpg'

interface Props {
    product: string | null
    vendor: string | null
    goBack: () => void
}

const ProductPage = ({ product, vendor, goBack }: Props) => {

    return (
        <div>
            <ArrowLongLeftIcon className='size-15 ml-3 mt-1 hover:bg-gray-300 rounded-full' onClick={goBack} />
            <div className='ml-20 flex'>
                <div className="">
                    <img src={ProdImage} alt={`${product}`} className='w-150 flex-1' />
                </div>
                <div className=""></div>
                <div className="ml-30 w-xl">
                    <div className="flex items-center flex-col mb-7">
                        <h1 className="text-[60px] font-bold ">{product}</h1>
                        <p className="text-lg">Vendor: {vendor}</p>
                    </div>
                    <div className="bg-blue-100">
                        <div className="">
                            <span className='font-bold'>
                                Description:
                            </span>
                            <span className='ml-2'>Apple AirPods are wireless earbuds made by Apple that connect to devices using Bluetooth. They're designed mainly for iPhone, iPad, and Mac users but can work with other Bluetooth devices too.</span>
                        </div>
                        <div className="">

                            <span className='font-bold'>
                                Price:
                            </span>
                            <span className='ml-2 text-[10px]'>EGP</span>
                            <span className='font-semibold text-2xl'>450</span>
                        </div>
                        <div className="">

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ProductPage