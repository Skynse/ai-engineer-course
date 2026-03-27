# Session 11: Demo App 1 - Task Manager

**Duration**: 1.5 hours  
**Goal**: Build a complete task management application

## What We're Building

A **Task Manager** where users can:
- Create tasks with priorities (Low, Medium, High)
- Mark tasks as complete/incomplete
- Filter by status (All, Active, Completed)
- Sort by priority or date
- Edit and delete tasks

## Learning Objectives

By the end of this session, students will:
- Build a complete CRUD application from scratch
- Implement filtering and sorting
- Use enums for fixed values (priority)
- Practice everything learned so far

## Part 1: Setup (15 min)

### Create New Project

```bash
cd ~/projects
npx create-next-app@latest task-manager --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd task-manager
npm install appwrite
```

### Create Collections

**tasks collection:**
- `title` (string, required)
- `description` (string, optional)
- `priority` (enum: low, medium, high, default: medium)
- `completed` (boolean, default: false)
- `userId` (string, required)
- `userName` (string, required)
- `createdAt` (datetime, required)
- `completedAt` (datetime, optional)

Permissions:
- Create: users
- Read: user:[ID] (only own tasks)
- Update: user:[ID]
- Delete: user:[ID]

## Part 2: Core Components (45 min)

### Task Type Definition

Create `src/types/task.ts`:

```typescript
export interface Task {
  $id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  userId: string;
  userName: string;
  createdAt: string;
  completedAt?: string;
}

export type Priority = 'low' | 'medium' | 'high';
export type FilterStatus = 'all' | 'active' | 'completed';
export type SortBy = 'date' | 'priority';
```

### Task List Component

Create `src/app/components/TaskList.tsx`:

```typescript
'use client';

import { Task } from '@/types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No tasks found. Create your first task!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.$id}
          task={task}
          onToggle={() => onToggle(task.$id)}
          onDelete={() => onDelete(task.$id)}
          onEdit={() => onEdit(task)}
        />
      ))}
    </div>
  );
}
```

### Task Item Component

Create `src/app/components/TaskItem.tsx`:

```typescript
'use client';

import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <div className={`p-4 bg-white rounded-lg shadow flex items-center gap-4 ${task.completed ? 'opacity-60' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className="w-5 h-5"
      />

      <div className="flex-1">
        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          
          <span className="text-xs text-gray-500">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
          
          {task.completedAt && (
            <span className="text-xs text-gray-500">
              Completed: {new Date(task.completedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
```

### Task Form Component

Create `src/app/components/TaskForm.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { Task, Priority } from '@/types/task';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: { title: string; description: string; priority: Priority }) => void;
  onCancel: () => void;
}

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<Priority>(task?.priority || 'medium');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ title, description, priority });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {task ? 'Edit Task' : 'New Task'}
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded h-20"
            placeholder="Add details..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {task ? 'Update Task' : 'Add Task'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
```

## Part 3: Filters Component (20 min)

Create `src/app/components/TaskFilters.tsx`:

```typescript
'use client';

import { FilterStatus, SortBy } from '@/types/task';

interface TaskFiltersProps {
  filter: FilterStatus;
  sortBy: SortBy;
  onFilterChange: (filter: FilterStatus) => void;
  onSortChange: (sort: SortBy) => void;
  taskCount: { all: number; active: number; completed: number };
}

export default function TaskFilters({
  filter,
  sortBy,
  onFilterChange,
  onSortChange,
  taskCount
}: TaskFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as FilterStatus[]).map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-4 py-2 rounded capitalize ${
                filter === f
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f}
              <span className="ml-2 text-sm opacity-75">
                ({f === 'all' ? taskCount.all : f === 'active' ? taskCount.active : taskCount.completed})
              </span>
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className="p-2 border rounded"
          >
            <option value="date">Date Created</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
}
```

## Part 4: Main Page (10 min)

Create `src/app/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { Task, FilterStatus, SortBy } from '@/types/task';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('date');

  // Filter and sort tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // Priority sort: high > medium > low
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const taskCount = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length
  };

  // Handlers (would connect to API in real app)
  const handleAddTask = (data: { title: string; description: string; priority: SortBy }) => {
    // API call would go here
    console.log('Adding task:', data);
    setShowForm(false);
  };

  const handleEditTask = (data: { title: string; description: string; priority: SortBy }) => {
    // API call would go here
    console.log('Editing task:', data);
    setEditingTask(null);
    setShowForm(false);
  };

  const handleToggleTask = (id: string) => {
    // API call would go here
    console.log('Toggling task:', id);
  };

  const handleDeleteTask = (id: string) => {
    // API call would go here
    console.log('Deleting task:', id);
  };

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>

      <button
        onClick={() => {
          setEditingTask(null);
          setShowForm(!showForm);
        }}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 mb-6"
      >
        {showForm ? 'Cancel' : '+ Add New Task'}
      </button>

      {showForm && (
        <TaskForm
          task={editingTask || undefined}
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      <TaskFilters
        filter={filter}
        sortBy={sortBy}
        onFilterChange={setFilter}
        onSortChange={setSortBy}
        taskCount={taskCount}
      />

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={(task) => {
          setEditingTask(task);
          setShowForm(true);
        }}
      />
    </main>
  );
}
```

## What to Complete

Students should:
1. Connect all handlers to real API calls
2. Add authentication
3. Deploy the app
4. Test all features

## Key Takeaways

1. **Enums**: Use for fixed values like priority levels
2. **Filtering**: Client-side for small data, server-side for large
3. **State Management**: Lift state up to parent component
4. **Reusable Components**: Break UI into small, focused pieces

## Homework

1. Connect to real Appwrite backend
2. Add due dates to tasks
3. Add categories/tags
4. Add task statistics dashboard

---

**Next Session**: Demo App 2 - Recipe Collection!
