const VideoPlayerSkeleton = () => {
  return (
    <div className='animate-pulse'>
      {/* Video */}
      <div className='aspect-video w-full rounded-xl bg-gray-200 dark:bg-zinc-800' />

      <div className='flex flex-col gap-3'>
        {/* Title + Stats + Actions */}
        <div className='min-w-0'>
          {/* Title */}
          <div className='mb-3 flex flex-col gap-2'>
            <div className='h-5 w-11/12 rounded bg-gray-200 sm:h-6 dark:bg-zinc-800' />
            <div className='h-5 w-7/12 rounded bg-gray-200 sm:h-6 dark:bg-zinc-800' />
          </div>

          {/* Stats + Actions */}
          <div className='flex flex-wrap items-center justify-between gap-x-8 gap-y-3'>
            {/* Views + date */}
            <div className='flex items-center gap-2'>
              <div className='h-3 w-16 rounded bg-gray-200 sm:h-4 sm:w-20 dark:bg-zinc-800' />
              <div className='h-3 w-1 rounded bg-gray-200 sm:h-4 dark:bg-zinc-800' />
              <div className='h-3 w-16 rounded bg-gray-200 sm:h-4 sm:w-20 dark:bg-zinc-800' />
            </div>

            {/* Like / Share / Save */}
            <div className='flex items-center gap-5 sm:gap-4'>
              {/* Like + Dislike */}
              <div className='flex overflow-hidden rounded-4xl'>
                <div className='h-9 w-20 bg-gray-200 sm:h-10 dark:bg-zinc-800' />
                <div className='h-9 w-10 border-l border-gray-300 bg-gray-200 sm:h-10 dark:border-zinc-700 dark:bg-zinc-800' />
              </div>

              {/* Share */}
              <div className='h-9 w-10 rounded-4xl bg-gray-200 sm:h-10 sm:w-20 dark:bg-zinc-800' />

              {/* Save */}
              <div className='h-9 w-10 rounded-4xl bg-gray-200 sm:h-10 sm:w-20 dark:bg-zinc-800' />
            </div>
          </div>
        </div>

        <hr className='border-gray-300 dark:border-gray-700' />

        {/* Channel + Subscribe */}
        <div className='flex min-w-0 flex-wrap items-center justify-between gap-x-5 gap-y-2'>
          <div className='flex min-w-0 items-center gap-2 sm:gap-4'>
            {/* Avatar */}
            <div className='h-8 w-8 shrink-0 rounded-full bg-gray-200 sm:h-10 sm:w-10 dark:bg-zinc-800' />

            {/* Channel name + subscribers */}
            <div className='flex min-w-0 flex-col gap-2'>
              <div className='h-4 w-32 rounded bg-gray-200 sm:h-5 sm:w-40 dark:bg-zinc-800' />
              <div className='h-3 w-24 rounded bg-gray-200 sm:h-4 sm:w-28 dark:bg-zinc-800' />
            </div>
          </div>

          {/* Subscribe button */}
          <div className='h-8 w-34 rounded-full bg-gray-200 sm:h-10 sm:w-40 dark:bg-zinc-800' />
        </div>

        {/* Description */}
        <div className='min-w-0 bg-gray-200 px-3 py-2 dark:bg-slate-900'>
          <div className='flex flex-col gap-2'>
            <div className='h-3 w-full rounded bg-gray-300 dark:bg-zinc-800' />
            <div className='h-3 w-11/12 rounded bg-gray-300 dark:bg-zinc-800' />
            <div className='h-3 w-10/12 rounded bg-gray-300 dark:bg-zinc-800' />
            <div className='h-3 w-9/12 rounded bg-gray-300 dark:bg-zinc-800' />
            <div className='h-3 w-7/12 rounded bg-gray-300 dark:bg-zinc-800' />
          </div>
        </div>

        <hr className='border-gray-300 dark:border-gray-700' />
      </div>
    </div>
  )
}

export default VideoPlayerSkeleton
