import { useFind } from 'meteor/react-meteor-data'
import { UserInvites } from '/imports/users/api/collection'
import { Subs } from '/imports/users/api/subs'
import useSubscription from '/imports/utilities/useSubscription'

export function useUserInvites() {
  useSubscription(Subs.userInvites)
  return useFind(() => UserInvites.find())
}
