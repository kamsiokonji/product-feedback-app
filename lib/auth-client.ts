import { createAuthClient } from "better-auth/react";

export const {
  signIn,
  signOut,
  useSession,
  signUp,
  forgetPassword,
  resetPassword,
} = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  redirectUrl: "/",
});
