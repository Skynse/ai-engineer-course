# Session 6: Building a Blog - Relationships 101

**Duration**: 1.5 hours  
**Goal**: Understand one-to-many relationships by building a blog

## Learning Objectives

By the end of this session, students will:
- Design collections with relationships
- Link posts to users (author)
- Display related data
- Query by relationships

## Part 1: Database Design (15 min)

### Planning Our Blog

We need two collections:

**posts collection:**
- `title` (string)
- `content` (string - longer text)
- `authorId` (string - links to user)
- `authorName` (string - for display)
- `createdAt` (datetime)
- `updatedAt` (datetime)
- `published` (boolean)

**Relationship:** One user → many posts

### Create Posts Collection

1. Create collection: `posts`
2. Add attributes:
   - `title`: string, required, max 200 chars
   - `content`: string, required
   - `authorId`: string, required
   - `authorName`: string, required
   - `published`: boolean, default false
   - `createdAt`: datetime, required
   - `updatedAt`: datetime

3. Permissions:
   - Anyone can read published posts
   - Only author can update/delete their posts

## Part 2: Blog API Routes (30 min)

### Create Posts API

Create `src/app/api/posts/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { databases, DATABASE_ID } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

const POSTS_COLLECTION = 'posts';

// GET /api/posts - List published posts
export async function GET() {
  try {
    const posts = await databases.listDocuments(
      DATABASE_ID,
      POSTS_COLLECTION,
      [
        Query.equal('published', true),
        Query.orderDesc('$createdAt')
      ]
    );
    return NextResponse.json({ posts: posts.documents });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, authorId, authorName } = body;

    if (!title?.trim() || !content?.trim() || !authorId) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    const post = await databases.createDocument(
      DATABASE_ID,
      POSTS_COLLECTION,
      ID.unique(),
      {
        title: title.trim(),
        content: content.trim(),
        authorId,
        authorName: authorName || 'Anonymous',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    );

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
```

### Create Single Post API

Create `src/app/api/posts/[id]/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { databases, DATABASE_ID } from '@/lib/appwrite';

const POSTS_COLLECTION = 'posts';

// GET /api/posts/[id] - Get single post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await databases.getDocument(
      DATABASE_ID,
      POSTS_COLLECTION,
      params.id
    );
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }
}

// PATCH /api/posts/[id] - Update post
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, content, published } = body;

    const updates: any = {
      updatedAt: new Date().toISOString()
    };
    if (title !== undefined) updates.title = title.trim();
    if (content !== undefined) updates.content = content.trim();
    if (published !== undefined) updates.published = published;

    const post = await databases.updateDocument(
      DATABASE_ID,
      POSTS_COLLECTION,
      params.id,
      updates
    );

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Delete post
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      POSTS_COLLECTION,
      params.id
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
```

## Part 3: Blog Pages (45 min)

### Create Blog Home Page

Create `src/app/blog/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

interface Post {
  $id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string;
  createdAt: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog</h1>
          <Link
            href="/blog/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Write Post
          </Link>
        </div>

        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Be the first to write one!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.$id} className="bg-white p-6 rounded-lg shadow">
                <Link href={`/blog/${post.$id}`}>
                  <h2 className="text-2xl font-bold mb-2 hover:text-blue-500">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content.substring(0, 200)}
                  {post.content.length > 200 && '...'}
                </p>

                <div className="text-sm text-gray-500">
                  <Link 
                    href={`/user/${post.authorId}`}
                    className="text-blue-500 hover:underline"
                  >
                    {post.authorName}
                  </Link>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
```

### Create New Post Page

Create `src/app/blog/new/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';
import Navbar from '../../components/Navbar';

export default function NewPost() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      setError('You must be signed in to create a post');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          authorId: user.$id,
          authorName: user.name
        })
      });

      if (!response.ok) throw new Error('Failed to create post');

      router.push('/blog');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Write a New Post</h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter post title"
              required
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded h-64"
              placeholder="Write your post content..."
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
```

### Create Single Post Page

Create `src/app/blog/[id]/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

interface Post {
  $id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      loadPost();
    }
  }, [params.id]);

  async function loadPost() {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      if (!response.ok) throw new Error('Post not found');
      const data = await response.json();
      setPost(data.post);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!post) return <div className="text-center p-8">Post not found</div>;

  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/blog" className="text-blue-500 hover:underline mb-4 block">
          ← Back to Blog
        </Link>

        <article>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="text-gray-500 mb-8 pb-4 border-b">
            <Link 
              href={`/user/${post.authorId}`}
              className="text-blue-500 hover:underline"
            >
              {post.authorName}
            </Link>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="prose max-w-none whitespace-pre-wrap">
            {post.content}
          </div>
        </article>
      </main>
    </div>
  );
}
```

## Key Concepts

1. **One-to-Many**: One user can have many posts
2. **Foreign Keys**: `authorId` links posts to users
3. **Denormalization**: Store `authorName` for quick display
4. **Queries**: Filter and sort by any field

## Homework

1. Add an "Edit Post" feature
2. Add pagination to blog list (show 10 posts at a time)
3. Add draft/publish status
4. Show post count on user profiles

---

**Next Session**: Adding comments to posts - many-to-one relationships!
