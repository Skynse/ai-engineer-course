# Authentication

**Video**: 2 min — What auth does, signup/login/logout, connecting content to real users

---

Authentication answers one question: **who is the current user?**

It handles signup, login, logout, and sessions. It does **not** store profiles, bios, or avatars — that's a separate collection.

## Prompt it

### Step 1 — Plan

```text
I have a Next.js app with Appwrite for the backend. Posts and comments use a hardcoded test user.

Plan the auth flow. Tell me:
- What files need to be created or changed
- What Appwrite settings I need to enable
- How the app should behave differently for logged-in vs logged-out users

Don't write code yet.
```

### Step 2 — Build auth

```text
Add Appwrite auth to this app.

Requirements:
- Users can sign up with email and password
- Users can sign in and sign out
- The navbar shows the user's name when logged in, and "Sign In" when logged out
- Post and comment forms are hidden when logged out
- New posts and comments use the real logged-in user instead of the hardcoded test user

Build signup first. Stop and let me test it before continuing.
```

### Step 3 — Add profiles

```text
Auth is working. Now create a `profiles` collection in Appwrite with:
- userId: string (Appwrite account ID)
- displayName: string
- bio: string (optional)
- avatarUrl: string (optional)
- createdAt: datetime

When a user signs up, automatically create their profile document.
Show the profile info on their posts and comments instead of raw email addresses.
```

## The key distinction

- **Auth account** = email, password, session (Appwrite manages this)
- **Profile** = display name, bio, avatar (you manage this in a collection)

They're linked by `userId` — the same user ID stored in two different places.
