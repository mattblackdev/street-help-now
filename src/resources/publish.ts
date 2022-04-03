import { Meteor } from 'meteor/meteor'
import { ResourceTypesCollection } from './api'

Meteor.publish('resourceTypes', function () {
	return ResourceTypesCollection.find()
})
