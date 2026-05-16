# Data Models & CRUD

**Video**: 2 min — Posts, comments, and what CRUD actually means

---

A Reddit-style site has two core data models: posts and comments. Everything else (users, votes) builds on top of these.

## Data models

### Posts collection

| Field | Type | Notes |
|-------|------|-------|
| title | string | Required |
| content | string | The post body |
| authorId | string | Links to the user |
| authorName | string | Display name |
| voteCount | integer | Starts at 0 |
| createdAt | datetime | Auto |

### Comments collection

| Field | Type | Notes |
|-------|------|-------|
| postId | string | Which post this belongs to |
| content | string | The comment body |
| authorId | string | Links to the user |
| authorName | string | Display name |
| createdAt | datetime | Auto |

## What CRUD means

| Operation | In this app |
|-----------|-------------|
| **C**reate | Submit a new post or comment |
| **R**ead | Load the feed or a post with its comments |
| **U**pdate | Edit a post or comment later |
| **D**elete | Remove a post or comment |

We build Create and Read first. Update and Delete come naturally after.

## Prompt it

```text
Set up Appwrite for this Reddit-style social site. I have a static mockup already.

1. Create a `posts` collection with fields: title, content, authorId, authorName, voteCount, createdAt
2. Create a `comments` collection with fields: postId, content, authorId, authorName, createdAt

Then build Next.js pages that:
- List all posts on the feed page (replace mock data with real Appwrite data)
- Show a single post with its comments on the detail page
- Let a user create a new post via a form
- Let a user add a comment to a post via a form

Use the Appwrite Web SDK. Keep it minimal — basic forms, no auth yet.
Hardcode a test user ID and name for now. We'll wire real users later.
```

## Verify

- The feed loads posts from Appwrite, not mock data
- Creating a post adds a real document
- Comments appear under the right post
