import emojiRegex from 'emoji-regex'
import { ResourceType, ResourceTypes } from '/imports/resources/api/collection'
import { makeMethod } from '/imports/utilities/makeMethod'
import {
  KeyPattern,
  SlugPattern,
  Title16Pattern,
} from '/imports/utilities/regexPatterns'
import { yobject, yoblean, yupray, yusring } from '/imports/utilities/yup'

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
                        .oneOf(['boolean', 'number', 'string'])
                        .meta({
                          labels: {
                            boolean: 'Boolean',
                            number: 'Number',
                            string: 'String',
                          },
                        }),
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
