import { useState } from 'react'
import NavBar from '../../common/components/navbar/NavBar'
import SideBar from '../../common/components/sidebar/SideBar'
import ProductPage from '../../products/pages/ProductPage'
import ProductsGrid from '../../products/components/ProductsGrid'
import { useSearchParams } from 'react-router'
const HomePage = () => {
    const [sideToggle, setSideToggle] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams()

    const product = searchParams.get("product")
    const vendor = searchParams.get("vendor")

    const openProduct = (name: string, vendor: string) => {
        setSearchParams({
            product: name,
            vendor: vendor,
        })
    }
    const closeProduct = () => {
        setSearchParams({})
    }

    return (
        <div>
            <NavBar toggleSidebar={() => {
                setSideToggle(!sideToggle)
            }
            } />

            {/* main container */}
            <div className="flex h-full">
                {/* side bar */}
                <div className={`transition-all duration-200 overflow-hidden ${sideToggle ? "w-[15%]" : "w-[0%]"
                    }`}
                >
                    <SideBar />
                </div>

                {/* cards container */}
                <div className="flex-1 transition-all duration-300">
                    {!product && (
                        <ProductsGrid onSelectProduct={openProduct} />
                    )}
                    {product && (
                        <ProductPage
                            product={product}
                            vendor={vendor}
                            goBack={closeProduct}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default HomePage
