import {
  ResourceComponents,
  Resources,
  ResourceTypes,
} from '/imports/resources/api/collection'
import { makeFormSchema } from '/imports/utilities/makeFormSchema'
import { makeMethod, validate } from '/imports/utilities/makeMethod'

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
