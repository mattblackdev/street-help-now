import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteUserForm } from './InviteUserForm'

export function Profile() {
  const user = useTracker(() => Meteor.user()?.username)
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  return (
    <div className="h-[80vh] flex flex-col justify-between">
      <InviteUserForm />
      <button
        className="block w-3/4 max-w-md mx-auto px-4 py-2 rounded bg-blood shadow hover:bg-brightblood text-stone-100 font-semibold text-center focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
        onClick={() =>
          Meteor.logout(() => {
            navigate('/')
          })
        }
      >
        Sign Out
      </button>
    </div>
  )
}
