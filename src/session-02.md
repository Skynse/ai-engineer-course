# Session 2: Basic CRUD Operations

**Duration**: 1.5 hours  
**Goal**: Master Create, Read, Update, Delete operations

## Learning Objectives

By the end of this session, students will:
- Understand CRUD operations
- Create, read, update, and delete documents
- Use Appwrite's ID generation
- Handle dates and formatting

## Part 1: CRUD Overview (15 min)

### What is CRUD?

CRUD stands for the four basic operations:

| Operation | Appwrite Method | HTTP Method |
|-----------|----------------|-------------|
| **C**reate | `createDocument()` | POST |
| **R**ead | `getDocument()` / `listDocuments()` | GET |
| **U**pdate | `updateDocument()` | PATCH |
| **D**elete | `deleteDocument()` | DELETE |

### Understanding Document IDs

Every document in Appwrite has a unique ID (`$id`). You can:
- Let Appwrite generate one: `ID.unique()`
- Specify your own: `'my-custom-id'`

## Part 2: Improving Our Guestbook (45 min)

### Step 1: Separate Display from Creation

Create `src/app/components/MessageList.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { databases, DATABASE_ID, MESSAGES_COLLECTION } from '@/lib/appwrite';

interface Message {
  $id: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        MESSAGES_COLLECTION
      );
      setMessages(response.documents as Message[]);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading messages...</p>;

  return (
    <ul className="space-y-4">
      {messages.map((msg) => (
        <li key={msg.$id} className="p-4 bg-white shadow rounded-lg">
          <p className="text-lg">{msg.content}</p>
          <div className="mt-2 text-sm text-gray-500">
            <span>by {msg.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
```

### Step 2: Add Message Form

Create `src/app/components/AddMessageForm.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { databases, DATABASE_ID, MESSAGES_COLLECTION } from '@/lib/appwrite';
import { ID } from 'appwrite';

export default function AddMessageForm({ onMessageAdded }: { onMessageAdded: () => void }) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;

    setSubmitting(true);
    try {
      await databases.createDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION,
        ID.unique(),
        {
          content: content.trim(),
          author: author.trim(),
          createdAt: new Date().toISOString()
        }
      );
      setContent('');
      setAuthor('');
      onMessageAdded();
    } catch (error) {
      console.error('Error adding message:', error);
      alert('Failed to add message');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Leave a Message</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Your Name</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-24"
          placeholder="Write your message..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {submitting ? 'Adding...' : 'Add Message'}
      </button>
    </form>
  );
}
```

### Step 3: Update Main Page

Replace `src/app/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import MessageList from './components/MessageList';
import AddMessageForm from './components/AddMessageForm';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleMessageAdded() {
    setRefreshKey(prev => prev + 1);
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Guestbook</h1>
      <AddMessageForm onMessageAdded={handleMessageAdded} />
      <MessageList key={refreshKey} />
    </main>
  );
}
```

## Part 3: Adding Edit & Delete (30 min)

### Update MessageList with Edit/Delete

Add these functions to `MessageList.tsx`:

```typescript
// Add this import
import { Query } from 'appwrite';

// Add these functions inside the component
async function deleteMessage(id: string) {
  if (!confirm('Are you sure you want to delete this message?')) return;
  
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION,
      id
    );
    loadMessages(); // Refresh the list
  } catch (error) {
    console.error('Error deleting message:', error);
    alert('Failed to delete message');
  }
}

async function updateMessage(id: string, newContent: string) {
  try {
    await databases.updateDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION,
      id,
      { content: newContent }
    );
    loadMessages(); // Refresh the list
  } catch (error) {
    console.error('Error updating message:', error);
    alert('Failed to update message');
  }
}
```

### Update the Message Display

Replace the message item rendering:

```typescript
<li key={msg.$id} className="p-4 bg-white shadow rounded-lg group">
  <p className="text-lg">{msg.content}</p>
  <div className="mt-2 text-sm text-gray-500 flex justify-between items-center">
    <div>
      <span>by {msg.author}</span>
      <span className="mx-2">•</span>
      <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
    </div>
    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
      <button 
        onClick={() => {
          const newContent = prompt('Edit message:', msg.content);
          if (newContent && newContent !== msg.content) {
            updateMessage(msg.$id, newContent);
          }
        }}
        className="text-blue-500 hover:text-blue-700 mr-3"
      >
        Edit
      </button>
      <button 
        onClick={() => deleteMessage(msg.$id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  </div>
</li>
```

## Key Concepts Learned

1. **Client Components**: Use `'use client'` when you need React hooks like `useState` and `useEffect`

2. **State Management**: Use state to trigger re-renders when data changes

3. **Error Handling**: Always wrap Appwrite calls in try-catch blocks

4. **Optimistic UI**: You can update the UI immediately and roll back on error (advanced pattern)

## Homework

1. Add a "Clear All" button that deletes all messages (with confirmation)
2. Add validation to prevent empty messages
3. Style the form to look nicer
4. Add a character counter to the message textarea

---

**Next Session**: We'll clean up the code and add better structure!
