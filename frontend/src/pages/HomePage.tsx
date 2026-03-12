import { useState } from 'react'
import Home from '../components/home/main/ProductsGrid'
import NavBar from '../components/home/navbar/NavBar'
import SideBar from '../components/home/sidebar/SideBar'
const HomePage = () => {
    const [sideToggle, setSideToggle] = useState(true)
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

                    <Home />
                </div>
            </div>
        </div>
    )
}

export default HomePage
