import NextAuth, { DefaultSession } from 'next-auth';

declare module '@emoji-mart/react';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      tag: string;
      uid: string;
      name: string;
    } & DefaultSession['user'];
  }
}
