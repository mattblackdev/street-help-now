import { Meteor } from 'meteor/meteor'
import { UserInvites } from './collection'
import { makeMethod } from '/imports/utilities/makeMethod'
import { yobject, yusring } from '/imports/utilities/yup'

export type InviteUser = { emailAddress: string }

export const inviteUser = makeMethod<InviteUser, Promise<string>>({
  name: 'users.invite',
  async run({ emailAddress }, user) {
    if (!user) throw new Error('Unauthorized')

    if (Meteor.isServer) {
      const { sendInvitationEmail } = await import(
        '/server/sendInvitationEmail'
      )
      sendInvitationEmail({ emailAddress })
    }

    return UserInvites.insert({
      emailAddress,
      invitedBy: user._id,
      createdAt: new Date(),
      lastEmailSent: new Date(),
    })
  },
  authorize: true,
  schema: yobject({})
    .required()
    .shape({
      emailAddress: yusring()
        .required()
        .email('Must be an email address like "joe@example.com"'),
    }),
})
