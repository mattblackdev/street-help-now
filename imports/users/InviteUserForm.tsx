import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, SmallFormContainer } from '../components/Form'
import { Input } from '../components/Input'
import { Submit } from '../components/Submit'
import { makeMakeInputProps } from '../utilities/makeInputProps'
import { useFormState } from '../utilities/useFormState'
import { InviteUser, inviteUser } from './api/inviteUser'

export function InviteUserForm() {
  const { error, errors, submitting, setSubmitting, handleError } =
    useFormState()
  const { register, handleSubmit } = useForm<InviteUser>()

  const onSubmit = handleSubmit(({ emailAddress }) => {
    setSubmitting(true)
    inviteUser({ emailAddress }).then((userInviteId) => {
      setSubmitting(false)
      console.log('Created', userInviteId)
    }, handleError)
  })

  const makeInputProps = makeMakeInputProps(inviteUser.schema, register, errors)

  return (
    <SmallFormContainer>
      <Form title="Invite a Friend" onSubmit={onSubmit}>
        <Input {...makeInputProps('emailAddress')} />
        <Submit
          text="Send Invite"
          accent
          submitting={submitting}
          error={error}
        />
      </Form>
    </SmallFormContainer>
  )
}
