import { Email } from 'meteor/email'
import { UserInvites } from '/imports/users/api/collection'

export function sendInvitationEmail({ email, userInvitesId }) {
  Email.send({
    from: 'invites@streethelpnow.com',
    to: email,
    subject: 'Street Help Now - Invitation to Join',
    html: `<div>
      <title><h1>You've been invited to Street Help Now</h1></title>
      <a href="${process.env.ROOT_URL}invites/${userInvitesId}">Join Now</a>
      <footer>
        <p>Thanks,<br/>Street Help Now Team</p>
      </footer>
    </div>`,
  })
}
