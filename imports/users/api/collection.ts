import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export type User = Meteor.User // As defined in /imports/users/meteor.d.ts
export const Users = Meteor.users

export type UserInvite = {
  _id: string
  email: string
  invitedBy: string
  createdAt: Date
  lastEmailSent?: Date
  acceptedAt?: Date
  acceptedBy?: string
}

export const UserInvites = new Mongo.Collection<UserInvite>('userInvites')
