import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

// single source export (IMPORTANT)
export const { signIn, signUp, useSession } = authClient;