import { Resources } from '/imports/resources/api/collection'
import { UserInvites } from '/imports/users/api/collection'

Resources.createIndex(
  { resourceTypeId: 1 },
  { name: 'ResourceType reference on resources' }
)
Resources.createIndex({ createdBy: 1 }, { name: 'User reference on resources' })

UserInvites.createIndex(
  { invitedBy: 1 },
  { name: 'User reference on userInvites' }
)
UserInvites.createIndex(
  { invitedBy: 1, email: 1 },
  { unique: true, name: 'Unique constraint on inviter + invitee email address' }
)
