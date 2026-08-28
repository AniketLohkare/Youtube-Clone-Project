import { X, Link } from 'lucide-react'
import { useState } from 'react'
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaRedditAlien,
  FaLinkedinIn,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const ShareModal = ({ setShowShareModal }) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false)

  const url = window.location.href

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setIsLinkCopied(true)

    setTimeout(() => {
      setIsLinkCopied(false)
    }, 2000)
  }

  const shareOn = (platform) => {
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      reddit: `https://www.reddit.com/submit?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}`,
      telegram: `https://t.me/share/url?url=${url}`,
    }

    window.open(shareUrls[platform], '_blank')
  }

  return (
    <div
      id='share-modal'
      className='fixed inset-0 top-0 left-0 z-50 m-auto flex h-fit w-[calc(100%-1rem)] max-w-xs flex-col gap-4 rounded-lg bg-white p-3 sm:max-w-md sm:gap-6 sm:rounded-2xl sm:p-6'
    >
      <div className='flex items-center justify-between font-semibold'>
        <h4 className='text-xl sm:text-2xl'>Shareable this video</h4>
        <button
          id='close-btn'
          className='cursor-pointer rounded-full bg-gray-200 p-1.5 hover:bg-gray-300 sm:p-2'
          onClick={() => setShowShareModal(false)}
        >
          <X className='h-5 w-5 sm:h-7 sm:w-7' />
        </button>
      </div>
      <hr className='text-gray-400' />
      <div id='share-link' className='flex flex-col gap-2 sm:gap-3'>
        <h5 className='text-lg sm:text-xl'>Share this link via</h5>
        <div id='icons' className='flex items-center justify-between gap-1'>
          <button
            onClick={() => shareOn('whatsapp')}
            className='group cursor-pointer rounded-full border border-green-300 p-1.5 hover:bg-green-500 sm:p-3'
          >
            <FaWhatsapp className='h-6 w-6 text-green-500 group-hover:text-white sm:h-7 sm:w-7' />
          </button>
          <button
            onClick={() => shareOn('linkedin')}
            className='group cursor-pointer rounded-full border border-blue-300 p-1.5 hover:bg-blue-600 sm:p-3'
          >
            <FaLinkedinIn className='h-6 w-6 text-blue-600 group-hover:text-white sm:h-7 sm:w-7' />
          </button>
          <button
            onClick={() => shareOn('reddit')}
            className='group cursor-pointer rounded-full border border-orange-300 p-1.5 hover:bg-orange-600 sm:p-3'
          >
            <FaRedditAlien className='h-6 w-6 text-orange-600 group-hover:text-white sm:h-7 sm:w-7' />
          </button>
          <button
            onClick={() => shareOn('twitter')}
            className='group cursor-pointer rounded-full border border-zinc-300 p-1.5 hover:bg-black sm:p-3'
          >
            <FaXTwitter className='h-6 w-6 group-hover:text-white sm:h-7 sm:w-7' />
          </button>
          <button
            onClick={() => shareOn('telegram')}
            className='group cursor-pointer rounded-full border border-sky-300 p-1.5 hover:bg-sky-400 sm:p-3'
          >
            <FaTelegramPlane className='h-6 w-6 text-blue-400 group-hover:text-white sm:h-7 sm:w-7' />
          </button>
        </div>
      </div>
      <div id='copy-link' className='flex flex-col gap-2 sm:gap-3'>
        <h5 className='text-lg sm:text-xl'>Or copy link</h5>
        <div className='flex items-center justify-between gap-2 rounded-md border border-gray-300 p-1 sm:gap-5 sm:rounded-lg sm:border-2 sm:p-2'>
          <div className='flex flex-1 items-center gap-1'>
            <Link className='h-3 w-3 sm:h-5 sm:w-5' />
            <span className='truncate text-xs select-none sm:text-lg'>
              {url.slice(0, 25)}...
            </span>
          </div>
          <button
            onClick={handleCopy}
            className='flex w-22 cursor-pointer items-center justify-center rounded-sm bg-purple-600 py-1 hover:brightness-110 sm:w-30 sm:rounded-lg sm:py-1.5'
          >
            <span className='text-sm font-medium text-white sm:text-lg'>
              {isLinkCopied ? 'Copied' : 'Copy'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
export default ShareModal
