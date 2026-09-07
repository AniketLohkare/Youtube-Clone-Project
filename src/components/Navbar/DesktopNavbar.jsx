import logo from '../../assets/logo.png'
import jack from '../../assets/jack.png'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Input from './Input'

const DesktopNavbar = ({ setDesktopSidebar }) => {
  return (
    <nav
      id='desktop-navbar'
      className='flex items-center justify-between gap-5 md:gap-7'
    >
      <div className='flex shrink-0 items-center gap-1 md:gap-5'>
        <button
          className='shrink-0 cursor-pointer rounded-full p-2 hover:bg-gray-200'
          onClick={() => {
            setDesktopSidebar((prev) => !prev)
          }}
        >
          <Menu className='h-6 w-6' />
        </button>
        <Link className='w-32 shrink-0' to={'/'}>
          <img src={logo} alt='logo button' />
        </Link>
      </div>
      <div className='w-full max-w-xl'>
        <Input />
      </div>
      <div className='flex shrink-0'>
        <button
          id='upload-btn'
          className='h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-full'
        >
          <img src={jack} alt='account button' />
        </button>
      </div>
    </nav>
  )
}
export default DesktopNavbar
