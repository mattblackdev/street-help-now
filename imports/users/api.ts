import { Meteor } from 'meteor/meteor'
// import { makeMethod } from '/imports/utilities/makeMethod'
// import { yobject, yusring } from '/imports/utilities/yup'

export type User = Meteor.User // As defined in ./meteor.d.ts
export const Users = Meteor.users
export enum Subs {
  currentUser = 'currentUser',
}

// export type UserLocationUpdate = { address: string }
// export const userLocationUpdate = makeMethod<
//   UserLocationUpdate,
//   Promise<number>
// >({
//   name: 'users.location.update',
//   authorize: true,
//   async run({ address }, user) {
//     if (!user) return 0

//     const location = {
//       lat: 0,
//       long: 0,
//       address,
//     }

//     if (Meteor.isServer) {
//       // @ts-ignore
//       const { fetchCoords } = await import('/server/fetchCoords.js')

//       const [lat, long] = await fetchCoords(address)
//       location.lat = lat
//       location.long = long
//     }

//     console.log({ location })

//     return Users.update(user._id, { $set: { location } })
//   },
//   schema: yobject({})
//     .required()
//     .shape({
//       address: yusring().label('Address').required().trim().ensure(),
//     }),
// })
