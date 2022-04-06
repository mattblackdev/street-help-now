import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useIsAdmin } from '/imports/users/useUser'
import { CardsList } from './CardsList'
import { ResourceLayout } from './ResourceLayout'
import { useResourceTypes } from './useResourceTypes'
import { ResourceList } from './ResourceList'

export function Home() {
  const resourceTypes = useResourceTypes()
  const isAdmin = useIsAdmin()

  return (
    <Routes>
      <Route
        index
        element={<CardsList showEdit={isAdmin} resourceTypes={resourceTypes} />}
      />
      {resourceTypes.map((resourceType) => {
        return (
          <Route
            key={resourceType._id}
            path={resourceType.slug}
            element={<ResourceLayout resourceType={resourceType} />}
          >
            <Route
              index
              element={<ResourceList resourceType={resourceType} />}
            />
            {isAdmin ? (
              <Route
                path="edit"
                element={
                  <div className="p-7 text-xl text-center font-semibold">
                    <span className="text-xl pr-7">🚧</span>Edit{' '}
                    {resourceType.title}
                    <span className="text-xl pl-7">🚧</span>
                  </div>
                }
              />
            ) : null}
          </Route>
        )
      })}
      <Route path="*" element={<div>Nothing here :(</div>} />
    </Routes>
  )
}
