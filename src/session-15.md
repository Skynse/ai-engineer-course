# Lesson 15: Deploying to Vercel

**Duration**: 20 minutes  
**Goal**: Get your app live on a public URL

## What You Need

- A GitHub account with your project pushed to a repo
- A Vercel account (free tier is fine)

## Steps

### 1. Push your project to GitHub

If it's not already there, create a repo and push your code.

### 2. Import the project in Vercel

Go to [vercel.com](https://vercel.com), click **Add New Project**, and import your GitHub repo. Vercel will detect that it's a Next.js app automatically.

### 3. Add your environment variables

Before deploying, add the same variables from your `.env.local` file into Vercel's environment variable settings. At minimum:

- `NEXT_PUBLIC_APPWRITE_ENDPOINT`
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
- any database or bucket IDs your app uses

### 4. Deploy

Click **Deploy**. Vercel builds and hosts your app. You'll get a public URL when it's done.

### 5. Add your Vercel URL to Appwrite

In your Appwrite project settings, add your Vercel URL as an allowed platform/hostname so requests aren't blocked.

## Redeployments

Every time you push to your main branch, Vercel redeploys automatically. You don't have to do anything else.

---

**Next**: Final Project Planning
