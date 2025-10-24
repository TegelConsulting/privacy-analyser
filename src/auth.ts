import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import clientPromise from './app/lib/mongodb';

export const { handlers, signIn, signOut, auth } = NextAuth({
  //   pages: {
  //     signIn: '/login', // Custom sign-in route for later use when login page is created
  //   },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      // Custom email/password provider
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const client = await clientPromise;
          const db = client.db();

          const user = await db.collection('users').findOne({
            email: (credentials.email as string).toLowerCase(),
          });

          if (!user) {
            return null;
          }

          const isValid = await compare(
            credentials.password as string,
            user.password
          );

          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Callbacks to handle JWT and session data
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashBoard = nextUrl.pathname.startsWith('/dashboard'); // Might need adjustment based on actual protected routes
      if (isOnDashBoard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl.origin)); // same here, adjust as needed
      }
      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
});
