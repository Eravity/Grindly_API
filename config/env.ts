import {config} from 'dotenv';
import process from 'node:process';

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  NODE_ENV,
  DB_URI,
  PORT
} = process.env;