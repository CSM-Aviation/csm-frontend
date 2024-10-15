import { useState, useEffect } from 'react'

const useMobile = ({breakPoint}:{
    breakPoint: number
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= breakPoint)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakPoint)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

export default useMobile