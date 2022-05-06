import { useState } from 'react'
import { ValiantError } from './validatedMethod'

export function useFormErrors() {
  const [errors, setErrors] = useState<ValiantError>({})
  const [error, setError] = useState('')
  const handleError = (error: Error | ValiantError) => {
    if (error instanceof ValiantError) {
      setErrors(error)
    } else {
      setError(error.message)
    }
  }
  return {
    errors,
    error,
    handleError,
  }
}
