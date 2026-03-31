# Lesson 1: Full-Stack Foundations & Course Setup

**Duration**: 1.5 hours  
**Goal**: Understand the core full-stack vocabulary, the workflow used in these lessons, and the tools used before building product features

## Learning Objectives

By the end of this lesson, you will:
- define frontend, backend, database, API, and full-stack in plain language
- explain where Next.js, Appwrite, and Codex fit in the stack
- understand the difference between local app code and hosted backend services
- choose an Appwrite setup, with Cloud as the default option
- install the core local tools needed for the upcoming build work

## Part 1: What "Full-Stack" Actually Means

### Full-Stack in One Sentence

Full-stack development means building the parts users see, the parts that process logic, and the parts that store data.

### Core Terms

| Term | Plain-English meaning | Example here |
|------|------------------------|------------------------|
| Frontend | The UI the user interacts with | A Next.js page with forms, buttons, and lists |
| Backend | Code and services that process requests and rules | Appwrite auth, database rules, API routes |
| Database | Where app data is stored | Messages, users, posts, comments |
| API | The contract between parts of the system | A route that creates a post or loads messages |
| Full-stack | Frontend + backend + data working together | A site that signs users in and saves content |

### A Simple Mental Model

Think of a basic app like this:

1. The user clicks a button in the frontend.
2. The frontend sends data to the backend.
3. The backend validates the request.
4. The backend reads or writes the database.
5. The result comes back to the frontend.
6. The UI updates.

![Full-stack request flow](/assets/diagrams/lesson-01-full-stack-map.png)

### Where Our Tools Fit

| Tool | Role in the stack |
|------|-------------------|
| Next.js | Frontend framework and server route layer |
| Appwrite | Backend platform for auth, database, storage, and permissions |
| Codex | Build partner for planning, scaffolding, debugging, and iteration |
| Bun | Package manager and local script runner |

## Part 2: Course Workflow

### How The Workflow Works

This is not a copy-the-code course.

For most build lessons, the teaching loop is:

1. establish the concept and the product goal
2. prompt Codex with a bounded task
3. wait for the generated implementation
4. test the result in the app, Appwrite, or both
5. iterate until the feature matches the goal

### What You Are Responsible For

You still need to:
- understand the product requirement
- review generated files before trusting them
- verify schema names, permissions, and env vars
- test real user flows
- catch mismatches early instead of stacking hacks

### What Gets Taught Without AI First

Two early areas stay more direct:
- foundational terminology
- a small Next.js-only app so you can understand the shape of the framework before Appwrite enters the picture

## Part 3: Architecture Preview

### Example: Simple TODO App

Even a small TODO site has distinct stack layers:

- frontend: task list, form, buttons
- state: which tasks are complete right now
- backend: optional later step if tasks are saved remotely
- database: optional later step if tasks persist between sessions

In Lesson 2, you will build this locally first with no AI and no backend so the moving parts stay visible.

### Example: Appwrite Imageboard

Later, when Appwrite is added:

- Next.js renders the page
- Appwrite stores the imageboard threads and replies
- Appwrite auth decides who the user is
- Appwrite permissions decide who can read or write
- Codex helps scaffold and debug the implementation

## Part 4: Environment Setup

### What An MCP Server Is

MCP stands for Model Context Protocol.

In plain English, an MCP server is a bridge between Codex and some outside system.

That outside system might be:

- Appwrite
- documentation
- Google Drive
- a database
- another tool or service

The important idea is this:

- your app backend is the thing that stores data and runs the product
- the MCP server is the connection layer that lets Codex inspect or use that backend

For this course, Appwrite is the backend.
The Appwrite MCP server is the tool connection that lets Codex inspect the real Appwrite project instead of guessing collection names, bucket ids, or permissions.

Without MCP:

- Codex can still read your code
- Codex can still make suggestions
- Codex may guess wrong about what exists in the live backend

With MCP:

- Codex can inspect the real Appwrite project state
- Codex can compare live backend resources to your code
- Codex is less likely to invent field names or storage buckets that do not exist

That is why MCP matters in this workflow. It improves accuracy when the question is about the real backend, not just the local codebase.

### Install the Local Tools

You should have:

1. Node.js 20+ installed
2. Bun installed
3. VS Code or another editor
4. Codex available in the environment you will use

Check the local tools:

```bash
node --version
bun --version
```

### Choose an Appwrite Setup

Two valid setup paths are supported:

1. Appwrite Cloud as the default and fastest path
2. Self-hosted Appwrite as an optional local-first path

Use Appwrite Cloud unless you specifically want to run Appwrite locally.

Use [Guide: Self-Hosting Appwrite (Optional)](guide-self-hosting-appwrite.md) only if you want the local Docker-based setup used in this repo.

### Read These Before Lesson 3

- [Guide: Install Codex](guide-codex-install.md)
- [Guide: Codex Website Workflow](guide-codex-website-workflow.md)
- [Guide: Appwrite MCP Setup](guide-codex-appwrite-mcp.md)
- [Guide: AI + Appwrite CLI Workflow](guide-ai-appwrite-cli.md)

## Part 5: Vocabulary Drill

Be able to answer these before moving on:

- What is the difference between frontend and backend?
- What does a database do?
- Why is Appwrite not the same thing as Next.js?
- Why is Codex useful in this workflow?
- Why do we still verify generated code?

The target outcome of this session is not a finished app. The target outcome is being able to describe the stack correctly and understand why the course alternates between direct explanation and Codex-assisted implementation.

## Homework

Before Lesson 2:

1. Confirm `node` and `bun` both run locally.
2. Decide whether you are using Appwrite Cloud or, optionally, self-hosted Appwrite.
3. Install Codex and confirm it launches.
4. Read the Codex workflow guide.
5. Read the Appwrite MCP setup guide.
6. Only read the self-hosting guide if you intentionally want a local Appwrite setup.
