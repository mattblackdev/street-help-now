import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NeedButton } from '../components/NeedButton'
import { CardsList } from './CardsList'
import { EditResourceType } from './EditResourceType'
import { NeedSomething } from './NeedSomething'
import { RequestResource } from './RequestResource'
import { ResourceLayout } from './ResourceLayout'
import { ResourceList } from './ResourceList'
import { useResourceTypes } from './useResourceTypes'
import { useIsAdmin } from '/imports/users/useUser'

export function Home() {
  const resourceTypes = useResourceTypes()
  const isAdmin = useIsAdmin()

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <CardsList showEdit={isAdmin} resourceTypes={resourceTypes} />
          }
        />
        {resourceTypes.map((resourceType) => {
          return (
            <Route
              key={resourceType._id}
              path={resourceType.slug}
              element={<ResourceLayout />}
            >
              <Route
                index
                element={<ResourceList resourceType={resourceType} />}
              />
              {isAdmin ? (
                <Route
                  path="edit"
                  element={<EditResourceType resourceType={resourceType} />}
                />
              ) : null}
            </Route>
          )
        })}
        <Route
          path="need"
          element={<NeedSomething resourceTypes={resourceTypes} />}
        />
        <Route
          path="need/:slug"
          element={<RequestResource resourceTypes={resourceTypes} />}
        />
        <Route path="*" element={<div>Nothing here :(</div>} />
      </Routes>
      <NeedButton />
    </>
  )
}
