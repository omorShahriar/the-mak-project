import { Authenticator, AuthorizationError } from "remix-auth";
import { SupabaseStrategy } from "remix-auth-supabase";

import { supabaseClient } from "./supabase.server";
import { sessionStorage } from "./sessions.server";

export const supabaseStrategy = new SupabaseStrategy(
  {
    supabaseClient,
    sessionStorage,
    sessionKey: "sb:session", // if not set, default is sb:session
    sessionErrorKey: "sb:error", // if not set, default is sb:error
  },
  // simple verify example for email/password auth
  async ({ req, supabaseClient }) => {
    const form = await req.formData();
    const email = form?.get("email");
    const password = form?.get("password");
    const type = form?.get("type");
    if (!email) throw new AuthorizationError("Email is required");
    if (typeof email !== "string")
      throw new AuthorizationError("Email must be a string");

    if (!password) throw new AuthorizationError("Password is required");
    if (typeof password !== "string")
      throw new AuthorizationError("Password must be a string");
    if (type === "login") {
      return supabaseClient.auth.api
        .signInWithEmail(email, password)
        .then(({ data, error }) => {
          if (error || !data) {
            throw new AuthorizationError(
              error?.message ?? "No user session found"
            );
          }

          return data;
        });
    } else {
      return supabaseClient.auth.api
        .signUpWithEmail(email, password)
        .then(({ data, error }) => {
          if (error || !data) {
            throw new AuthorizationError(
              error?.message ?? "something is not right"
            );
          }

          return data;
        });
    }
  }
);

export const authenticator = new Authenticator(sessionStorage, {
  sessionKey: supabaseStrategy.sessionKey, // keep in sync
  sessionErrorKey: supabaseStrategy.sessionErrorKey, // keep in sync
});

authenticator.use(supabaseStrategy, "sb");
