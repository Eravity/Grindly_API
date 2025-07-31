import { config } from "dotenv";
import process from "node:process";

// Load environment-specific .env file if it exists, otherwise load default .env
const envFile = process.env.NODE_ENV 
  ? `.env.${process.env.NODE_ENV}.local` 
  : ".env.development.local";

config({ path: envFile });

// Also try to load a general .env file as fallback
config();

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_ENV,
  ARCJET_KEY,
} = process.env;