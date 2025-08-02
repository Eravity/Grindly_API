# Grindly API Documentation

Complete documentation for the Grindly task and reward management microservice.

## 📁 Project Structure

```
grindly/
├── config/
│   ├── arcjet.ts          # Arcjet security configuration
│   └── env.ts             # Environment variables setup
├── controllers/
│   ├── auth.controller.ts      # Authentication logic
│   ├── eventLog.controller.ts  # Event logging logic
│   ├── reward.controller.ts    # Reward management logic
│   ├── task.controller.ts      # Task management logic
│   └── user.controller.ts      # User management logic
├── database/
│   └── mongodb.ts         # MongoDB connection setup
├── middleware/
│   ├── arcjet.middleware.ts    # Security middleware
│   ├── auth.middleware.ts      # JWT authentication middleware
│   └── error.middleware.ts     # Global error handling
├── models/
│   ├── eventLog.model.ts  # Event log data model
│   ├── reward.model.ts    # Reward data model
│   ├── task.model.ts      # Task data model
│   └── user.model.ts      # User data model
├── routes/
│   ├── auth.ts           # Authentication routes
│   ├── eventLog.ts       # Event log routes
│   ├── reward.ts         # Reward routes
│   ├── task.ts           # Task routes
│   └── user.ts           # User routes
├── dist/                 # Compiled JavaScript (auto-generated)
├── server.ts            # Main application entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── render.yaml          # Render deployment config
```

## 🚦 Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account
- npm or yarn package manager

### Local Development Setup

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd grindly
   npm install
   ```

2. **Environment Configuration**
   
   Create **`.env.development.local`**:
   ```env
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/grindly-dev
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-jwt-secret-key-minimum-32-characters
   JWT_EXPIRES_IN=90d
   ARCJET_ENV=development
   ARCJET_KEY=your-arcjet-development-key
   ```
   
   Create **`.env.production.local`**:
   ```env
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/grindly-prod
   PORT=3000
   NODE_ENV=production
   JWT_SECRET=your-production-jwt-secret-key-minimum-32-characters
   JWT_EXPIRES_IN=90d
   ARCJET_ENV=production
   ARCJET_KEY=your-arcjet-production-key
   ```

3. **MongoDB Atlas Setup**
   - Create a MongoDB Atlas cluster
   - Create a database user with read/write permissions
   - Add your IP address to the network access whitelist
   - Copy the connection string to your environment files

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run with tsx (development/staging) |
| `npm run dev` | Development mode with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm run prod` | Run production build from dist/ |

## 🔗 API Endpoints

### Base URL
- **Local**: `http://localhost:3000`
- **Production**: `https://your-app.onrender.com`

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### User Management Endpoints

All user endpoints require authentication via `Authorization: Bearer <token>` header.

#### Get User Profile
```http
GET /api/v1/users/profile
Authorization: Bearer <jwt-token>
```

#### Update User Profile
```http
PUT /api/v1/users/profile
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

#### Delete User Account
```http
DELETE /api/v1/users/account
Authorization: Bearer <jwt-token>
```

### Task Management Endpoints

#### Get All Tasks
```http
GET /api/v1/tasks
Authorization: Bearer <jwt-token>
```

#### Create New Task
```http
POST /api/v1/tasks
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "priority": "high",
  "dueDate": "2025-08-15T10:00:00Z"
}
```

#### Get Task by ID
```http
GET /api/v1/tasks/:id
Authorization: Bearer <jwt-token>
```

#### Update Task
```http
PUT /api/v1/tasks/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Updated task title",
  "completed": false,
  "priority": "medium"
}
```

#### Mark Task as Complete
```http
PATCH /api/v1/tasks/:id/complete
Authorization: Bearer <jwt-token>
```

#### Delete Task
```http
DELETE /api/v1/tasks/:id
Authorization: Bearer <jwt-token>
```

### Reward Management Endpoints

#### Get All Rewards
```http
GET /api/v1/rewards
Authorization: Bearer <jwt-token>
```

#### Create New Reward
```http
POST /api/v1/rewards
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Task Master",
  "description": "Complete 10 tasks",
  "points": 100,
  "type": "achievement"
}
```

#### Get Reward by ID
```http
GET /api/v1/rewards/:id
Authorization: Bearer <jwt-token>
```

#### Update Reward
```http
PUT /api/v1/rewards/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Updated reward name",
  "points": 150
}
```

#### Delete Reward
```http
DELETE /api/v1/rewards/:id
Authorization: Bearer <jwt-token>
```

### Event Log Endpoints

#### Get Event Logs
```http
GET /api/v1/events
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `limit` - Number of events to return (default: 50)
- `page` - Page number for pagination (default: 1)
- `type` - Filter by event type

#### Create Event Log
```http
POST /api/v1/events
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "type": "task_completed",
  "description": "User completed task: Complete documentation",
  "metadata": {
    "taskId": "task_id_here",
    "points": 50
  }
}
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in all subsequent requests:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Structure
- **Expiration**: 90 days (configurable via `JWT_EXPIRES_IN`)
- **Algorithm**: HS256
- **Payload**: Contains user ID and issued/expiry timestamps

## 🛡️ Security Features

### Rate Limiting (Arcjet)
- **Authentication endpoints**: 5 requests per minute per IP
- **General API endpoints**: 100 requests per minute per IP
- **DDoS protection**: Automatic IP blocking for suspicious activity

### Password Security
- **Hashing**: bcryptjs with salt rounds
- **Minimum length**: 8 characters (recommended: 12+)
- **No password recovery**: Users must contact support

### Input Validation
- **Request body validation**: All POST/PUT requests validated
- **Parameter sanitization**: SQL injection and XSS protection
- **Type checking**: TypeScript ensures type safety

## 🚀 Deployment

### Render.com Deployment

1. **Connect GitHub Repository**
   - Link your GitHub repository to Render
   - Choose the main branch for deployment

2. **Build Settings**
   ```
   Build Command: npm install && npm run build
   Start Command: npm run prod
   Node Version: 18+
   ```

3. **Environment Variables**
   Set these in your Render dashboard:
   ```
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/grindly-prod
   JWT_SECRET=your-secure-production-jwt-secret-key
   JWT_EXPIRES_IN=90d
   ARCJET_ENV=production
   ARCJET_KEY=your-production-arcjet-key
   NODE_ENV=production
   PORT=3000
   ```

4. **MongoDB Atlas Network Access**
   - Add Render's IP ranges to MongoDB Atlas whitelist
   - Or use "Allow access from anywhere" (0.0.0.0/0) for simplicity

### Other Platforms

The application supports deployment on:
- **Vercel** (with serverless functions)
- **Railway** (container deployment)
- **Heroku** (with Procfile)
- **AWS Lambda** (with serverless framework)
- **Google Cloud Run** (containerized)

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseServerSelectionError: Could not connect to any servers`

**Solutions**:
1. Check `DB_URI` format in environment variables
2. Verify MongoDB Atlas IP whitelist includes your deployment platform
3. Ensure database user has proper read/write permissions
4. Test connection string with MongoDB Compass

### JWT Authentication Issues

**Error**: `JsonWebTokenError: invalid token`

**Solutions**:
1. Verify `JWT_SECRET` is set correctly (minimum 32 characters)
2. Check token format: `Authorization: Bearer <token>`
3. Ensure token hasn't expired
4. Regenerate token if necessary

### Build/Deployment Issues

**Error**: `Cannot find module` during deployment

**Solutions**:
1. Ensure all `@types/*` packages are in `dependencies` (not `devDependencies`)
2. Check import paths use `.js` extensions for ES modules
3. Verify `tsconfig.json` configuration
4. Clean build: `rm -rf dist && npm run build`

### Rate Limiting Issues

**Error**: `429 Too Many Requests`

**Solutions**:
1. Check Arcjet configuration in `config/arcjet.ts`
2. Verify `ARCJET_KEY` is set correctly
3. Implement exponential backoff in client applications
4. Consider upgrading Arcjet plan for higher limits

## 📝 Environment Variables Reference

| Variable | Description | Required | Default | Example |
|----------|-------------|----------|---------|---------|
| `DB_URI` | MongoDB connection string | ✅ | - | `mongodb+srv://user:pass@cluster.net/db` |
| `PORT` | Server port | ❌ | `3000` | `3000` |
| `NODE_ENV` | Environment mode | ❌ | `development` | `production` |
| `JWT_SECRET` | JWT signing secret (32+ chars) | ✅ | - | `your-super-secure-secret-key-here` |
| `JWT_EXPIRES_IN` | JWT token expiration | ❌ | `90d` | `30d`, `24h`, `60m` |
| `ARCJET_ENV` | Arcjet environment | ❌ | `development` | `production` |
| `ARCJET_KEY` | Arcjet API key | ✅ | - | `ajkey_01234567890abcdef` |

## 📊 Data Models

### User Model
```typescript
{
  _id: ObjectId,
  username: string,
  email: string,
  password: string, // hashed
  createdAt: Date,
  updatedAt: Date,
  profile: {
    firstName?: string,
    lastName?: string,
    avatar?: string
  },
  stats: {
    tasksCompleted: number,
    totalPoints: number,
    level: number
  }
}
```

### Task Model
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  title: string,
  description?: string,
  completed: boolean,
  priority: 'low' | 'medium' | 'high',
  dueDate?: Date,
  createdAt: Date,
  updatedAt: Date,
  completedAt?: Date,
  tags?: string[],
  points: number
}
```

### Reward Model
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  name: string,
  description: string,
  type: 'achievement' | 'badge' | 'points',
  points: number,
  earned: boolean,
  earnedAt?: Date,
  createdAt: Date,
  requirements?: {
    tasksCompleted?: number,
    pointsRequired?: number,
    timeframe?: string
  }
}
```

### Event Log Model
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  type: string,
  description: string,
  timestamp: Date,
  metadata?: any,
  ipAddress?: string,
  userAgent?: string
}
```

## 🔄 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { /* additional error info */ }
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "pages": 3
  }
}
```

## 🧪 Testing

### Manual Testing with cURL

**Login:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Create Task:**
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Task","description":"Test description"}'
```

### Postman Collection

Import the API endpoints into Postman:
1. Create a new collection named "Grindly API"
2. Add environment variables for `baseUrl` and `authToken`
3. Import all endpoints from this documentation
4. Set up authentication at collection level

---

## 📞 Support

For questions, issues, or contributions:
- **GitHub Issues**: Open an issue in the repository
- **Email**: Contact the development team
- **Documentation**: This file contains all technical details

---

*Last updated: August 2025*
