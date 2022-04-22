import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

const ScrollToTopOnRouteChange = (props: { children: React.ReactNode }) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return <>{props.children}</>
}

export const Router = (props: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange>{props.children}</ScrollToTopOnRouteChange>
    </BrowserRouter>
  )
}
