import { useState } from 'react'
import PlayVideo from '../components/PlayVideo'
import Recommended from '../components/Recommended'

const Video = () => {
  const [videoData, setVideoData] = useState(null)
  return (
    <div className='flex gap-5'>
      <PlayVideo videoData={videoData} setVideoData={setVideoData} />
      <Recommended videoData={videoData} />
    </div>
  )
}
export default Video
