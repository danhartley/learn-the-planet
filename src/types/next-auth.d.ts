// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      inaturalist_user_id?: number
      inaturalist_login?: string
      inaturalist_login_exact?: string
      inaturalist_name?: string
      inaturalist_icon?: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    inaturalist_user_id?: number
    inaturalist_login?: string
    inaturalist_login_exact?: string
    inaturalist_name?: string
    inaturalist_icon?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    inaturalist_user_id?: number
    inaturalist_login?: string
    inaturalist_access_token?: string
  }
}
