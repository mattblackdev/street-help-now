import React from 'react'

type Props = {
  remove: Function
  index: number
}

export function RemoveButton({ remove, index }: Props) {
  return (
    <button
      className="bg-stone-800 text-stone-100 border-2 px-2 rounded-md"
      onClick={() => remove(index)}
    >
      x
    </button>
  )
}
