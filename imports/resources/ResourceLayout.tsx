import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { DelayedFallback } from '../components/DelayedFallback'

export function ResourceLayout() {
  return (
    <Suspense fallback={<DelayedFallback />}>
      <Outlet />
    </Suspense>
  )
}
