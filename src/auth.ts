/* eslint-disable  @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient, ObjectId } from 'mongodb'

// Fixed iNaturalist provider with correct API endpoints and JWT handling
const iNaturalistProvider = (options: any) => ({
  id: 'inaturalist',
  name: 'iNaturalist',
  type: 'oauth' as const,
  authorization: {
    url: 'https://www.inaturalist.org/oauth/authorize',
    params: {
      scope: 'write',
    },
  },
  token: {
    url: 'https://www.inaturalist.org/oauth/token',
    // Use your original token.request method - don't fetch JWT here
    async request(context: any) {
      const response = await fetch(context.provider.token.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: context.client.client_id,
          client_secret: context.client.client_secret,
          code: context.params.code,
          redirect_uri:
            context.params.redirect_uri ||
            `${process.env.NEXTAUTH_URL}/api/auth/callback/inaturalist`,
        }),
      })

      const responseText = await response.text()

      if (!response.ok) {
        console.error('Token exchange failed')
        throw new Error(
          `Token exchange failed: ${response.status} ${responseText}`
        )
      }

      try {
        const tokens = JSON.parse(responseText)
        return { tokens }
      } catch (parseError) {
        console.error('Failed to parse token response as JSON:', parseError)
        throw new Error('Invalid token response format')
      }
    },
  },
  // Use your existing userinfo configuration
  userinfo: {
    url: 'https://www.inaturalist.org/users/api_token',
    async request(context: any) {
      // First, get the JWT token using the OAuth access token
      const jwtResponse = await fetch(
        'https://www.inaturalist.org/users/api_token',
        {
          headers: {
            Authorization: `Bearer ${context.tokens.access_token}`,
            Accept: 'application/json',
          },
        }
      )

      if (!jwtResponse.ok) {
        const jwtErrorText = await jwtResponse.text()
        console.error(
          'JWT token request failed:',
          jwtResponse.status,
          jwtErrorText
        )
        throw new Error(
          `JWT token request failed: ${jwtResponse.status} ${jwtErrorText}`
        )
      }

      const jwtData = await jwtResponse.json()
      const jwtToken = jwtData.api_token || jwtData.token

      if (!jwtToken) {
        console.error('No JWT token received')
        throw new Error('No JWT token received from iNaturalist')
      }

      // Get user info with JWT token
      const userResponse = await fetch(
        'https://api.inaturalist.org/v1/users/me',
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
          },
        }
      )

      const userResponseText = await userResponse.text()

      if (!userResponse.ok) {
        console.error(
          'User info request failed:',
          userResponse.status,
          userResponseText
        )
        throw new Error(`User info request failed: ${userResponse.status}`)
      }

      try {
        const userData = JSON.parse(userResponseText)

        // Add the JWT token to the user data so we can access it later
        userData.jwt_token = jwtToken
        userData.oauth_access_token = context.tokens.access_token

        return userData
      } catch (parseError) {
        console.error('Failed to parse user info as JSON:', parseError)
        throw new Error('Invalid user info response format')
      }
    },
  },
  profile(profile: any) {
    const userData = profile.results?.[0] || profile

    if (!userData) {
      console.error('No user data found in profile')
      throw new Error('No user data found in iNaturalist response')
    }

    const processedProfile = {
      id: userData.id?.toString() || `inaturalist_${Date.now()}`,
      name: userData.name || userData.login || 'iNaturalist User',
      email: userData.email || undefined,
      image:
        userData.icon_url || userData.icon || userData.user_icon_url || null,
      inaturalist_user_id: userData.id,
      inaturalist_login: userData.login,
      inaturalist_login_exact: userData.login_exact,
      inaturalist_name: userData.name,
      inaturalist_icon: userData.icon,
      // Store the tokens in the profile so they're available in callbacks
      jwt_token: profile.jwt_token,
      oauth_access_token: profile.oauth_access_token,
    }

    return processedProfile
  },
  style: {
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/76/INaturalist_logo.png',
    brandColor: '#74ac00',
  },
  ...options,
})

// Validate environment variables
const requiredEnvVars = {
  MONGODB_URI: process.env.MONGODB_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  INATURALIST_CLIENT_ID: process.env.INATURALIST_CLIENT_ID,
  INATURALIST_CLIENT_SECRET: process.env.INATURALIST_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
}

const missingVars = Object.entries(requiredEnvVars)
  .filter(([value]) => !value)
  .map(([key]) => key)

if (missingVars.length > 0) {
  console.error('Missing environment variables:', missingVars)
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}`
  )
}

const client = new MongoClient(process.env.MONGODB_URI!)

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    iNaturalistProvider({
      clientId: process.env.INATURALIST_CLIENT_ID!,
      clientSecret: process.env.INATURALIST_CLIENT_SECRET!,
    }),
  ],
  trustHost: true,
  events: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'inaturalist' && profile) {
        const userData = (profile as any).results?.[0] || profile
        try {
          // Update user record with iNaturalist data
          await client
            .db()
            .collection('users')
            .updateOne(
              { _id: new ObjectId(user.id) },
              {
                $set: {
                  inaturalist_user_id: userData.id,
                  inaturalist_login: userData.login,
                  inaturalist_login_exact: userData.login_exact,
                  inaturalist_name: userData.name,
                  inaturalist_icon: userData.icon,
                },
              }
            )

          // Store tokens in the accounts record
          await client
            .db()
            .collection('accounts')
            .updateOne(
              {
                provider: 'inaturalist',
                providerAccountId: account.providerAccountId,
              },
              {
                $set: {
                  jwt_token: (profile as any).jwt_token,
                  oauth_access_token: (profile as any).oauth_access_token,
                },
              }
            )
        } catch (error) {
          console.error('Error storing iNaturalist data:', error)
        }
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user && user?.id) {
        session.user.id = user.id

        // Add iNaturalist data if user has it
        if ((user as any).inaturalist_user_id) {
          ;(session.user as any).inaturalist_user_id = (
            user as any
          ).inaturalist_user_id
          ;(session.user as any).inaturalist_login = (
            user as any
          ).inaturalist_login
          ;(session.user as any).inaturalist_login_exact = (
            user as any
          ).inaturalist_login_exact
          ;(session.user as any).inaturalist_name = (
            user as any
          ).inaturalist_name
          ;(session.user as any).inaturalist_icon = (
            user as any
          ).inaturalist_icon
        }
      }
      return session
    },
  },
  debug: false,
})
