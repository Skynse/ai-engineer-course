# Lesson 5: Imageboard User Profiles

**Duration**: 1.5 hours  
**Goal**: Add profile data and teach the difference between account identity and application-specific user records

## Learning Objectives

By the end of this lesson, you will:
- explain why auth and profiles are not the same thing
- design a simple user profile shape
- connect profile pages to real user data
- prompt Codex for profile features in narrow slices
- test read and update flows carefully

## Part 1: Concept

Authentication proves who the user is.

Profiles describe app-specific information about that user.

Examples:
- display name
- bio
- avatar
- preferences

This matters because many beginner apps accidentally treat the auth account as if it already contains every profile field the UI wants.

In this imageboard, the profile data will later be reused beside threads and replies.

## Part 2: Product Goal

The lesson outcome should be:

- a profile page exists
- the signed-in user can view their profile data
- the signed-in user can update selected fields
- profile information can be reused elsewhere in the app

## Part 3: Prompting Sequence

Recommended sequence:

1. ask Codex to propose the minimum profile schema
2. verify that schema in Appwrite
3. ask it to build the profile read flow
4. test loading states and empty states
5. ask it to add profile updates
6. test that updates persist

### Example Prompt

I already have auth working.

Add a beginner-friendly profile system to this app.

Requirements:
- profile page for the current user
- fields: name, bio, avatar placeholder
- keep the schema small
- tell me what Appwrite collection fields need to exist
- implement the read flow first, then stop

## Part 4: Copy-Paste Schema Brief

```text
Imageboard profile schema brief:

Create one collection called profiles.

Fields:
- userId: string, required
- handle: string, required, max 30
- bio: string, optional, max 280
- avatarFileId: string, optional
- createdAt: datetime, required

Rules:
- one profile per authenticated user
- keep the schema small
- this profile data will later appear on threads and replies
```

Then use this follow-up prompt:

```text
Use this profile schema for the imageboard app.

First:
- tell me what Appwrite fields and indexes I need

Then:
- build the profile read flow
- stop before update logic
```

## Part 5: Manual Verification Checklist

You should verify:

1. the profile page loads the correct user data
2. a signed-out visitor cannot edit another user's profile
3. profile changes persist after refresh
4. fields shown in the UI match fields that really exist
5. the app handles a missing profile document gracefully

This lesson reinforces:

- user identity vs profile data
- data ownership
- why the app needs a stable source of truth
- why it is important to inspect the real backend before trusting generated field names
