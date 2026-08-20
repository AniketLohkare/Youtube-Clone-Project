import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatNumber } from '../utils/formatNumber'
import { timeAgo } from '../utils/timeAgo'
import { Bookmark, Share, ThumbsDown, ThumbsUp } from 'lucide-react'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const PlayVideo = ({ videoData, setVideoData }) => {
  const [commentsData, setCommentsData] = useState([])
  const [channelData, setChannelData] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const { videoId } = useParams()

  const fetchVideoData = async () => {
    const fetchVideoDataUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    const response = await fetch(fetchVideoDataUrl)
    const data = await response.json()
    setVideoData(data.items[0])
  }

  const fetchCommentsData = async () => {
    const fetchCommentsDataUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
    const response = await fetch(fetchCommentsDataUrl)
    const data = await response.json()
    setCommentsData(data.items)
  }

  const fetchChannelData = async () => {
    if (!videoData) return
    const channelId = videoData.snippet.channelId
    const fetchChannelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`
    const response = await fetch(fetchChannelDataUrl)
    const data = await response.json()
    setChannelData(data.items[0])
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

  return (
    <div id='play-video' className='basis-7/10'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
        className='h-[35vw] w-full rounded-xl'
      ></iframe>
      <div className='flex flex-col gap-3 py-3'>
        <div>
          <h2 id='title' className='text-xl font-bold'>
            {videoData ? videoData.snippet.title : ''}
          </h2>
          <div
            id='video-stats'
            className='flex items-center justify-between text-sm'
          >
            <div className='text-gray-600'>
              <span>
                {videoData ? formatNumber(videoData.statistics.viewCount) : ''}{' '}
                views
              </span>
              &nbsp; &bull; &nbsp;
              <span>
                {videoData ? timeAgo(videoData.snippet.publishedAt) : ''} ago
              </span>
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex overflow-hidden rounded-4xl bg-gray-200'>
                <div
                  onClick={() => {
                    setIsLiked((prev) => !prev)
                    setIsDisliked(false)
                  }}
                  className='flex cursor-pointer items-center gap-1 px-5 py-2 hover:bg-gray-300'
                >
                  <button className='cursor-pointer'>
                    {isLiked ? (
                      <ThumbsUp className='w-5 fill-black' />
                    ) : (
                      <ThumbsUp className='w-5' />
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
                  className='cursor-pointer px-5 py-2 hover:bg-gray-300'
                >
                  {isDisliked ? (
                    <ThumbsDown className='w-5 fill-black' />
                  ) : (
                    <ThumbsDown className='w-5' />
                  )}
                </button>
              </div>
              <div className='flex cursor-pointer items-center gap-1 rounded-4xl bg-gray-200 px-5 py-2 hover:bg-gray-300'>
                <button className='cursor-pointer'>
                  <Share className='w-5' />
                </button>
                <span>Share</span>
              </div>
              <div className='flex cursor-pointer items-center gap-1 rounded-4xl bg-gray-200 px-5 py-2 hover:bg-gray-300'>
                <button className='cursor-pointer'>
                  <Bookmark className='w-5' />
                </button>
                <span>Save</span>
              </div>
            </div>
          </div>
        </div>
        <hr className='text-gray-400' />
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button className='cursor-pointer'>
              <img
                className='w-10 rounded-full'
                src={
                  channelData
                    ? channelData.snippet.thumbnails.default.url
                    : null
                }
                alt='channel button'
              />
            </button>
            <div className='flex flex-col justify-center'>
              <h3 className='text-lg font-semibold'>
                {videoData ? videoData.snippet.channelTitle : ''}
              </h3>
              <span className='text-sm text-gray-600'>
                {channelData
                  ? formatNumber(channelData.statistics.subscriberCount)
                  : ''}{' '}
                Subscribers
              </span>
            </div>
          </div>
          <button className='cursor-pointer rounded bg-red-500 px-7 py-2 text-sm text-white'>
            Subscribe
          </button>
        </div>
        <div
          id='description'
          className='cursor-pointer bg-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-orange-50'
        >
          <div className='line-clamp-5 whitespace-pre-line'>
            {videoData ? videoData.snippet.description : ''}
          </div>
        </div>
        <hr className='text-gray-400' />
        <div id='commentsData'>
          <p className='pb-3 text-sm font-bold text-gray-600'>
            {videoData ? formatNumber(videoData.statistics.commentCount) : ''}{' '}
            Comments
          </p>
          <div className='flex flex-col gap-5'>
            {commentsData &&
              commentsData.map((comment) => (
                <div key={comment.id} className='flex gap-5'>
                  <img
                    className='h-10 w-10 cursor-pointer rounded-full'
                    src={
                      comment.snippet.topLevelComment.snippet
                        .authorProfileImageUrl
                    }
                    alt='user profile'
                  />
                  <div className='flex flex-col justify-center'>
                    <div>
                      <span className='text-sm font-semibold'>
                        {
                          comment.snippet.topLevelComment.snippet
                            .authorDisplayName
                        }
                      </span>
                      <span className='ml-3 text-xs font-medium text-gray-600'>
                        {timeAgo(
                          comment.snippet.topLevelComment.snippet.publishedAt,
                        )}
                      </span>
                    </div>
                    <p className='line-clamp-2 text-sm text-gray-600'>
                      {comment.snippet.topLevelComment.snippet.textDisplay}
                    </p>
                    <div className='mt-2 flex items-center gap-5'>
                      <div className='flex items-center gap-2'>
                        <button id='like-comment-btn'>
                          <ThumbsUp className='w-5 cursor-pointer' />
                        </button>
                        <span className='text-sm'>
                          {comment.snippet.topLevelComment.snippet.likeCount}
                        </span>
                      </div>
                      <button id='dislike-comment-btn'>
                        <ThumbsDown className='w-5 cursor-pointer' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default PlayVideo
