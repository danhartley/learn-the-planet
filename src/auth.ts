/* eslint-disable  @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient } from 'mongodb'

// Fixed iNaturalist provider with correct API endpoints and JWT handling
const iNaturalistProvider = (options: any) => ({
  id: 'inaturalist',
  name: 'iNaturalist',
  type: 'oauth' as const,
  authorization: {
    url: 'https://www.inaturalist.org/oauth/authorize',
    params: {
      scope: 'write', // Required for getting API tokens
    },
  },
  token: {
    url: 'https://www.inaturalist.org/oauth/token',
    async request(context: any) {
      console.log('🔄 Token exchange starting...')
      console.log('Token context:', {
        client: { id: context.client.client_id },
        params: context.params,
        code: context.params.code?.substring(0, 10) + '...',
      })

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

      console.log('✅ Token response status:', response.status)

      const responseText = await response.text()
      console.log('Token response body:', responseText)

      if (!response.ok) {
        console.error('❌ Token exchange failed')
        throw new Error(
          `Token exchange failed: ${response.status} ${responseText}`
        )
      }

      try {
        const tokens = JSON.parse(responseText)
        console.log('✅ Tokens received:', {
          access_token: tokens.access_token?.substring(0, 20) + '...',
          token_type: tokens.token_type,
          scope: tokens.scope,
        })
        return { tokens }
      } catch (parseError) {
        console.error('❌ Failed to parse token response as JSON:', parseError)
        throw new Error('Invalid token response format')
      }
    },
  },
  userinfo: {
    // Step 1: Get JWT token from iNaturalist
    url: 'https://www.inaturalist.org/users/api_token',
    async request(context: any) {
      console.log('👤 Getting JWT token first...')

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

      console.log('JWT token response status:', jwtResponse.status)

      if (!jwtResponse.ok) {
        const jwtErrorText = await jwtResponse.text()
        console.error(
          '❌ JWT token request failed:',
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
        console.error('❌ No JWT token received')
        throw new Error('No JWT token received from iNaturalist')
      }

      console.log('✅ JWT token received:', jwtToken.substring(0, 20) + '...')

      // Step 2: Use JWT token to get user info
      console.log('👤 Fetching user info with JWT...')

      const userResponse = await fetch(
        'https://api.inaturalist.org/v1/users/me',
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
          },
        }
      )

      console.log('User info response status:', userResponse.status)

      const userResponseText = await userResponse.text()
      console.log(
        'User info response:',
        userResponseText.substring(0, 200) + '...'
      )

      if (!userResponse.ok) {
        console.error(
          '❌ User info request failed:',
          userResponse.status,
          userResponseText
        )
        throw new Error(`User info request failed: ${userResponse.status}`)
      }

      try {
        const userData = JSON.parse(userResponseText)
        console.log('✅ User data received:', {
          results_count: userData.results?.length,
          total_results: userData.total_results,
        })
        return userData
      } catch (parseError) {
        console.error('❌ Failed to parse user info as JSON:', parseError)
        throw new Error('Invalid user info response format')
      }
    },
  },
  profile(profile: any) {
    console.log('🔧 Processing profile data...')
    console.log('Raw profile structure:', {
      hasResults: !!profile.results,
      resultsLength: profile.results?.length,
      totalResults: profile.total_results,
      rawProfile: JSON.stringify(profile, null, 2),
    })

    // Handle iNaturalist's response format
    const userData = profile.results?.[0] || profile

    if (!userData) {
      console.error('❌ No user data found in profile')
      throw new Error('No user data found in iNaturalist response')
    }

    const processedProfile = {
      id: userData.id?.toString() || `inaturalist_${Date.now()}`,
      name: userData.name || userData.login || 'iNaturalist User',
      // Don't provide an email if iNaturalist doesn't give us one
      // This prevents NextAuth from trying to link accounts by email
      email: userData.email || undefined,
      image:
        userData.icon_url || userData.icon || userData.user_icon_url || null,
      inaturalist_user_id: userData.id,
      inaturalist_login: userData.login,
    }

    console.log('✅ Processed profile:', processedProfile)
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
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === 'inaturalist') {
        console.log('💾 Storing iNaturalist data in JWT')
        if (profile) {
          const userData = (profile as any).results?.[0] || profile
          token.inaturalist_user_id = userData.id
          token.inaturalist_login = userData.login
        }
        if (account.access_token) {
          token.inaturalist_access_token = account.access_token
        }
      }
      return token
    },
    async session({ session, user }) {
      if (session?.user && user?.id) {
        session.user.id = user.id

        if (user.inaturalist_user_id) {
          session.user.inaturalist_user_id = user.inaturalist_user_id
          session.user.inaturalist_login = user.inaturalist_login
        }
      }
      return session
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log('🎉 Sign in event:', {
        provider: account?.provider,
        user: { id: user.id, name: user.name },
        account: account
          ? { provider: account.provider, type: account.type }
          : null,
      })
    },
    async signOut(message) {
      console.log('👋 Sign out event')
      if ('token' in message) {
        console.log(message.token)
      }
    },
  },
  debug: true, // Enable full debugging
})
