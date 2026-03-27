# Session 3: Next.js Integration & API Routes

**Duration**: 1.5 hours  
**Goal**: Move database logic to API routes for better architecture

## Learning Objectives

By the end of this session, students will:
- Understand the difference between Server and Client Components
- Create API routes in Next.js App Router
- Move database operations to the backend
- Handle errors properly

## Part 1: Why API Routes? (15 min)

### Current Problem

Right now, our database code runs in the browser. This means:
- ❌ API keys exposed to users
- ❌ Can't control what data users see
- ❌ No way to add server-side logic

### The Solution: API Routes

Move database operations to the server:
- ✓ Secure API keys
- ✓ Control data access
- ✓ Add validation and business logic
- ✓ Better performance

### Server vs Client Components

| Feature | Server Component | Client Component |
|---------|-----------------|------------------|
| Runs on | Server | Browser |
| Can access database directly | ✓ | ✗ |
| Can use React hooks | ✗ | ✓ |
| Directive | None (default) | `'use client'` |

## Part 2: Creating API Routes (45 min)

### Step 1: Create Messages API Route

Create `src/app/api/messages/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { databases, DATABASE_ID, MESSAGES_COLLECTION } from '@/lib/appwrite';
import { ID } from 'appwrite';

// GET /api/messages - List all messages
export async function GET() {
  try {
    const messages = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION
    );
    return NextResponse.json({ messages: messages.documents });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST /api/messages - Create a new message
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, author } = body;

    // Validation
    if (!content?.trim() || !author?.trim()) {
      return NextResponse.json(
        { error: 'Content and author are required' },
        { status: 400 }
      );
    }

    const message = await databases.createDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION,
      ID.unique(),
      {
        content: content.trim(),
        author: author.trim(),
        createdAt: new Date().toISOString()
      }
    );

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}
```

### Step 2: Create Single Message Route

Create `src/app/api/messages/[id]/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { databases, DATABASE_ID, MESSAGES_COLLECTION } from '@/lib/appwrite';

// PATCH /api/messages/[id] - Update a message
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const message = await databases.updateDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION,
      params.id,
      { content: content.trim() }
    );

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE /api/messages/[id] - Delete a message
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION,
      params.id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
```

## Part 3: Update Frontend to Use API (30 min)

### Create API Client Helper

Create `src/lib/api.ts`:

```typescript
const API_BASE = '/api';

export async function fetchMessages() {
  const response = await fetch(`${API_BASE}/messages`);
  if (!response.ok) throw new Error('Failed to fetch messages');
  const data = await response.json();
  return data.messages;
}

export async function createMessage(content: string, author: string) {
  const response = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, author })
  });
  if (!response.ok) throw new Error('Failed to create message');
  return response.json();
}

export async function updateMessage(id: string, content: string) {
  const response = await fetch(`${API_BASE}/messages/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  if (!response.ok) throw new Error('Failed to update message');
  return response.json();
}

export async function deleteMessage(id: string) {
  const response = await fetch(`${API_BASE}/messages/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete message');
  return response.json();
}
```

### Update MessageList Component

Update `src/app/components/MessageList.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { fetchMessages, deleteMessage, updateMessage } from '@/lib/api';

interface Message {
  $id: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function MessageList({ refresh }: { refresh: number }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, [refresh]);

  async function loadMessages() {
    try {
      setLoading(true);
      const data = await fetchMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
      alert('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure?')) return;
    
    try {
      await deleteMessage(id);
      loadMessages();
    } catch (error) {
      alert('Failed to delete message');
    }
  }

  async function handleEdit(id: string, currentContent: string) {
    const newContent = prompt('Edit message:', currentContent);
    if (!newContent || newContent === currentContent) return;
    
    try {
      await updateMessage(id, newContent);
      loadMessages();
    } catch (error) {
      alert('Failed to update message');
    }
  }

  if (loading) return <p className="text-center">Loading messages...</p>;

  return (
    <ul className="space-y-4">
      {messages.map((msg) => (
        <li key={msg.$id} className="p-4 bg-white shadow rounded-lg group">
          <p className="text-lg">{msg.content}</p>
          <div className="mt-2 text-sm text-gray-500 flex justify-between">
            <div>
              <span>by {msg.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100">
              <button 
                onClick={() => handleEdit(msg.$id, msg.content)}
                className="text-blue-500 hover:text-blue-700 mr-3"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(msg.$id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
```

### Update AddMessageForm

Update `src/app/components/AddMessageForm.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { createMessage } from '@/lib/api';

export default function AddMessageForm({ onMessageAdded }: { onMessageAdded: () => void }) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;

    setSubmitting(true);
    try {
      await createMessage(content, author);
      setContent('');
      setAuthor('');
      onMessageAdded();
    } catch (error) {
      alert('Failed to add message');
    } finally {
      setSubmitting(false);
    }
  }

  // ... rest of the component stays the same
}
```

## Benefits of This Architecture

1. **Security**: Database keys stay on the server
2. **Control**: You control exactly what data is returned
3. **Validation**: Server-side validation prevents bad data
4. **Flexibility**: Easy to add business logic later

## Homework

1. Add server-side validation to check message length (max 500 characters)
2. Add an endpoint to get a single message by ID
3. Add loading states to all buttons
4. Try adding a "like" feature to messages

---

**Next Session**: Adding user authentication!
