import React from 'react'

type FormProps = {
  onSubmit: () => void
  title: string
  children: React.ReactElement[]
}

export function Form({ onSubmit, title, children }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="relative p-7 bg-stone-200 text-stone-900 rounded-md"
    >
      <h2 className="text-xl mb-7 text-center">{title}</h2>
      {children}
    </form>
  )
}

export function SmallFormContainer({ children }: { children: JSX.Element }) {
  return <div className="max-w-md lg:max-w-lg w-11/12 mx-auto">{children}</div>
}
