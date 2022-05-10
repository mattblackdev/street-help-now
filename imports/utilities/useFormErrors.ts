import { useState } from 'react'
import { ValiantError } from './makeMethod'

type Options = {
  setSubmitting?(submitting: boolean): void
}

export function useFormErrors({ setSubmitting }: Options = {}) {
  const [errors, setErrors] = useState<ValiantError>({})
  const [error, setError] = useState('')

  const handleError = (error: Error | ValiantError) => {
    if (error instanceof ValiantError) {
      setErrors(error)
    } else {
      setError(error.message)
    }
    setSubmitting && setSubmitting(false)
  }

  return {
    errors,
    error,
    handleError,
  }
}
