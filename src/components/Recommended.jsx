import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatNumber } from '../utils/formatNumber'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const Recommended = ({ videoData }) => {
  const [recommendedVideos, setRecommendedVideos] = useState([])

  const fetchRecommendedVideos = async () => {
    if (!videoData) return
    const categoryId = videoData.snippet.categoryId
    const fetchVideosUsingCategoryIdUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
    const response = await fetch(fetchVideosUsingCategoryIdUrl)
    const data = await response.json()
    const filteredList = data.items.filter((video) => video.id !== videoData.id)
    setRecommendedVideos([...filteredList])
  }

  useEffect(() => {
    fetchRecommendedVideos()
  }, [videoData])

  return (
    <div
      id='recommended-videos'
      className='grid lg:max-h-0 basis-4/10 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-0.5 xl:basis-3/10'
    >
      {recommendedVideos.map((videoData) => {
        return (
          <Link
            key={videoData.id}
            to={`/video/${videoData.id}`}
            className='flex flex-col gap-3 self-start p-1.5 hover:bg-gray-200 lg:flex-row'
          >
            <div className='aspect-video shrink-0 lg:w-3/5'>
              <img
                className='h-full w-full rounded-md object-cover'
                src={videoData.snippet.thumbnails.medium.url}
                alt='thumbnail'
              />
            </div>
            <div id='info ' className='flex min-w-0 flex-col'>
              <h3 className='line-clamp-2 text-sm font-bold'>
                {videoData.snippet.title}
              </h3>
              <span className='line-clamp-1 text-sm font-medium'>
                {videoData.snippet.channelTitle}
              </span>
              <span className='text-xs'>
                {formatNumber(videoData.statistics.viewCount)} views
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
export default Recommended
