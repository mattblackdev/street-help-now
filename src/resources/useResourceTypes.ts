import { useFind } from 'meteor/react-meteor-data'
import useSubscription from 'src/utilities/useSubscription'
import { ResourceTypesCollection } from './api'

export function useResourceTypes() {
  useSubscription('resourceTypes')
  return useFind(() => ResourceTypesCollection.find())
}
