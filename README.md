# Grindly API

A lightweight Node.js/TypeScript microservice for task and reward management with JWT authentication and rate limiting.

## 🎯 Purpose

Grindly helps users manage their daily tasks and track rewards/achievements in a gamified productivity system. Built as a secure, scalable microservice with modern development practices.

## 🛠 Tech Stack

- **Backend**: Node.js + TypeScript + Express.js
- **Database**: MongoDB Atlas + Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Arcjet (rate limiting & DDoS protection)
- **Deployment**: Render.com

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   # Create .env.development.local
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/grindly
   JWT_SECRET=your-secret-key
   ARCJET_KEY=your-arcjet-key
   ```

3. **Run locally**
   ```bash
   npm run dev    # Development with hot reload
   npm run build  # Build for production
   npm run prod   # Run production build
   ```

## 📁 Core Features

- **User Management** - Registration, authentication, profiles
- **Task System** - CRUD operations for tasks with completion tracking
- **Reward System** - Achievement and reward management
- **Event Logging** - Activity tracking and audit trails
- **Rate Limiting** - API protection against abuse

## 🔗 API Base URL

- **Local**: `http://localhost:3000`
- **Production**: `https://your-app.onrender.com`

## 📚 Documentation

For detailed API documentation, setup instructions, and deployment guides:
👉 **[View Full Documentation](./DOCUMENTATION.md)**

*Built with ❤️ using Node.js and TypeScript*
