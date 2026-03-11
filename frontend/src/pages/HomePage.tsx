import Home from '../components/home/main/ProductsGrid'
import NavBar from '../components/home/navbar/NavBar'
import SideBar from '../components/home/sidebar/SideBar'
const HomePage = () => {
    return (
        <div>
            <NavBar />

            {/* main container */}
            <div className="flex h-full">
                {/* side bar */}
                <SideBar />

                {/* cards container */}
                <Home />
            </div>
        </div>
    )
}

export default HomePage
