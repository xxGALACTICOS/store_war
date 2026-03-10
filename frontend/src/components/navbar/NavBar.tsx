import Logo from '../../../assets/Logo.svg'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
const NavBar = () => {
    return (
        <nav className='p-2 flex bg-gradient-to-r from-[#011c40] to-[#014e7c] w-full'>
            <Link to='/'>
                <img src={Logo} className='w-30 cursor-pointer' alt='Store War' />
            </Link>
            <SearchBar />
        </nav>
    )
}

export default NavBar
