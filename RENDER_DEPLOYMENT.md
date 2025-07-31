# Grindly API - Render Deployment Guide

## Render.com Deployment Setup

### 1. Environment Variables
You'll need to set the following environment variables in your Render dashboard:

**Required:**
- `DB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `ARCJET_KEY` - Your Arcjet API key

**Optional:**
- `JWT_EXPIRES_IN` - JWT expiration time (default: "7d")
- `ARCJET_ENV` - Arcjet environment setting

### 2. Deployment Configuration

This project uses a hybrid approach:
- **Main server file**: `server.js` (JavaScript)
- **Other modules**: TypeScript files (.ts)
- **Runtime**: Uses `tsx` to run TypeScript directly without compilation

Render will automatically:
- Install dependencies with `npm ci`
- Start the server with `npm start` (which runs `tsx server.js`)

**Important**: No build step required! The `tsx` runtime handles TypeScript compilation on-the-fly.

### 3. Manual Deployment Steps

If not using the render.yaml file:

1. **Connect Repository**: Link your GitHub repository to Render
2. **Service Type**: Choose "Web Service"
3. **Build Command**: `npm ci`
4. **Start Command**: `npm start`
5. **Environment**: Node.js
6. **Plan**: Free (or choose your preferred plan)

### 4. Database Setup

Make sure your MongoDB database:
- Allows connections from Render's IP addresses (or use MongoDB Atlas with IP whitelisting disabled)
- Has the correct connection string format for production

### 5. Health Check

The API includes a health check endpoint at `/` that returns "Welcome to the Grindly API!"

### 6. HTTPS

Render automatically provides HTTPS for all deployments.

## Local Development vs Production

- **Development**: Uses `.env.development.local`
- **Production**: Uses environment variables set in Render dashboard
- **Build**: TypeScript files are compiled to JavaScript in the `dist/` folder
- **Runtime**: Production runs the compiled JavaScript files
