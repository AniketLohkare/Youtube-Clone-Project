import { Check, Copy, X } from 'lucide-react'
import { useState } from 'react'

const ShareModal = ({ setShowShareModal }) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false)

  const url = window.location.href

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setIsLinkCopied(true)
  }

  return (
    <div className='fixed inset-0 top-0 left-0 z-50 m-auto flex h-fit w-[90vw] max-w-xl flex-col gap-3 rounded-2xl bg-white px-2.5 py-5 sm:rounded-4xl sm:py-8 lg:w-[60vw] lg:gap-4 lg:px-5'>
      <div className='flex items-center justify-between text-xl sm:text-2xl'>
        <h4>Shareable public link</h4>
        <button
          id='close-btn'
          className='cursor-pointer rounded-full p-0.5 hover:bg-gray-200'
          onClick={() => setShowShareModal(false)}
        >
          <X className='h-6 w-6 sm:h-7 sm:w-7' />
        </button>
      </div>
      <div className='xs:text-xs flex flex-1 cursor-pointer items-center justify-between rounded-4xl bg-gray-200 p-1 text-[10px] sm:p-2 sm:text-[16px]'>
        <div className='p-1.5 sm:p-3'>
          <span className='line-clamp-1 select-none'>{url}</span>
        </div>
        <div
          onClick={handleCopy}
          className='flex shrink-0 items-center justify-between gap-1.5 rounded-4xl bg-blue-600 px-3 py-2 hover:brightness-110 sm:gap-3 sm:px-6'
        >
          {isLinkCopied ? (
            <>
              <Check className='h-3 w-3 stroke-white sm:h-4 sm:w-4' />
              <span className='font-medium text-white'>Link copied</span>
            </>
          ) : (
            <>
              <Copy className='h-3 w-3 stroke-white sm:h-4 sm:w-4' />
              <span className='font-medium text-white'>Copy link</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default ShareModal
