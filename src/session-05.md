# Lesson 5: CRUD — Boards, Threads, and Content

**Duration**: 1.5 hours  
**Goal**: Understand CRUD in a full-stack app and use Codex to build the first real data flows — starting with boards, then threads inside them

## Learning Objectives

By the end of this lesson, you will:
- explain CRUD in both product and technical terms
- understand why API routes sit between the UI and backend
- build boards as a fixed structure before adding dynamic thread content
- create threads tied to a board, an author, and a profile
- verify every change in both the browser and Appwrite

## Part 1: CRUD in Plain English

CRUD stands for:

| Operation | Meaning in the app |
|-----------|--------------------|
| Create | Add a new record |
| Read | Load one record or many |
| Update | Change an existing record |
| Delete | Remove a record |

Applied to the imageboard:

- visiting `/boards/cats` is **Read**
- submitting a new thread is **Create**
- editing a thread title is **Update**
- removing a thread is **Delete**

This lesson focuses on Create and Read. Update and Delete come naturally once the shape of the data is understood.

## Part 2: Why API Routes Matter

The UI should not own every backend concern directly.

API routes give the app a place to:
- validate input before it reaches Appwrite
- shape responses into what the UI needs
- centralize Appwrite access in one layer
- avoid spreading backend calls across random components

Understand this architecture before asking Codex to implement it.

![CRUD through an API route](/assets/diagrams/lesson-03-crud-api-flow.png)

## Part 3: Start With Boards

Boards are the backbone of the imageboard. Before threads can exist, boards need to exist.

For this first version, boards are a small fixed list — not user-created content. This keeps the initial scope narrow and avoids permission complexity.

### Board Schema

```text
Collection: boards

Fields:
- slug: string, required, max 64 (e.g. "cats", "games")
- name: string, required, max 128 (e.g. "Cats", "Video Games")
- description: string, optional, max 512
- createdAt: datetime, required
```

### Board Codex Prompt

```text
This imageboard app already has auth and user profiles working.

Add a boards collection to Appwrite and seed it with a small fixed list.

Boards to seed:
- cats (Cats)
- animals (Animals)
- games (Video Games)
- art (Art & Design)
- tech (Technology)

Requirements:
- create the boards collection with slug, name, description, createdAt
- seed the boards using the Appwrite CLI or a one-time script
- build a boards index page that lists all boards
- each board links to a threads page at /boards/[slug]

Build the index page and stop. Do not add thread creation yet.
```

Test that the boards page renders and each board link goes to the right URL before continuing.

## Part 4: Threads Inside Boards

Now that boards exist, add threads inside them.

### Thread Schema Reminder

From Lesson 3, the thread shape is:

| Field | Type | Notes |
|-------|------|-------|
| boardSlug | string | links thread to a board |
| title | string | max 255 |
| author | string | display name from profile |
| image | string | URL, max 2048 |
| imageAlt | string | max 512 |
| tag | string | max 64 |
| score | integer | upvote/downvote total |
| commentCount | integer | derived, stored for display |
| variant | string | e.g. "image", "text", "video" |
| excerpt | string | max 4096 |
| createdAtLabel | string | formatted for display |
| $createdAt | datetime | auto |
| $updatedAt | datetime | auto |

### Thread Build Prompt

```text
Boards are now working in this imageboard.

Add the thread list and thread creation flow.

Requirements:
- /boards/[slug] loads threads filtered to that board
- only signed-in users can create a thread
- thread creation requires: title, image URL, imageAlt, tag, excerpt, variant
- boardSlug is set automatically from the current board
- author is set from the current user's profile handle
- score starts at 0, commentCount starts at 0

Build thread listing first. Stop before the create form.
```

Test that threads load on the board page before adding the create form.

### Create Form Follow-Up Prompt

```text
Thread listing is working.

Now add the thread creation form.

Requirements:
- form appears only when signed in
- required fields: title, image URL, imageAlt, tag, excerpt, variant
- on submit, save to the threads collection in Appwrite
- after saving, redirect to the new thread's page or reload the thread list

Use an API route for the write. Validate required fields server-side.
```

## Part 5: Manual Verification Checklist

After both boards and threads are working, verify:

1. The boards index page lists every seeded board
2. Clicking a board loads its thread list
3. Signed-in users see the create thread form
4. Signed-out visitors do not see the form
5. Submitting the form creates exactly one document in Appwrite
6. Refreshing the page shows the saved thread
7. Field names in code match the real Appwrite attribute names

## Part 6: Prompting Strategy

This lesson has more moving parts than previous ones. The pattern that works:

1. Build one thing
2. Test it
3. Fix what breaks
4. Move to the next slice

Never ask Codex to build boards, threads, and the create form in one prompt. Each step introduces new failure points. Catching them one at a time keeps debugging manageable.

## Part 7: Reflection

After both boards and threads work, ask yourself:

- Which parts live in the frontend?
- Which parts live in the API route?
- Which parts live in Appwrite?
- Why did we build boards before threads?
- What would have broken if we had skipped profiles in Lesson 4?

## Homework

1. Add one field validation rule through a follow-up Codex prompt and verify it in Appwrite.
2. Filter threads on a board page by tag and test the behavior.
3. Write down one thing that broke during this lesson and how you figured out why.
