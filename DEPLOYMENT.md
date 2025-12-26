# 🚀 Deployment Guide for Heartie

This guide will help you deploy Heartie to Railway.

## Prerequisites

- A [Railway](https://railway.app) account
- Git repository with your code
- Node.js 20 or higher (for local testing)

## Quick Deploy to Railway

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub** (if not already done)
   ```bash
   git push origin claude/heartie-marketing-planner-GNXMu
   ```

2. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the branch: `claude/heartie-marketing-planner-GNXMu`

3. **Configure the deployment**
   Railway will automatically detect the configuration from `nixpacks.toml` and:
   - Install dependencies with `npm ci`
   - Build the app with `npm run build`
   - Start the server with `npm start`

4. **Access your app**
   - Railway will provide a public URL
   - Your app will be live at: `https://your-app.railway.app`

### Option 2: Deploy via Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize and deploy**
   ```bash
   railway init
   railway up
   ```

4. **Set custom domain (optional)**
   ```bash
   railway domain
   ```

## Configuration Files

The following files have been added for Railway deployment:

### `server.js`
Express server that serves the built static files and handles client-side routing.

### `nixpacks.toml`
Railway configuration file that specifies:
- Node.js version (20)
- Install command: `npm ci`
- Build command: `npm run build`
- Start command: `npm start`

### `.nvmrc`
Specifies Node.js version 20 for consistent deployments.

## Environment Variables

Currently, Heartie runs entirely on the frontend with no backend dependencies. If you add Supabase or other services later, add environment variables in Railway:

1. Go to your project in Railway
2. Click on "Variables"
3. Add your variables (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
4. Redeploy the app

**Note:** All environment variables for Vite must be prefixed with `VITE_` to be accessible in the frontend.

## Local Production Testing

Test the production build locally before deploying:

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Visit**
   ```
   http://localhost:3000
   ```

## Deployment Checklist

- [ ] Code is committed and pushed to repository
- [ ] `npm run build` succeeds locally
- [ ] `npm start` serves the app correctly locally
- [ ] All sensitive data is in environment variables (not hardcoded)
- [ ] Railway project is created and connected to repository
- [ ] Custom domain configured (if desired)
- [ ] SSL/HTTPS is enabled (Railway does this automatically)

## Automatic Deployments

Railway will automatically redeploy your app when you push to the connected branch:

```bash
git add .
git commit -m "Update feature"
git push origin claude/heartie-marketing-planner-GNXMu
```

Railway will detect the push and automatically:
1. Pull the latest code
2. Install dependencies
3. Build the app
4. Deploy the new version

## Troubleshooting

### Build fails
- Check Railway logs in the dashboard
- Ensure `npm run build` works locally
- Verify all dependencies are in `package.json`

### App doesn't load routes correctly
- Ensure `server.js` has the catch-all route handler for client-side routing
- Check that `dist/index.html` exists after build

### Port issues
- Railway automatically provides `PORT` environment variable
- Server is configured to use `process.env.PORT || 3000`

### Dependencies not found
- Ensure `express` is in `dependencies` (not `devDependencies`)
- Run `npm ci` locally to verify `package-lock.json` is correct

## Custom Domain Setup

1. In Railway dashboard, go to your project
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Follow instructions to configure DNS with your domain provider

## Performance Optimization

Railway deployment includes:
- ✅ Gzip compression for assets
- ✅ Static file caching
- ✅ Minified JavaScript and CSS
- ✅ Code splitting via Vite

## Monitoring

Monitor your deployment in Railway:
- View logs in real-time
- Check resource usage (CPU, Memory)
- Monitor response times
- Set up custom metrics (if needed)

## Rollback

If a deployment fails, Railway allows you to rollback:
1. Go to "Deployments" in Railway dashboard
2. Find a previous successful deployment
3. Click "Redeploy"

## Need Help?

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway GitHub: https://github.com/railwayapp

---

**Happy Deploying! 🌸**

Your Heartie marketing planner is ready to go live and help female solopreneurs plan their marketing with confidence!
