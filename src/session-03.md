# Lesson 3: Imageboard Threads, CRUD, and the First Appwrite Build Loop

**Duration**: 1.5 hours  
**Goal**: Understand CRUD in a full-stack app and use Codex to build the first Appwrite-backed imageboard flow in bounded steps

## Learning Objectives

By the end of this lesson, you will:
- explain CRUD in product and technical terms
- understand why API routes sit between the UI and backend logic
- describe the difference between client-side state and persisted data
- use Codex to implement one small CRUD slice at a time
- verify behavior in both the browser and Appwrite

## Part 1: CRUD in Plain English

CRUD stands for:

| Operation | Meaning in the app |
|-----------|--------------------|
| Create | Add a new record |
| Read | Load one record or many |
| Update | Change an existing record |
| Delete | Remove a record |

Connect this to the imageboard:

- creating a thread is create
- loading the thread list is read
- editing a thread title is update
- deleting a thread is delete

## Part 2: Why API Routes Matter

The UI should not own every backend concern directly.

API routes give the app a place to:
- validate input
- shape responses
- centralize Appwrite access
- avoid spreading backend calls across random components

Understand the architecture, not just the boilerplate.

## Part 3: Build Goal

For this lesson, the target is simple:

- an imageboard home page
- load existing threads
- create a new text-only thread
- keep the UI basic
- verify that the database really changes

![CRUD through an API route](/assets/diagrams/lesson-03-crud-api-flow.png)

## Part 4: Prompting Sequence

This lesson should be approached as a series of small prompts, not one giant request.

Recommended sequence:

1. Ask Codex to inspect the current app structure and explain which files should own the page, API route, and Appwrite client.
2. Ask it to implement read-only message loading first.
3. Test the page.
4. Ask it to add the create flow.
5. Test again.
6. Ask it to explain anything you do not understand.

### Example Prompt

Use a prompt like:

Build the smallest Appwrite-backed imageboard thread flow in this Next.js app.

Requirements:
- keep the UI simple
- use an API route for reads and writes
- support list and create only
- assume the Appwrite project already exists
- tell me which environment variables and collection ids I still need to verify

Work in small files and keep the architecture beginner-friendly.

## Part 5: Copy-Paste Schema Brief

Paste this into Codex if you want it to generate the initial schema plan before implementation:

```text
Imageboard schema brief for Lesson 3:

Create one collection called threads.

Fields:
- title: string, required, max 120
- body: string, required, max 5000
- authorName: string, required, max 60
- createdAt: datetime, required

This first lesson is text-only.
Do not add images, replies, profiles, or boards yet.
Keep it beginner-friendly.
```

Then use a follow-up prompt like:

```text
Use this schema brief to build the first imageboard thread flow.

First:
- confirm the collection shape
- tell me what Appwrite ids or environment variables I still need

Then:
- implement read-only thread loading
- stop and wait for me to test
```

## Part 6: Manual Verification Checklist

You should verify:

1. the page renders
2. threads load from the expected Appwrite collection
3. creating a thread adds exactly one new document
4. refreshing the page shows the saved data
5. field names in code match the real Appwrite attributes

## Part 7: Reflection

After the feature works, ask yourself:

- Which parts were frontend?
- Which parts were backend?
- Where did persistence actually happen?
- Why was it safer to build list and create separately?

The value of this lesson is:
- introducing CRUD vocabulary
- showing API-route architecture
- modeling the prompt -> wait -> test -> iterate loop
- starting the same imageboard app you will keep extending through Module 2

## Homework

You should:

1. add one validation rule through a follow-up AI prompt
2. verify the behavior in Appwrite again
3. write down one bug you hit and how you resolved it
