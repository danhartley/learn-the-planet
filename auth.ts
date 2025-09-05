import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient } from 'mongodb'

// iNaturalist user profile interface
interface iNaturalistProfile {
  id: number
  login: string
  name: string
  icon_url: string | null
  created_at: string
  updated_at: string
  roles: string[]
  site_id: number
  email: string
}

// Custom iNaturalist provider
const iNaturalistProvider = (options: any) => ({
  id: 'inaturalist',
  name: 'iNaturalist',
  type: 'oauth' as const,
  authorization: {
    url: 'https://www.inaturalist.org/oauth/authorize',
    params: {
      response_type: 'code',
      scope: 'write',
      // iNaturalist doesn't use traditional scopes - authentication gives write access
    },
  },
  token: 'https://www.inaturalist.org/oauth/token',
  userinfo: 'https://api.inaturalist.org/v1/users/me',
  profile(profile: iNaturalistProfile) {
    return {
      id: profile.id.toString(),
      name: profile.name || profile.login,
      email: profile.email,
      image: profile.icon_url,
      // Store the numeric user_id for querying observations
      inaturalist_user_id: profile.id,
      inaturalist_login: profile.login,
    }
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
  .filter(([_, value]) => !value)
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
  trustHost: true, // required by netlify
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user && user?.id) {
        session.user.id = user.id

        // Add iNaturalist-specific data to session if available
        if (user.inaturalist_user_id) {
          session.user.inaturalist_user_id = user.inaturalist_user_id
          session.user.inaturalist_login = user.inaturalist_login
        }
      }
      return session
    },
    jwt: async ({ token, account, profile }) => {
      // Store iNaturalist user data in JWT token
      if (account?.provider === 'inaturalist' && profile) {
        const inatProfile = profile as unknown as iNaturalistProfile
        token.inaturalist_user_id = inatProfile.id
        token.inaturalist_login = inatProfile.login
      }
      return token
    },
  },
  debug: false,
})
