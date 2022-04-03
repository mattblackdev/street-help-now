require('dotenv').config({ path: `${process.env.PWD}/.env` })
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import 'src/users/publish'
import 'src/resources/publish'
import { ResourceType, ResourceTypesCollection } from 'src/resources/api'

type ResourceTypeCreate = Omit<ResourceType, 'createdAt' | '_id'>
function insertResourceType(resourceTypeCreate: ResourceTypeCreate) {
  ResourceTypesCollection.insert({
    ...resourceTypeCreate,
    createdAt: new Date(),
  })
}

Meteor.startup(() => {
  Accounts.onCreateUser((_, user) => {
    // skips options.profile since meteor recommends against using it now
    return user
  })

  // If no users add admin
  if (Meteor.users.find().count() === 0) {
    const userId = Accounts.createUser({
      username: 'admin',
      password: process.env.ADMIN_PW,
    })
    Meteor.users.update(userId, { $set: { roles: ['admin'] } })
    console.log('Created admin user', userId)
  }
  // If the Links collection is empty, add some data.
  if (ResourceTypesCollection.find().count() === 0) {
    console.log('Asuhhduhh... Seeded resourceTypes')
    insertResourceType({
      title: 'Food',
      slug: 'food',
      url: 'https://docs.google.com/spreadsheets/d/1tmKLW3Gf0tFtTApss8VEUQ-KVWzBF8XjzzoJCfBWuOs/edit?usp=sharing',
      emoji: '🍱',
    })
    insertResourceType({
      title: 'Shelter',
      slug: 'shelter',
      url: 'https://docs.google.com/spreadsheets/d/1XcfqowLSklRK5RPVVCJj4etG-HEa4jNOkoETEnwieNM/edit?usp=sharing',
      emoji: '🛌',
    })
    insertResourceType({
      title: 'Clothing & More',
      slug: 'clothing',
      url: 'https://docs.google.com/spreadsheets/d/12N-sM1s81tX8LAikdletMmY4vFQagdqpPt9PeB5iYC0/edit?usp=sharing',
      emoji: '👕',
    })
    insertResourceType({
      title: 'WiFi',
      slug: 'wifi',
      url: 'https://www.wifimap.io/2964-jacksonville-free-wifi/map',
      emoji: '📶',
    })
    insertResourceType({
      title: 'Public Restroom',
      slug: 'restrooms',
      url: 'https://pee.place/en',
      emoji: '🚽',
    })
    insertResourceType({
      title: 'Money',
      slug: 'money',
      url: 'https://docs.google.com/spreadsheets/d/13BIs9Pl_WFk8E-TuN5Yqkd8UT1HCEikciNzfJRI7wt4/edit?usp=sharing',
      emoji: '💰',
    })
    insertResourceType({
      title: 'Case Management',
      slug: 'case-management',
      url: 'https://docs.google.com/spreadsheets/d/1iTMvixVDY005XG79pcN3G0wHPzW4ToFUR1-M_GPangk/edit?usp=sharing',
      emoji: '🤝',
    })
    insertResourceType({
      title: 'Events',
      slug: 'events',
      url: 'https://docs.google.com/spreadsheets/d/1eASWnPy5TCvztHwGfnKM5873fiNtUgRrH7CizCI7a04/edit?usp=sharing',
      emoji: '🗓',
    })
  }
})
