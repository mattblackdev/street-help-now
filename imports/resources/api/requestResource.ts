import { Meteor } from 'meteor/meteor'
import {
  ResourceComponents,
  Resources,
  ResourceType,
  ResourceTypes,
} from '/imports/resources/api/collection'
import { makeFormSchema } from '/imports/utilities/makeFormSchema'
import { makeMethod, validate } from '/imports/utilities/makeMethod'

export const requestResource = makeMethod<
  { resourceTypeId: string; components: ResourceComponents },
  Promise<string>
>({
  name: 'resources.request',
  async run({ resourceTypeId, components = {} }, user) {
    if (!user) throw new Error('Unauthorized')

    const resourceType = ResourceTypes.findOne(resourceTypeId)
    if (!resourceType || !resourceType.requestable) {
      throw new Error(
        `Resource type either doesn't exist or is not requestable`
      )
    }

    const schema = makeFormSchema(resourceType.components)
    components = validate(components, schema)

    components = await processComponentsInsert({ components, resourceType })

    return Resources.insert({
      resourceTypeId,
      components,
      createdAt: new Date(),
      createdBy: user._id,
    })
  },
})

const systems = [
  {
    components: ['location'],
    onInsert: async (
      {
        location,
      }: { location?: { address?: string; lat?: number; lng?: number } },
      resourceType: ResourceType
    ) => {
      if (Meteor.isServer) {
        if (!location || !location.address) {
          console.warn(
            `Location system can't work unless there is an address field for resource type: "${resourceType._id}"`
          )
          return { location }
        }

        // @ts-ignore
        const { fetchCoords } = await import('/server/fetchCoords.js')

        const [lat, lng] = await fetchCoords(location.address)
        location.lat = lat
        location.lng = lng
      }

      console.log(JSON.stringify({ location }, null, 2))

      return { location }
    },
  },
]

async function processComponentsInsert({
  components,
  resourceType,
}: {
  components: ResourceComponents
  resourceType: ResourceType
}) {
  const componenetKeys = Object.keys(components)
  const promises = []

  for (const system of systems) {
    // If this resource has the required componenets...
    if (system.components.every((k) => componenetKeys.includes(k))) {
      promises.push(system.onInsert(components, resourceType))
    }
  }

  await Promise.all(promises)

  let processedComponenets = { ...components }
  for (const result of promises) {
    processedComponenets = Object.assign(processedComponenets, result)
  }

  return processedComponenets
}
