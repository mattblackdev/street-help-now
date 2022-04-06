import { Mongo } from 'meteor/mongo'

export enum Subs {
  resourceTypes = 'resourceTypes',
  resources = 'resources',
}
export interface ResourceType {
  _id: string
  url?: string
  slug: string
  emoji: string
  title: string
  createdAt: Date
  components?: ResourceTypeComponent[]
}

export interface ResourceTypeComponent {
  name: string
}

export const ResourceTypes = new Mongo.Collection<ResourceType>('resourceTypes')

export interface Resource {
  _id: string
  resourceTypeId: string
  createdAt: Date
  createdBy: string
  [meta: string]: unknown
  // title: string
  // description: string
  // location?: { latitude?: number; longitude?: number; address: string }
  // availability?: Availability
}

export const Resources = new Mongo.Collection<Resource>('resources')
