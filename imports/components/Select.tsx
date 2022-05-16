import React, { forwardRef, SelectHTMLAttributes } from 'react'
import { ctl } from '/imports/utilities/ctl'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean
  helpText?: string
  hidden?: boolean
  multiple?: boolean
  options?: Array<{ label: string; value: string }>
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, helpText, hidden, options = [], ...props }, ref) => {
    return (
      <div className={ctl(`mt-7 ${hidden ? 'hidden' : 'relative'} group`)}>
        <label
          htmlFor={props.name}
          className={ctl(`
          text-stone-400 text-sm
          cursor-pointer transition-all 
          group-focus-within:text-sapphire
        `)}
        >
          {props.required ? `${props.placeholder} *` : props.placeholder}
        </label>
        <div
          className={ctl(`
          my-1
          grid [grid-template-areas:"select"] items-center
          border-2 rounded border-stone-700 cursor-pointer py-1 px-2
          transition-all group-focus-within:border-sapphire
          ${
            props.multiple
              ? ''
              : 'after:[content:""] after:justify-self-end after:[width:0.8em] after:[height:0.5em] after:bg-stone-900 after:[grid-area:select] after-arrow-path'
          }
        `)}
        >
          <select
            className={ctl(`
            appearance-none bg-transparent border-none p-0 pr-4 m-0 w-full
            [grid-area:select] z-10 outline-none
            ${props.multiple ? 'pr-0 h-28' : ''}
          `)}
            {...props}
            ref={ref}
          >
            {options.map(({ value, label }) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </div>
        <p
          className={ctl(`
            text-xs focus:text-sapphire min-h-4 pb-1
            ${error ? 'text-brightblood' : 'text-stone-400'} 
          `)}
        >
          {helpText}
        </p>
      </div>
    )
  }
)
