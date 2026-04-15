# Lesson 6: Understanding the Board–Thread Relationship

**Duration**: 20 minutes  
**Goal**: Understand why the imageboard is structured the way it is before moving on

## The Concept in One Sentence

One board can have many threads. Each thread belongs to exactly one board. That's a **one-to-many** relationship.

## Why It Matters

When you open `/boards/cats`, the app needs to know:

1. Which threads belong to that board?
2. Who wrote each one?

That's why every thread stores a `boardSlug` (to know which board it's in) and an `authorId` (to know who created it).

## The One Tradeoff Worth Knowing

Threads also store `authorHandle` — a readable display name — even though it technically "duplicates" data from the user record.

The rule here is simple: **store a link to the real record, and store a display name if it makes the page faster or easier to render.** `authorId` links the thread to the user. `authorHandle` lets the UI show a name without an extra database call.

That's it. When you see `boardSlug`, `authorId`, and `authorHandle` in the thread model, you now know exactly why each one is there.
