import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import useSubscription from 'src/utilities/useSubscription'

export function useIsAdmin() {
  useSubscription('currentUser')
  const roles = useTracker(
    () => Meteor.user({ fields: { roles: 1 } })?.roles ?? []
  )
  return roles.includes('admin')
}

export function useUsername() {
  useSubscription('currentUser')
  return useTracker(() => Meteor.user({ fields: { username: 1 } })?.username)
}
