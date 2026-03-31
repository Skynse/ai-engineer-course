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

## Use The Official Appwrite MCP Docs

Appwrite publishes exact MCP setup guides for these clients:

- [Claude Code](https://appwrite.io/docs/tooling/mcp/claude-code)
- [Claude Desktop](https://appwrite.io/docs/tooling/mcp/claude-desktop)
- [Cursor](https://appwrite.io/docs/tooling/mcp/cursor)
- [Windsurf](https://appwrite.io/docs/tooling/mcp/windsurf)
- [VS Code](https://appwrite.io/docs/tooling/mcp/vscode)
- [OpenCode](https://appwrite.io/docs/tooling/mcp/opencode)
- [Google Antigravity](https://appwrite.io/docs/tooling/mcp/antigravity)

Do not guess the setup flow.

Open the exact Appwrite page for the client you are using and follow that page step by step.

If your editor or AI client is not on that Appwrite list, do not use this guide as a substitute for official instructions.

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

If you are intentionally using the optional self-hosted setup from this repo, replace that endpoint with your local Appwrite URL. That path is covered in [Guide: Self-Hosting Appwrite (Optional)](guide-self-hosting-appwrite.md).

## Step 2: Add The API MCP Server

Appwrite's API MCP server uses:

- command: `uvx`
- package: `mcp-server-appwrite`
- required env vars:
  - `APPWRITE_PROJECT_ID`
  - `APPWRITE_API_KEY`
  - `APPWRITE_ENDPOINT`

For this course, the simplest default is `--all`.

That avoids making you choose service flags up front and keeps the MCP setup usable across lessons as your project grows.

### Raw API Server Definition

```json
{
  "command": "uvx",
  "args": [
    "mcp-server-appwrite",
    "--all"
  ],
  "env": {
    "APPWRITE_PROJECT_ID": "your-project-id",
    "APPWRITE_API_KEY": "your-api-key",
    "APPWRITE_ENDPOINT": "https://<REGION>.cloud.appwrite.io/v1"
  }
}
```

Replace:

- `your-project-id` with the actual Appwrite project ID
- `your-api-key` with the API key you just created
- `<REGION>` with your Appwrite Cloud region such as `nyc` or `fra`

## Step 3: Add The Docs MCP Server

Appwrite also provides a docs MCP server. Use it so you can inspect official Appwrite docs from the same AI environment.

### Raw Docs Server Definition

If your MCP client supports remote HTTP MCP servers directly, use:

```json
{
  "url": "https://mcp-for-docs.appwrite.io"
}
```

If your MCP client only supports local stdio MCP servers, use `mcp-remote` as a proxy:

```json
{
  "command": "npx",
  "args": [
    "mcp-remote",
    "https://mcp-for-docs.appwrite.io"
  ]
}
```

## Step 4: Use The Exact Setup Flow For Your Client

Use the raw server definitions above together with the exact Appwrite doc for your client.

Below are concrete examples copied into the format each client expects.

### Claude Code

Run:

```bash
claude mcp add-json appwrite-api '{"command":"uvx","args":["mcp-server-appwrite","--all"],"env":{"APPWRITE_PROJECT_ID":"your-project-id","APPWRITE_API_KEY":"your-api-key","APPWRITE_ENDPOINT":"https://<REGION>.cloud.appwrite.io/v1"}}'
```

Then add the docs server:

```bash
claude mcp add appwrite-docs https://mcp-for-docs.appwrite.io -t http
```

Verify with:

```text
/mcp
```

Use the Appwrite Claude Code guide while you do this:
[Appwrite MCP and Claude Code](https://appwrite.io/docs/tooling/mcp/claude-code)

### Codex

Codex supports MCP server management directly from the CLI.

Add the local Appwrite API MCP server with:

```bash
codex mcp add appwrite-api \
  --env APPWRITE_PROJECT_ID=your-project-id \
  --env APPWRITE_API_KEY=your-api-key \
  --env APPWRITE_ENDPOINT=https://<REGION>.cloud.appwrite.io/v1 \
  -- \
  uvx mcp-server-appwrite --all
```

Add the Appwrite docs MCP server with:

```bash
codex mcp add appwrite-docs --url https://mcp-for-docs.appwrite.io
```

Verify both servers:

```bash
codex mcp list
codex mcp get appwrite-api
codex mcp get appwrite-docs
```

The local Codex CLI help confirms these two forms:

- `codex mcp add <NAME> --url <URL>`
- `codex mcp add <NAME> --env KEY=VALUE -- <COMMAND> ...`

Use those forms exactly when you add Appwrite MCP to Codex.

### Cursor

Open **Settings** -> **MCP** -> **Add new global MCP server**.

That opens `mcp.json`. Add:

```json
{
  "mcpServers": {
    "appwrite-api": {
      "command": "uvx",
      "args": [
        "mcp-server-appwrite",
        "--all"
      ],
      "env": {
        "APPWRITE_API_KEY": "your-api-key",
        "APPWRITE_PROJECT_ID": "your-project-id",
        "APPWRITE_ENDPOINT": "https://<REGION>.cloud.appwrite.io/v1"
      }
    },
    "appwrite-docs": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp-for-docs.appwrite.io"
      ]
    }
  }
}
```

Save the file. Restart Cursor if the server does not start automatically.

Use the Appwrite Cursor guide while you do this:
[Appwrite MCP and Cursor](https://appwrite.io/docs/tooling/mcp/cursor)

### VS Code

Open the Command Palette and run:

```text
MCP: Open User Configuration
```

That opens the VS Code MCP config file. Add:

```json
{
  "servers": {
    "appwrite-api": {
      "command": "uvx",
      "args": [
        "mcp-server-appwrite",
        "--all"
      ],
      "env": {
        "APPWRITE_PROJECT_ID": "your-project-id",
        "APPWRITE_API_KEY": "your-api-key",
        "APPWRITE_ENDPOINT": "https://<REGION>.cloud.appwrite.io/v1"
      }
    },
    "appwrite-docs": {
      "url": "https://mcp-for-docs.appwrite.io",
      "type": "http"
    }
  }
}
```

Save the file. Then open Copilot Chat in Agent mode and test the tools.

Use the Appwrite VS Code guide while you do this:
[Appwrite MCP and VS Code](https://appwrite.io/docs/tooling/mcp/vscode)

## Step 5: Verify The MCP Servers Before You Trust Them

Do not move on just because the config saved.

Run concrete checks.

For the API server:

- `List all databases in my Appwrite project.`
- `Show me the collections in the main database.`
- `List the attributes in the posts collection.`
- `Check whether there is a bucket called images.`

For the docs server:

- `Show me the Appwrite docs for file uploads.`
- `Find the Appwrite docs for database permissions.`

If the server is connected correctly, the answers should come from your real project state or from Appwrite's documentation, not from guesses.

## Step 6: Use MCP In The Build Loop

Use MCP at the points where guessing would cause bad code:

1. inspect the real Appwrite project
2. confirm database, collection, attribute, and bucket names
3. write or patch the code
4. test the app
5. inspect Appwrite again if the error is about missing resources, wrong fields, or permissions

## Step 7: Force MCP First When It Matters

Having Appwrite MCP connected does not guarantee your AI client will use it first.

If your prompt sounds like a codebase inspection task, the agent may start by searching local files because that is often cheaper than calling backend tools.

When you need the live Appwrite project state, say that directly.

Use prompts like these:

```text
Do not search the workspace first.

Use the Appwrite MCP server first and inspect the live Appwrite project.
List the databases, tables, collections, or buckets that exist.
If MCP is unavailable or a tool call fails, say that explicitly before doing anything else.
```

```text
Inspect Appwrite first, then compare the result to the codebase.

Start with the live backend resources.
Only after that, search the workspace for mismatches.
```

```text
Use Appwrite MCP first.
Do not use file search, ripgrep, or local schema guessing until after you inspect the live backend.
```

Use this rule:

- if the question is about what exists in Appwrite, force MCP first
- if the question is about code vs backend mismatch, inspect Appwrite first and the workspace second
- if MCP fails, make the agent say that clearly instead of guessing

## What You Still Need To Verify Manually

Even with MCP connected, still verify:

- the correct Appwrite project is selected
- the code references the same ids MCP reported
- the UI matches the feature goal
- the browser flow works end to end

MCP improves accuracy. It does not replace review.

## Primary Appwrite MCP References

- [Model Context Protocol overview](https://appwrite.io/docs/tooling/mcp)
- [MCP server for Appwrite API](https://appwrite.io/docs/tooling/mcp/api)
- [MCP server for Appwrite docs](https://appwrite.io/docs/tooling/mcp/docs)
