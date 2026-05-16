# Wire Up Posts

**Video**: 2 min — Replace mock feed data with real Appwrite posts

---

The mockup uses hardcoded data. This lesson replaces it with a real Appwrite `posts` collection and live reads and writes.

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
- Creating a post adds a real document in the Appwrite console
- The post detail page loads the correct post and its comments

