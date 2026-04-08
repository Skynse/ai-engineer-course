# Lesson 6: Imageboard Relationship Thinking

**Duration**: 1 hour  
**Goal**: Turn the boards-and-threads work from Lesson 5 into a clear mental model that makes the relationship design easy to explain and review

## Learning Objectives

By the end of this lesson, you will:
- explain a one-to-many relationship in plain English
- read the boards-and-threads schema as a product story, not just a list of fields
- explain why some fields link records and other fields just help the page show useful text
- audit the Lesson 5 schema without guessing
- prompt Codex to review and tighten relationship design instead of rebuilding the feature

## Part 1: Why This Lesson Exists

Lesson 5 already made the imageboard work. This lesson is different.

This is an explanation lesson, not a second implementation lesson.

The point is to understand why the boards-and-threads model works so that:

- you can explain the data model clearly
- you can catch schema mistakes before they spread
- you do not rely on Codex output without understanding what "correct" looks like

Codex can scaffold connected-data features quickly. That is exactly why you still need a lesson like this. If you cannot explain the model, you also cannot properly review what Codex generated.

## Part 2: The Relationship in One Picture

For this imageboard:

- one board can contain many threads
- each thread belongs to exactly one board
- each thread also belongs to exactly one author

That means the board-to-thread link is **one-to-many**, while the thread-to-author link is **many-to-one**.

![Board, thread, and author relationship map](/assets/diagrams/lesson-06-board-thread-map.png)

If you can explain that image out loud, you can explain the heart of the lesson.

## Part 3: Read the Schema Like a Product Story

Do not read the schema as isolated fields. Read it as user behavior.

When a user visits `/boards/cats`, the app needs to answer:

1. Which board is this page about?
2. Which threads belong to that board?
3. Who authored each thread?
4. What information should render immediately on the page?

That is why the thread model from Lesson 5 matters:

| Field | Why it exists |
|-------|----------------|
| `boardSlug` | lets the app filter threads to one board |
| `authorId` | identifies who actually owns the thread |
| `authorHandle` | lets the UI render a readable author label quickly |
| `title`, `excerpt`, `tag`, `variant` | give the thread enough display content to stand on its own |

The important habit is this:

- first ask what page or action the product needs
- then ask what data the page needs
- then ask which fields must be stored to support that behavior

That is relationship thinking.

## Part 4: Why We Store Both IDs and Readable Names

Beginners often hear "never duplicate data" and then make their apps harder to build.

That rule is too simplistic.

In this course, some fields answer different questions:

- `authorId` answers: "Which user created this thread?"
- `authorHandle` answers: "What name should the page show?"
- `boardSlug` answers: "Which board should this thread appear in?"

![How thread fields help the app](/assets/diagrams/lesson-06-denormalized-display-fields.png)

Use this simple rule:

- keep one field that links to the real record
- keep a second field only if it makes the page easier to load or easier to read

For example:

- `authorId` links the thread to the real user record
- `authorHandle` gives the page a readable name to show right away

That is a useful beginner-friendly tradeoff.

## Part 5: What You Should Be Able To Explain

By the end of this lesson, you should be able to explain all five of these without opening the code:

1. Why a board can have many threads
2. Why each thread needs exactly one board reference
3. Why each thread needs an author identity field
4. Why storing a readable author name can still be a good idea
5. Why bad relationship fields create UI bugs, not just backend bugs

If you can explain those five points cleanly, you understand the model instead of just repeating the steps mechanically.

## Part 6: Relationship Review Prompt for Codex

This lesson should use Codex for **review**, not for a fresh implementation pass.

### Example Prompt

```text
Review the imageboard boards-and-threads schema and tell me whether the relationship model is sound.

Context:
- one board contains many threads
- each thread belongs to one board
- each thread belongs to one user
- the current thread fields include boardSlug, authorId, and authorHandle

Tasks:
- explain which fields connect the thread to other records
- explain which fields mainly help the page show readable content
- point out any missing field that would make filtering or page rendering harder
- do not rewrite the whole feature
- do not add replies, uploads, or advanced Appwrite relationship features
```

That prompt is stronger than "build relationships for me" because it asks Codex to reason about an existing model.

## Part 7: Manual Verification Checklist

You should verify:

1. every thread stores the expected `boardSlug`
2. every thread stores the expected `authorId`
3. the displayed author label matches the intended profile handle
4. threads load only on the correct board page
5. the field names in code match the real Appwrite schema exactly

## Part 8: The Main Takeaway

Relationships are not just a backend feature.

They shape:

- routes
- which records a page loads
- who is allowed to edit or delete
- what the user sees on screen

If you understand the two diagrams in this lesson and can walk through the checklist, you understand the relationship model well enough to keep building with confidence.
