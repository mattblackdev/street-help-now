import React from 'react'
import { ActionButton } from '../components/ActionButton'
import { useUserInvites } from './api/useUserInvites'

export function UserInvitesList() {
  const invites = useUserInvites()

  return (
    <ul>
      {invites.map((invite) => (
        <li key={invite._id} className="flex flex-row">
          <div className="flex flex-col flex-1">
            {invite.email} - {invite.lastEmailSent?.toLocaleDateString()}{' '}
          </div>
          <div className="flex justify-center items-center">
            {invite.acceptedBy ? (
              'Accepted'
            ) : (
              <ActionButton onClick={() => {}}>Resend</ActionButton>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
