import { Meteor } from 'meteor/meteor'
import { Subs, Users } from './api'

Meteor.publish(Subs.currentUser, function () {
  const { userId } = this
  if (!userId) return []

  return Users.find(
    { _id: userId },
    {
      fields: { _id: 1, createdAt: 1, username: 1, roles: 1 },
    }
  )
})
