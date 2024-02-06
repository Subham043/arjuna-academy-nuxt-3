import CredentialsProvider from '@auth/core/providers/credentials'
import type { AuthConfig, JWT } from '@auth/core/types'
import { API_ROUTES } from '~/utils/api_routes'
// eslint-disable-next-line import/order, import/named
import { NuxtAuthHandler } from '#auth'

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig()

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  secret: runtimeConfig.private.authJs.secret,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        try {
          const formData = new FormData()
          formData.append('email', credentials.email as string)
          formData.append('password', credentials.password as string)
          const response = await fetch(
            runtimeConfig.public.apiURL + API_ROUTES.login,
            {
              method: 'POST',
              body: formData
            }
          )
          const content = await response.json()
          return { ...content.user, token: content.token }
        } catch (error: any) {
          return null
        }
      }
    })
  ],
  callbacks: {
    signIn () {
      return true
    },
    redirect ({ baseUrl }) {
      return baseUrl
    },
    jwt ({ token, user, trigger, session }) {
      if (token && user) {
        token.id = user.id
        token.verified = user.verified
        token.phone = user.phone
        token.token = user.token
      }
      if (trigger === 'update') {
        if (session?.verified) {
          token.verified = 'VERIFIED'
        }
        if (session?.profile) {
          token.name = session.profile.name
          token.email = session.profile.email
          token.phone = session.profile.phone
        }
      }
      return token
    },
    session ({ session, token }) {
      if (token && session.user) {
        session.user.phone = token.phone
        session.user.verified = token.verified
        session.user.id = token.id
        session.user.token = token.token
      }
      return session
    }
  },
  events: {
    async signOut (message) {
      const tokenData = message as { token: JWT | null }
      await fetch(runtimeConfig.public.apiURL + API_ROUTES.logout, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenData.token?.token}`
        }
      })
    }
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register', // New users will be directed here on first sign in (leave the property out if not of interest)
    // signOut: "/signout",
    error: '/auth/login' // Error code passed in query string as ?error=
    // verifyRequest: "/verify-request", // (used for check email message)
  },
  session: {
    strategy: 'jwt'
  }
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }
