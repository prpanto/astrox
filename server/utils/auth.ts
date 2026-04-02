import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "~~/database/schema";
import useDatabase from "./database";

export const auth = betterAuth({
  database: drizzleAdapter(useDatabase(), {
    provider: "pg",
    schema: {
      ...schema
    }
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});

