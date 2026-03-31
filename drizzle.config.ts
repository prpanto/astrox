import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./database",
  schema: "./database/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
