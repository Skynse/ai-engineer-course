# Lesson 3: Imageboard Mockup & Data Model Design

**Duration**: 1.5 hours  
**Goal**: Design the imageboard visually using Stitch, run it as a working mockup, then use Codex to establish the thread data model before writing any backend code

## Learning Objectives

By the end of this lesson, you will:
- use Stitch by Google to generate a visual prototype from a plain-English description
- export and run the mockup locally with Bun
- describe the imageboard data model in concrete terms
- use Codex to scaffold the thread schema before any database exists
- understand why designing the data shape before writing CRUD code matters

## Part 1: Designing the Mockup with Stitch

Before writing a single line of backend code, we need a clear picture of what we are building.

Stitch by Google lets you describe a UI in plain English and generates a working HTML prototype. Use this prompt to generate the imageboard design:

```text
Reddit/tumblr style imageboard website where users (with profiles) can create image or
video posts, with threads that have replies, and replies can link to another reply.
We start off with just a few pre-made boards, like cats, animals, games etc and other
interesting boards as a concept design.
```

Stitch will generate a set of HTML files representing the main views of the app.

## Part 2: Running the Mockup

Once Stitch exports the zip:

1. Download and unzip the export.
2. Open the folder in your terminal.
3. Run the mockup:

```bash
bun dev
```

This brings up a local preview so you can click through the imageboard before committing to any implementation. Walk through every page and note:
- what boards look like
- how threads are displayed
- how replies nest under a thread
- what a user profile might show

This is the product contract the rest of the course builds toward.

## Part 3: Establishing the Thread Data Model

Before touching Appwrite, use Codex to design the thread data shape. Paste the schema brief below into Codex and ask it to generate a readable model summary — not code yet.

### Thread Schema Brief

```text
Imageboard thread schema:

$id            - string (auto-generated)
boardSlug      - string, required, max 64
title          - string, required, max 255
author         - string, required, max 128
image          - string, required, max 2048
imageAlt       - string, required, max 512
tag            - string, required, max 64
score          - integer, required
commentCount   - integer, required
variant        - string, required, max 32
excerpt        - string, required, max 4096
createdAtLabel - string, required, max 64
$createdAt     - datetime (auto-generated)
$updatedAt     - datetime (auto-generated)
```

### Codex Prompt

```text
I am building a Reddit/Tumblr-style imageboard. Here is the thread schema I will use.

Review each field and explain:
- what it is for in plain English
- whether it belongs to the database, the UI only, or both
- any fields that look redundant or should be derived instead of stored

Do not write any code or Appwrite setup. Just review the schema and explain it.
```

Let Codex explain the model back to you. This is a learning checkpoint, not a build step.

## Part 4: Why We Do This First

Building the mockup and data model before writing any CRUD code gives you:

1. **A shared reference** — every prompt you send Codex later can reference the real field names
2. **Fewer corrections** — Codex generates accurate code when it has a concrete schema to work from
3. **A clearer mental model** — you understand what you are building before you start building it

The next lesson adds authentication and user profiles. Only after that do we wire up the actual database collections.

## Homework

1. Run the Stitch mockup and screenshot two pages you want to build first.
2. Pick two fields from the thread schema and explain in your own words why they are stored rather than derived.
3. Write down one question about the data model you still have after this lesson.
