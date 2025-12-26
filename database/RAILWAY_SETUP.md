# Railway PostgreSQL Setup Guide

This guide explains how to set up and deploy Heartie with Railway's PostgreSQL database.

## 🚀 Quick Start

### 1. Create Railway Project

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `anthropic-claude-code` repository
6. Select the `claude/heartie-marketing-planner-GNXMu` branch

### 2. Add PostgreSQL Database

1. In your Railway project dashboard, click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically provision a PostgreSQL instance
4. The `DATABASE_URL` environment variable is automatically added to your project

### 3. Set Up Database Schema

You need to run the schema SQL file to create all the necessary tables.

**Option A: Using Railway's PostgreSQL CLI**

1. In Railway dashboard, click on your PostgreSQL service
2. Go to "Connect" tab
3. Copy the "Postgres Connection URL"
4. In your local terminal, run:
   ```bash
   psql "YOUR_POSTGRES_CONNECTION_URL" < database/schema.sql
   ```

**Option B: Using Railway's Data Tab**

1. Click on PostgreSQL service in Railway
2. Go to "Data" tab
3. Click "Query"
4. Copy and paste the contents of `database/schema.sql`
5. Click "Run Query"

### 4. Add Environment Variables

In your Railway project settings, add:

1. `JWT_SECRET` - Generate a secure random string:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Copy the output and add it as JWT_SECRET in Railway

2. `NODE_ENV=production` (Railway usually sets this automatically)

**Note**: `DATABASE_URL` is automatically provided by Railway's PostgreSQL service - no need to add it manually!

### 5. Deploy

Railway will automatically deploy your app when you push to the branch. Your app will:

1. Build using `npm run build` (compiles TypeScript and Vite)
2. Start using `npm start` (runs `node server.js`)
3. Serve the API at `/api/*` routes
4. Serve the frontend from the `/dist` directory

## 📋 Environment Variables Summary

| Variable | Source | Purpose |
|----------|--------|---------|
| `DATABASE_URL` | Auto (Railway PostgreSQL) | PostgreSQL connection string |
| `JWT_SECRET` | Manual | JWT token signing secret |
| `PORT` | Auto (Railway) | Server port (usually 3000) |
| `NODE_ENV` | Auto (Railway) | Environment (production) |

## 🔒 Database Schema Overview

The schema creates the following tables:

- **users** - User accounts with email/password authentication
- **activities** - Marketing activities with funnel stages and platforms
- **annual_goals** - Yearly revenue, follower, email subscriber goals
- **quarterly_goals** - Quarterly themes and key initiatives
- **weekly_goals** - Weekly content and business goals
- **strategy_categories** - 3-layer strategy framework progress
- **metric_logs** - Analytics and performance metrics

All tables use UUID primary keys and include:
- Automatic `updated_at` timestamp triggers
- Foreign key relationships to users table
- Indexes for query performance

## 🧪 Testing Your Deployment

Once deployed, test these endpoints:

1. **Health Check**
   ```bash
   curl https://your-app.railway.app/api/health
   ```
   Should return: `{"status":"ok","message":"Heartie API is running"}`

2. **Sign Up**
   ```bash
   curl -X POST https://your-app.railway.app/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"testpassword123","name":"Test User"}'
   ```

3. **Login**
   ```bash
   curl -X POST https://your-app.railway.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"testpassword123"}'
   ```
   Save the `token` from the response.

4. **Get User Info** (protected route)
   ```bash
   curl https://your-app.railway.app/api/auth/me \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

## 🔄 Local Development

For local development with the database:

1. **Install PostgreSQL locally** (if not already installed):
   - macOS: `brew install postgresql`
   - Ubuntu: `sudo apt-get install postgresql`
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/)

2. **Create local database**:
   ```bash
   createdb heartie
   ```

3. **Run schema**:
   ```bash
   psql heartie < database/schema.sql
   ```

4. **Create .env file** (copy from .env.example):
   ```bash
   cp .env.example .env
   ```

5. **Update DATABASE_URL in .env**:
   ```
   DATABASE_URL=postgresql://localhost:5432/heartie
   ```

6. **Generate JWT_SECRET**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Add to .env file

7. **Run development server**:
   ```bash
   # Terminal 1: Frontend dev server
   npm run dev

   # Terminal 2: Backend API server
   npm start
   ```

## 📝 API Routes

All routes under `/api/*` require authentication except:
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info

### Activities
- `GET /api/activities` - Get all user activities
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Goals
- `GET /api/goals/weekly` - Get weekly goals
- `POST /api/goals/weekly` - Create weekly goal
- `PUT /api/goals/weekly/:id` - Update weekly goal
- `GET /api/goals/annual` - Get annual goals
- `POST /api/goals/annual` - Create/update annual goal
- `GET /api/goals/quarterly` - Get quarterly goals
- `POST /api/goals/quarterly` - Create/update quarterly goal

## 🐛 Troubleshooting

### Database Connection Errors

If you see `ECONNREFUSED` or connection errors:
1. Check that PostgreSQL service is running in Railway
2. Verify DATABASE_URL is set in environment variables
3. Check Railway PostgreSQL logs for errors

### Schema Errors

If tables don't exist:
1. Verify you ran `schema.sql` against the correct database
2. Check PostgreSQL logs in Railway for migration errors
3. Try running schema.sql again (it's idempotent for most operations)

### Authentication Errors

If JWT tokens don't work:
1. Verify JWT_SECRET is set in Railway environment variables
2. Ensure JWT_SECRET is the same across all instances
3. Check that tokens are being sent with `Authorization: Bearer TOKEN` header

### Build Failures

If Railway build fails:
1. Check build logs in Railway dashboard
2. Verify all dependencies are in package.json
3. Ensure TypeScript compiles locally: `npm run build`
4. Check that Node version matches (should be 20)

## 🔐 Security Notes

1. **Never commit .env files** - They contain secrets
2. **Use strong JWT_SECRET** - Generate with crypto.randomBytes(32)
3. **SSL in Production** - Railway PostgreSQL automatically uses SSL
4. **Password Hashing** - Uses bcrypt with 10 rounds
5. **Token Expiry** - JWT tokens expire after 7 days

## 📚 Next Steps

After setting up the database:

1. **Update Frontend** - Replace mock data with API calls
2. **Add Auth UI** - Create login/signup pages
3. **Test Authentication** - Verify signup and login flows
4. **Add Error Handling** - Handle API errors gracefully
5. **Add Loading States** - Show spinners during API calls

## 💡 Tips

- Railway provides automatic SSL certificates
- Railway automatically restarts your app on crashes
- Use Railway's built-in logging to debug issues
- Set up environment-specific configs for staging/production
- Consider adding database backups (Railway Pro feature)

---

**Need help?** Check the [Railway Docs](https://docs.railway.app/) or the Heartie README.md
