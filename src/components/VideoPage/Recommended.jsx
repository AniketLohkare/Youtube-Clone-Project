import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatNumber } from '../../utils/formatNumber'
import RecommendedSkeleton from '../../skeletons/VideoSkeleton/RecommendedSkeleton'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const Recommended = ({ videoData }) => {
  const [recommendedVideos, setRecommendedVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(null)

  const fetchRecommendedVideos = async () => {
    try {
      setError(null)
      if (!videoData) return
      const categoryId = videoData.snippet.categoryId
      const fetchVideosUsingCategoryIdUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
      const response = await fetch(fetchVideosUsingCategoryIdUrl)
      if (!response.ok)
        throw new Error(
          `Failed to fetch recommended videos: ${response.status}`,
        )
      const data = await response.json()
      const filteredList = data.items.filter(
        (video) => video.id !== videoData.id,
      )
      setRecommendedVideos(filteredList || [])
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setError('Failed to load recommended videos. Please try again.')
    }
  }

  useEffect(() => {
    fetchRecommendedVideos()
  }, [videoData])

  if (isLoading) return <RecommendedSkeleton />

  return (
    <div
      id='recommended-videos'
      className='grid basis-[35%] grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-1 sm:grid-cols-[repeat(auto-fit,minmax(330px,1fr))] lg:max-h-0'
    >
      {error ? (
        <p>{error}</p>
      ) : (
        recommendedVideos.map((videoData) => {
          return (
            <Link
              key={videoData.id}
              to={`/video/${videoData.id}`}
              className='flex flex-col gap-3 self-start p-1.5 hover:bg-gray-200 sm:transition-all sm:duration-200 sm:ease-in-out sm:hover:scale-105 lg:flex-row dark:hover:bg-white/20'
            >
              <div className='aspect-video shrink-0 lg:w-3/5'>
                <img
                  className='h-full w-full rounded-md object-cover'
                  src={videoData.snippet.thumbnails.medium.url}
                  alt='thumbnail'
                />
              </div>
              <div id='info' className='min-w-0'>
                <h3 className='line-clamp-2 text-sm font-bold'>
                  {videoData.snippet.title}
                </h3>
                <h4 className='line-clamp-1 text-sm font-medium'>
                  {videoData.snippet.channelTitle}
                </h4>
                <span className='text-xs'>
                  {formatNumber(videoData.statistics.viewCount)} views
                </span>
              </div>
            </Link>
          )
        })
      )}
    </div>
  )
}
export default Recommended
