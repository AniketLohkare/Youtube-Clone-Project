import { useState } from 'react'
import PlayVideo from '../components/VideoPage/PlayVideo'
import Recommended from '../components/VideoPage/Recommended'

const Video = () => {
  const [videoData, setVideoData] = useState(null)
  return (
    <div className='flex flex-col gap-5 xl:flex-row'>
      <PlayVideo videoData={videoData} setVideoData={setVideoData} />
      <Recommended videoData={videoData} />
    </div>
  )
}
export default Video
