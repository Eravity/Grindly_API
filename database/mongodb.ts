import mongoose from 'mongoose';
import process from 'node:process';

import { DB_URI, NODE_ENV } from "../config/env.ts";

if(!DB_URI) {
  throw new Error("DB_URI is not defined");
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI!);
    console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectDB;