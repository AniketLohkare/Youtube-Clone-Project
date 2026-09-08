import { NavLink } from 'react-router-dom'
import { categories } from '../data/categories'
import { subscriptions } from '../data/subscriptions'

const Sidebar = ({ desktopSidebar, setMobileSidebar }) => {
  return (
    <div className='flex flex-col gap-3 self-start sm:gap-5'>
      <div
        id='category-div'
        className='flex flex-col justify-center gap-0.5 text-xs md:text-[16px]'
      >
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={category.slug}
            className={({ isActive }) =>
              `${isActive ? 'bg-slate-300 font-semibold' : 'hover:bg-gray-200'} flex cursor-pointer items-center gap-3 rounded-lg p-1 sm:gap-4 sm:p-2 lg:gap-5 lg:p-3`
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
      <hr className='w-full text-gray-400' />
      <div
        id='subscribe-div'
        className='flex flex-col justify-center gap-0.5 text-xs md:text-[16px]'
      >
        {desktopSidebar && (
          <h3 className='p-1 font-semibold text-gray-600 sm:p-3'>
            SUBSCRIPTIONS
          </h3>
        )}
        {subscriptions.map((channel, index) => (
          <NavLink
            key={index}
            className={
              'flex cursor-pointer items-center gap-3 rounded-lg p-1 hover:bg-gray-200 sm:gap-4 sm:p-2 lg:gap-5 lg:p-3'
            }
            onClick={
              setMobileSidebar ? () => setMobileSidebar(false) : undefined
            }
          >
            <img className='w-6 rounded-full' src={channel.pfp} />
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
