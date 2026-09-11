import { NavLink } from 'react-router-dom'
import { categories } from '../data/categories'
import { subscriptions } from '../data/subscriptions'
import { Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'

const Sidebar = ({ desktopSidebar, setMobileSidebar, theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className='flex flex-col gap-3 self-start'>
      <button
        onClick={toggleTheme}
        className='flex cursor-pointer items-center gap-3 rounded-lg p-1 text-xs hover:bg-gray-200 sm:gap-4 sm:p-2 md:text-[16px] lg:gap-5 lg:p-3 dark:hover:bg-white/20'
      >
        {theme === 'light' ? (
          <Moon className='w-4 shrink-0 sm:w-6' />
        ) : (
          <Sun className='w-4 shrink-0 sm:w-6' />
        )}
        {desktopSidebar && (
          <span>{theme === 'light' ? 'Dark theme' : 'Light theme'}</span>
        )}
      </button>
      <hr className='w-full border-gray-300 dark:border-gray-700' />
      <div
        id='category-div'
        className='flex flex-col justify-center gap-0.5 text-xs md:text-[16px]'
      >
        {desktopSidebar && (
          <h3 className='p-1 font-semibold text-gray-600 sm:p-3 dark:text-gray-400'>
            CATEGORIES
          </h3>
        )}
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={category.slug}
            className={({ isActive }) =>
              `${isActive ? 'bg-slate-300 font-semibold dark:bg-slate-700' : 'hover:bg-gray-200 dark:hover:bg-white/20'} flex cursor-pointer items-center gap-3 rounded-lg p-1 sm:gap-4 sm:p-2 lg:gap-5 lg:p-3`
            }
            onClick={
              setMobileSidebar ? () => setMobileSidebar(false) : undefined
            }
          >
            {<category.icon className='w-4 shrink-0 sm:w-6' />}
            {desktopSidebar && (
              <span className='text-xs md:text-[16px]'>{category.name}</span>
            )}
          </NavLink>
        ))}
      </div>
      <hr className='w-full border-gray-300 dark:border-gray-700' />
      <div
        id='subscribe-div'
        className='flex flex-col justify-center gap-0.5 text-xs md:text-[16px]'
      >
        {desktopSidebar && (
          <h3 className='p-1 font-semibold text-gray-600 sm:p-3 dark:text-gray-400'>
            SUBSCRIPTIONS
          </h3>
        )}
        {subscriptions.map((channel, index) => (
          <NavLink
            to={`channel/${channel.channelId}`}
            key={index}
            className={({ isActive }) =>
              `${isActive ? 'bg-slate-300 font-semibold dark:bg-slate-700' : 'hover:bg-gray-200 dark:hover:bg-white/20'} flex cursor-pointer items-center gap-3 rounded-lg p-1 sm:gap-4 sm:p-2 lg:gap-5 lg:p-3`
            }
            onClick={
              setMobileSidebar ? () => setMobileSidebar(false) : undefined
            }
          >
            <img className='w-6 rounded-full' src={channel.channelLogo} />
            {desktopSidebar && (
              <span className='line-clamp-1'>{channel.name}</span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
export default Sidebar
