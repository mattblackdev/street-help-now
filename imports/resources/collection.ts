import { Mongo } from 'meteor/mongo'

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
  key: string
  label: string
  fields: ResourceTypeComponentField[]
}

export interface ResourceTypeComponentField {
  key: string
  label: string
  type: 'boolean' | 'number' | 'string'
  matches?: string
}

export const ResourceTypes = new Mongo.Collection<ResourceType>('resourceTypes')

export interface Resource {
  _id: string
  resourceTypeId: string
  createdAt: Date
  createdBy: string
  components: Record<string, Record<string, boolean | number | string>>
}

export const Resources = new Mongo.Collection<Resource>('resources')
