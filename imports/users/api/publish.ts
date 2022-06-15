import { Meteor } from 'meteor/meteor'
import { UserInvites, Users } from '/imports/users/api/collection'
import { Subs } from '/imports/users/api/subs'

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

Meteor.publish(Subs.userInvites, function () {
  const { userId } = this
  if (!userId) return []

  return UserInvites.find(
    { invitedBy: userId },
    {
      fields: { _id: 1, createdAt: 1, email: 1, lastEmailSent: 1 },
    }
  )
})
