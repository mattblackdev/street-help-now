import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { UserInvites } from './collection'
import { makeMethod } from '/imports/utilities/makeMethod'
import {
  PasswordPattern,
  UsernamePattern,
} from '/imports/utilities/regexPatterns'
import { serverLog } from '/imports/utilities/serverLog'
import { yobject, yusring } from '/imports/utilities/yup'

export type AcceptInvite = {
  userInviteId: string
  username: string
  password: string
  email: string
}

export const acceptInvite = makeMethod<AcceptInvite, void>({
  name: 'acceptInvite',
  authorize: false,
  userFields: {},
  schema: yobject({})
    .required()
    .shape({
      userInviteId: yusring().label('UserInvite Id').required(),
      username: yusring().label('Username').required().matches(UsernamePattern),
      password: yusring().label('Password').required().matches(PasswordPattern),
      email: yusring().label('Email').required().email(),
    }),
  run({ userInviteId, username, password, email }, user) {
    if (user) {
      throw new Error('But why man?')
    }

    // We need the server for this one
    if (Meteor.isClient) return

    const invite = UserInvites.findOne(userInviteId)

    if (!invite) {
      serverLog('No invite', { userInviteId })
      throw new Error('Invalid')
    }

    if (invite.email !== email) {
      serverLog('Email no matchy', { userInviteId })
      throw new Error('Invalid')
    }

    if (invite.acceptedBy) {
      serverLog('Already accepted', { userInviteId })
      throw new Error('Invalid')
    }

    const userId = Accounts.createUser({
      username,
      password,
      email,
    })

    if (!userId) {
      serverLog('Could not create user')
      throw new Error('Unknown')
    }

    const success =
      UserInvites.update(userInviteId, {
        $set: { acceptedAt: new Date(), acceptedBy: userId },
      }) === 1

    if (!success) {
      serverLog("User created but couldn't update the invite", userInviteId)
    }

    return userId
  },
})
