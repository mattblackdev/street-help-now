import { Meteor } from 'meteor/meteor'

Meteor.publish('currentUser', function () {
  const { userId } = this
  if (!userId) return []

  return Meteor.users.find(
    { _id: userId },
    {
      fields: { _id: 1, createdAt: 1, username: 1, roles: 1 },
    }
  )
})
