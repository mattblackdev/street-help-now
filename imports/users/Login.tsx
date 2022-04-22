import { Meteor } from 'meteor/meteor'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Form, SmallFormContainer } from '/imports/components/Form'
import { Input } from '/imports/components/Input'
import { Submit } from '/imports/components/Submit'

export function Login() {
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
    Meteor.loginWithPassword(data.username, data.password, (error) => {
      setSubmitting(false)
      if (error) {
        setFailed(true)
      } else {
        navigate('/')
      }
    })
  })

  return (
    <SmallFormContainer>
      <Form onSubmit={onSubmit} title="Welcome Back :)">
        <Input
          {...register('username', { required: true })}
          placeholder="Username"
          autoComplete="username"
          error={!!errors.username}
        />
        <Input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          error={!!errors.password}
        />
        <Submit
          text="Sign in"
          submitting={submitting}
          error={failed ? 'There was a problem signing in.' : undefined}
        />
      </Form>
    </SmallFormContainer>
  )
}
