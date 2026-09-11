const SearchSkeleton = () => {
  return (
    <div className='flex animate-pulse flex-col gap-5'>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className='flex min-w-0 flex-col gap-4 sm:flex-row'>
          {/* Thumbnail */}
          <div className='aspect-video w-full shrink-0 self-start rounded-xl bg-gray-200 sm:max-w-xs lg:max-w-md dark:bg-zinc-800' />

          {/* Content */}
          <div className='flex min-w-0 flex-1 flex-col gap-1'>
            {/* Title */}
            <div className='flex flex-col gap-2'>
              <div className='h-5 w-full rounded bg-gray-200 dark:bg-zinc-800' />
              <div className='h-5 w-9/12 rounded bg-gray-200 dark:bg-zinc-800' />
            </div>

            {/* Channel + Stats */}
            <div className='mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 xl:flex-col xl:items-start xl:gap-y-1'>
              {/* Channel */}
              <div className='flex items-center gap-2'>
                <div className='h-6 w-6 shrink-0 rounded-full bg-gray-200 md:h-7 md:w-7 dark:bg-zinc-800' />

                <div className='h-4 w-32 rounded bg-gray-200 dark:bg-zinc-800' />
              </div>

              {/* Time + Views */}
              <div className='flex items-center gap-2 sm:gap-3'>
                <div className='h-3 w-20 rounded bg-gray-200 dark:bg-zinc-800' />
                <div className='h-3 w-24 rounded bg-gray-200 dark:bg-zinc-800' />
              </div>
            </div>

            {/* Description */}
            <div className='mt-2 hidden flex-col gap-2 sm:flex'>
              <div className='h-3 w-full rounded bg-gray-200 dark:bg-zinc-800' />
              <div className='h-3 w-11/12 rounded bg-gray-200 dark:bg-zinc-800' />
              <div className='h-3 w-9/12 rounded bg-gray-200 dark:bg-zinc-800' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchSkeleton
