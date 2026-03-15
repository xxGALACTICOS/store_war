import Logo from '../../../../assets/Logo.svg'
import DefPfp from '../../../../assets/Default_pfp.svg'
import { Link } from 'react-router'
import SearchBar from './SearchBar'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Bars3Icon, UserIcon } from '@heroicons/react/16/solid'
import Button from '../../ui/Button'

/////////////////////////////////////////
const isAuthenticated = 0;
/////////////////////////////////////////

interface Props {
    toggleSidebar: () => void,
}

const NavBar = ({ toggleSidebar }: Props) => {
    return (
        <nav className='p-2 flex justify-between bg-main w-full sticky top-0 z-10'>
            <div className="flex items-center mb-1 select-none">
                <Bars3Icon className='text-white size-10 mr-8 ml-3 cursor-pointer' onClick={toggleSidebar} />
                <Link to='/home'>
                    <img src={Logo} className='w-30 cursor-pointer' alt='Store War' />
                </Link>
                <SearchBar />
            </div>
            <div className='flex gap-8 items-center'>
                <Link to='/favourites'>
                    <HeartIcon className='size-10 text-white cursor-pointer hover:text-gray-300' />
                </Link>
                <Link to='/cart'>
                    <ShoppingCartIcon className='size-10 text-white cursor-pointer hover:text-gray-300' />
                </Link>
                {isAuthenticated ? <img src={DefPfp} alt="Profile" className="cursor-pointer rounded-full w-15 h-15 hover:opacity-80" /> :
                    <Button className='scale-120'>
                        <UserIcon className='size-3.5 white' />
                        Sign in
                    </Button>
                }

            </div>
        </nav>
    )
}

export default NavBar
