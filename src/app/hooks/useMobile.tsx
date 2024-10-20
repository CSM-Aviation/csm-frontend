import { useState, useEffect } from 'react'

const useMobile = ({breakPoint}:{
    breakPoint: number
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakPoint)
    }

    // Check initial state
    checkMobile()

    // Set up event listener
    window.addEventListener('resize', checkMobile)

    // Clean up
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakPoint])

  return isMobile
}

export default useMobile