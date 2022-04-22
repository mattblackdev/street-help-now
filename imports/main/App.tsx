import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Router } from '/imports/components/Router'
import { Layout } from '/imports/main/Layout'
import { Home } from '/imports/resources/Home'
import { Login } from '/imports/users/Login'
import { Profile } from '/imports/users/Profile'
import { Signup } from '/imports/users/Signup'

export function App() {
  return (
    <Router>
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
    </Router>
  )
}
