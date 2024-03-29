import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ctl } from '../utilities/ctl'
import { AnimateMount } from './AnimateMount'

export function NeedButton() {
  const { pathname } = useLocation()

  return (
    <div className="fixed bottom-7 left-4 md:left-7">
      <AnimateMount
        inClass="animate-wiggle"
        outClass="animate-slideOut"
        show={pathname === '/'}
      >
        <Link
          to="/need"
          className={ctl(`
            px-3 py-3 md:px-7 lg:px-10 
            rounded-3xl transition-all 
            bg-stone-300 border-2
            border-stone-200 hover:border-stone-100
            shadow-lg hover:shadow-xl
            text-blood hover:text-white
            md:text-lg
            font-semibold md:font-bold
            text-center block w-full tracking-wider
            focus:outline-none focus:ring focus:ring-offset-2
            focus:ring-rose-500 focus:ring-opacity-80
            cursor-pointer
          `)}
        >
          Need Something?
        </Link>
      </AnimateMount>
    </div>
  )
}
