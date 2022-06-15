import React, { ReactNode } from 'react'

type FormProps = {
  onSubmit: () => void
  title: string
  children: ReactNode
}

export function Form({ onSubmit, title, children }: FormProps) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <h2 className="text-3xl mb-16 text-center">{title}</h2>
      {children}
    </form>
  )
}
