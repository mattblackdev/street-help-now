import { Mongo } from 'meteor/mongo'

export type UserInvite = {
  _id: string
  emailAddress: string
  invitedBy: string
  createdAt: Date
  lastEmailSent?: Date
  acceptedAt?: Date
  acceptedBy?: string
}

export const UserInvites = new Mongo.Collection<UserInvite>('userInvites')
