import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { DelayedFallback } from '../components/DelayedFallback'
import { ResourceType } from './api'

type ResourceProps = { resourceType: ResourceType }
export function ResourceLayout({ resourceType }: ResourceProps) {
  return (
    <Suspense fallback={<DelayedFallback />}>
      <Outlet />
    </Suspense>
  )
}
