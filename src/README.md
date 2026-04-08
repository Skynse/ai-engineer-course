# AI Engineer (Full Stack) Course
## Building Full-Stack Apps with Next.js, Appwrite, and Codex

---

## Course Overview

**Duration**: 16 Lessons (1.5 hours each) + Final Project Period  
**Tech Stack**: Next.js 16, Appwrite, TypeScript, Tailwind CSS, Bun, Appwrite CLI  
**Prerequisites**: Basic JavaScript/React knowledge

This course teaches beginner-friendly full-stack development by having you build with Codex as a primary implementation partner. You will describe features clearly, prompt Codex to scaffold pages and backend flows, verify the generated code, and keep the app aligned with a real product spec instead of treating AI like autocomplete.

---

## What You Will Build

1. **Next.js TODO Lab** - Understand the shape of a frontend app before adding a backend
2. **Imageboard** - Build one continuous Appwrite-backed app across CRUD, auth, replies, uploads, and search
4. **Task Manager** - Practice CRUD operations  
5. **Recipe Collection** - Handle file uploads
6. **Social Feed** - Complex data relationships
7. **Final Project** - Custom full-stack application

---

## Course Philosophy

- **Learn by building** - Every lesson has hands-on coding
- **Codex-first** - Prompt Codex to plan, scaffold, debug, and iterate on the product
- **Concepts first where needed** - Early lessons explain full-stack vocabulary and Next.js shape before Appwrite-heavy prompting
- **Cloud-first** - Appwrite Cloud is the default path, with local Appwrite covered as an optional setup
- **MCP-aware workflow** - Inspect real Appwrite state before trusting schema assumptions
- **CLI-first setup** - Learn to verify infrastructure changes with repeatable commands
- **No deep theory** - Focus on practical patterns that work
- **Real apps** - Everything you build is deployable
- **Verification required** - Review architecture, schema, and generated code before shipping

---

## Lesson Overview

| Lesson | Topic | Project |
|---------|-------|---------|
| 1 | Full-Stack Foundations & Course Setup | Terminology + workflow |
| Guide | Install Codex | Install, sign in, and verify Codex |
| 2 | Next.js Introduction & First TODO App | Local-only TODO lab |
| Guide | Codex Website Workflow | Prompting a site from idea to implementation |
| Guide | Appwrite MCP Setup | Add Appwrite API and docs MCP servers |
| Guide | AI + Appwrite CLI Workflow | Prompting + schema verification |
| 3 | Imageboard Threads, CRUD, and the First Appwrite Build Loop | Text-only imageboard threads |
| 4 | Imageboard Authentication | Signed-in posting flow |
| 5 | Imageboard User Profiles | Profile system |
| 6 | Imageboard Relationship Thinking | Text-first relationship map + schema review |
| 7 | Imageboard Replies | Thread replies |
| 8 | Imageboard Uploads | Thread image uploads |
| 9 | Imageboard Permissions & Security Basics | Safer posting permissions |
| 10 | Imageboard Queries, Search & Filtering | Thread search and filters |
| 11 | Demo App 1 | Task Manager |
| 12 | Demo App 2 | Recipe Collection |
| 13 | Demo App 3 | Social Feed |
| 14 | Styling & Polish | Style all apps |
| 15 | Final Project Planning | Project proposal |
| 16 | Final Project Building | Working prototype |

### Optional Guide

| Guide | Topic | Project |
|---------|-------|---------|
| Guide | Self-Hosting Appwrite (Optional) | Optional local backend path |

---

## Final Project (After Lesson 16)

You will complete a custom full-stack application over 2-3 weeks.

**Requirements:**
- Authentication system
- At least 2 related collections
- File upload feature
- Deployed to production
- 5-10 minute presentation

---

## Prerequisites

Before starting, you should know:
- JavaScript basics (variables, functions, async/await)
- React fundamentals (components, props, state)
- Basic HTML/CSS
- How to use VS Code

No backend experience required!

## Environment Paths

You can complete the course in either setup:

- **Appwrite Cloud** as the default and fastest start
- **Self-hosted Appwrite** as an optional path for local-first development and full backend ownership

Use Appwrite Cloud unless you specifically want the local setup used by the demo projects in this repo.

Use [Guide: Self-Hosting Appwrite (Optional)](guide-self-hosting-appwrite.md) only if you want to run Appwrite locally.

## AI Workflow Expectations

This is a Codex-driven engineering course, not a copy-paste course. You are expected to:

- Use Codex to turn a plain-language product brief into pages, components, routes, and schema plans
- Ask Codex to draft schema plans, CRUD flows, and CLI commands
- Break larger features into prompts small enough to verify
- Review the generated plan before running anything
- Verify the result in the codebase, Appwrite CLI, or Appwrite console
- Fix mismatches between the prompt, the schema, and the shipped app instead of piling hacks on top

Before you start the Appwrite-backed lessons, install Codex first:

- [Guide: Install Codex](guide-codex-install.md)

Use [Guide: Codex Website Workflow](guide-codex-website-workflow.md) as the default build loop for page generation, UI iteration, refactors, and debugging.
Use [Guide: Appwrite MCP Setup](guide-codex-appwrite-mcp.md) before lessons that depend on real backend inspection.
Use [Guide: AI + Appwrite CLI Workflow](guide-ai-appwrite-cli.md) as the default pattern when scaffolding collections, attributes, and buckets.

## Visual Explanations

Some lessons include generated diagram assets for flows and concept explanations.

Regenerate them with:

```bash
python3 scripts/generate_diagrams.py
```

Render PNG assets locally with Mermaid CLI:

```bash
cd course-site
bun install
bun run diagrams
```
