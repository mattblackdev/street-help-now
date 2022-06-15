import React from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '/imports/components/Form'
import { Belt } from '/imports/components/Belt'
import { Input } from '/imports/components/Input'
import { Submit } from '/imports/components/Submit'
import { makeMakeInputProps } from '/imports/utilities/makeInputProps'
import { useFormState } from '/imports/utilities/useFormState'
import { InviteUser, inviteUser } from '/imports/users/api/inviteUser'

export function InviteUserForm() {
  const { error, errors, submitting, setSubmitting, handleError } =
    useFormState()
  const { register, handleSubmit } = useForm<InviteUser>()

  const onSubmit = handleSubmit(({ email }) => {
    setSubmitting(true)
    inviteUser({ email }).then((userInviteId) => {
      setSubmitting(false)
      console.log('Created', userInviteId)
    }, handleError)
  })

  const makeInputProps = makeMakeInputProps(inviteUser.schema, register, errors)

  return (
    <Form title="Invite a Friend" onSubmit={onSubmit}>
      <Input {...makeInputProps('email')} />
      <Submit text="Send Invite" accent submitting={submitting} error={error} />
    </Form>
  )
}
