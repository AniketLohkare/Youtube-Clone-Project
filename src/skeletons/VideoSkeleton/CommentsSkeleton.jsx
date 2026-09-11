const CommentsSkeleton = () => {
  return (
    <div className='flex flex-col gap-5'>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className='flex animate-pulse gap-3 sm:gap-5'>
          <div className='h-8 w-8 shrink-0 rounded-full bg-gray-200 sm:h-10 sm:w-10 dark:bg-zinc-800' />
          <div className='flex flex-1 flex-col gap-2'>
            <div className='h-4 w-32 rounded bg-gray-200 dark:bg-zinc-800' />
            <div className='h-4 w-full rounded bg-gray-200 dark:bg-zinc-800' />
            <div className='h-4 w-3/5 rounded bg-gray-200 dark:bg-zinc-800' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentsSkeleton
