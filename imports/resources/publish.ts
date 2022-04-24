import { Meteor } from 'meteor/meteor'
import { Subs } from './api'
import { Resources, ResourceTypes } from './collection'

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
