import logo from '../../assets/logo.png'
import jack from '../../assets/jack.png'
import { Link } from 'react-router-dom'
import { ArrowLeft, Menu, Search } from 'lucide-react'

import Input from './Input'
import { useState } from 'react'

const MobileNavbar = ({ setMobileSidebar }) => {
  const [isSearchClicked, setIsSearchClicked] = useState(false)

  return isSearchClicked ? (
    <div className='flex items-center justify-between gap-1'>
      <button
        id='back-btn'
        className='shrink-0 cursor-pointer rounded-full p-1 px-1 hover:bg-gray-300'
        onClick={() => setIsSearchClicked(false)}
      >
        <ArrowLeft className='h-6 w-6' />
      </button>
      <div id='input-container' className='min-w-0 flex-1'>
        <Input autoFocus />
      </div>
    </div>
  ) : (
    <nav id='mobile-navbar' className='flex items-center justify-between'>
      <div id='left-div' className='flex shrink-0 items-center gap-2'>
        <button
          className='shrink-0 cursor-pointer rounded-full p-1 hover:bg-gray-200'
          onClick={() => setMobileSidebar(true)}
        >
          <Menu className='h-6 w-6' />
        </button>
        <Link className='w-30 shrink-0' to={'/'}>
          <img src={logo} alt='logo button' />
        </Link>
      </div>
      <div id='right-div' className='flex shrink-0 items-center gap-4'>
        <button
          onClick={() => setIsSearchClicked(true)}
          id='search'
          className='shrink-0 cursor-pointer overflow-hidden rounded-full'
        >
          <Search className='h-7 w-7' />
        </button>
        <button
          id='user-btn'
          className='h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-full'
        >
          <img src={jack} alt='user picture' />
        </button>
      </div>
    </nav>
  )
}
export default MobileNavbar
