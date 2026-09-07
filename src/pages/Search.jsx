import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { timeAgo } from '../utils/timeAgo'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const [results, setResults] = useState([])

  const fetchResults = async () => {
    const fetchResultsUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}`
    const response = await fetch(fetchResultsUrl)
    const data = await response.json()
    setResults(data.items)
  }

  useEffect(() => {
    fetchResults()
  }, [query])

  console.log(results)

  return (
    <div className='flex flex-col gap-4'>
      {results.map((result) => (
        <Link
          to={`/video/${result.id.videoId}`}
          key={result.id.videoId}
          className='flex min-w-0 flex-col gap-4 sm:flex-row'
        >
          <img
            className='w-full shrink-0 self-start rounded-xl sm:max-w-xs lg:max-w-md'
            src={result.snippet.thumbnails.medium.url}
            alt='thumbnail'
          />
          <div className='flex min-w-0 flex-col gap-1'>
            <h3 className='line-clamp-2 text-lg font-semibold lg:line-clamp-3'>
              {result.snippet.title}
            </h3>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-0.5 text-gray-600 xl:flex-col xl:items-start xl:gap-y-1'>
              <div className='flex items-center gap-2'>
                <h4 className='hover:text-gray-950'>
                  {result.snippet.channelTitle}
                </h4>
              </div>
              <span className='text-sm'>
                {timeAgo(result.snippet.publishedAt)}
              </span>
            </div>
            <p className='hidden text-sm text-gray-600 sm:line-clamp-2 lg:line-clamp-4'>
              {result.snippet.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
export default Search
