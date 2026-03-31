# Lesson 7: Imageboard Replies

**Duration**: 1.5 hours  
**Goal**: Add replies to imageboard threads and learn how to build nested product behavior through repeated prompt-and-test cycles

## Learning Objectives

By the end of this lesson, you will:
- understand a many-to-one relationship
- design comment data linked to posts
- add comment creation and loading in small slices
- test relation-driven UI states
- debug relationship mismatches without guessing

## Part 1: Concept

Comments are a classic many-to-one pattern:

- many replies can belong to one thread
- each comment still belongs to one author

This introduces a more layered UI because one page now depends on related records.

## Part 2: Product Goal

The lesson outcome should be:

- a thread detail view can load replies
- signed-in users can add replies
- replies render in a sensible order
- the relationship between thread and replies is explicit

## Part 3: Prompting Sequence

Recommended sequence:

1. prompt for the comment schema and route plan
2. verify the Appwrite fields
3. prompt for comment loading on a post page
4. test empty and populated states
5. prompt for comment creation
6. test whether the new comment appears correctly

### Example Prompt

Add replies to the imageboard in the smallest safe steps.

Requirements:
- replies belong to a thread
- each reply shows author and created time
- keep the UI basic
- implement loading first, then stop
- tell me what Appwrite fields must exist before coding

## Part 4: Copy-Paste Schema Brief

```text
Imageboard reply schema brief:

Create one collection called replies.

Fields:
- threadId: string, required
- body: string, required, max 3000
- authorId: string, required
- authorHandle: string, required
- createdAt: datetime, required

This collection is for thread replies only.
Keep the first version text-only.
```

## Part 5: Manual Verification Checklist

You should verify:

1. replies appear only on the correct thread
2. new replies write to the expected collection
3. ordering is consistent
4. signed-out users see the intended behavior
5. comment field names and relation fields match the backend

This lesson is where you may discover that a "small feature" crosses frontend, backend, and data design at once.

That is exactly the point.
