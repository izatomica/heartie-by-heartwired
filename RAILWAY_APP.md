# Railway Deployment Information

## Production URL

**Live App**: https://anthropic-claude-code-production.up.railway.app

## Quick Health Check

Test the API and database connection:

```bash
curl https://anthropic-claude-code-production.up.railway.app/api/health
```

Expected response when healthy:
```json
{
  "status": "ok",
  "message": "Heartie API is running",
  "timestamp": "2025-12-26T...",
  "database": {
    "status": "connected",
    "message": "Database connection successful",
    "serverTime": "2025-12-26T..."
  }
}
```

## API Endpoints

Base URL: `https://anthropic-claude-code-production.up.railway.app/api`

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info (requires auth)

### Activities
- `GET /api/activities` - Get all activities (requires auth)
- `POST /api/activities` - Create new activity (requires auth)
- `PUT /api/activities/:id` - Update activity (requires auth)
- `DELETE /api/activities/:id` - Delete activity (requires auth)

### Goals
- `GET /api/goals/weekly` - Get weekly goals (requires auth)
- `POST /api/goals/weekly` - Create weekly goal (requires auth)
- `PUT /api/goals/weekly/:id` - Update weekly goal (requires auth)
- `GET /api/goals/annual` - Get annual goals (requires auth)
- `POST /api/goals/annual` - Create/update annual goal (requires auth)
- `GET /api/goals/quarterly` - Get quarterly goals (requires auth)
- `POST /api/goals/quarterly` - Create/update quarterly goal (requires auth)

## Testing Authentication Flow

### 1. Sign Up
```bash
curl -X POST https://anthropic-claude-code-production.up.railway.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "name": "Test User",
    "businessName": "Test Business",
    "industry": "Marketing",
    "mainGoal": "Grow my audience"
  }'
```

### 2. Login
```bash
curl -X POST https://anthropic-claude-code-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!"
  }'
```

Save the `token` from the response.

### 3. Get User Info
```bash
curl https://anthropic-claude-code-production.up.railway.app/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Deployment Status

- ✅ Railway project configured
- ✅ Express API server running
- ⏳ PostgreSQL database (pending setup)
- ⏳ Environment variables (pending configuration)

## Next Steps

1. Add PostgreSQL database service in Railway
2. Set `JWT_SECRET` environment variable
3. Run database schema (`database/schema.sql`)
4. Test health endpoint to verify database connection
5. Test authentication endpoints

## Troubleshooting

If the health check shows database disconnected:
1. Verify PostgreSQL service is added in Railway
2. Check that `DATABASE_URL` environment variable is set
3. Ensure schema has been run against the database
4. Check Railway logs for connection errors

## Local Development

To test locally before deploying:
```bash
# Copy environment template
cp .env.example .env

# Update .env with local PostgreSQL URL and JWT secret

# Build and start
npm run build
npm start

# Test locally
curl http://localhost:3000/api/health
```
