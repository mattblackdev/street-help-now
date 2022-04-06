import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { Subs } from './api'
import useSubscription from '/imports/utilities/useSubscription'

export function useIsAdmin() {
  useSubscription(Subs.currentUser)
  const roles = useTracker(
    () => Meteor.user({ fields: { roles: 1 } })?.roles ?? []
  )
  return roles.includes('admin')
}

export function useUsername() {
  useSubscription(Subs.currentUser)
  return useTracker(() => Meteor.user({ fields: { username: 1 } })?.username)
}
