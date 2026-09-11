import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { timeAgo } from '../utils/timeAgo'
import SearchSkeleton from '../skeletons/SearchSkeleton'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchResults = async () => {
    try {
      setError(null)
      const fetchResultsUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}`
      const response = await fetch(fetchResultsUrl)
      if (!response.ok)
        throw new Error(`Failed to fetch searched videos: ${response.status}`)
      const data = await response.json()
      if (!data) throw new Error('Search result not found.')
      const searchResults = data.items || []

      // if no videos found
      if (searchResults.length === 0) {
        setResults([])
        return
      }

      // Extract videoId from each result
      const videoIds = searchResults
        .map((result) => result.id.videoId)
        .join(',')

      // Extract channelId from each result
      const channelIds = [
        ...new Set(searchResults.map((result) => result.snippet.channelId)),
      ].join(',')

      // create fetch urls
      const videosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
      const channelsUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${API_KEY}`

      // Fetch data from videoIds & channelIds
      const [videosResponse, channelsResponse] = await Promise.all([
        fetch(videosUrl),
        fetch(channelsUrl),
      ])

      // If request failed
      if (!videosResponse.ok)
        throw new Error(
          `Failed to fetch video statistics: ${videosResponse.status}`,
        )
      if (!channelsResponse.ok)
        throw new Error(
          `Failed to fetch channel information: ${channelsResponse.status}`,
        )

      const { items: videos } = await videosResponse.json()
      const { items: channels } = await channelsResponse.json()

      // create object with id => videoId & key as video statistics
      const videoStats = Object.fromEntries(
        videos.map((video) => [video.id, video.statistics]),
      )

      // create object with id => channelId & key as channel snippet
      const channelInfo = Object.fromEntries(
        channels.map((channel) => [channel.id, channel.snippet]),
      )

      // combine the info
      const enrichedResults = searchResults.map((result) => ({
        ...result,
        // Find statistics belonging to this video id
        statistics: videoStats[result.id.videoId],
        // Find channel information belonging to this channel id
        channel: channelInfo[result.snippet.channelId],
      }))

      setResults(enrichedResults)
    } catch (error) {
      console.error(error)
      setError('Failed to load search results. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [query])

  if (isLoading) return <SearchSkeleton />

  return (
    <div className='flex flex-col gap-5'>
      {error ? (
        <p>{error}</p>
      ) : (
        results.map((result) => (
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
              <div className='flex flex-wrap items-center gap-x-4 gap-y-0.5 text-gray-600 xl:flex-col xl:items-start xl:gap-y-1 dark:text-gray-400'>
                <div className='flex items-center gap-2'>
                  <button className='h-6 w-6 md:h-7 md:w-7'>
                    <img
                      className='rounded-full'
                      src={result.channel.thumbnails.default.url}
                      alt='channel-icon'
                    />
                  </button>
                  <h4 className='hover:text-gray-950 dark:hover:text-gray-100'>
                    {result.snippet.channelTitle}
                  </h4>
                </div>
                <div className='flex items-center gap-2 text-sm sm:gap-3'>
                  <span> {timeAgo(result.snippet.publishedAt)} ago</span>
                  <span>
                    {Number(result.statistics.viewCount).toLocaleString()} views
                  </span>
                </div>
              </div>
              <p className='hidden text-sm text-gray-600 sm:line-clamp-2 lg:line-clamp-4 dark:text-gray-400'>
                {result.snippet.description}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}
export default Search
