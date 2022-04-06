import React, { useState, useEffect } from 'react'
import { Show } from './Show'

export const DelayedFallback = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Show when={show}>
      <h3>Loading...</h3>
    </Show>
  )
}
