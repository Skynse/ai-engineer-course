# Guide: Appwrite MCP Setup

**Goal**: Add the Appwrite MCP servers with exact configuration values so you can inspect live Appwrite state before writing or patching code.

## What MCP Means In This Course

MCP stands for Model Context Protocol.

In this course, think of it as a tool bridge between your AI client and a real system.

For this guide, that real system is Appwrite.

That means:

- Appwrite is your backend platform
- the Appwrite MCP server is the connection that lets your AI client inspect or use Appwrite directly

This distinction matters.

Appwrite stores your users, tables, collections, files, permissions, and other backend state.
The MCP server does not replace Appwrite.
It exposes Appwrite to your AI client in a way the client can query.

Without Appwrite MCP, your AI client can still:

- read your code
- inspect local files
- make educated guesses

Without Appwrite MCP, your AI client cannot reliably know what already exists in the live Appwrite project.

With Appwrite MCP, your AI client can:

- inspect the real backend
- list existing databases, tables, collections, buckets, users, and other resources
- compare your code to the live project state
- reduce bad guesses about schema names, permissions, and storage configuration

Use Appwrite MCP when the question is about the live backend.
Use normal code inspection when the question is about the local codebase.

## What You Need Before You Configure MCP

You need all of these first:

1. `uv` installed
2. Node.js installed
3. Bun installed
4. an Appwrite project
5. an Appwrite API key
6. your Appwrite project ID
7. your Appwrite endpoint

Verify the local prerequisites:

```bash
uv --version
node --version
bun --version
```

## Step 1: Create The Appwrite API Key

In Appwrite:

1. Open your project.
2. Open **Overview**.
3. In **Integrations**, open **API Keys**.
4. Click **Create API Key**.
5. Select the scopes you need.
6. Copy the API key immediately after creation.

![Appwrite API key creation screen](/assets/docs/appwrite/create-api-key.png)

Then open the project **Settings** page and copy:

- Project ID
- API Endpoint

![Appwrite project settings showing the Project ID](/assets/docs/appwrite/project-settings-project-id.png)

Use your Appwrite Cloud endpoint in this format:

- `https://<REGION>.cloud.appwrite.io/v1`

## Step 2: Add the MCP Servers in Codex

Open **Settings** → **Integrations & MCP** → **Connect to a custom MCP**. Fill in the form exactly like this:

![Codex MCP setup form](/assets/docs/codex-mcp-setup.png)

- **Name**: `appwrite`
- **Tab**: STDIO
- **Command to launch**: `uvx`
- **Arguments**: `mcp-server-appwrite`, `--all`
- **Environment variables**:
  - `APPWRITE_PROJECT_ID` = your project ID
  - `APPWRITE_API_KEY` = your API key
  - `APPWRITE_ENDPOINT` = `https://<REGION>.cloud.appwrite.io/v1`

Then add a second server for the Appwrite docs. Use the **Streamable HTTP** tab, name it `appwrite-docs`, and set the URL to `https://mcp-for-docs.appwrite.io`.

## Step 5: Verify It Works

Ask Codex: _"List all databases in my Appwrite project."_

If MCP is connected, it returns real data from your project. If it guesses or says it can't access Appwrite, something is misconfigured — go back and check your API key and endpoint.

## Step 6: Using MCP Day-to-Day

When you're about to build something that touches Appwrite, start with:

```text
Use Appwrite MCP first. List what collections, buckets, and databases exist before writing any code.
```

That's it. MCP improves accuracy — it doesn't change how you build.
