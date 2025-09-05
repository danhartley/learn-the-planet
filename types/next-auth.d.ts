// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      inaturalist_user_id?: number
      inaturalist_login?: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    inaturalist_user_id?: number
    inaturalist_login?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    inaturalist_user_id?: number
    inaturalist_login?: string
  }
}
