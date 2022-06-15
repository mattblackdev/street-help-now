import { Meteor } from 'meteor/meteor'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Belt } from '/imports/components/Belt'
import { Form } from '/imports/components/Form'
import { Input } from '/imports/components/Input'
import { Submit } from '/imports/components/Submit'
import { AcceptInvite, acceptInvite } from '/imports/users/api/acceptInvite'
import { useUserId } from '/imports/users/useUser'
import { makeMakeInputProps } from '/imports/utilities/makeInputProps'
import { useFormState } from '/imports/utilities/useFormState'

export function Signup() {
  const userId = useUserId()
  const { userInviteId = '' } = useParams()
  const { error, errors, handleError, setError, setSubmitting, submitting } =
    useFormState()
  const { register, handleSubmit } = useForm<AcceptInvite>({
    defaultValues: { userInviteId },
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      navigate('/')
    }
  }, [userId, navigate])
  if (userId) {
    return null
  }

  const onSubmit = handleSubmit((data) => {
    setSubmitting(true)

    acceptInvite(data).then(
      () => {
        Meteor.loginWithPassword(data.email, data.password, (err) => {
          if (err) {
            setError('Could not log in automatically. Redirecting to login...')
            setTimeout(() => {
              navigate('/login')
            }, 3000)
          } else {
            setSubmitting(false)
          }
        })
      },
      (error) => {
        handleError(error)
      }
    )
  })

  const makeInputProps = makeMakeInputProps(
    acceptInvite.schema,
    register,
    errors
  )

  return (
    <Belt>
      <Form
        onSubmit={onSubmit}
        title="Create an account. We're glad you found us!"
      >
        <Input {...register('userInviteId')} hidden />
        <Input
          autoComplete="email"
          helpText="The email you were invited with"
          {...makeInputProps('email')}
        />
        <Input
          autoComplete="username"
          helpText="Your real name or alias. At least 2 characters."
          {...makeInputProps('username')}
        />
        <Input
          autoComplete="new-password"
          helpText={`A memorable phrase with at least 16 characters. For example: "i like to walk my dog".`}
          {...makeInputProps('password')}
          type="password"
        />
        <Submit text="Sign Up" submitting={submitting} error={error} />
      </Form>
    </Belt>
  )
}
