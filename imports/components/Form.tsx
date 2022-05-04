import React, { ReactNode } from 'react'

type FormProps = {
  onSubmit: () => void
  title: string
  children: ReactNode
}

export function Form({ onSubmit, title, children }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="relative p-7 pt-16 bg-stone-200 text-stone-900 rounded-md shadow"
    >
      <h2 className="text-3xl mb-16 text-center">{title}</h2>
      {children}
    </form>
  )
}

export function SmallFormContainer({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-md lg:max-w-lg w-11/12 mx-auto pb-7">{children}</div>
  )
}
