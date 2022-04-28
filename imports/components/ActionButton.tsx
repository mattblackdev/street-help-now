import React, { MouseEventHandler, ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function ActionButton({ children, onClick }: Props) {
  return (
    <button
      type="button"
      className="bg-stone-800 text-stone-100 border-2 px-2 rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
