import { AUTH_SECRET, FAUNA_SECRET, FROM_EMAIL } from '$env/static/private'
import { sendEmailHtml } from '$lib/email'
import type { Provider } from '@auth/core/providers'
import EmailProvider from '@auth/core/providers/email'
import { FaunaAdapter } from '@auth/fauna-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { Client } from 'faunadb'

const client = new Client({ secret: FAUNA_SECRET })
const auth = SvelteKitAuth({
  adapter: FaunaAdapter(client),
  trustHost: true,
  secret: AUTH_SECRET,
  providers: [
    EmailProvider({
      from: FROM_EMAIL,
      sendVerificationRequest({ identifier: email, url, provider: { from } }) {
        const emailBody = `
<h2>Bienvenido ${email}</h2>
<p>Ha solicitado un inicio de sesión en Nextmatch.</p>
<p>Haga click en el siguiente enlace para acceder a la aplicación.</p>
<table class="attributes" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td class="attributes_content">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <a href=${url}>Acceso a la aplicación</a>
        </tr>
      </table>
    </td>
  </tr>
</table>

<p>Tambien puede copiar y pegar el siguiente enlace en su navegador</p>
<small>${url}</small>
`
        sendEmailHtml(from, email, 'Inicio de sesión - Reparto', emailBody)
      },
    }) as Provider,
  ],
})

const redirectOnProtectedRoutes: Handle = async ({ event, resolve }) => {
  const publicRoutes = ['/login']
  if (event.url.pathname === '/') return resolve(event)
  if (publicRoutes.some((route) => event.url.pathname === route)) return resolve(event)
  const session = await event.locals.getSession()
  if (!session) throw redirect(303, '/')
  return resolve(event)
}

export const handle: Handle = sequence(auth, redirectOnProtectedRoutes)
