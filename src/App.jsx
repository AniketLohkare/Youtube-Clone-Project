import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { useEffect, useRef, useState } from 'react'
import Sidebar from './components/Sidebar'
import ScrollToTop from './components/ScrollToTop'
import Overlay from './components/Overlay'

const App = () => {
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const [desktopSidebar, setDesktopSidebar] = useState(true)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const contentRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div
      id='app'
      className='mx-auto max-w-screen-2xl overflow-hidden font-sans'
    >
      <ScrollToTop scrollRef={contentRef} />
      <header className='sticky top-0 z-50 flex h-12 items-center bg-white text-black shadow-lg md:h-15 dark:bg-slate-900 dark:text-slate-100'>
        <Navbar
          setMobileSidebar={setMobileSidebar}
          setDesktopSidebar={setDesktopSidebar}
        />
      </header>
      <main className='flex'>
        {/* Mobile & Tablet Sidebar */}
        <aside
          className={`fixed top-12 left-0 z-60 h-full max-w-64 overflow-y-auto bg-white px-2 py-3 text-black transition-transform duration-200 ease-in-out md:hidden dark:bg-slate-900 dark:text-slate-100 ${mobileSidebar ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Sidebar
            desktopSidebar={true}
            setMobileSidebar={setMobileSidebar}
            theme={theme}
            setTheme={setTheme}
          />
        </aside>
        {mobileSidebar && (
          <div className='md:hidden'>
            <Overlay onClick={() => setMobileSidebar(false)} />
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside
          className={`sticky top-15 hidden h-[calc(100vh-60px)] max-w-72 shrink-0 overflow-y-auto overscroll-contain bg-white px-2 py-3 text-black md:block dark:bg-slate-900 dark:text-slate-100`}
        >
          <Sidebar
            desktopSidebar={desktopSidebar}
            theme={theme}
            setTheme={setTheme}
          />
        </aside>
        <section
          ref={contentRef}
          className='h-[calc(100vh-48px)] min-w-0 flex-1 overflow-y-auto bg-zinc-50 px-2.5 text-black sm:px-5 sm:py-4 md:h-[calc(100vh-60px)] dark:bg-zinc-900 dark:text-slate-100'
        >
          <Outlet />
        </section>
      </main>
    </div>
  )
}
export default App
