# Lesson 10: Imageboard Queries, Search & Filtering

**Duration**: 1.5 hours  
**Goal**: Learn how to retrieve the right data shape for the UI and verify query behavior instead of trusting generated filters blindly

## Learning Objectives

By the end of this lesson, you will:
- explain filtering, sorting, search, and pagination in plain language
- design a query-driven UI for a real app page
- prompt Codex for search and filter features in small steps
- verify that query logic matches the product requirement
- diagnose cases where the UI shows the wrong data for the right reason or the right data for the wrong reason

## Part 1: Concept

Queries are how the app asks for a useful slice of data.

Common needs:

- newest first
- only this user's posts
- only published content
- search by keyword
- small result sets instead of loading everything

Connect each query to a real user need.

## Part 2: Product Goal

The lesson outcome should be:

- the imageboard can filter threads intentionally
- search inputs produce useful thread results
- sorting changes the visible order
- the data shown on screen matches the current controls

## Part 3: Prompting Sequence

Recommended sequence:

1. ask Codex to translate the UI requirement into query behavior
2. inspect the real fields that can be filtered or searched
3. implement one filter or sort first
4. test it
5. add search
6. test empty results and edge cases

### Example Prompt

Add beginner-friendly search and filtering to this imageboard app.

Requirements:
- support one text search input
- support one useful sort option
- keep the query logic easy to explain
- tell me which fields must exist and whether indexes or query support matter
- implement one step at a time

## Part 4: Copy-Paste Query Brief

```text
Imageboard query brief:

Add search and filtering for threads.

Useful first features:
- filter by board
- search by thread title
- sort by newest first

Assume the thread records already include:
- title
- boardSlug
- createdAt

Explain the query plan before writing code.
```

## Part 5: Manual Verification Checklist

You should verify:

1. the same query returns consistent results
2. sorting actually changes the order
3. search matches the intended field
4. empty results are handled cleanly
5. the query behavior matches the product brief, not just the code comments

This lesson should reinforce that the UI can look polished while the data logic is wrong.

That is why you should test real filters and real search terms instead of assuming the generated query is correct.
