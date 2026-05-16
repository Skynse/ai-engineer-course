# AI Security Audit

**Video**: 2 min — Have your AI find security gaps and fix them

---

Ask your AI to audit the app first, then apply the fixes. Don't skip the audit step — it often catches things you'd miss.

## Step 1 — Audit

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

- Open an incognito window — you see the feed but no forms
- Sign in as user A, try to edit user B's post — it should fail
- Check Appwrite console — collection permissions match the rules above
