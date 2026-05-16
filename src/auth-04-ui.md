# Logged-in vs Logged-out UI

**Video**: 1 min — Show the right UI depending on auth state

---

The UI should look different depending on whether a user is logged in. Logged-out visitors see the feed but no forms. Logged-in users see their name in the navbar and can post and comment.

## Prompt it

```text
Update the UI in this Next.js + Appwrite app to reflect auth state:

- Navbar: show the logged-in user's name and a "Sign Out" button when authenticated; show a "Sign In" link when not
- Post form: visible only when logged in, hidden otherwise
- Comment form: visible only when logged in, hidden otherwise
- Show a short "Sign in to post" message where the form would be for logged-out visitors

Read auth state with Appwrite's account.get() — treat a failed call as logged out.
```

## Verify

- Open an incognito window — you should see the feed but no forms
- Sign in — forms appear and the navbar shows your name
- Sign out — forms disappear and the navbar reverts to "Sign In"
