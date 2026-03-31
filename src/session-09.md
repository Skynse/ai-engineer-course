# Lesson 9: Imageboard Permissions & Security Basics

**Duration**: 1.5 hours  
**Goal**: Learn how to think about access control clearly and verify permission behavior through real user flows

## Learning Objectives

By the end of this lesson, you will:
- explain what permissions control in Appwrite
- distinguish collection-level and document-level access
- reason about ownership and visibility
- prompt Codex for permission-aware changes without hand-waving the security model
- test whether the intended users can actually read and write the right data

## Part 1: Concept

Permissions answer:

Who can do what to which record?

Be able to describe:

- public read
- authenticated-only create
- owner-only update
- owner-only delete

This lesson should stay concrete and product-driven.

## Part 2: Product Goal

The lesson outcome should be:

- the imageboard uses more intentional permissions
- public thread reading and signed-in posting are clearly separated
- ownership rules match the intended user flow
- you can explain why the backend is safer than trusting client claims

## Part 3: Prompting Sequence

Recommended sequence:

1. ask Codex to explain the current permission model
2. inspect the real Appwrite settings
3. ask for a safer target model
4. implement one permission-sensitive feature change
5. test as both the owner and a non-owner

### Example Prompt

Review this app's current read and write model and help me move it to a safer beginner-friendly Appwrite permission setup.

Requirements:
- public content can stay readable when intended
- only the owner should edit or delete their own records
- explain the permission model in plain English
- tell me what I need to verify in Appwrite before changing code

## Part 4: Copy-Paste Permission Brief

```text
Imageboard permission brief:

Target behavior:
- anyone can read public boards and threads
- only signed-in users can create threads
- only signed-in users can create replies
- only the owner can edit or delete their own thread or reply
- profile editing should be owner-only

Use Appwrite permissions to enforce this.
Explain the target model in plain English before writing code.
```

## Part 5: Manual Verification Checklist

You should verify:

1. a guest can only see what guests should see
2. a signed-in user can create the expected records
3. one user cannot edit another user's content
4. private records stay private
5. the browser behavior matches the Appwrite permission rules

This lesson should make you slower and more precise.

That is good.

Security is one of the worst places to accept generated code without verification.
