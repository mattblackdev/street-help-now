import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Root({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-stone-900 text-stone-100">
      <div className="min-h-screen bg-crimson shadow-sm">{children}</div>
      <footer className="h-44 flex items-end">
        <p className="flex flex-1 pb-10 justify-around text-xl">
          <span>❤️</span>
          <span>Powered by Love</span>
          <span>❤️</span>
        </p>
      </footer>
    </div>
  )
}

export function Layout() {
  return (
    <Root>
      <Header />
      <main>
        <Outlet />
      </main>
    </Root>
  )
}
