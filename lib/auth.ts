import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function loginUser(credentials) {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const user = await response.json();
  return user.token;
}

async function getUserProfile(token) {
  const profileResponse = await fetch(`${BACKEND_URL}/auth/profile`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!profileResponse.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return profileResponse.json();
}


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const token = await loginUser(credentials);
          const profile = await getUserProfile(token);

          return {
            accessToken: token,
            id: profile.id,
            name: profile.username,
            email: profile.email
          };
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id ?? session.user.id,
          name: token.name ?? session.user.name,
          email: token.email ?? session.user.email,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
}
