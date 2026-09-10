import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatNumber } from '../utils/formatNumber'
import { timeAgo } from '../utils/timeAgo'
import { Bookmark, Share, ThumbsDown, ThumbsUp } from 'lucide-react'
import ShareModal from './ShareModal'
import Overlay from './Overlay'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const PlayVideo = ({ videoData, setVideoData }) => {
  const [commentsData, setCommentsData] = useState([])
  const [channelData, setChannelData] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [saveVideo, setSaveVideo] = useState(false)
  const [error, setError] = useState(null)

  const { videoId } = useParams()

  const fetchVideoData = async () => {
    try {
      setError(null)
      const fetchVideoDataUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      const response = await fetch(fetchVideoDataUrl)
      if (!response.ok)
        throw new Error(`Failed to fetch video: ${response.status}`)
      const data = await response.json()
      setVideoData(data.items[0])
    } catch (error) {
      console.error(error)
      setError('Failed to load video. Please try again.')
    }
  }

  const fetchCommentsData = async () => {
    try {
      const fetchCommentsDataUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=25&videoId=${videoId}&key=${API_KEY}`
      const response = await fetch(fetchCommentsDataUrl)
      if (!response.ok)
        throw new Error(`Failed to fetch comments: ${response.status}`)
      const data = await response.json()
      setCommentsData(data.items)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchChannelData = async () => {
    try {
      if (!videoData) return
      const channelId = videoData.snippet.channelId
      const fetchChannelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`
      const response = await fetch(fetchChannelDataUrl)
      if (!response.ok)
        throw new Error(`Failed to fetch channel data: ${response.status}`)
      const data = await response.json()
      setChannelData(data.items[0])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchVideoData()
  }, [videoId])

  useEffect(() => {
    fetchCommentsData()
  }, [videoId])

  useEffect(() => {
    fetchChannelData()
  }, [videoData])

  useEffect(() => {
    setIsLiked(false)
    setIsDisliked(false)
    setShowShareModal(false)
    setSaveVideo(false)
    setIsSubscribed(false)
  }, [videoData])

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div id='play-video' className='min-w-0 basis-[65%]'>
          <div className='aspect-video w-full'>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
              className='h-full w-full rounded-xl'
            />
          </div>
          <div className='flex flex-col gap-3 py-3'>
            <div id='feedback' className='min-w-0'>
              <h2
                id='title'
                className='text-md mb-3 line-clamp-3 font-bold sm:text-xl'
              >
                {videoData ? videoData.snippet.title : ''}
              </h2>
              <div
                id='video-stats'
                className='flex flex-wrap items-center justify-between gap-x-8 gap-y-3 sm:items-center'
              >
                <div className='min-w-0 text-xs text-gray-600 sm:text-sm'>
                  <span>
                    {videoData
                      ? formatNumber(videoData.statistics.viewCount)
                      : ''}{' '}
                    views
                  </span>
                  &nbsp; &bull; &nbsp;
                  <span>
                    {videoData ? timeAgo(videoData.snippet.publishedAt) : ''}{' '}
                    ago
                  </span>
                </div>
                <div className='flex min-w-0 shrink-0 items-center gap-5 text-xs sm:gap-4 sm:text-[16px]'>
                  <div className='flex overflow-hidden rounded-4xl bg-gray-200'>
                    <div
                      onClick={() => {
                        setIsLiked((prev) => !prev)
                        setIsDisliked(false)
                      }}
                      className='flex cursor-pointer items-center gap-1.5 px-3 py-2 hover:bg-gray-300'
                    >
                      <button className='shrink-0 cursor-pointer'>
                        {isLiked ? (
                          <ThumbsUp className='h-5 w-5 fill-black lg:h-6 lg:w-6' />
                        ) : (
                          <ThumbsUp className='h-5 w-5 lg:h-6 lg:w-6' />
                        )}
                      </button>
                      <span className='select-none'>
                        {videoData
                          ? formatNumber(videoData.statistics.likeCount)
                          : ''}
                      </span>
                    </div>
                    <div id='separator' className='w-0.5 bg-gray-400'></div>
                    <button
                      onClick={() => {
                        setIsDisliked((prev) => !prev)
                        setIsLiked(false)
                      }}
                      className='cursor-pointer px-3 py-2 hover:bg-gray-300'
                    >
                      {isDisliked ? (
                        <ThumbsDown className='h-5 w-5 fill-black lg:h-6 lg:w-6' />
                      ) : (
                        <ThumbsDown className='h-5 w-5 lg:h-6 lg:w-6' />
                      )}
                    </button>
                  </div>
                  <div
                    onClick={() => setShowShareModal(true)}
                    className='flex cursor-pointer items-center gap-1.5 rounded-4xl bg-gray-200 px-3 py-2 hover:bg-gray-300'
                  >
                    <button className='shrink-0 cursor-pointer'>
                      <Share className='h-5 w-5 lg:h-6 lg:w-6' />
                    </button>
                    <span className='hidden sm:block'>Share</span>
                  </div>
                  {showShareModal && (
                    <>
                      <Overlay onClick={() => setShowShareModal(false)} />
                      <ShareModal setShowShareModal={setShowShareModal} />
                    </>
                  )}
                  <div
                    id='save-btn'
                    className='flex cursor-pointer items-center gap-1.5 rounded-4xl bg-gray-200 px-3 py-2 hover:bg-gray-300'
                    onClick={() => setSaveVideo(!saveVideo)}
                  >
                    <button className='shrink-0 cursor-pointer'>
                      {saveVideo ? (
                        <Bookmark className='h-5 w-5 fill-black lg:h-6 lg:w-6' />
                      ) : (
                        <Bookmark className='h-5 w-5 lg:h-6 lg:w-6' />
                      )}
                    </button>
                    <span className='hidden sm:block'>Save</span>
                  </div>
                </div>
              </div>
            </div>
            <hr className='text-gray-400' />
            <div
              id='channel-subscription'
              className='flex min-w-0 flex-wrap items-center justify-between gap-x-5 gap-y-2'
            >
              <div className='flex min-w-0 items-center gap-2 sm:gap-4'>
                <Link
                  to={`/channel/${channelData?.id}`}
                  className='shrink-0 cursor-pointer'
                >
                  <img
                    className='h-8 w-8 rounded-full sm:h-10 sm:w-10'
                    src={
                      channelData
                        ? channelData.snippet.thumbnails.default.url
                        : null
                    }
                    alt='channel button'
                  />
                </Link>
                <div className='flex min-w-0 flex-col justify-center'>
                  <h3 className='shrink truncate text-sm font-semibold sm:text-lg'>
                    {videoData ? videoData.snippet.channelTitle : ''}
                  </h3>
                  <span className='text-xs text-gray-600 sm:text-sm'>
                    {channelData
                      ? formatNumber(channelData.statistics.subscriberCount)
                      : ''}{' '}
                    Subscribers
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsSubscribed((prev) => !prev)}
                className={`w-34 min-w-0 cursor-pointer rounded py-1.5 text-sm text-white sm:py-2 sm:text-[16px] md:w-40 ${isSubscribed ? 'bg-black' : 'bg-red-500'}`}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
            <div
              id='description'
              className='min-w-0 cursor-pointer bg-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-orange-50'
            >
              <div className='line-clamp-5 whitespace-pre-line'>
                {videoData ? videoData.snippet.description : ''}
              </div>
            </div>
            <hr className='text-gray-400' />
            <div id='commentsData' className='min-w-0'>
              <p className='pb-3 text-sm font-bold text-gray-600'>
                {videoData
                  ? formatNumber(videoData.statistics.commentCount)
                  : ''}{' '}
                Comments
              </p>
              <div className='flex flex-col gap-5'>
                {commentsData &&
                  commentsData.map((comment) => (
                    <div
                      key={comment.id}
                      className='flex min-w-0 gap-3 sm:gap-5'
                    >
                      <img
                        className='h-8 w-8 cursor-pointer rounded-full sm:h-10 sm:w-10'
                        src={
                          comment.snippet.topLevelComment.snippet
                            .authorProfileImageUrl
                        }
                        alt='user profile'
                      />
                      <div className='flex min-w-0 flex-col justify-center'>
                        <div className='min-w-0'>
                          <span className='text-xs font-semibold sm:text-sm'>
                            {
                              comment.snippet.topLevelComment.snippet
                                .authorDisplayName
                            }
                          </span>
                          <span className='ml-2 text-[10px] font-medium text-gray-600 sm:ml-3 sm:text-xs'>
                            {timeAgo(
                              comment.snippet.topLevelComment.snippet
                                .publishedAt,
                            )}
                          </span>
                        </div>
                        <p className='line-clamp-2 min-w-0 text-xs text-gray-600 sm:text-sm'>
                          {comment.snippet.topLevelComment.snippet.textDisplay}
                        </p>
                        <div className='mt-2 flex items-center gap-3 sm:gap-5'>
                          <div className='flex min-w-0 items-center gap-2'>
                            <button id='like-comment-btn'>
                              <ThumbsUp className='h-3.5 w-3.5 cursor-pointer sm:h-5 sm:w-5' />
                            </button>
                            <span className='text-sm'>
                              {
                                comment.snippet.topLevelComment.snippet
                                  .likeCount
                              }
                            </span>
                          </div>
                          <button id='dislike-comment-btn'>
                            <ThumbsDown className='h-3.5 w-3.5 cursor-pointer sm:h-5 sm:w-5' />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default PlayVideo
