# Guide: AI + Appwrite CLI Workflow

**Goal**: Use AI to speed up Appwrite setup without turning schema work into guesswork.

## Why This Matters

This course teaches AI-assisted full-stack development, not blind prompt-and-pray. Students should learn how to:

- describe a product in plain language
- turn that into a schema plan
- turn the schema plan into Appwrite CLI commands
- verify the result before writing app code against it

That is a real beginner AI engineer workflow.

## The Core Rule

Use AI for:

- schema drafts
- naming suggestions
- CLI command generation
- migration checklists

Do not use AI as a replacement for:

- reading the generated commands
- checking required fields and data types
- verifying collection attributes after creation

## Step 0: Install The Appwrite CLI

Before using AI-generated commands, install the CLI on your machine.

If you have Node.js installed, use:

```bash
npm install -g appwrite-cli
```

Then verify the install:

```bash
appwrite --version
```

If the command is not found, close and reopen your terminal, then try again.

The standard Appwrite CLI flow in the official docs is:

```bash
appwrite login
appwrite init project
```

If you are using a self-hosted Appwrite server, include the endpoint during login:

```bash
appwrite login --endpoint "http://localhost:8080/v1"
```

That interactive flow is valid and useful when you are learning the CLI itself.

## Step 0.5: Point The CLI At Your Appwrite Project

The CLI has to know which Appwrite server and project to talk to.

For AI-assisted schema setup in this course, we prefer:

- `appwrite client` to point the CLI at a specific endpoint and project
- an Appwrite API key so AI-generated schema commands can run reliably

That keeps the workflow consistent for both self-hosted Appwrite and Appwrite Cloud.

Inside the Appwrite project setup flow, the API key work starts from the server integration section.

![Appwrite server integration screen](/assets/docs/appwrite/integrate-server.png)

For self-hosted Appwrite in this course, the endpoint is usually:

```text
http://localhost:8080/v1
```

For Appwrite Cloud, use:

```text
https://cloud.appwrite.io/v1
```

Then configure the CLI with your endpoint, project ID, and API key:

```bash
appwrite client \
  --endpoint http://localhost:8080/v1 \
  --project-id YOUR_PROJECT_ID \
  --key YOUR_API_KEY
```

You only need to switch the endpoint if you are using Appwrite Cloud instead of self-hosting.

You create that API key in the Appwrite Console under your project's API Keys section.

![Appwrite project settings and API credentials](/assets/docs/appwrite/project-settings-project-id.png)

![Appwrite API key creation screen](/assets/docs/appwrite/create-api-key.png)

Give the key only the scopes you actually need for the setup commands you plan to run.

## Step 1: Write a Plain-Language Schema Brief

Before prompting AI, write a short spec.

Example:

```text
I am building a social feed.

Users can create posts with:
- content
- optional image
- author id
- author name
- an array of likes

Users can also add comments to posts with:
- post id
- content
- author id
- author name

I need Appwrite databases, collections, attributes, and storage buckets.
Use IDs and attribute names that are beginner-friendly.
```

## Step 2: Ask AI For A Schema Plan First

Do not start by asking for commands. Ask for the plan first.

Good prompt:

```text
Turn this app description into an Appwrite schema plan.

Return:
- database names
- collection names
- bucket names
- attributes with types
- which fields are required
- any array or enum fields

Do not return code yet.
```

This catches bad naming early.

## Step 3: Ask AI To Convert The Plan Into CLI Commands

Once the plan looks correct, ask for commands.

Example prompt:

```text
Convert this schema plan into Appwrite CLI commands.

Constraints:
- endpoint: http://localhost:8080/v1
- use database ids and collection ids, not random names
- create string, enum, boolean, integer, and array attributes correctly
- create any required storage buckets
- keep the commands readable for beginners

Return the commands in the order they should be run.
```

## Step 4: Run Commands In Small Batches

Do not paste a huge wall of generated commands without checking them.

Recommended order:

1. Configure the CLI client
2. Create the database
3. Create one collection
4. Create its attributes
5. Verify
6. Move on to the next collection
If the CLI is already configured, you do not need to rerun `appwrite client` before every command.

## Step 5: Verify After Every Batch

After creating attributes, verify them.

Examples:

```bash
appwrite databases list-collections --database-id social
```

```bash
appwrite databases list-attributes --database-id social --collection-id posts
```

```bash
appwrite databases list-attributes --database-id social --collection-id comments
```

If AI generated the wrong type, fix it before the frontend is built against the wrong schema.

## Example: Social Feed

A reasonable AI-generated plan for this course would be:

- database: `social`
- collection: `posts`
- collection: `comments`
- bucket: `post-images`

Posts:

- `content` as string
- `imageId` as optional string
- `userId` as string
- `userName` as string
- `likes` as string array

Comments:

- `postId` as string
- `content` as string
- `userId` as string
- `userName` as string

That matches the current course demo much better than a vague “social app” prompt.

## How To Prompt AI Well

Strong prompts include:

- the app type
- the user actions
- the exact fields you expect
- whether a field is required or optional
- whether files live in Storage or in the database
- whether likes, tags, or roles are arrays or enums

Weak prompts sound like:

```text
make me the tables for a social media app
```

Strong prompts sound like:

```text
Create an Appwrite schema for a beginner social feed demo.

Requirements:
- text posts with optional image uploads
- likes stored as an array of user ids
- comments stored in a separate collection
- clear beginner-friendly ids
- no extra features like follows, notifications, or DMs
```

## What Students Should Learn From This

The point is not “AI made the tables for me.”

The point is:

- AI helps define the first draft
- CLI makes the draft repeatable
- verification keeps the app honest

That is the full-stack AI workflow you want students to internalize.

## Recommended Pattern For This Course

Use this sequence in every project:

1. Describe the app clearly
2. Ask AI for a schema plan
3. Review and simplify the plan
4. Ask AI for Appwrite CLI commands
5. Run commands in small batches
6. Verify collections and attributes
7. Only then start coding against the schema

If the app and schema diverge, update the schema or the code immediately. Do not teach students to keep shipping mismatches.
