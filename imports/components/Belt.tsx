import React, { ReactNode } from 'react'

export function Belt({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-md lg:max-w-lg w-11/12 mx-auto pb-7">
      <div className="relative p-7 pt-16 bg-stone-200 text-stone-900 rounded-md shadow">
        {children}
      </div>
    </div>
  )
}
