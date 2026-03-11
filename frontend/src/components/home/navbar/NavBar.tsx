import Logo from '../../../../assets/Logo.svg'
import DefPfp from '../../../../assets/Default_pfp.svg'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/16/solid'

/////////////////////////////////////////
const isAuthenticated = 0;
/////////////////////////////////////////

const NavBar = () => {
    return (
        <nav className='p-2 flex justify-between bg-gradient-to-r from-[#011c40] to-[#014e7c] w-full sticky top-0 z-10'>
            <div className="flex">
                <Link to='/'>
                    <img src={Logo} className='w-30 cursor-pointer' alt='Store War' />
                </Link>
                <SearchBar />
            </div>
            <div className='flex gap-8 items-center'>
                <Link to='/favourites'>
                    <HeartIcon color='white' className='size-10 cursor-pointer' />
                </Link>
                <Link to='/cart'>
                    <ShoppingCartIcon color='white' className='size-10 cursor-pointer' />
                </Link>
                {isAuthenticated ? <img src={DefPfp} alt="Profile" className="cursor-pointer rounded-full w-15 h-15" /> :
                    <button className='flex items-center gap-1.5 bg-gradient-to-r from-[#014e7c] to-[#011c40] hover:from-[#015f96] hover:to-[#012850] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition-all duration-200 active:scale-100 mr-1 cursor-pointer scale-120'>
                        <UserIcon className='size-3.5 white' />
                        Sign in
                    </button>}

            </div>
        </nav>
    )
}

export default NavBar
