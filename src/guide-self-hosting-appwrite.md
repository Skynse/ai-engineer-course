# Guide: Self-Hosting Appwrite (Optional)

**Goal**: Run Appwrite locally only if you want an optional self-hosted backend instead of the default Appwrite Cloud path.

## Why This Guide Exists

Appwrite Cloud is the default path for most people. This guide is only for the optional self-hosted path.

If you are not sure which path to choose, use Appwrite Cloud and skip this guide.

If you do want to self-host, it is useful to know how to:

- run your backend locally
- inspect infrastructure files
- control your own database and storage setup
- use the same local backend across multiple demo apps

This repo already includes a local Appwrite stack in `appwrite/`.

## Prerequisites

Before starting:

- 2 CPU cores minimum
- 4 GB RAM minimum
- 2 GB swap minimum
- Install Docker Desktop or Docker Engine
- Make sure `docker compose` works
- Make sure ports `8080` and `8443` are free

Check Docker:

```bash
docker --version
docker compose version
```

## Recommended Installation Path

The official Appwrite docs recommend using the Docker installer first. That flow generates the `appwrite/` directory for you and walks through the required prompts.

Official installer command:

```bash
docker run -it --rm \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
  --entrypoint="install" \
  appwrite/appwrite:1.8.1
```

During installation, Appwrite prompts for:

1. HTTP and HTTPS ports
2. Secret key
3. Main hostname
4. DNS A record hostname

For a local beginner setup, `localhost` and the default local ports are fine.

## Using The Included Repo Files

The local setup lives here:

- `appwrite/docker-compose.yml`
- `appwrite/.env`

This repo already contains a prepared Appwrite directory, so you do not have to run the installer again if you want to use the included local setup.

The included compose file exposes:

- `http://localhost:8080` for the Appwrite console and API over HTTP
- `https://localhost:8443` for HTTPS if you choose to use it later

For this course, the demo apps are already configured to use:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=http://localhost:8080/v1
```

## Start Appwrite Locally

From the repo root:

```bash
cd appwrite
docker compose up -d --remove-orphans
```

Check that the containers are healthy:

```bash
docker compose ps
```

Open the console:

```text
http://localhost:8080/console
```

## First-Time Setup

When Appwrite starts for the first time:

1. Open the console at `http://localhost:8080/console`
2. Create the root account
3. Create a project for your apps
4. Copy the project ID

The self-hosted console uses the same project creation and settings screens as Appwrite Cloud.

![Appwrite create project screen](/assets/docs/appwrite/create-project.png)

![Appwrite project settings showing the Project ID](/assets/docs/appwrite/project-settings-project-id.png)

The repo currently uses this local endpoint pattern:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=http://localhost:8080/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
```

## Configure the Demo Apps

Each demo app uses its own `.env.local`. The important values are:

```bash
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_ENDPOINT=http://localhost:8080/v1
```

Then each app points at its own database and collection IDs.

Examples:

- `task-manager` uses `taskmanager` and `tasks`
- `recipe-collection` uses `recipes` and `recipes`
- `social-feed` uses `social`, `posts`, and `comments`

## Manual Installation Option

If you want to follow the manual path from the official docs instead of the installer:

1. Download the official `docker-compose.yml`
2. Download the official `.env`
3. Put them in an `appwrite/` directory
4. Edit `.env`
5. Start with:

```bash
docker compose up -d --remove-orphans
```

In this repo, that manual setup has already been checked in for you.

## Create the Databases and Collections

You have two valid paths:

1. Use the Appwrite console manually
2. Use Appwrite CLI with a generated plan

For this course, prefer the CLI once you understand the basics. It is faster, repeatable, and easier to debug.

This repo already includes a setup script:

```bash
./setup-appwrite.sh
```

That script creates the demo app databases, collections, and core attributes.

## Useful Local Commands

Start:

```bash
cd appwrite
docker compose up -d --remove-orphans
```

Stop:

```bash
cd appwrite
docker compose stop
```

View logs:

```bash
cd appwrite
docker compose logs -f appwrite
```

Restart after `.env` changes:

```bash
cd appwrite
docker compose down
docker compose up -d --remove-orphans
```

Full uninstall with data removal:

```bash
cd appwrite
docker compose down -v
```

## Common Problems

**The console does not load**

- Check `docker compose ps`
- Make sure port `8080` is not already in use
- Check `docker compose logs -f traefik`

**The API works but the console does not**

- Confirm you are opening `http://localhost:8080/console`
- Confirm the `appwrite-console` service is up

**The Next.js app says project not found**

- Verify `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
- Verify `NEXT_PUBLIC_APPWRITE_ENDPOINT=http://localhost:8080/v1`

**Attribute creation looks broken**

- Appwrite attribute creation is asynchronous
- Wait a few seconds and recheck the collection attributes

## Recommended Workflow

For this course, the cleanest workflow is:

1. Run Appwrite locally with Docker
2. Create one course project
3. Use Appwrite CLI for repeatable schema work
4. Keep app config in `.env.local`
5. Verify everything in the console after CLI changes

This gives you real backend ownership without forcing custom server code on day one.
