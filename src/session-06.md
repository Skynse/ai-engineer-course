# Lesson 6: Imageboard Boards and Thread Relationships

**Duration**: 1.5 hours  
**Goal**: Introduce one-to-many relationships by connecting boards to threads in the same imageboard app

## Learning Objectives

By the end of this lesson, you will:
- explain a one-to-many relationship in app data
- design a basic boards-and-threads model
- understand why some data is duplicated for convenience
- prompt Codex to add post creation and listing in small slices
- verify relationship fields against the real schema

## Part 1: Concept

A relationship describes how one kind of data connects to another.

In this lesson:

- one board can contain many threads
- each thread belongs to one board
- each thread still belongs to one author

Understand that relationship fields are part of product design, not just backend syntax.

## Part 2: Product Goal

The lesson outcome should be:

- the imageboard has boards
- each board lists its threads
- signed-in users can create threads inside a board
- each thread shows author information

## Part 3: Prompting Sequence

Recommended sequence:

1. prompt for a schema plan only
2. verify the collection and fields in Appwrite
3. prompt for the post listing flow
4. test loading and empty states
5. prompt for post creation
6. test author linkage and timestamps

### Example Prompt

Turn this imageboard board-and-thread feature into a minimal Appwrite schema and implementation plan.

Requirements:
- boards contain many threads
- threads belong to a user
- list threads inside a board page
- signed-in users can create a thread in a board
- keep the fields beginner-friendly
- explain which fields are duplicated for display convenience

Do not write code yet.

## Part 4: Copy-Paste Schema Brief

```text
Imageboard relationship schema brief:

Create a boards collection:
- name: string, required, max 40
- slug: string, required, max 40
- description: string, optional, max 200

Update threads so each thread has:
- boardSlug: string, required
- authorId: string, required
- authorHandle: string, required

Keep the imageboard beginner-friendly.
Do not add replies or uploads in this lesson.
```

## Part 5: What You Must Verify

You should verify:

1. each thread stores the intended board and author reference
2. the displayed board and author info is correct
3. threads persist after refresh
4. collection field names in code match Appwrite exactly
5. prompts are changed when the first result does not match the goal

This is the first relationship lesson. Keep the model simple and understand why:

- denormalized display fields can be practical
- relationships affect queries and UI
- schema mistakes become app bugs later if you do not verify them now
