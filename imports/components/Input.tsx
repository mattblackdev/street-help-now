import React, { forwardRef, InputHTMLAttributes } from 'react'
import { ctl } from '/imports/utilities/ctl'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  helpText?: string
  hidden?: boolean
}

export const Input = forwardRef<HTMLInputElement, TextInputProps>(
  (_props, ref) => {
    if (_props.type === 'checkbox') {
      return <Checkbox {..._props} ref={ref} />
    }

    const { error, helpText, hidden, ...props } = _props

    return (
      <div className={ctl(`mt-7 ${hidden ? 'hidden' : 'relative'}`)}>
        <input
          className={ctl(`
            my-1
            leading-8
            peer
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
          -top-4
          text-stone-400 
          text-sm
          cursor-pointer
          transition-all 
          peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-stone-400 
          peer-placeholder-shown:top-1
          peer-focus:-top-4
          peer-focus:text-sapphire 
          peer-focus:text-sm
        `)}
        >
          {props.required ? `${props.placeholder} *` : props.placeholder}
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

export const Checkbox = forwardRef<HTMLInputElement, TextInputProps>(
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
            type="checkbox"
            {...props}
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
