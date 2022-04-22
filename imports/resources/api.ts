import emojiRegex from 'emoji-regex'
import { Mongo } from 'meteor/mongo'
import { object, string } from 'yup'
import { SlugPattern, Title16Pattern } from '../main/constants'
import { validatedMethod } from '../utilities/validatedMethod'

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
  [meta: string]: unknown
}

export const ResourceTypes = new Mongo.Collection<ResourceType>('resourceTypes')

export type ResourceTypeUpdate = {
  _id: string
  title: string
  emoji: string
  slug: string
  url?: string
}
export const resourceTypeUpdate = validatedMethod<ResourceTypeUpdate>({
  name: 'resourceTypes.update',
  schema: object({
    _id: string().required(),
    title: string()
      .label('Title')
      .required()
      .matches(Title16Pattern, 'Must be 2-16 alphanumeric characters'),
    emoji: string()
      .label('Emoji')
      .required()
      .matches(emojiRegex(), 'Must be an emoji ;-)'),
    slug: string()
      .label('Slug')
      .required()
      .matches(SlugPattern, 'must-be-like-this'),
    url: string().label('External Url').ensure().url().trim(),
  }).required(),
  roles: ['admin'],
  fun({ _id, title, emoji, slug, url }) {
    return ResourceTypes.update(_id, { $set: { title, emoji, slug, url } })
  },
})

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
