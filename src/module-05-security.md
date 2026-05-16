# Security & Permissions

**Video**: 2 min — Permissions, ownership, and having your AI audit the app

---

Permissions control **who can do what** to your data.

| Level | Meaning |
|-------|---------|
| Anyone | Not logged in — can read public content |
| Authenticated | Logged in — can create posts and comments |
| Owner only | The author — can edit or delete their own content |

## Step 1 — Have your AI audit the app

```text
Perform a security analysis of this social site app.

Check:
- Can a non-logged-in visitor create posts or comments?
- Can one logged-in user edit or delete another user's post?
- Are Appwrite collection permissions set correctly for each role?
- Are there any API routes or server actions that trust the client without validation?

Report every issue you find. For each issue, explain the risk and suggest the fix.
```

## Step 2 — Apply the fixes

```text
Apply the security fixes you identified.

Requirements:
- Anyone can read posts and comments
- Only logged-in users can create posts and comments
- Only the post/comment author can edit or delete their own content
- Profiles can be read by anyone, but only edited by the owner

Use Appwrite collection permissions and document-level permissions.
Also validate ownership server-side — don't trust the client alone.
```

## Verify

- Open an incognito window. You should see the feed but no forms.
- Sign in as user A. Try to edit user B's post (hint: you shouldn't be able to).
- Check Appwrite console — permissions should match the rules above.
