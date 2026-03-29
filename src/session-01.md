# Session 1: Introduction & Environment Setup

**Duration**: 1.5 hours  
**Goal**: Get everyone set up and create their first database record

## Learning Objectives

By the end of this session, students will:
- Understand what Appwrite is and why we use it
- Have a working development environment
- Create their first Appwrite project
- Understand the difference between Appwrite Cloud and self-hosted Appwrite
- Know where AI fits into the workflow and where verification is required
- Insert data into a database

## Part 1: Welcome & Overview (15 min)

### What is Appwrite?

Appwrite is an open-source backend-as-a-service (BaaS) platform. Think of it as:
- **Database** - Store your app's data
- **Authentication** - Handle user logins  
- **Storage** - Upload and serve files
- **All managed** - No server configuration needed

### Why Appwrite + Next.js?

| Feature | Without Appwrite | With Appwrite |
|---------|------------------|---------------|
| Database setup | Hours of configuration | 5 minutes |
| Authentication | Build from scratch | Built-in |
| File storage | Complex setup | Drag and drop |
| Security | Manual implementation | Automatic |

### AI Assistance Throughout This Course

We'll use AI tools to:
- Generate boilerplate code
- Debug errors
- Explain complex concepts
- Draft schemas and CLI commands
- Speed up development

**Pro tip**: Always review and understand AI-generated code before using it!

### Cloud vs Self-Hosted Appwrite

This course supports both:

- **Appwrite Cloud**: fastest path for students who only want to learn the product workflow
- **Self-hosted Appwrite**: best path for students who want a fully local full-stack setup

If you want the local stack used in this repo, read [Guide: Self-Hosting Appwrite](guide-self-hosting-appwrite.md) before moving past setup.

If you want to use AI to generate Appwrite schema commands safely, read [Guide: AI + Appwrite CLI Workflow](guide-ai-appwrite-cli.md).

## Part 2: Environment Setup (30 min)

### Step 1: Choose Your Appwrite Setup

Pick one:

1. **Appwrite Cloud**
   - Go to [cloud.appwrite.io](https://cloud.appwrite.io)
   - Sign up with Google or email
   - Create a new project
   - Name: `ai-engineer-course`
2. **Self-hosted Appwrite**
   - Use the included Docker setup in `appwrite/`
   - Follow [Guide: Self-Hosting Appwrite](guide-self-hosting-appwrite.md)
   - Use `http://localhost:8080/v1` as your endpoint
   - If you want the official installer flow first, use the Docker installer command from the self-hosting guide

![Appwrite create project screen](/assets/docs/appwrite/create-project.png)

After the project exists, Appwrite will ask you to connect a platform. For browser apps in this course, add a Web platform and use `localhost` while developing locally.

![Appwrite add platform screen](/assets/docs/appwrite/add-platform.png)

If you plan to use the CLI or server-side Appwrite SDKs later in the course, the next area to pay attention to is the server integration section inside the project setup flow.

![Appwrite server integration screen](/assets/docs/appwrite/integrate-server.png)

### Step 2: Install Node.js

Check if Node.js is installed:
```bash
node --version
```

Should show version 18 or higher. If not:
- Download from [nodejs.org](https://nodejs.org)
- Install LTS version

### Step 3: Create Next.js Project

```bash
npx create-next-app@latest guestbook --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

When prompted, select:
- ✓ TypeScript
- ✓ ESLint
- ✓ Tailwind CSS
- ✓ `src` directory
- ✓ App Router
- ✓ Import alias `@/*`

### Step 4: Install Appwrite SDK and CLI

```bash
cd guestbook
npm install appwrite
npm install -g appwrite-cli
```

The CLI is optional for the first app, but required later when we move from manual console setup to faster, repeatable AI-assisted workflows.

## Part 3: First Database Collection (30 min)

### Creating a Collection in Appwrite Console

1. In your Appwrite project, click **Databases**
2. Click **Create Database**
3. Name: `main`
4. Click **Create Collection**
5. Name: `messages`

To wire your app to Appwrite, you will need the Project ID from your project settings.

![Appwrite project settings showing the Project ID](/assets/docs/appwrite/project-settings-project-id.png)

### Adding Attributes

Add these fields to your `messages` collection:

| Attribute Name | Type | Required |
|----------------|------|----------|
| content | string | Yes |
| author | string | Yes |
| createdAt | datetime | Yes |

### Setting Permissions

For now, we'll allow anyone to read/write (we'll secure this later):

1. Go to collection settings
2. Under Permissions, add:
   - `any` with **Create** permission
   - `any` with **Read** permission

## Part 4: Writing Our First Code (15 min)

### Create Appwrite Configuration

Create `src/lib/appwrite.ts`:

```typescript
import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID');

export const databases = new Databases(client);
export const DATABASE_ID = 'main';
export const MESSAGES_COLLECTION = 'messages';
```

### Test with a Simple Read-Only Page

Replace `src/app/page.tsx`:

```typescript
import { databases, DATABASE_ID, MESSAGES_COLLECTION } from '@/lib/appwrite';

export default async function Home() {
  // Fetch all messages
  const messages = await databases.listDocuments(
    DATABASE_ID,
    MESSAGES_COLLECTION
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Guestbook</h1>
      <ul className="space-y-2">
        {messages.documents.map((msg) => (
          <li key={msg.$id} className="p-4 bg-gray-100 rounded">
            <p>{msg.content}</p>
            <p className="text-sm text-gray-600">by {msg.author}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

Do not create a document directly inside the page render. If you write inside `Home()`, every refresh or re-render creates another record. We only want to verify that the app can read from Appwrite in Session 1.

To create your first document, add it once in the Appwrite console:

1. Open the `messages` collection
2. Click **Create Document**
3. Add:
   - `content`: `Hello from my first app!`
   - `author`: `Student`
   - `createdAt`: current date/time

### Run the App

```bash
npm run dev
```

Visit `http://localhost:3000` and see your first message!

## Homework

1. Create your own Appwrite project
2. Set up the development environment
3. Add 3 different messages to your guestbook
4. Take a screenshot of your working app
5. Decide whether you will stay on Appwrite Cloud or move to the self-hosted setup before Session 4

## Common Issues

**Error: "Project not found"**
- Check that your Project ID is correct in `appwrite.ts`

**Error: "Permission denied"**
- Make sure you've set collection permissions to allow "any" to create/read

**Port 3000 already in use**
- Run `npx next dev -p 3001` to use a different port

---

**Next Session**: We'll build a proper guestbook with a form to add messages!
