import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatNumber } from '../utils/formatNumber'
import { timeAgo } from '../utils/timeAgo'
import ChannelSkeleton from '../skeletons/ChannelSkeleton'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const Channel = () => {
  const [channelData, setChannelData] = useState(null)
  const [videosData, setVideosData] = useState(null)
  const [error, setError] = useState(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { channelId } = useParams()

  const fetchChannelData = async () => {
    try {
      setError(null)
      const fetchChannelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&part=brandingSettings&id=${channelId}&key=${API_KEY}`

      const response = await fetch(fetchChannelDataUrl)
      if (!response.ok)
        throw new Error(
          `Failed to fetch channel data: ${(await response).status}`,
        )
      const data = await response.json()
      setChannelData(data.items[0] || [])
    } catch (error) {
      console.error(error)
      setError('Failed to load channel information. Please try again.')
    }
  }

  const fetchPlaylistData = async () => {
    try {
      const fetchPlaylistUrl = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=10&key=${API_KEY}`
      const response = await fetch(fetchPlaylistUrl)
      if (!response.ok)
        throw new Error(`Failed to fetch playlist data: ${response.status}`)
      const data = await response.json()
      return data.items || []
    } catch (error) {
      console.error(error)
    }
  }

  const fetchVideos = async () => {
    try {
      // fetch playlist data
      const playlistData = await fetchPlaylistData()

      // Find playlist with 12+ videos
      let playlistId = undefined
      for (const playlist of playlistData) {
        if (playlist.contentDetails.itemCount >= 24) {
          playlistId = playlist.id
          break
        }
      }

      // Fetch videos data
      const fetchVideosUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=24&key=${API_KEY}`
      const response = await fetch(fetchVideosUrl)
      if (!response.ok)
        throw new Error(`Failed to fetch videos data: ${response.status}`)
      const data = await response.json()
      setVideosData(data.items || [])
    } catch (error) {
      console.error(error)
      setError('Failed to load videos. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChannelData()
    fetchPlaylistData()
    fetchVideos()
    setIsSubscribed(false)
  }, [channelId])

  if (isLoading) return <ChannelSkeleton />

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <main className='px-4 py-6 md:px-8'>
          {/* Channel Header */}
          <section className='mx-auto max-w-6xl'>
            {/* Banner */}
            <div className='h-[24vw] w-full overflow-hidden rounded-xl bg-gray-200 md:h-[12vw] dark:bg-white/20'>
              <img
                src={channelData?.brandingSettings?.image?.bannerExternalUrl}
                alt='Channel banner'
                className='h-full w-full scale-150 object-cover md:scale-100'
              />
            </div>

            {/* Profile Information */}
            <div className='flex flex-col gap-5 py-6 md:flex-row md:items-center'>
              {/* Avatar */}
              <img
                src={channelData?.snippet?.thumbnails?.default?.url}
                alt={'Channel logo'}
                className='h-28 w-28 rounded-full object-cover'
              />

              {/* Details */}
              <div className='flex-1'>
                <h1 className='text-2xl font-bold md:text-3xl'>
                  {channelData?.snippet.title}
                </h1>

                <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                  {channelData?.snippet.customUrl}
                </p>

                <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                  {formatNumber(channelData?.statistics.subscriberCount)}{' '}
                  subscribers
                </p>

                <p className='mt-3 line-clamp-4 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400'>
                  {channelData?.snippet.description}
                </p>

                <button
                  onClick={() => setIsSubscribed((prev) => !prev)}
                  type='button'
                  className={`mt-4 cursor-pointer rounded-full px-5 py-2 text-sm font-medium ${
                    isSubscribed
                      ? 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/20'
                      : 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700'
                  }`}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
            </div>
          </section>

          {/* Latest Videos */}
          <section className='mx-auto mt-4 max-w-6xl'>
            <h2 className='mb-5 text-xl font-semibold'>Latest Videos</h2>

            <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Video Cards */}
              {videosData?.map((video) => (
                <Link
                  to={`/video/${video.snippet.resourceId.videoId}`}
                  key={video.id}
                  className='min-w-0 p-2 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-200 dark:hover:bg-white/20'
                >
                  <img
                    src={
                      video.snippet.thumbnails.high?.url ||
                      video.snippet.thumbnails.medium?.url ||
                      video.snippet.thumbnails.default?.url
                    }
                    alt='Video title'
                    className='aspect-video w-full rounded-xl object-cover'
                  />

                  <h3 className='mt-3 line-clamp-2 text-sm font-semibold'>
                    {video.snippet.title}
                  </h3>

                  <p className='mt-1 text-xs text-gray-500 dark:text-gray-300'>
                    1.2M views · {timeAgo(video.snippet.publishedAt)} ago
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </main>
      )}
    </>
  )
}

export default Channel
