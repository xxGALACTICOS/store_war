import Logo from "../../../../assets/Logo.svg"
import { Link } from 'react-router-dom'

export const TopBar = () => {
    return (
        <nav className=" h-17 flex border-b border-gray-600 items-center">
            <div className="w-fit ml-70 ">
                <Link to="/home">
                    <img src={Logo} className="w-27 cursor-pointer " alt="Store War" />
                </Link>
            </div>
            <div className="w-fit ml-auto mr-50 flex">
                <p className='mr-5 mt-1 text-white'>Already have an account?</p>
                <Link to="/login">
                    <button className='rounded-md bg-gray-700 w-30 h-10 cursor-pointer text-white'>Log in</button>
                </Link>
            </div>
        </nav>
    )
}
