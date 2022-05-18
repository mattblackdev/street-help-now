import { Meteor } from 'meteor/meteor'
import { Resources, ResourceTypes } from '/imports/resources/api/collection'
import { Subs } from '/imports/resources/api/subs'

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
