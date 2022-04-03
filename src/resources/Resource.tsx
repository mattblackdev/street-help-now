import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { ResourceType } from './api'

type ResourceProps = { resourceType: ResourceType }
export function Resource({ resourceType }: ResourceProps) {
  return <Outlet />
}
