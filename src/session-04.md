# Lesson 4: Authentication & User Profiles

**Duration**: 1.5 hours  
**Goal**: Add signup, login, and protected behavior to the imageboard — then immediately create user profiles in the same session, so the two are always in sync

## Learning Objectives

By the end of this lesson, you will:
- explain what authentication does and what it does not do
- understand why profiles and auth accounts are separate things
- add signup, login, and logout in bounded Codex prompts
- create a profiles collection immediately after auth is working
- verify that every new account automatically gets a profile document

## Part 1: Auth vs Profile — The Key Distinction

Authentication answers one question: **who is the current user?**

A profile answers a different question: **what do we know about that user in the app?**

Appwrite manages accounts and sessions. The `users` system gives you an email and a user ID. But the app also needs:
- a display name or handle
- a bio
- an avatar
- a link back to the content that user created

These live in a separate `profiles` collection — not inside the auth account.

**Why build both in the same lesson?**

If you build auth and stop, Codex will start associating threads and replies with a user ID that has no matching profile document. The UI will expect profile data that does not exist yet. Doing both in one session keeps everything in sync.

## Part 2: Auth Product Goals

The lesson outcome for authentication:

- users can sign up with email and password
- users can sign in
- users can sign out
- the imageboard UI reflects signed-in state
- protected areas (creating threads) require a session

Keep the first version plain and functional. Styling comes later.

## Part 3: Auth Prompting Sequence

Build in small slices:

1. Ask Codex to plan the auth architecture — no code yet
2. Implement signup
3. Test signup in Appwrite console
4. Implement login and logout
5. Wire signed-in state to the UI
6. Add route protection if needed

### Planning Prompt

```text
Plan the smallest beginner-friendly auth flow for this Next.js and Appwrite imageboard app.

Return:
- files to create or edit
- whether I need separate signup and login routes
- how signed-in state should be checked
- what Appwrite settings I need to verify before writing code

Do not write code yet.
```

Review the plan before giving the go-ahead.

### Build Prompt

```text
This imageboard does not have auth yet.

Add authentication in bounded steps.

Requirements:
- users can sign up with email and password
- users can sign in
- users can sign out
- the UI shows whether a user is signed in
- keep the app running throughout

First: implement signup only and stop.
```

Test signup before moving to login.

## Part 4: Auth Verification Checklist

Before continuing to profiles, verify:

1. Email/password auth is enabled in Appwrite console
2. Signup creates a real account visible in Appwrite
3. Login changes app state correctly
4. Logout removes access to protected UI
5. The app does not crash when no session exists

## Part 5: User Profiles

Now that auth is working, add profiles **immediately**.

### Profile Schema Brief

```text
Imageboard profile schema:

Collection: profiles

Fields:
- userId: string, required (Appwrite account $id)
- handle: string, required, max 30
- bio: string, optional, max 280
- avatarFileId: string, optional
- createdAt: datetime, required

Rules:
- one profile per authenticated user
- profile is created automatically on signup
- this profile data will later appear on threads and replies
```

### Profile Build Prompt

```text
Auth is now working in this imageboard app.

Add a user profile system immediately after signup.

Requirements:
- create a profiles collection with these fields: userId, handle, bio, avatarFileId, createdAt
- when a user signs up, automatically create a profile document linked to their account
- build a basic profile page for the signed-in user
- the profile page should load and display profile data
- keep the schema small — do not add anything not listed

Start with the profile creation on signup. Stop before the profile edit flow.
```

### Profile Schema in Appwrite

Create the `profiles` collection manually in Appwrite with these attributes:

| Field | Type | Required | Max |
|-------|------|----------|-----|
| userId | string | yes | 36 |
| handle | string | yes | 30 |
| bio | string | no | 280 |
| avatarFileId | string | no | 36 |
| createdAt | datetime | yes | — |

Add an index on `userId` so profiles can be looked up by the authenticated user.

## Part 6: Profile Verification Checklist

Verify:

1. Signing up creates both an Appwrite account and a profile document
2. The profile page loads the correct user data
3. A signed-out visitor cannot view or edit another user's profile
4. The app handles a missing profile document gracefully
5. Field names in code match the real Appwrite attribute names

## Part 7: Common Issues

Watch for:

- auth enabled in the app but not turned on in Appwrite console
- profile creation code running before the auth signup resolves
- UI that does not refresh after session changes
- code that tries to read profile data before the profile document exists

When something breaks, describe the exact error and ask Codex to diagnose one layer at a time — frontend, backend, or Appwrite configuration.

## Homework

1. Sign up as two different users and confirm each gets a separate profile document in Appwrite.
2. Try loading the profile page while signed out and note what happens.
3. Write down the difference between `account.$id` and a profile document's `userId` field — they should be the same value, but stored in different places.
