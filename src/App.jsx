import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const [mobileSidebar, setMobileSidebar] = useState(false)

  return (
    <div id='app' className='mx-auto max-w-screen-2xl font-sans'>
      <ScrollToTop />
      <header className='sticky top-0 z-50 bg-white px-2 py-2 shadow-lg sm:px-5'>
        <Navbar
          setShowSidebar={setShowSidebar}
          setMobileSidebar={setMobileSidebar}
        />
      </header>
      <main className='flex h-[calc(100vh-56px)] sm:h-[calc(100vh-57.6px)]'>
        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-14 left-0 z-40 h-full overflow-y-auto bg-white px-2 py-3 transition-transform duration-200 ease-in-out sm:hidden ${mobileSidebar ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Sidebar showSidebar={true} setMobileSidebar={setMobileSidebar} />
        </aside>
        {mobileSidebar && (
          <div
            className='fixed inset-0 z-30 bg-black/30 sm:hidden'
            onClick={() => setMobileSidebar(false)}
          />
        )}

        {/* Desktop Sidebar */}
        <aside className={`hidden overflow-y-auto bg-white px-2 py-3 sm:block`}>
          <Sidebar showSidebar={showSidebar} />
        </aside>
        <section className='flex-1 overflow-y-auto bg-zinc-50 px-5 py-4'>
          <Outlet context={{ showSidebar }} />
        </section>
      </main>
    </div>
  )
}
export default App
