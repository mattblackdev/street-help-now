import React, { Suspense } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUsername } from 'src/users/useUser'

export function Header() {
  return (
    <header className="w-full p-7 md:px-10 lg:mb-7 grid grid-cols-3 items-center">
      <div className="justify-self-start">
        <Suspense fallback={null}>
          <Signup />
        </Suspense>
      </div>
      <h1 className="justify-self-center pl-2">
        <Link
          to="/"
          className="whitespace-nowrap text-xl sm:text-4xl lg:text-7xl font-extrabold text-center [text-shadow:0_4px_7px_rgba(1,0,1,0.44)] hover:underline"
        >
          Street Help Now
        </Link>
      </h1>
      <div className="justify-self-end pr-1">
        <Suspense fallback={null}>
          <UsernameOrLogin />
        </Suspense>
      </div>
    </header>
  )
}

function UsernameOrLogin() {
  const { pathname } = useLocation()
  const username = useUsername()
  const showLogin = !username && !pathname.includes('login')
  const showProfile = !!username

  if (showLogin) {
    return (
      <Link to="/login" className="hover:underline">
        Login
      </Link>
    )
  } else if (showProfile) {
    return (
      <Link to="/profile" className="text-xs hover:underline">
        {username}
      </Link>
    )
  }
  return null
}

function Signup() {
  const { pathname } = useLocation()
  const username = useUsername()
  const showSignUp =
    !username && !pathname.includes('signup') && !pathname.includes('login')

  if (showSignUp) {
    return (
      <Link to="/signup" className="hover:underline">
        Sign Up
      </Link>
    )
  }
  return null
}
