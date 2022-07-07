import { Email } from 'meteor/email'
import { UserInvites } from '/imports/users/api/collection'

export function sendInvitationEmail({ email, userInvitesId }) {
  const rootUrl = process.env.ROOT_URL.replace(/\/$|$/, '/')
  const joinLink = `${rootUrl}invites/${userInvitesId}`

  Email.send({
    from: 'invites@streethelpnow.com',
    to: email,
    subject: 'Street Help Now - Invitation to Join',
    html: `<html><body><div>
      <title><h1>You've been invited to Street Help Now.</h1></title>
      <p><a href="${joinLink}">Click here to Join.</a></p>
      <footer>
        <p>Thanks,<br/>Street Help Now Team</p>
      </footer>
    </div></body></html>`,
  })
}
