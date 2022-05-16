import React, { forwardRef, InputHTMLAttributes } from 'react'
import { ctl } from '/imports/utilities/ctl'

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  helpText?: string
  hidden?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ error, helpText, hidden, ...props }, ref) => {
    return (
      <div className={ctl(`mt-7 ${hidden ? 'hidden' : 'relative'}`)}>
        <label
          htmlFor={props.name}
          className={ctl(`
          text-stone-400 
          cursor-pointer
          transition-all 
          w-full 
          flex 
          justify-between
          items-center
          focus-within:text-sapphire
        `)}
        >
          {props.required ? `${props.placeholder} *` : props.placeholder}
          <input
            className={ctl(`
            w-11 
            h-11
            leading-8
            bg-transparent
            border-b-2
            ${error ? 'border-brightblood' : 'border-stone-400'}
            text-stone-900
            placeholder-transparent
            focus:border-sapphire
        `)}
            id={props.name}
            {...props}
            type="checkbox"
            ref={ref}
          />
        </label>
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
