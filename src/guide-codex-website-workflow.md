# Guide: Codex Website Workflow

**Goal**: Use Codex as a practical implementation partner without giving up product judgment.

## Why This Guide Exists

The default workflow here is:

1. define the product clearly
2. ask Codex for a concrete implementation step
3. run the app and inspect the result
4. tighten the prompt or patch the code
5. repeat until the feature is real

That is the build loop to follow throughout the lessons.

![Prompt build verify loop](/assets/diagrams/codex-build-loop.png)

This course uses Codex as the standard client for consistency.

If you use another AI coding tool, the same workflow ideas still apply, but the examples here assume Codex.

## What Codex Should Own

Use Codex for:

- turning a product brief into a page plan
- scaffolding components, routes, and API handlers
- proposing Appwrite schema changes
- generating form flows and CRUD logic
- debugging stack traces and failed builds
- refactoring rough code into cleaner structure

Do not use Codex as a replacement for:

- deciding what the product should do
- checking whether the generated UI actually matches the brief
- verifying permissions, schema fields, and environment variables
- testing real user flows in the browser

## The Default Loop For Every Feature

Use this loop every time you add a feature:

1. Write the feature in plain English
2. Tell Codex what file or area to change
3. Ask for one bounded step, not the whole app
4. Run the app
5. Review the output and fix the mismatch
6. Commit once the feature is stable

Example:

```text
Build the imageboard home page in my Next.js app.

Requirements:
- headline and short intro
- form for creating a new thread
- recent threads list below
- mobile-friendly layout
- use the existing Appwrite client

Work only in the page and any small supporting components you need.
Explain any environment variables I still need to set.
```

That prompt is specific enough to produce something useful and small enough to review.

## Start With A Brief, Not A Vibe

Weak prompt:

```text
make me a cool social app
```

Better prompt:

```text
Build a beginner-friendly social feed.

Core features:
- sign up and sign in
- create a text post with an optional image
- comment on posts
- simple profile page

Constraints:
- Next.js App Router
- Appwrite for auth, database, and storage
- keep the schema simple
- do not add follows, DMs, or notifications yet
```

The stronger the brief, the better the code and the less cleanup you have to do.

## Prompt In Vertical Slices

Do not ask Codex to generate the whole startup in one shot.

Use slices like:

- "Create the Appwrite client setup and env var list."
- "Build the sign-up page and connect it to Appwrite auth."
- "Add the post creation form and save documents to `posts`."
- "Refactor this page into smaller components without changing behavior."
- "Debug this permission error and explain the root cause."

Move feature by feature instead of hoping for one magic prompt.

## Ask For Plans Before Big Changes

For multi-file work, ask for a plan first.

Example:

```text
Plan the files and data flow for adding comments to this blog app.

Return:
- routes to add
- components to add or change
- Appwrite collections and attributes needed
- risks or assumptions

Do not write code yet.
```

Once the plan looks correct, ask Codex to implement one step at a time.

## Use Codex For Debugging

When something breaks, give Codex:

- the exact error
- the relevant file
- what you expected to happen
- what changed right before the bug appeared

Example:

```text
I submit the form and get `AppwriteException: User is not authorized`.

Expected:
- signed-in users can create posts

Relevant code:
- app/api/posts/route.ts
- lib/appwrite.ts

Explain the likely cause first, then patch the minimum code needed.
```

That is much better than pasting "it doesn't work."

## What To Verify Manually

Every Codex-generated feature still needs these checks:

- the page renders without TypeScript or runtime errors
- the layout matches the product brief
- the Appwrite collection names and fields are real
- permissions match the intended user flow
- loading, empty, and error states exist

If you cannot explain what the generated code does, the loop is not finished.

## Core Rule

Focus on whether you can:

- give Codex a clear spec
- steer the implementation
- verify the result
- debug the mismatches
- ship a working product
