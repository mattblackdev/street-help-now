import emojiRegex from 'emoji-regex'
import { SlugPattern, Title16Pattern } from '/imports/main/constants'
import { ResourceType, ResourceTypes } from '/imports/resources/collection'
import { validatedMethod } from '/imports/utilities/validatedMethod'
import { yobject, yoblean, yupray, yusring } from '/imports/utilities/yup'

export enum Subs {
  resourceTypes = 'resourceTypes',
  resources = 'resources',
}

export type ResourceTypeUpdate = Omit<ResourceType, 'createdAt'>

export const resourceTypeUpdate = validatedMethod<ResourceTypeUpdate>({
  name: 'resourceTypes.update',
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
              key: yusring().label('Key').required(),
              label: yusring().label('Label').required(),
              fields: yupray()
                .label('Fields')
                .required()
                .of(
                  yobject({})
                    .required()
                    .shape({
                      key: yusring().label('Key').required(),
                      label: yusring().label('Label').required(),
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
  roles: ['admin'],
  fun({ _id, ...rest }) {
    return ResourceTypes.update(_id, { $set: rest })
  },
})
