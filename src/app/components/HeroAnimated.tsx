import { useRef } from 'react'
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'

export function HeroAnimated() {
  const ref = useRef<FireworksHandlers>(null)

  return (
    <>
      <Fireworks
        ref={ref}
        options={{ opacity: 0.5 }}
        style={{
          width: '100%',
          height: '100vh',
          position: 'absolute',
          top: 0,
          zIndex: 100,
          pointerEvents: 'none'
        }}
      />
    </>
  )
}