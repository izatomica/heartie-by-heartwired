# Supabase Setup Guide for Heartie

This guide will walk you through setting up Supabase as the database backend for Heartie.

## Why Supabase?

- ✅ **Visual table editor** - Create and modify tables without writing SQL
- ✅ **Built-in admin panel** - Browse and edit data easily
- ✅ **Automatic authentication** - User management and auth built-in
- ✅ **Row Level Security** - Data isolation per user automatically enforced
- ✅ **Real-time subscriptions** - Live data updates (future feature)
- ✅ **Free tier** - 500MB database, 50MB file storage, 2GB bandwidth

## 🚀 Quick Setup (15 minutes)

### Step 1: Create a Supabase Project (2 minutes)

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Fill in:
   - **Name**: `heartie` (or any name you prefer)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free (perfect for development)
5. Click **"Create new project"**
6. Wait 2-3 minutes for the project to be created

### Step 2: Get Your Supabase Credentials (1 minute)

1. In your Supabase project dashboard, click **"Settings"** (gear icon in sidebar)
2. Go to **"API"** section
3. You'll see:
   - **Project URL** - Copy this
   - **anon public** key - Copy this (it's safe for the browser!)

### Step 3: Set Up Environment Variables (1 minute)

#### For Local Development:

1. Copy the `.env.example` file to create `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-from-step-2
   ```

#### For Railway Deployment:

1. Go to your Railway project dashboard
2. Click on your app service
3. Go to **"Variables"** tab
4. Click **"+ New Variable"**
5. Add these two variables:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key

### Step 4: Run the Database Schema (5 minutes)

You have **two options** for creating the database tables:

#### Option A: Using Supabase SQL Editor (Recommended - Easy!)

1. In your Supabase project dashboard, click **"SQL Editor"** in the sidebar
2. Click **"New query"**
3. Open the file `database/schema.sql` from this project
4. Copy **all the contents**
5. Paste into the Supabase SQL editor
6. Click **"Run"** (or press Ctrl+Enter / Cmd+Enter)
7. You should see "Success. No rows returned"

✅ **Done!** Your database is ready.

#### Option B: Using Visual Table Editor (More work, but learn the UI)

You can create each table manually using the Table Editor:

1. Click **"Table Editor"** in Supabase sidebar
2. Click **"Create a new table"**
3. Follow the schema.sql file to create each table with the right columns

**Note:** This takes longer but helps you learn the Supabase UI.

### Step 5: Enable Row Level Security (Already done!)

The schema.sql file already includes RLS policies, so this is automatic. But to verify:

1. In Supabase, go to **"Authentication"** → **"Policies"**
2. You should see policies for each table (activities, goals, etc.)
3. All policies should say "Users can view/edit/delete their own..."

### Step 6: Test the Connection (2 minutes)

#### Local Development:

1. Make sure you've created the `.env` file with your credentials
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173
4. Try to sign up for an account
5. If it works, you're connected! 🎉

#### Railway Production:

1. Make sure you've added the environment variables to Railway
2. Push your code to GitHub:
   ```bash
   git push origin your-branch-name
   ```
3. Railway will automatically deploy
4. Visit your Railway app URL
5. Try to sign up for an account

## 📊 Managing Your Database

### View Data in Supabase

1. Go to **"Table Editor"** in Supabase
2. Click on any table (e.g., `activities`, `profiles`, `weekly_goals`)
3. You'll see all the data in a spreadsheet-like view
4. You can:
   - ✅ **View** any row by clicking it
   - ✅ **Edit** data directly in the table
   - ✅ **Filter** and search
   - ✅ **Add rows** manually if needed
   - ✅ **Delete rows**

### Run SQL Queries

1. Go to **"SQL Editor"**
2. Write any SQL query
3. Click Run

Example queries:
```sql
-- See all users
SELECT * FROM auth.users;

-- See all activities
SELECT * FROM activities;

-- Count activities by user
SELECT user_id, COUNT(*) as activity_count
FROM activities
GROUP BY user_id;
```

### View Logs and Errors

1. Go to **"Logs"** in Supabase sidebar
2. Filter by:
   - **API** - See all database queries
   - **Auth** - See login/signup attempts
   - **Realtime** - See live connection logs

## 🔐 Authentication

Supabase handles all auth automatically:

- ✅ **Email/Password** login (already configured)
- ✅ **Password reset** (via email)
- ✅ **Email verification** (optional)
- ✅ **OAuth providers** (Google, GitHub, etc. - can be enabled)

### Enable Email Confirmation (Optional)

1. Go to **"Authentication"** → **"Email Templates"**
2. Customize the confirmation email
3. Go to **"Settings"** → **"Authentication"**
4. Toggle **"Enable email confirmations"**

Now users must verify their email before logging in.

### Add OAuth Providers (Optional)

1. Go to **"Authentication"** → **"Providers"**
2. Enable providers like:
   - Google
   - GitHub
   - Facebook
   - etc.
3. Follow the instructions to set up OAuth apps

## 🚨 Troubleshooting

### "Invalid API key" Error

**Problem**: The anon key is incorrect or environment variables aren't set.

**Solutions**:
- Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are in your `.env` file
- Make sure you copied the **anon public** key, not the **service_role** key
- Restart your dev server after changing `.env`
- On Railway, verify environment variables are set correctly

### "Row Level Security policy violation" Error

**Problem**: RLS policies aren't allowing the operation.

**Solutions**:
- Make sure you're logged in (auth.uid() must exist)
- Check that user_id matches the logged-in user
- Verify RLS policies are created (check Authentication → Policies in Supabase)
- Try re-running the schema.sql file

### "relation 'activities' does not exist" Error

**Problem**: Database schema hasn't been created yet.

**Solutions**:
- Run the schema.sql file in Supabase SQL Editor (see Step 4)
- Check **Table Editor** to verify tables were created

### Can't Sign Up / Login

**Problem**: Auth configuration issue.

**Solutions**:
- Check **Auth** logs in Supabase (Logs → Auth)
- Verify email/password requirements (min 6 characters for password)
- Make sure you're using the correct Supabase URL
- Check browser console for errors

### Data Not Showing Up

**Problem**: RLS policies or user_id mismatch.

**Solutions**:
- Check if you're logged in (`auth.getCurrentUser()`)
- Verify the data has the correct `user_id` in the database
- Check **Table Editor** to see if data exists at all
- Look at **API** logs in Supabase to see query results

## 📝 Useful Supabase Features

### Real-time Subscriptions (Future Feature)

Supabase can push updates to your app in real-time:

```typescript
// Example: Listen for new activities
supabase
  .from('activities')
  .on('INSERT', payload => {
    console.log('New activity!', payload.new)
  })
  .subscribe()
```

### Storage for Images (Future Feature)

Upload user avatars, content images, etc.:

```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('user-id/avatar.png', file)
```

### Edge Functions (Future Feature)

Run serverless functions on Supabase:
- Send emails
- Process payments
- Generate AI content
- Etc.

## 🔗 Helpful Links

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Dashboard**: https://app.supabase.com
- **JavaScript Client Docs**: https://supabase.com/docs/reference/javascript
- **Auth Docs**: https://supabase.com/docs/guides/auth
- **RLS Docs**: https://supabase.com/docs/guides/auth/row-level-security

## ✅ Quick Checklist

Before deploying to production:

- [ ] Created Supabase project
- [ ] Ran schema.sql in SQL Editor
- [ ] Added environment variables to Railway
- [ ] Tested signup/login locally
- [ ] Verified RLS policies are working
- [ ] Tested on Railway production URL
- [ ] (Optional) Enabled email confirmation
- [ ] (Optional) Set up custom email templates
- [ ] (Optional) Configured OAuth providers

---

**Need help?** Check the [Supabase Discord](https://discord.supabase.com) or the main Heartie README.md
