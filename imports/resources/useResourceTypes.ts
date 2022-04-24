import { useFind } from 'meteor/react-meteor-data'
import useSubscription from '/imports/utilities/useSubscription'
import { ResourceTypes } from './collection'

export function useResourceTypes() {
  useSubscription('resourceTypes')
  return useFind(() => ResourceTypes.find())
}
