import { Meteor } from 'meteor/meteor'
import { UserInvites } from './collection'
import { makeMethod } from '/imports/utilities/makeMethod'
import { yobject, yusring } from '/imports/utilities/yup'

export type InviteUser = { email: string }

export const inviteUser = makeMethod<InviteUser, Promise<string>>({
  name: 'users.invite',
  async run({ email }, user) {
    if (!user) throw new Error('Unauthorized')

    const userInvitesId = UserInvites.insert({
      email,
      invitedBy: user._id,
      createdAt: new Date(),
      lastEmailSent: new Date(),
    })

    if (Meteor.isServer) {
      const { sendInvitationEmail } = await import(
        '/server/sendInvitationEmail'
      )
      sendInvitationEmail({ email, userInvitesId })
    }

    return userInvitesId
  },
  authorize: true,
  schema: yobject({})
    .required()
    .shape({
      email: yusring()
        .label('Their Email Address')
        .required()
        .email('Must be an email address like "joe@example.com"'),
    }),
})
