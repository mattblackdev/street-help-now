import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { App } from '/imports/main/App'

Meteor.startup(() => {
  render(
    <App />,
    document.getElementById('the-root--the-ro0t--the-r00t-is-on-fiya')
  )
})
