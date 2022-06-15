import NodeGeocoder from 'node-geocoder'

export async function fetchCoords(address) {
  const geocoder = NodeGeocoder({
    provider: 'locationiq',
    apiKey: process.env.LOCATIONIQ_API_KEY,
  })

  const result = await geocoder.geocode(address)

  const indeterminate = new Error('Could not determine coordinates')
  if (!result.length) throw indeterminate

  const { latitude, longitude } = result[0]
  if (latitude === undefined || longitude === undefined) throw indeterminate

  return [latitude, longitude]
}
