# Session 5: User Profiles

**Duration**: 1.5 hours  
**Goal**: Create user profiles and manage user data

## Learning Objectives

By the end of this session, students will:
- Create a user profile system
- Update user information
- Link messages to users
- Display user-specific content

## Part 1: Profile System Overview (10 min)

### What We're Building

1. Profile page where users can:
   - View their info
   - Update their name
   - See their message history
2. Update messages to link to users
3. Show message authors as clickable profiles

## Part 2: Enhanced User Profiles (40 min)

### Step 1: Update Users Collection

Add more fields to the `users` collection:
- `bio` (string, optional)
- `avatar` (string, optional - URL to image)
- `updatedAt` (datetime)

### Step 2: Create Profile Page

Create `src/app/profile/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { databases, DATABASE_ID, USERS_COLLECTION } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/signin');
      return;
    }

    if (user) {
      loadProfile();
    }
  }, [user, authLoading]);

  async function loadProfile() {
    try {
      const doc = await databases.getDocument(
        DATABASE_ID,
        USERS_COLLECTION,
        user!.$id
      );
      setProfile(doc);
      setName(doc.name || '');
      setBio(doc.bio || '');
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage('');

    try {
      await databases.updateDocument(
        DATABASE_ID,
        USERS_COLLECTION,
        user.$id,
        {
          name: name.trim(),
          bio: bio.trim(),
          updatedAt: new Date().toISOString()
        }
      );
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!user) return null;

  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        {message && (
          <div className={`p-4 rounded mb-6 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-2 border rounded bg-gray-50"
            />
            <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border rounded h-24"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="text-sm text-gray-500">
            <p>Member since: {new Date(profile?.createdAt).toLocaleDateString()}</p>
            {profile?.updatedAt && (
              <p>Last updated: {new Date(profile.updatedAt).toLocaleDateString()}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </main>
    </div>
  );
}
```

### Step 3: Update Messages to Link to Users

Update the `messages` collection:
1. Add `userId` attribute (string)
2. Add `userName` attribute (string) - for display

Update `AddMessageForm` to include user info:

```typescript
// In handleSubmit, update the createDocument call:
await createMessage(content, user.name, user.$id);
```

Update the API route `src/app/api/messages/route.ts`:

```typescript
// Update POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, author, userId } = body;

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
        userId: userId || null,
        userName: author.trim(),
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

## Part 3: User Message History (30 min)

### Create API Route for User Messages

Create `src/app/api/messages/user/[userId]/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { databases, DATABASE_ID, MESSAGES_COLLECTION } from '@/lib/appwrite';
import { Query } from 'appwrite';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const messages = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION,
      [Query.equal('userId', params.userId), Query.orderDesc('$createdAt')]
    );

    return NextResponse.json({ messages: messages.documents });
  } catch (error) {
    console.error('Error fetching user messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
```

### Add Message History to Profile

Add to `src/app/profile/page.tsx`:

```typescript
// Add to imports
import { useEffect, useState } from 'react';

// Add to state
const [userMessages, setUserMessages] = useState<any[]>([]);

// Add to loadProfile function
async function loadProfile() {
  // ... existing code ...
  
  // Load user's messages
  try {
    const response = await fetch(`/api/messages/user/${user.$id}`);
    if (response.ok) {
      const data = await response.json();
      setUserMessages(data.messages);
    }
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

// Add to JSX after the form
<div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">Your Messages</h2>
  {userMessages.length === 0 ? (
    <p className="text-gray-500">You haven't posted any messages yet.</p>
  ) : (
    <ul className="space-y-4">
      {userMessages.map((msg) => (
        <li key={msg.$id} className="p-4 bg-gray-50 rounded">
          <p>{msg.content}</p>
          <p className="text-sm text-gray-500">
            {new Date(msg.createdAt).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  )}
</div>
```

## Part 4: Update UI to Show User Links (10 min)

### Update MessageList to Show User Profiles

Modify the message display in `MessageList.tsx`:

```typescript
<li key={msg.$id} className="p-4 bg-white shadow rounded-lg">
  <p className="text-lg">{msg.content}</p>
  <div className="mt-2 text-sm text-gray-500 flex justify-between">
    <div>
      {msg.userId ? (
        <Link 
          href={`/user/${msg.userId}`}
          className="text-blue-500 hover:underline"
        >
          {msg.userName}
        </Link>
      ) : (
        <span>{msg.author}</span>
      )}
      <span className="mx-2">•</span>
      <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
    </div>
    <!-- ... edit/delete buttons ... -->
  </div>
</li>
```

## Key Concepts

1. **User documents sync**: Keep Appwrite Auth and your database in sync
2. **Denormalization**: Store `userName` in messages for quick display
3. **Protected routes**: Check auth before loading profile pages
4. **Relations**: Link messages to users with `userId`

## Homework

1. Create a public user profile page (`/user/[id]`)
2. Add a "Messages by this user" section to public profiles
3. Add profile avatar upload (prepare for next session)
4. Show message count in navbar

---

**Next Session**: Building a blog with comments - our first complex relationship!
