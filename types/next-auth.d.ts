import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string

interface BitCampUser extends DefaultUser {
  accessToken?: string;
}

declare module "next-auth/jwt" {
  interface JWT extends BitCampUser {
    id: UserId
  }
}

declare module "next-auth" {
  interface User extends BitCampUser { }
  interface Session {
    user: User & {
      id: UserId,
      token: string
    }
  }
}
