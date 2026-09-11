const HomeSkeleton = () => {
  return (
    <section className='m-2 grid flex-1 animate-pulse grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 12 }, (_, index) => (
        // video card
        <div key={index} className='flex flex-col self-start rounded-xl'>
          {/* video thumbnail */}
          <div className='aspect-video w-full rounded-lg bg-gray-200 dark:bg-zinc-800'></div>
          <div className='flex gap-2 pt-2'>
            {/* channel thumbnail */}
            <div className='mt-0.5 h-8 w-8 shrink-0 rounded-full bg-gray-200 md:h-9 md:w-9 dark:bg-zinc-800'></div>
            <div className='flex-1'>
              {/* title */}
              <div className='h-4 w-full rounded bg-gray-200 dark:bg-zinc-800'></div>
              <div className='mt-2 h-4 w-3/4 bg-gray-200 dark:bg-zinc-800'></div>
              {/* channel name */}
              <div className='mt-3 h-3 w-2/5 rounded bg-gray-200 dark:bg-zinc-800' />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
export default HomeSkeleton
