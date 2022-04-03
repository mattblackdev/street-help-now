import { Mongo } from 'meteor/mongo'

export interface ResourceType {
	_id: string
	url?: string
	slug: string
	emoji: string
	title: string
	createdAt: Date
}

export const ResourceTypesCollection = new Mongo.Collection<ResourceType>(
	'resourceTypes'
)
