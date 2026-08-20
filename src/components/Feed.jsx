import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatNumber } from '../utils/formatNumber'
import { timeAgo } from '../utils/timeAgo'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
import { categories } from '../data/categories'

const Feed = () => {
  const [popularVideosData, setPopularVideosData] = useState([])
  const { category } = useParams()

  const selectedCategory = categories.find(
    (categoryData) => categoryData.slug === category,
  )
  const categoryId = selectedCategory ? selectedCategory.id : 0

  const fetchPopularVideos = async () => {
    const fetchPopularVideosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=50&videoCategoryId=${categoryId}&key=${API_KEY}`
    const response = await fetch(fetchPopularVideosUrl)
    const data = await response.json()
    setPopularVideosData(data.items)
  }

  useEffect(() => {
    fetchPopularVideos()
  }, [categoryId])

  return (
    <section
      id='feed'
      className={
        'grid flex-1 grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-1'
      }
    >
      {popularVideosData.map((videoData) => (
        <Link
          key={videoData.id}
          to={`/video/${videoData.id}`}
          className='s flex flex-col self-start rounded-xl p-3 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-200'
        >
          <img
            className='rounded-lg'
            src={videoData.snippet.thumbnails.medium.url}
            alt='thumbnail image'
          />
          <h3 className='line-clamp-2 font-semibold'>
            {videoData.snippet.title}
          </h3>
          <span className='text-sm font-semibold text-neutral-600'>
            {videoData.snippet.channelTitle}
          </span>
          <div className='flex items-center text-sm text-gray-600'>
            <span>{formatNumber(videoData.statistics.viewCount)}</span>
            &nbsp;views &bull;&nbsp;
            <span>{timeAgo(videoData.snippet.publishedAt)} ago</span>
          </div>
        </Link>
      ))}
    </section>
  )
}
export default Feed
