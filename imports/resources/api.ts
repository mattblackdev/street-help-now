import emojiRegex from 'emoji-regex'
import { makeFormSchema } from '../utilities/makeFormSchema'
import {
  KeyPattern,
  SlugPattern,
  Title16Pattern,
} from '/imports/main/constants'
import {
  ResourceComponents,
  Resources,
  ResourceType,
  ResourceTypes,
} from '/imports/resources/collection'
import { makeMethod, validate } from '../utilities/makeMethod'
import { yobject, yoblean, yupray, yusring } from '/imports/utilities/yup'

export enum Subs {
  resourceTypes = 'resourceTypes',
  resources = 'resources',
}

export type ResourceTypeUpdate = Omit<ResourceType, 'createdAt'>

export const resourceTypeUpdate = makeMethod<ResourceTypeUpdate, number>({
  name: 'resourceTypes.update',
  run({ _id, ...rest }) {
    return ResourceTypes.update(_id, { $set: rest })
  },
  roles: ['admin'],
  schema: yobject({})
    .required()
    .shape({
      _id: yusring().required(),
      title: yusring()
        .label('Title')
        .required()
        .matches(Title16Pattern, 'Must be 2-16 alphanumeric characters'),
      emoji: yusring()
        .label('Emoji')
        .required()
        .matches(emojiRegex(), 'Must be an emoji ;-)'),
      slug: yusring()
        .label('Slug')
        .required()
        .matches(SlugPattern, 'must-be-like-this'),
      url: yusring().label('External Url').ensure().url().trim(),
      requestable: yoblean().label('Requestable'),
      components: yupray()
        .label('Components')
        .notRequired()
        .of(
          yobject({})
            .required()
            .shape({
              key: yusring().label('Key').required().matches(KeyPattern),
              label: yusring()
                .label('Label')
                .required()
                .matches(Title16Pattern),
              fields: yupray()
                .label('Fields')
                .required()
                .of(
                  yobject({})
                    .required()
                    .shape({
                      key: yusring()
                        .label('Key')
                        .required()
                        .matches(KeyPattern),
                      label: yusring()
                        .label('Label')
                        .required()
                        .matches(Title16Pattern),
                      type: yusring()
                        .label('Type')
                        .required()
                        .matches(
                          /^boolean|number|string$/,
                          'Must be "boolean", "number", or "string"'
                        ),
                      matches: yusring()
                        .label('Matches')
                        .notRequired()
                        .test(
                          'RegExp',
                          'Must use javascript RegExp syntax',
                          (v) => {
                            if (!v) return true
                            try {
                              new RegExp(v)
                              return true
                            } catch {
                              return false
                            }
                          }
                        ),
                    })
                ),
            })
        ),
    }),
})

export const requestResource = makeMethod<
  { resourceTypeId: string; components: ResourceComponents },
  string
>({
  name: 'resources.request',
  run({ resourceTypeId, components = {} }, user) {
    if (!user) throw new Error('Unauthorized')

    const resourceType = ResourceTypes.findOne(resourceTypeId)
    if (!resourceType || !resourceType.requestable) {
      throw new Error(
        `Resource type either doesn't exist or is not requestable`
      )
    }

    const schema = makeFormSchema(resourceType.components)
    components = validate(components, schema)

    return Resources.insert({
      resourceTypeId,
      components,
      createdAt: new Date(),
      createdBy: user._id,
    })
  },
})
