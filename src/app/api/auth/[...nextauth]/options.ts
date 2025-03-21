import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// Import any other providers you need (GitHub, Google, etc.)

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      profile(profile) {
        console.log("Profile GitHub: ", profile);
        let userRole = "Github User";
        if (profile.email === "rononyonka@gmail.com") {
          userRole = "Admin";
        }

        return {
          ...profile,
          role: userRole
        }
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);
        let userRole = "Google User";

        return {
          ...profile,
          id: profile.id,
          role: userRole,
        }
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  callbacks: {
    async jwt({token, user}){
      if (user) token.role = user.role;
      return token;
    },  // Missing comma here
    async session({session, token}){
      if(session?.user) session.user.role = token.role;
      return session;
    }  // Missing closing curly brace and semicolon here
  }
};