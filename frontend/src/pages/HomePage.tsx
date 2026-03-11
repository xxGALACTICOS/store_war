import NavBar from '../components/navbar/NavBar'
import SideBar from '../components/SideBar'
const HomePage = () => {
    return (
        <div className='h-screen'>
            <NavBar />

            {/* main container */}
            <div className="flex h-full">
                {/* side bar */}
                <SideBar />

                {/* cards container */}
                <div className="w-[85%] bg-blue-500">
                </div>
            </div>
        </div>
    )
}

export default HomePage
