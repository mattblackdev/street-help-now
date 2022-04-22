import React, { forwardRef, InputHTMLAttributes } from 'react'
import { ctl } from '/imports/utilities/ctl'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  helpText?: string
  hidden?: boolean
}

export const Input = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, helpText, hidden, ...props }, ref) => {
    return (
      <div className={ctl(`py-10 ${hidden ? 'hidden' : 'relative'}`)}>
        <input
          className={ctl(`
            peer 
            h-10
            text-xl
            w-full
            bg-transparent 
            border-b-2
            ${error ? 'border-brightblood' : 'border-stone-400'}
            text-stone-900
            placeholder-transparent
            focus:outline-none
            focus:border-sapphire
        `)}
          id={props.name}
          {...props}
          ref={ref}
        />
        <label
          htmlFor={props.name}
          className={ctl(`
          absolute 
          left-0 
          top-4
          text-stone-400 
          text-sm
          cursor-pointer
          transition-all 
          peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-stone-400 
          peer-placeholder-shown:top-2
          peer-focus:top-2
          peer-focus:text-sapphire 
          peer-focus:text-sm
        `)}
        >
          {props.required ? `${props.placeholder} *` : props.placeholder}
        </label>
        <p
          className={ctl(
            `text-xs ${
              error ? 'text-brightblood' : 'text-stone-400'
            } focus:text-sapphire
            pt-1`
          )}
        >
          {helpText}
        </p>
      </div>
    )
  }
)
