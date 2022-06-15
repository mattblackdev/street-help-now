require('dotenv').config({ path: `${process.env.PWD}/.env` })
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import './imports'
import './indices'
import {
  Resource,
  Resources,
  ResourceType,
  ResourceTypes,
} from '/imports/resources/api/collection'
import { Users } from '/imports/users/api/collection'
import {
  OneHundredPattern,
  Title16Pattern,
} from '/imports/utilities/regexPatterns'

type ResourceTypeCreate = Omit<ResourceType, 'createdAt' | '_id'>
function insertResourceType(resourceTypeCreate: ResourceTypeCreate) {
  ResourceTypes.insert({
    ...resourceTypeCreate,
    createdAt: new Date(),
  })
}

type ResourceCreate = Omit<Resource, 'createdAt' | '_id'>
function insertResource(resourceCreate: ResourceCreate) {
  Resources.insert({
    ...resourceCreate,
    createdAt: new Date(),
  })
}

Meteor.startup(() => {
  Accounts.onCreateUser((_, user) => {
    // skips options.profile since meteor recommends against using it now
    return user
  })

  // If no users add admin
  if (
    Meteor.isDevelopment &&
    process.env.ADMIN_PW &&
    Users.find().count() === 0
  ) {
    const userId = Accounts.createUser({
      username: 'admin',
      password: process.env.ADMIN_PW,
    })
    Users.update(userId, { $set: { roles: ['admin'] } })
    console.log('Created admin user', userId)
  }

  // If the ResourceTypes collection is empty, add some data.
  if (ResourceTypes.find().count() === 0) {
    console.log('Asuhhduh... Seeded resourceTypes')
    insertResourceType({
      title: 'Food',
      slug: 'food',
      emoji: '🍱',
      components: [
        {
          key: 'title',
          label: 'Title',
          fields: [
            {
              key: 'title',
              label: 'Title',
              type: 'string',
              matches: Title16Pattern.source,
            },
          ],
        },
        {
          key: 'description',
          label: 'Description',
          fields: [
            {
              key: 'description',
              label: 'Description',
              type: 'string',
              matches: OneHundredPattern.source,
            },
          ],
        },
      ],
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

  if (Resources.find().count() === 0) {
    console.log('Seedy seedy fooooood')
    const foodId = ResourceTypes.findOne({ slug: 'food' })?._id ?? 'doof'
    const adminId = Users.findOne({ username: 'admin' })?._id ?? 'nimda'
    insertResource({
      resourceTypeId: foodId,
      createdBy: adminId,
      components: {
        title: { title: 'Applez' },
        description: { description: 'Some lovely red apples' },
      },
    })
  }
})
