import { Accounts } from 'meteor/accounts-base'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Form, SmallFormContainer } from '/imports/components/Form'
import { Submit } from '/imports/components/Submit'
import { TextInput } from '/imports/components/TextInput'
import { PasswordPattern, UsernamePattern } from '/imports/main/constants'

export function Signup() {
  const [failed, setFailed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string; password: string }>()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    setSubmitting(true)
    Accounts.createUser(
      { username: data.username, password: data.password },
      (error) => {
        setSubmitting(false)
        if (error) {
          setFailed(true)
        } else {
          navigate('/')
        }
      }
    )
  })

  return (
    <SmallFormContainer>
      <Form
        onSubmit={onSubmit}
        title="Create an account. We're glad you found us!"
      >
        <TextInput
          {...register('username', {
            pattern: UsernamePattern,
            minLength: 2,
            maxLength: 100,
            required: true,
          })}
          placeholder="Username"
          autoComplete="username"
          error={!!errors.username}
          helpText="Use your real life name or any available username. Must be at least 2 letters or numbers."
        />
        <TextInput
          {...register('password', {
            pattern: PasswordPattern,
            minLength: 10,
            maxLength: 100,
            required: true,
          })}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          error={!!errors.password}
          helpText={`Craft a memorable phrase with at least 16 letters. Use lowercase and spaces only. For example: "i like to walk my dog".`}
        />
        <Submit
          text="Sign Up"
          submitting={submitting}
          error={
            failed
              ? 'There was a problem signing up. Try a different username?'
              : undefined
          }
        />
      </Form>
    </SmallFormContainer>
  )
}
