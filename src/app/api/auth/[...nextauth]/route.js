import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";  // For password comparison
import { PrismaClient } from "@prisma/client";  // Prisma client
import GoogleProvider from "next-auth/providers/google";  // Google Provider

const prisma = new PrismaClient();  // Initialize Prisma Client

const handler = NextAuth({
  providers: [
    // Google provider for Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials provider for Email/Password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (user && await compare(credentials.password, user.password)) {
          // If email exists and password matches, return user
          return { id: user.id, email: user.email, name: user.name };  
        }

        // Return null if authentication fails
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",  // Redirect to login page if user is not authenticated
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.email = token.email;
      session.name = token.name;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,  // Set a JWT secret for signing
});

export { handler as GET, handler as POST };
