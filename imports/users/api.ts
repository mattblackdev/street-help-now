import { Meteor } from 'meteor/meteor'

export type User = Meteor.User // As defined in ./meteor.d.ts

export enum Subs {
  currentUser = 'currentUser',
}

export const Users = Meteor.users
