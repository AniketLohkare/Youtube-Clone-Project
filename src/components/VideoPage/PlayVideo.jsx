import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatNumber } from '../../utils/formatNumber'
import { timeAgo } from '../../utils/timeAgo'
import { Bookmark, Share, ThumbsDown, ThumbsUp } from 'lucide-react'
import ShareModal from './ShareModal'
import Overlay from '../Overlay'
import VideoPlayerSkeleton from '../../skeletons/VideoSkeleton/VideoPlayerSkeleton'
import CommentsSkeleton from '../../skeletons/VideoSkeleton/CommentsSkeleton'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const PlayVideo = ({ videoData, setVideoData }) => {
  const [commentsData, setCommentsData] = useState([])
  const [channelData, setChannelData] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [error, setError] = useState(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [areCommentsLoaded, SetAreCommentsLoaded] = useState(false)

  const { videoId } = useParams()

  const fetchVideoData = async () => {
    try {
      setError(null)
      const fetchVideoDataUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      const response = await fetch(fetchVideoDataUrl)
      if (!response.ok)
        throw new Error(`Failed to fetch video: ${response.status}`)
      const data = await response.json()
      if (!data.items?.length) {
        throw new Error('Video not found')
      }
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
    } finally {
      SetAreCommentsLoaded(true)
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
    } finally {
      setIsVideoLoaded(true)
    }
  }

  useEffect(() => {
    fetchVideoData()
  }, [videoId])

  useEffect(() => {
    fetchChannelData()
  }, [videoData])

  useEffect(() => {
    fetchCommentsData()
  }, [videoId])

  useEffect(() => {
    setIsLiked(false)
    setIsDisliked(false)
    setShowShareModal(false)
    setIsSaved(false)
    setIsSubscribed(false)
  }, [videoData])

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div id='play-video' className='min-w-0 basis-[65%]'>
          {isVideoLoaded ? (
            <div className='aspect-video w-full'>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
                className='h-full w-full rounded-xl'
              />
              <div className='flex flex-col gap-3'>
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
                    <div className='min-w-0 text-xs text-gray-600 sm:text-sm dark:text-gray-400'>
                      <span>
                        {videoData
                          ? formatNumber(videoData.statistics.viewCount)
                          : ''}{' '}
                        views
                      </span>
                      &nbsp; &bull; &nbsp;
                      <span>
                        {videoData
                          ? timeAgo(videoData.snippet.publishedAt)
                          : ''}{' '}
                        ago
                      </span>
                    </div>
                    <div className='flex min-w-0 shrink-0 items-center gap-5 text-xs sm:gap-4 sm:text-[16px]'>
                      <div className='flex overflow-hidden rounded-4xl'>
                        <div
                          onClick={() => {
                            setIsLiked((prev) => !prev)
                            setIsDisliked(false)
                          }}
                          className='flex cursor-pointer items-center gap-1.5 bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-white/20 dark:hover:bg-white/30'
                        >
                          <button className='shrink-0 cursor-pointer'>
                            <ThumbsUp
                              className={`${isLiked ? 'fill-black dark:fill-slate-100 ' : ''} h-5 w-5 text-black lg:h-6 lg:w-6 dark:text-slate-100`}
                            />
                          </button>
                          <span className='select-none'>
                            {videoData
                              ? formatNumber(videoData.statistics.likeCount)
                              : ''}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setIsDisliked((prev) => !prev)
                            setIsLiked(false)
                          }}
                          className='cursor-pointer border-l border-gray-400 bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-white/20 dark:hover:bg-white/30'
                        >
                          <ThumbsDown
                            className={`${isDisliked ? 'fill-black dark:fill-slate-100 ' : ''} h-5 w-5 text-black lg:h-6 lg:w-6 dark:text-slate-100`}
                          />
                        </button>
                      </div>
                      <div
                        onClick={() => setShowShareModal(true)}
                        className='flex cursor-pointer items-center gap-1.5 rounded-4xl bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-white/20 dark:hover:bg-white/30'
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
                        className='flex cursor-pointer items-center gap-1.5 rounded-4xl bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-white/20 dark:hover:bg-white/30'
                        onClick={() => setIsSaved(!isSaved)}
                      >
                        <button className='shrink-0 cursor-pointer'>
                          <Bookmark
                            className={`${isSaved ? 'fill-black dark:fill-slate-100 ' : ''} h-5 w-5 text-black lg:h-6 lg:w-6 dark:text-slate-100`}
                          />
                        </button>
                        <span className='hidden sm:block'>Save</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='border-gray-300 dark:border-gray-700' />
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
                      <span className='text-xs text-gray-600 sm:text-sm dark:text-gray-400'>
                        {channelData
                          ? formatNumber(channelData.statistics.subscriberCount)
                          : ''}{' '}
                        Subscribers
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSubscribed((prev) => !prev)}
                    className={`w-34 min-w-0 cursor-pointer rounded-full py-1.5 text-sm font-medium transition-colors sm:w-40 sm:py-2 sm:text-base ${
                      isSubscribed
                        ? 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/20'
                        : 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700'
                    }`}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>
                <div
                  id='description'
                  onClick={() => setShowDescription(!showDescription)}
                  className='min-w-0 cursor-pointer bg-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-orange-50 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-orange-500/10'
                >
                  <div
                    className={`${showDescription ? '' : 'line-clamp-5'} whitespace-pre-line`}
                  >
                    {videoData ? videoData.snippet.description : ''}
                  </div>
                </div>
                <hr className='border-gray-300 dark:border-gray-700' />
              </div>
            </div>
          ) : (
            <VideoPlayerSkeleton />
          )}
          <div className='flex flex-col gap-3 py-3'>
            {areCommentsLoaded ? (
              <div id='commentsData' className='min-w-0'>
                <p className='pb-3 text-sm font-bold text-gray-600 dark:text-gray-400'>
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
                            <span className='ml-2 text-[10px] font-medium text-gray-600 sm:ml-3 sm:text-xs dark:text-gray-400'>
                              {timeAgo(
                                comment.snippet.topLevelComment.snippet
                                  .publishedAt,
                              )}
                            </span>
                          </div>
                          <p className='line-clamp-3 min-w-0 text-xs text-gray-600 sm:text-sm dark:text-gray-400'>
                            {
                              comment.snippet.topLevelComment.snippet
                                .textDisplay
                            }
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
            ) : (
              <CommentsSkeleton />
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default PlayVideo
