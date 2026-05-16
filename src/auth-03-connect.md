# Connect Users to Content

**Video**: 1 min — Replace hardcoded test users with the real logged-in user

---

Auth is working, but posts and comments still use a hardcoded `authorId`. This lesson swaps that out for the real session user.

## Prompt it

```text
Auth is working in this app. Now replace the hardcoded test authorId and authorName on posts and comments.

When a logged-in user creates a post or comment:
- Use the real user's account ID as authorId
- Use the real user's email or display name as authorName

Read the current session with Appwrite's account.get() method. If the user is not logged in, block the form submission.
```

## Verify

- Create a post while logged in — the Appwrite document should show your real user ID as `authorId`
- Log out and confirm the create form is not accessible
