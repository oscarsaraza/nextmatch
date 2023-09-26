import { POSTMARK_SERVER_TOKEN } from '$env/static/private'
import { dev } from '$app/environment'
import postmark from 'postmark'

export const sendEmailHtml = async (from: string, to: string, subject: string, emailBody: string) => {
  if (dev) {
    console.log('DEVELOPMENT EMAIL', to, emailBody)
    return
  }

  const client = new postmark.ServerClient(POSTMARK_SERVER_TOKEN)
  await client.sendEmail({ From: from, To: to, Subject: subject, HtmlBody: emailBody })
}
