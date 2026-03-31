# Lesson 11: Task Manager Demo

**Duration**: 1.5 hours  
**Goal**: Build a kanban-style task manager with stable ordering and drag-and-drop

## What We're Building

A task manager with:

- Appwrite auth
- three board columns: `backlog`, `in-progress`, `done`
- create, edit, move, and delete task flows
- drag-and-drop reordering
- stable card ordering with a LexoRank-style `order` field
- priority filtering without changing the underlying order

## What Changed From The Earlier CRUD Example

The current demo project is a board-first app. It now models:

- **status** as the column a card belongs to
- **order** as the sorting key inside a column
- **completed** as a derived concept from moving a card into `done`

That is closer to how real product teams structure work apps.

## Database Schema

**tasks collection:**

- `title` (string, required)
- `description` (string, optional)
- `priority` (string/enum: `low`, `medium`, `high`)
- `status` (enum: `backlog`, `in-progress`, `done`)
- `order` (string, optional but required in practice)
- `completed` (boolean)
- `userId` (string, required)
- `userName` (string, required)
- `completedAt` (string or datetime, optional)

## Key Concepts

### 1. Board State Is Better Than A Checkbox

Earlier in the course, `completed: boolean` was enough.

For a board app, we need stronger state:

- `backlog`
- `in-progress`
- `done`

This gives us column-based UI, better reporting, and cleaner movement logic.

### 2. LexoRank-Style Ordering

Instead of storing `1, 2, 3, 4`, the board stores an ordering string.

Why:

- moving one card should not force every card below it to be renumbered
- drag-and-drop should generate a new key between two neighboring cards
- the app can keep stable order even after many moves

Conceptually:

```typescript
const newOrder = generateLexoRankBetween(previousTask?.order, nextTask?.order);
```

### 3. Drag-And-Drop Is A Data Problem, Not Just A UI Problem

When a user drops a card:

1. determine the target column
2. determine the target position inside that column
3. calculate a new `order`
4. persist `status`, `order`, and completion metadata

That is why schema design matters before styling.

### 4. Repairing Old Data

If older tasks are missing `status` or `order`, the current app repairs them on load. This is a useful beginner lesson:

- demos evolve
- schemas evolve
- you still need a migration or repair strategy

## Component Structure

The current demo is organized around the board:

```text
components/
├── TaskForm.tsx
├── TaskFilters.tsx
├── TaskItem.tsx
└── TaskList.tsx
```

Responsibilities:

- `TaskForm.tsx`: create and edit tasks, including `status`
- `TaskFilters.tsx`: priority filtering and drag-state messaging
- `TaskList.tsx`: render columns and drop zones
- `TaskItem.tsx`: render cards, actions, and drag handles

## Implementation Notes

1. Sort cards by `order` first, then fall back safely if older records are missing it.
2. Disable drag-and-drop when priority filters are active so you do not reorder a partial view by mistake.
3. Treat moving into `done` as the moment to sync `completed` and `completedAt`.
4. Keep ownership in the schema with `userId` and `userName`.

## Demo Project Reference

The current implementation lives in `demo-projects/task-manager/`.

You should inspect:

- `src/app/page.tsx`
- `src/lib/lexorank.ts`
- `src/app/components/TaskList.tsx`
- `src/app/components/TaskItem.tsx`

## Homework

1. Add a due date field and show overdue cards visually.
2. Add a fourth lane such as `blocked` or `review`.
3. Ask AI to propose a board schema, then compare it to the shipped schema and explain the differences.

---

**Next**: Recipe Collection (arrays, uploads, and richer document shapes)
