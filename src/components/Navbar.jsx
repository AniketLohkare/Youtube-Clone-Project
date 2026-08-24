import logo from '../assets/logo.png'
import jack from '../assets/jack.png'
import { Link } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'

const Navbar = ({ setShowSidebar, setMobileSidebar }) => {
  return (
    <nav
      id='navbar'
      className='flex w-full items-center justify-between gap-2 sm:gap-7'
    >
      <div id='left-div' className='flex items-center gap-1 sm:gap-5'>
        {/* Mobile */}
        <button
          className='cursor-pointer rounded-full p-2 hover:bg-gray-200 sm:hidden'
          onClick={() => setMobileSidebar(true)}
        >
          <Menu className='w-4' />
        </button>

        {/* Desktop */}
        <button
          className='hidden cursor-pointer rounded-full p-2 hover:bg-gray-200 sm:block'
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <Menu className='w-6' />
        </button>

        <Link className='w-22 sm:w-32' to={'/'}>
          <img src={logo} alt='logo button' />
        </Link>
      </div>
      <div
        id='center-div'
        className='flex w-[50vw] items-center overflow-hidden rounded-4xl border border-gray-400 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500'
      >
        <input
          className='sm:text-md flex-1 py-1 pl-3 text-sm outline-none sm:py-2 sm:pl-5'
          type='text'
          placeholder='Search'
        />
        <button
          id='search-btn'
          className='hidden cursor-pointer border-l border-l-gray-400 bg-gray-100 px-5 py-2 hover:bg-gray-200 sm:block'
        >
          <Search className='w-6' />
        </button>
      </div>
      <div id='right-div' className='flex items-center gap-8'>
        <button
          id='upload-btn'
          className='w-7 cursor-pointer overflow-hidden rounded-full sm:w-9'
        >
          <img src={jack} alt='account button' />
        </button>
      </div>
    </nav>
  )
}
export default Navbar
