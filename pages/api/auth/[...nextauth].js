import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login/`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
        
        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ],
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
})
