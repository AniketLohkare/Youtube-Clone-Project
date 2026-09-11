const RecommendedSkeleton = () => {
  return (
    <div className='grid basis-[35%] grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-1 sm:grid-cols-[repeat(auto-fit,minmax(330px,1fr))] lg:max-h-0'>
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className='flex animate-pulse flex-col gap-3 self-start p-1.5 lg:flex-row'
        >
          <div className='aspect-video shrink-0 rounded-md bg-gray-200 lg:w-3/5 dark:bg-zinc-800' />

          <div className='flex min-w-0 flex-1 flex-col'>
            <div className='h-5 w-full rounded bg-gray-200 dark:bg-zinc-800' />
            <div className='mt-2 h-5 w-4/5 rounded bg-gray-200 dark:bg-zinc-800' />
            <div className='mt-2 h-4 w-2/5 rounded bg-gray-200 dark:bg-zinc-800' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecommendedSkeleton
