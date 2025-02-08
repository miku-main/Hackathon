import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_wsDWxa64RGnq@ep-misty-bush-a5dvlgzv-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});

