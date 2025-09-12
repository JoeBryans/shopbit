import prisma from "./lib/db";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextResponse } from "next/server";
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // GithubProv
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        try {
          console.log("credentials", credentials);

          const existUser = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!existUser) {
            return null;
          }
          console.log("existUser", existUser);

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            existUser.password
          );
          if (!passwordMatch) {
            return null;
          }
          const { password, ...user } = existUser;
          console.log("user", user);
          return user;
        } catch (error) {
          return NextResponse.json(error?.message);
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (account.provider === "google") {
    //     return profile.email_verified && profile.email.endsWith("@example.com");
    //   }
    //   return true; // Do different verification for other providers that don't have `email_verified`
    // },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/error", // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
};
