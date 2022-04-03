import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '/imports/resources/Home'
import { Login } from '/imports/users/Login'
import { Profile } from '/imports/users/Profile'
import { Signup } from '/imports/users/Signup'
import { Layout } from './Layout'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/*"
            element={
              <Suspense fallback={null}>
                <Home />
              </Suspense>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
