# Lesson 13: Social Feed Demo

**Duration**: 1.5 hours  
**Goal**: Build a social feed with images, likes, comments, and ownership-based deletes

## What We're Building

A social feed with:

- text posts
- optional image uploads
- like and unlike
- post detail view
- comments on posts
- delete actions for your own posts and comments

The current demo is closer to a real content product with feed, composer, detail view, and discussion.

## Database Schema

**posts collection:**

- `content` (string, required)
- `imageId` (string, optional)
- `userId` (string, required)
- `userName` (string, required)
- `likes` (string array)

**comments collection:**

- `postId` (string, required)
- `content` (string, required)
- `userId` (string, required)
- `userName` (string, required)

**storage bucket:**

- `post-images`

## Key Concepts

### 1. One-to-Many Relationships

This is the clearest relationship example in the course:

- one post
- many comments

That means comments belong in their own collection, linked by `postId`.

### 2. Likes As A User ID Array

The current demo stores likes directly on the post:

```typescript
likes: string[]
```

That is simple and beginner-friendly. It makes toggling straightforward:

- if the current user id exists, remove it
- if it does not exist, add it

This is not the only valid design, but it is a reasonable teaching tradeoff.

### 3. Image Uploads Reuse The Storage Pattern

Recognize the same pattern from the recipe app:

1. upload image to Storage
2. store `imageId` on the post document
3. render the image later from the stored file id

The important lesson is that Storage integration is a reusable pattern across product types.

### 4. Detail View Loads Related Data

The current social demo loads comments when a post is opened.

That teaches you:

- not every related dataset should be loaded up front
- open the detail view first
- then fetch the comments for that specific post

### 5. Ownership Matters

The current app now supports deleting:

- your own posts
- your own comments

This is a good place to teach that ownership is not just a UI concern. It affects:

- permissions
- delete rules
- image cleanup
- related record cleanup

When a post is deleted, the app also deletes:

- its comments
- its uploaded image file if one exists

That is a full-stack workflow, not just a button.

## What The Current Demo Actually Does

The current `social-feed` demo supports:

- create post
- upload post image
- list feed items
- open post detail
- like and unlike
- create comment
- delete your own comment
- delete your own post

That means comments should not be treated as "optional" or "future work." They are part of the shipped demo now.

## Component And File Reference

The main implementation currently centers on:

- `demo-projects/social-feed/src/app/page.tsx`
- `demo-projects/social-feed/src/app/components/Navbar.tsx`
- `demo-projects/social-feed/src/lib/appwrite.ts`

## Implementation Notes

1. Use a separate comments query filtered by `postId`.
2. Keep post creation and comment creation as separate mutation flows.
3. Only show delete actions to the owner of the resource.
4. If you delete a post that has an uploaded image, delete the Storage file too.
5. After destructive actions, refresh the relevant dataset immediately.

## Homework

1. Add pagination or "load more" instead of rendering every post at once.
2. Replace image `img` tags with `next/image` and explain the tradeoffs.
3. Ask AI to propose a follow system, then explain whether that should be a new collection or a field on the user document.

---

**Next**: Final polish, consistency, and deployment thinking
