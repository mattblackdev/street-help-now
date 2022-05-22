import React from 'react'
import { ctl } from '../utilities/ctl'

type Props = {
  text: string
  error?: string
  submitting?: boolean
  accent?: boolean
}

export function Submit({ text, error, submitting, accent }: Props) {
  return (
    <div className="grid grid-flow-col grid-rows-2">
      <p className="text-brightblood mb-2">{error}</p>
      <input
        type="submit"
        value={text}
        disabled={submitting}
        className={ctl(`
          px-4 py-2 rounded 
        ${
          !accent
            ? 'bg-blood hover:bg-brightblood'
            : 'bg-stone-100 text-sapphire border-sapphire border-2 hover:bg-sapphire hover:text-stone-100'
        }
        text-white font-semibold text-center 
          block w-full focus:outline-none focus:ring focus:ring-offset-2 
        focus:ring-rose-500 focus:ring-opacity-80 
          cursor-pointer
        `)}
      />
    </div>
  )
}
