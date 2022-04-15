import React, { useEffect, useState } from 'react'

type Props = {
  show: boolean
  children: React.ReactNode
  inClass?: string
  outClass?: string
}
export function AnimateMount({ show, children, inClass, outClass }: Props) {
  const [shouldRender, setRender] = useState(show)

  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) setRender(false)
  }

  if (!shouldRender) return null

  return (
    <div className={show ? inClass : outClass} onAnimationEnd={onAnimationEnd}>
      {children}
    </div>
  )
}
