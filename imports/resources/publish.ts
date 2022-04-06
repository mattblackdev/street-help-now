import { Meteor } from 'meteor/meteor'
import { Resources, ResourceTypes, Subs } from './api'

Meteor.publish(Subs.resourceTypes, function () {
  return ResourceTypes.find()
})

Meteor.publish(Subs.resources, function (resourceTypeId) {
  if (!resourceTypeId) {
    console.warn(`[Subscription:${Subs.resources}]: missing resourceTypeId`)
    return []
  }

  return Resources.find({ resourceTypeId })
})
