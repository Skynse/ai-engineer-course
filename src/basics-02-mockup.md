# Mockup: A Reddit-Style Site

**Video**: 2 min — Generate a static mockup, run it, click through it

---

Before writing real backend code, generate a stripped-back static version of the site so you can see what you're building.

## Prompt it

Give your AI tool this:

```text
Generate a stripped-back static Next.js app that looks like a Reddit-style social media site.

Include:
- A feed page showing posts with title, author, vote count, and comment count
- A post detail page showing the full post content and a list of comments
- A simple navbar with the site name
- A sidebar with community/topic links (hardcoded)

No backend, no database — use hardcoded mock data. Tailwind CSS for styling.
Keep it clean and minimal. No auth, no forms that actually submit.
```

## Run it

```bash
bun dev
```

Click through the feed and post pages. This is the product contract — everything you build from here on replaces the mock data with real Appwrite data.

