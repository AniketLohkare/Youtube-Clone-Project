import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatNumber } from '../utils/formatNumber'
import { timeAgo } from '../utils/timeAgo'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
import { categories } from '../data/categories'
import HomeSkeleton from '../skeletons/HomeSkeleton'

const Feed = () => {
  const [popularVideosData, setPopularVideosData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { category } = useParams()

  const selectedCategory = categories.find(
    (categoryData) => categoryData.slug === category,
  )
  const categoryId = selectedCategory ? selectedCategory.id : 0

  const fetchPopularVideos = async () => {
    setIsLoading(true)
    setPopularVideosData([])
    try {
      setError(null)
      const fetchPopularVideosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=42&videoCategoryId=${categoryId}&key=${API_KEY}`
      const response = await fetch(fetchPopularVideosUrl)
      if (!response.ok)
        throw new Error(`Failed to fetch videos: ${response.status}`)
      const data = await response.json()
      const popularVideosInitialData = data.items || []
      if (popularVideosInitialData.length === 0) {
        setPopularVideosData([])
        return
      }

      const channelIds = [
        ...new Set(
          popularVideosInitialData.map((video) => video.snippet.channelId),
        ),
      ].join(',')

      const fetchChannelsDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIds}&key=${API_KEY}`
      const channelsDataResponse = await fetch(fetchChannelsDataUrl)
      if (!channelsDataResponse.ok) {
        throw new Error(
          `Failed to fetch channels information: ${channelsDataResponse.status}`,
        )
      }
      const { items: channelsData } = await channelsDataResponse.json()

      const channelsThumbnail = Object.fromEntries(
        channelsData.map((channel) => [channel.id, channel.snippet.thumbnails]),
      )

      const popularVideosFinalData = popularVideosInitialData.map((video) => ({
        ...video,
        thumbnails: channelsThumbnail[video.snippet.channelId],
      }))

      setPopularVideosData(popularVideosFinalData)
    } catch (error) {
      console.error(error)
      setError('Failed to load videos. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPopularVideos()
  }, [categoryId])

  if (isLoading) return <HomeSkeleton />

  return (
    <section
      id='feed'
      className='grid min-w-0 flex-1 grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3'
    >
      {error ? (
        <p>{error}</p>
      ) : (
        popularVideosData.map((videoData) => (
          <Link
            key={videoData.id}
            to={`/video/${videoData.id}`}
            className='flex min-w-0 flex-col self-start rounded-xl p-2 hover:bg-gray-200 sm:p-3 sm:transition-all sm:duration-200 sm:ease-in-out sm:hover:scale-105 dark:hover:bg-white/20'
          >
            <img
              className='min-w-0 rounded-lg'
              src={videoData.snippet.thumbnails.medium.url}
              alt='thumbnail image'
            />
            <div className='flex gap-2 pt-2'>
              <img
                src={videoData.thumbnails.default.url}
                alt='channel thumbnail'
                className='mt-0.5 h-8 w-8 min-w-0 shrink-0 rounded-full md:h-9 md:w-9'
              />
              <div className='min-w-0'>
                <h3 className='line-clamp-2 font-semibold'>
                  {videoData.snippet.title}
                </h3>
                <h4 className='text-sm font-semibold text-neutral-600 dark:text-neutral-400'>
                  {videoData.snippet.channelTitle}
                </h4>
                <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                  <span>{formatNumber(videoData.statistics.viewCount)}</span>
                  &nbsp;views &bull;&nbsp;
                  <span>{timeAgo(videoData.snippet.publishedAt)} ago</span>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </section>
  )
}
export default Feed
