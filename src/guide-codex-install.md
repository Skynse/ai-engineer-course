# Guide: Install Codex

**Goal**: Install Codex, sign in, and confirm it works before you use it in the rest of the course.

## Why This Comes Early

This course uses Codex as the standard AI client.

That means you should get Codex working before you move on to the workflow guide, MCP setup, or the Appwrite-backed lessons.

## What You Need First

Before installing Codex, make sure you already have:

1. Bun installed
2. Node.js available if your environment still depends on it
3. a ChatGPT account you can use to sign in

Check the local tools:

```bash
bun --version
node --version
```

## Step 1: Install Codex

Install the CLI with Bun:

```bash
bun add -g @openai/codex
```

After installation, verify the command exists:

```bash
codex --help
```

## Step 2: Sign In

Start the login flow:

```bash
codex login
```

Then:

1. choose the ChatGPT sign-in flow
2. complete authentication in the browser
3. return to the terminal when the login finishes

The current Codex setup flow can create and store credentials for you automatically, so you do not need to manually paste an API key if you use the ChatGPT sign-in path.

## Step 3: Run A First Test

From any small test folder or repo, start Codex:

```bash
codex
```

Then ask something simple like:

```text
Explain the files in this folder.
```

You are not testing deep coding ability here.
You are only testing that:

- Codex launches
- Codex is authenticated
- Codex can respond normally in your terminal

## Step 4: Know The Default Mode

When you first use Codex in this course, keep the workflow conservative:

- read files
- review plans
- approve edits carefully
- verify output before trusting it

You do not need advanced automation settings to begin this course.

## Windows Note

Codex officially supports macOS and Linux.

If you are on Windows, the practical path is usually to use WSL.

## What To Do Next

After Codex is installed and working, continue with:

1. [Guide: Codex Website Workflow](guide-codex-website-workflow.md)
2. [Guide: Appwrite MCP Setup](guide-codex-appwrite-mcp.md)
3. [Guide: AI + Appwrite CLI Workflow](guide-ai-appwrite-cli.md)

## Troubleshooting

**`codex` command not found**

- restart your terminal
- confirm Bun global installs are on your `PATH`
- rerun:

```bash
codex --help
```

**Login did not complete**

- rerun `codex login`
- finish the browser flow again
- then test by launching `codex`

**You are on Windows and hit environment issues**

- use WSL
- then repeat the install and login steps there
