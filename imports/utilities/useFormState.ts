import { useState } from 'react'
import { ValiantError } from './makeMethod'

export function useFormState() {
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<ValiantError>({})
  const [error, setError] = useState('')

  const handleError = (error: Error | ValiantError) => {
    if (error instanceof ValiantError) {
      setErrors(error)
      console.log('setErrors', error)
    } else {
      console.log('setYamama', error.message)
      setError(error.message)
    }
    setSubmitting(false)
  }

  return {
    errors,
    error,
    submitting,
    handleError,
    setError,
    setSubmitting,
  }
}
