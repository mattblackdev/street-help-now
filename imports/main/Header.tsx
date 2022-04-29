import React, { Suspense } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ctl } from '../utilities/ctl'
import { useUsername } from '/imports/users/useUser'

export function Header() {
  return (
    <header className="px-7 pt-7 mb-7 flex flex-wrap">
      <h1
        className={ctl(`
          flex
          flex-1
          text-2xl xs:4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl
          font-extrabold 
          [text-shadow:0_7px_4px_rgba(1,0,1,0.74)]
          tracking-wider
          transition-all
        `)}
      >
        <Link
          to="/"
          className={ctl(`
            whitespace-nowrap
            hover:underline
          `)}
        >
          Street Help Now
        </Link>
      </h1>
      <div className="flex">
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
  const showLogin = !username && pathname !== '/login'
  const showProfile = !!username

  if (showLogin) {
    return (
      <Link to="/login" className="hover:underline">
        Login
      </Link>
    )
  } else if (showProfile) {
    return (
      <Link
        to="/profile"
        className={ctl(`
          self-center
          text-right
          flex-1
          md:ml-7
          text-xl xs:text-2xl sm:text-3xl
          transition-all 
          text-stone-700 hover:text-stone-400
          active:text-stone-100
          font-bold
          cursor-pointer
          hover:underline
          whitespace-nowrap
        `)}
      >
        {username}
      </Link>
    )
  }
  return null
}
