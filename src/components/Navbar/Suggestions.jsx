import { Search } from 'lucide-react'
import { suggestions } from '../../data/suggestions'

const Suggestions = () => {
  return (
    <div
      id='suggestions'
      className='rounded-md bg-white p-2 font-semibold text-black md:p-3 dark:bg-slate-900 dark:text-slate-100'
    >
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className='flex items-center gap-2 rounded-md p-2 hover:bg-gray-200 md:gap-3 md:p-3 dark:hover:bg-white/20'
        >
          <Search className='h-4 w-4 md:h-5 md:w-5' />
          <p className='text-sm md:text-[16px]'>{suggestion}</p>
        </div>
      ))}
    </div>
  )
}
export default Suggestions
