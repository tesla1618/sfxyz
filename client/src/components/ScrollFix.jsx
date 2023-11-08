import { useEffect } from 'react'

function ScrollFix() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

export default ScrollFix;