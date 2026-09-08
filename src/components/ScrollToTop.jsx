import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ scrollRef }) => {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [pathname, scrollRef])
  return null
}
export default ScrollToTop
