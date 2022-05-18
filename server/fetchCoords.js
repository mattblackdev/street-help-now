import NodeGeocoder from 'node-geocoder'

export async function fetchCoords(address) {
  const geocoder = NodeGeocoder({
    provider: 'locationiq',
    apiKey: process.env.LOCATIONIQ_API_KEY,
  })

  const result = await geocoder.geocode(address)

  if (!result.length) throw Error('Could not determine coordinates')

  const { latitude, longitude } = result[0]
  return [latitude, longitude]
}
