import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Suggestions from './Suggestions'
import { useNavigate } from 'react-router-dom'

const Input = ({ autoFocus = false }) => {
  const [userSearch, setUserSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!userSearch.trim()) return
    setIsFocused(false)
    navigate(`/search?query=${encodeURIComponent(userSearch.trim())}`)
  }

  return (
    <form onSubmit={handleSearch} className='flex items-center'>
      <div className='relative flex h-9 min-w-0 flex-1 rounded-l-4xl border-2 border-gray-300 transition-colors focus-within:border-blue-500 focus-within:ring-0 focus-within:ring-blue-500'>
        <input
          ref={inputRef}
          onChange={(e) => {
            setUserSearch(e.target.value)
            setIsFocused(true)
          }}
          value={userSearch}
          className='w-full pl-3 outline-none sm:py-0.5 sm:pl-4 md:text-lg'
          type='text'
          placeholder='Search'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {userSearch && (
          <button
            type='button'
            onClick={() => {
              setUserSearch('')
              inputRef.current.focus()
            }}
            id='clear-btn'
            className='mr-1 cursor-pointer rounded-full hover:bg-gray-300 sm:p-2'
          >
            <X className='h-5 w-5 sm:h-5 sm:w-5' />
          </button>
        )}
        {userSearch && isFocused && (
          <div className='absolute top-11/10 left-0 w-full shadow-2xl'>
            <Suggestions />
          </div>
        )}
      </div>
      <button
        type='submit'
        id='search-btn'
        className='h-9 cursor-pointer rounded-r-4xl border-2 border-gray-300 bg-gray-100 px-4 py-1.5 hover:bg-gray-200 sm:py-2 md:px-5'
      >
        <Search className='h-5 w-5 sm:h-5 sm:w-5' />
      </button>
    </form>
  )
}
export default Input
