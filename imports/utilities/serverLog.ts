import { Meteor } from 'meteor/meteor'

export function serverLog(...args: any[]) {
  if (Meteor.isServer) {
    console.error(...args)
  }
}
