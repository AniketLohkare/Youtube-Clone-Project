import MobileNavbar from './MobileNavbar'
import DesktopNavbar from './DesktopNavbar'

const Navbar = ({ setMobileSidebar, setDesktopSidebar }) => {
  return (
    <>
      <div id='mobile-navbar-container ' className='w-full px-2 md:hidden'>
        <MobileNavbar setMobileSidebar={setMobileSidebar} />
      </div>
      <div
        id='desktop-navbar-container'
        className='hidden w-full p-2.5 md:block'
      >
        <DesktopNavbar setDesktopSidebar={setDesktopSidebar} />
      </div>
    </>
  )
}
export default Navbar
