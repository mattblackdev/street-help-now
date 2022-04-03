import React, { forwardRef, InputHTMLAttributes } from 'react'
import { ctl } from 'src/utilities/ctl'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  helpText?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, helpText, ...props }, ref) => {
    return (
      <div className="my-7 relative">
        <input
          className={ctl(`
            peer 
            h-10 
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
          -top-3.5 
          text-stone-400 
          text-sm
          cursor-pointer
          transition-all 
          peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-stone-700 
          peer-placeholder-shown:top-2 
          peer-focus:-top-3.5 
          peer-focus:text-sapphire 
          peer-focus:text-sm
        `)}
        >
          {props.placeholder}
        </label>
        <p className={ctl(`mt-1 text-sm ${error ? 'text-brightblood' : ''}`)}>
          {helpText}
        </p>
      </div>
    )
  }
)
