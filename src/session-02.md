# Lesson 2: Next.js Introduction & First TODO App

**Duration**: 1.5 hours  
**Goal**: Learn the shape of a Next.js app by building a small local TODO website without AI or Appwrite

## Learning Objectives

By the end of this lesson, you will:
- create a new Next.js project with Bun
- understand the role of `app/`, pages, and components
- build a small interactive TODO app with local React state
- distinguish between a local-only app and a full-stack app
- prepare for the Appwrite-backed lessons that begin after this

## Part 1: Why Start With a Local App?

Before you prompt Codex to build full-stack features, you need a clear mental model of what a Next.js app looks like when the moving parts are small.

This lesson stays intentionally simple:

- no AI
- no Appwrite
- no auth
- no database

That way you can focus on:
- file structure
- JSX
- state
- events
- rendering a list

![Local TODO app flow](/assets/diagrams/lesson-02-local-todo-flow.png)

## Part 2: Create the App

### Scaffold the Project

Run:

```bash
bunx create-next-app@latest nextjs-todo-lab --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Choose:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Turbopack: Yes

Then start the app:

```bash
cd nextjs-todo-lab
bun run dev
```

Visit `http://localhost:3000`.

### What to Notice

- `src/app/page.tsx` is the home page
- `src/app/layout.tsx` wraps the app
- styles are already wired in
- changing `page.tsx` changes what the user sees first

## Part 3: Build a Small TODO App

### Replace `src/app/page.tsx`

```tsx
'use client';

import { FormEvent, useMemo, useState } from 'react';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const starterTodos: Todo[] = [
  { id: 1, text: 'Read the page structure', done: true },
  { id: 2, text: 'Add a new todo', done: false },
  { id: 3, text: 'Mark one as complete', done: false },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(starterTodos);
  const [input, setInput] = useState('');

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.done).length,
    [todos]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text) return;

    setTodos((current) => [
      {
        id: Date.now(),
        text,
        done: false,
      },
      ...current,
    ]);
    setInput('');
  }

  function toggleTodo(id: number) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function removeTodo(id: number) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  return (
    <main className="min-h-screen bg-stone-100 px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
          Next.js Lab
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Simple TODO App</h1>
        <p className="mt-3 text-stone-600">
          This app only uses local React state. Reload the page and the tasks
          reset. That is useful here because it makes the difference between a
          frontend-only app and a full-stack app obvious.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Add a task"
            className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-stone-900"
          />
          <button
            type="submit"
            className="rounded-xl bg-stone-900 px-5 py-3 text-white transition hover:bg-stone-700"
          >
            Add
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-stone-100 px-4 py-3 text-sm text-stone-700">
          {remainingCount} task{remainingCount === 1 ? '' : 's'} remaining
        </div>

        <ul className="mt-6 space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-2xl border border-stone-200 px-4 py-4"
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-4 w-4"
                />
                <span className={todo.done ? 'text-stone-400 line-through' : ''}>
                  {todo.text}
                </span>
              </label>

              <button
                type="button"
                onClick={() => removeTodo(todo.id)}
                className="text-sm text-stone-500 hover:text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
```

## Part 4: What You Should Understand

After the app works, pause and explain:

- `page.tsx` is a route entry point
- `'use client'` is needed because this page uses state and browser events
- `useState` stores local UI state
- the form updates state, not a database
- this app is interactive, but not yet full-stack

## Part 5: Manual Verification

You should test:

1. adding a task
2. checking and unchecking a task
3. deleting a task
4. refreshing the page and noticing the data resets

That last point matters because it sets up the need for Appwrite in the next build phase.

## Debrief

This app proves:
- Next.js can render UI and handle interaction
- React state can power small local experiences
- a database becomes necessary when the app needs persistence or shared data

That is the bridge into the Appwrite-backed lessons.

## Homework

Before Lesson 3:

1. Make one small visual change to the TODO app on your own.
2. Be ready to explain why the app loses its tasks after refresh.
3. Read [Guide: Appwrite MCP Setup](guide-codex-appwrite-mcp.md).
