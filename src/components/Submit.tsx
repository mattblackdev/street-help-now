import React from 'react'

type Props = { text: string; error?: string; submitting?: boolean }

export function Submit({ text, error, submitting }: Props) {
  return (
    <div className="grid grid-flow-col grid-rows-2">
      <p className="text-brightblood mb-2">{error}</p>
      <input
        type="submit"
        value={text}
        disabled={submitting}
        className="px-4 py-2 rounded bg-blood hover:bg-brightblood text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
      />
    </div>
  )
}
