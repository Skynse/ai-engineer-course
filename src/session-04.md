# Lesson 4: Imageboard Authentication

**Duration**: 1.5 hours  
**Goal**: Add signup, login, and protected app behavior to the same imageboard app

## Learning Objectives

By the end of this lesson, you will:
- explain what authentication does in an app
- understand the difference between identity and profile data
- add signup and login in bounded prompts
- verify session behavior in the browser and Appwrite
- debug common auth mistakes without guessing

## Part 1: Concept

Authentication answers one question:

Who is the current user?

In this course, Appwrite handles the account and session system. The app still needs to decide:

- which pages require a signed-in user
- which data belongs to which user
- what should happen after signup, login, and logout

## Part 2: Product Goal

The lesson outcome should be:

- users can sign up
- users can sign in
- users can sign out
- signed-in state changes the imageboard UI
- protected posting areas stay protected

Keep the first version plain and functional.

## Part 3: Prompting Sequence

Teach the feature in small slices:

1. prompt for the auth architecture first
2. add signup
3. test signup
4. add login and logout
5. test session-aware UI
6. add route protection if needed

### Example Prompt

Plan the smallest beginner-friendly auth flow for this Next.js and Appwrite app.

Return:
- files to create or edit
- whether I need separate signup and login routes
- how signed-in state should be checked
- what Appwrite settings or collections I need to verify

Do not write code yet.

After the plan is reviewed, prompt Codex to implement one step at a time.

## Part 4: Copy-Paste Codex Prompt

```text
This imageboard already has basic thread listing and creation.

Add authentication in bounded steps.

Requirements:
- users can sign up
- users can sign in
- users can sign out
- the UI shows whether a user is signed in
- keep the existing thread flow working

First return:
- files to create or edit
- how auth state should be checked
- what Appwrite auth settings I need to verify

Do not write code yet.
```

## Part 5: What You Must Verify

You should verify:

1. Email/password auth is enabled in Appwrite.
2. Signup creates an Appwrite account.
3. Login actually changes the app state.
4. Logout removes access to protected UI.
5. The app does not assume a user exists when no session is present.

## Part 6: Common Issues To Surface

Expect issues such as:

- wrong project or endpoint values
- missing auth provider settings
- UI that does not refresh after session changes
- profile data assumptions before the user document exists

The goal is to learn to:
- describe auth behavior clearly
- prompt for one auth slice at a time
- verify session behavior
- identify whether the failure is frontend, backend, or Appwrite configuration
