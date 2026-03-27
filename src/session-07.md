# Session 7: Comments System

**Duration**: 1.5 hours  
**Goal**: Build a comment system for blog posts

## Learning Objectives

By the end of this session, students will:
- Understand many-to-one relationships
- Create nested/related data
- Display hierarchical data
- Query with multiple filters

## Part 1: Comments Collection Design (10 min)

### Comment Data Structure

Each comment needs:
- `postId` - which post it belongs to
- `authorId` - who wrote it
- `authorName` - for display
- `content` - the comment text
- `createdAt` - when it was posted

**Relationship**: Many comments → One post

### Create Comments Collection

1. Create collection: `comments`
2. Add attributes:
   - `postId` (string, required) - links to post
   - `authorId` (string, required) - links to user
   - `authorName` (string, required)
   - `content` (string, required)
   - `createdAt` (datetime, required)
3. Add indexes:
   - `postId` - for fast lookup
4. Permissions:
   - Anyone can read
   - Only author can edit/delete

## Part 2: Comments API (25 min)

### Create Comments API Route

Create `src/app/api/posts/[id]/comments/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { databases, DATABASE_ID } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

const COMMENTS_COLLECTION = 'comments';

// GET - Get comments for a post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const comments = await databases.listDocuments(
      DATABASE_ID,
      COMMENTS_COLLECTION,
      [
        Query.equal('postId', params.id),
        Query.orderAsc('createdAt')
      ]
    );
    return NextResponse.json({ comments: comments.documents });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST - Add a comment
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { content, authorId, authorName } = body;

    if (!content?.trim() || !authorId) {
      return NextResponse.json(
        { error: 'Content and author are required' },
        { status: 400 }
      );
    }

    const comment = await databases.createDocument(
      DATABASE_ID,
      COMMENTS_COLLECTION,
      ID.unique(),
      {
        postId: params.id,
        authorId,
        authorName: authorName || 'Anonymous',
        content: content.trim(),
        createdAt: new Date().toISOString()
      }
    );

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
```

### Create Comment Management API

Create `src/app/api/comments/[id]/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { databases, DATABASE_ID } from '@/lib/appwrite';

const COMMENTS_COLLECTION = 'comments';

// PATCH - Update comment
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

    const comment = await databases.updateDocument(
      DATABASE_ID,
      COMMENTS_COLLECTION,
      params.id,
      { content: content.trim() }
    );

    return NextResponse.json({ comment });
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

// DELETE - Delete comment
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      COMMENTS_COLLECTION,
      params.id
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
```

## Part 3: Comments UI (50 min)

### Create Comments Component

Create `src/app/components/Comments.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

interface Comment {
  $id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export default function Comments({ postId }: { postId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [postId]);

  async function loadComments() {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          authorId: user.$id,
          authorName: user.name
        })
      });

      if (response.ok) {
        setNewComment('');
        loadComments();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteComment(commentId: string) {
    if (!confirm('Delete this comment?')) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        loadComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-2xl font-bold mb-6">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border rounded h-24 mb-2"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p className="text-gray-500 mb-8">
          <Link href="/auth/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>{' '}
          to leave a comment
        </p>
      )}

      {/* Comments List */}
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.$id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-600">
                  <Link 
                    href={`/user/${comment.authorId}`}
                    className="font-medium text-blue-500 hover:underline"
                  >
                    {comment.authorName}
                  </Link>
                  <span className="mx-2">•</span>
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                
                {user?.$id === comment.authorId && (
                  <button
                    onClick={() => deleteComment(comment.$id)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Update Post Page to Include Comments

Update `src/app/blog/[id]/page.tsx`:

```typescript
// Add import
import Comments from '../../components/Comments';

// Add to the JSX, after the article content
<Comments postId={post.$id} />
```

## Part 4: Adding Comment Count (5 min)

### Update Posts to Show Comment Count

Update the blog list to fetch comment counts. We can do this by:
1. Fetching all comments for each post (simpler)
2. Or storing a comment count on the post (more efficient)

For now, let's keep it simple and fetch comments:

Create a helper function in `src/lib/api.ts`:

```typescript
export async function fetchPostComments(postId: string) {
  const response = await fetch(`/api/posts/${postId}/comments`);
  if (!response.ok) throw new Error('Failed to fetch comments');
  const data = await response.json();
  return data.comments;
}
```

## Key Concepts

1. **Many-to-One**: Multiple comments belong to one post
2. **Query by relation**: Use `Query.equal('postId', id)` to find related items
3. **Ordering**: Use `Query.orderAsc('createdAt')` for chronological order
4. **Indexes**: Create indexes on foreign keys for performance

## Homework

1. Add edit functionality for comments
2. Show comment count on blog list page
3. Add "Reply to comment" feature (nested comments)
4. Add comment likes

---

**Next Session**: File uploads with Appwrite Storage!
