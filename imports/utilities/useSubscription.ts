import { createAsset } from 'use-asset'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { useEffect } from 'react'

/**
 * Delay after unmounting before stopping computation and subscription — this is
 * mainly so new data can flow freely first
 */
const STOP_DELAY = 1000

type Handles = {
  computation: Tracker.Computation
  subscription: Meteor.SubscriptionHandle
}

export const subscriptions = createAsset<Handles, any[]>((name, ...args) => {
  return new Promise((resolve, reject) => {
    if (!name) throw new Error('Missing subscription name')

    // Prevent the computation being stopped automatically on React render
    Tracker.nonreactive(() => {
      Tracker.autorun((computation) => {
        computation.onStop(() => {
          console.log(`Clearing ${name}`)
          subscriptions.clear(name, ...args)
        })
        const onError = (...args: any[]) => {
          console.log(`Subsciption error for ${name}`, ...args)
          reject(...args)
        }
        console.log(`Subscribing to ${name}`)
        const subscription = Meteor.subscribe(name, ...args, { onError })
        if (subscription.ready()) {
          console.log(`${name} is ready`)
          resolve({ computation, subscription })
        }
      })
    })
  })
})

export default function useSubscription(name?: string | false, ...args: any[]) {
  // This starts the subscription (if it is not preloaded yet)
  const { computation } = subscriptions.read(name, ...args)

  // This stops the subscription on unmount (after delay)
  useEffect(
    () => () => {
      console.log(`Stopping ${name}`)
      setTimeout(() => {
        computation.stop()
      }, STOP_DELAY)
    },
    []
  )
}
