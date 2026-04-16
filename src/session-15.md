# Lesson 15: Share Your Website

**Duration**: 20 minutes  
**Goal**: Get your app live on a public URL

## What You Need

- A Vercel account (free tier is fine)
- Your project ready to deploy

## Method 1: Vercel Dashboard (via GitHub)

1. Push your project to a GitHub repo
2. Go to [vercel.com](https://vercel.com), click **Add New Project**, and import the repo
3. Add your environment variables before deploying — the same ones from your `.env.local`:
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT`
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
   - any database or bucket IDs your app uses
4. Click **Deploy**

Every time you push to your main branch after this, Vercel redeploys automatically.

## Method 2: Vercel CLI

Install the CLI and deploy directly from your terminal:

```bash
npm i -g vercel
vercel login
vercel deploy --prod
```

Vercel will walk you through the setup on first run. Your environment variables can be added via the dashboard or with:

```bash
vercel env add NEXT_PUBLIC_APPWRITE_PROJECT_ID
```

## After Deploying (Both Methods)

Add your live Vercel URL to your Appwrite project settings as an allowed platform so requests aren't blocked.

---

**You're done. Share the link.**
