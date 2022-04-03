import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { App } from '/imports/main/App'

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'))
})
