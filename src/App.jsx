import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ScrollToTop from './components/ScrollToTop'
import Overlay from './components/Overlay'

const App = () => {
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const [desktopSidebar, setDesktopSidebar] = useState(true)

  return (
    <div
      id='app'
      className='mx-auto max-w-screen-2xl overflow-hidden font-sans'
    >
      <ScrollToTop />
      <header className='sticky top-0 z-50 flex h-12 items-center bg-white shadow-lg md:h-15'>
        <Navbar
          setMobileSidebar={setMobileSidebar}
          setDesktopSidebar={setDesktopSidebar}
        />
      </header>
      <main className='flex'>
        {/* Mobile & Tablet Sidebar */}
        <aside
          className={`fixed top-12 left-0 z-60 h-full max-w-42 overflow-y-auto bg-white px-2 py-3 transition-transform duration-200 ease-in-out md:hidden ${mobileSidebar ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Sidebar desktopSidebar={true} setMobileSidebar={setMobileSidebar} />
        </aside>
        {mobileSidebar && (
          <div className='md:hidden'>
            <Overlay onClick={() => setMobileSidebar(false)} />
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside
          className={`sticky top-15 hidden h-[calc(100vh-60px)] max-w-56 shrink-0 overflow-y-auto overscroll-contain bg-white px-2 py-3 md:block`}
        >
          <Sidebar desktopSidebar={desktopSidebar} />
        </aside>
        <section className='h-[calc(100vh-48px)] min-w-0 flex-1 overflow-y-auto bg-zinc-50 p-3 sm:px-5 sm:py-4 md:h-[calc(100vh-60px)]'>
          <Outlet />
        </section>
      </main>
    </div>
  )
}
export default App
