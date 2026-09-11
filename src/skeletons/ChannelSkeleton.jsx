const ChannelSkeleton = () => {
  return (
    <main className='animate-pulse px-4 py-6 md:px-8'>
      {/* Channel Header */}
      <section className='mx-auto max-w-6xl'>
        {/* Banner */}
        <div className='h-[24vw] w-full rounded-xl bg-gray-200 md:h-[12vw] dark:bg-zinc-800' />

        {/* Profile Information */}
        <div className='flex flex-col gap-5 py-6 md:flex-row md:items-center'>
          {/* Avatar */}
          <div className='h-28 w-28 shrink-0 rounded-full bg-gray-200 dark:bg-zinc-800' />

          {/* Details */}
          <div className='flex-1'>
            {/* Channel name */}
            <div className='h-7 w-52 rounded bg-gray-200 md:h-8 md:w-64 dark:bg-zinc-800' />

            {/* Custom URL */}
            <div className='mt-2 h-4 w-32 rounded bg-gray-200 dark:bg-zinc-800' />

            {/* Subscribers */}
            <div className='mt-3 h-4 w-36 rounded bg-gray-200 dark:bg-zinc-800' />

            {/* Description */}
            <div className='mt-4 flex max-w-2xl flex-col gap-2'>
              <div className='h-3 w-full rounded bg-gray-200 dark:bg-zinc-800' />
              <div className='h-3 w-11/12 rounded bg-gray-200 dark:bg-zinc-800' />
              <div className='h-3 w-10/12 rounded bg-gray-200 dark:bg-zinc-800' />
              <div className='h-3 w-8/12 rounded bg-gray-200 dark:bg-zinc-800' />
            </div>

            {/* Subscribe */}
            <div className='mt-4 h-9 w-28 rounded-full bg-gray-200 dark:bg-zinc-800' />
          </div>
        </div>
      </section>

      {/* Latest Videos */}
      <section className='mx-auto mt-4 max-w-6xl'>
        {/* Heading */}
        <div className='mb-5 h-6 w-36 rounded bg-gray-200 dark:bg-zinc-800' />

        {/* Video Cards */}
        <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='min-w-0 p-2'>
              {/* Thumbnail */}
              <div className='aspect-video w-full rounded-xl bg-gray-200 dark:bg-zinc-800' />

              {/* Title */}
              <div className='mt-3 flex flex-col gap-2'>
                <div className='h-4 w-full rounded bg-gray-200 dark:bg-zinc-800' />
                <div className='h-4 w-8/12 rounded bg-gray-200 dark:bg-zinc-800' />
              </div>

              {/* Views + time */}
              <div className='mt-2 h-3 w-36 rounded bg-gray-200 dark:bg-zinc-800' />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ChannelSkeleton
