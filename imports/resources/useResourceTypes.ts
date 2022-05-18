import { useFind } from 'meteor/react-meteor-data'
import { ResourceTypes } from '/imports/resources/api/collection'
import useSubscription from '/imports/utilities/useSubscription'

export function useResourceTypes() {
  useSubscription('resourceTypes')
  return useFind(() => ResourceTypes.find())
}
