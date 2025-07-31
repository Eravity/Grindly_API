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

This project includes a `render.yaml` file for easy deployment. Render will automatically:
- Install dependencies with `npm install`
- Build the TypeScript code with `npm run build`
- Start the server with `npm start`

### 3. Manual Deployment Steps

If not using the render.yaml file:

1. **Connect Repository**: Link your GitHub repository to Render
2. **Service Type**: Choose "Web Service"
3. **Build Command**: `npm ci && npm run build`
4. **Start Command**: `node dist/server.js`
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
