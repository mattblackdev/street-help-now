import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { useIsAdmin } from '/imports/users/useUser'
import { CardsList } from './CardsList'
import { ResourceLayout } from './ResourceLayout'
import { useResourceTypes } from './useResourceTypes'
import { ResourceList } from './ResourceList'

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
      <div className="fixed bottom-7 left-4 md:left-7">
        <Link
          to="/need-something"
          className="px-3 py-3 md:px-7 lg:px-10 rounded-3xl transition-all bg-stone-300 border-2 border-stone-200 hover:border-stone-100 shadow-lg hover:shadow-xl text-blood hover:text-white md:text-lg font-semibold md:font-bold text-center block w-full tracking-wider focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer [text-shadow:0_4px_7px_rgba(1,0,1,0.44)]"
        >
          Need Something
        </Link>
      </div>
    </>
  )
}
