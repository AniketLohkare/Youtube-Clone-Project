import { useState } from 'react'
import PlayVideo from '../components/PlayVideo'
import Recommended from '../components/Recommended'

const Video = () => {
  const [videoData, setVideoData] = useState(null)
  return (
    <div className='flex flex-col gap-5 lg:flex-row'>
      <PlayVideo videoData={videoData} setVideoData={setVideoData} />
      <Recommended videoData={videoData} />
    </div>
  )
}
export default Video
