# Session 13: Demo App 3 - Social Feed

**Duration**: 1.5 hours  
**Goal**: Build a social media-style feed with likes and follows

## What We're Building

A **Social Feed** app where users can:
- Create text/image posts
- Like posts (simple counter)
- View user profiles with their posts
- Follow/unfollow users (optional advanced)

## Learning Objectives

By the end of this session, students will:
- Build a Twitter-like interface
- Implement like functionality
- Create user timelines
- Handle real-time updates (polling)

## Part 1: Setup (10 min)

### Collections

**posts collection:**
- `content` (string, required)
- `imageUrl` (string, optional)
- `authorId` (string, required)
- `authorName` (string, required)
- `authorAvatar` (string, optional)
- `likes` (integer, default: 0)
- `likedBy` (string array - user IDs)
- `createdAt` (datetime)

## Part 2: Components (50 min)

### Post Card Component

Create `src/app/components/PostCard.tsx`:

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  $id: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onLike: (postId: string) => void;
}

export default function PostCard({ post, currentUserId, onLike }: PostCardProps) {
  const isLiked = currentUserId ? post.likedBy.includes(currentUserId) : false;
  const [optimisticLiked, setOptimisticLiked] = useState(isLiked);
  const [optimisticLikes, setOptimisticLikes] = useState(post.likes);

  function handleLike() {
    if (!currentUserId) return;

    // Optimistic update
    if (optimisticLiked) {
      setOptimisticLiked(false);
      setOptimisticLikes(prev => prev - 1);
    } else {
      setOptimisticLiked(true);
      setOptimisticLikes(prev => prev + 1);
    }

    onLike(post.$id);
  }

  const timeAgo = getTimeAgo(post.createdAt);

  return (
    <article className="bg-white p-4 border-b hover:bg-gray-50">
      <div className="flex gap-3">
        <Link href={`/user/${post.authorId}`}>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
            {post.authorAvatar ? (
              <img src={post.authorAvatar} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              post.authorName.charAt(0).toUpperCase()
            )}
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/user/${post.authorId}`} className="font-bold hover:underline">
              {post.authorName}
            </Link>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500 text-sm">{timeAgo}</span>
          </div>

          <p className="mb-3 whitespace-pre-wrap">{post.content}</p>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post image"
              className="rounded-lg max-h-96 object-cover mb-3"
            />
          )}

          <div className="flex items-center gap-6 text-gray-500">
            <button
              onClick={handleLike}
              disabled={!currentUserId}
              className={`flex items-center gap-2 hover:text-red-500 transition-colors ${
                optimisticLiked ? 'text-red-500' : ''
              }`}
            >
              <span>{optimisticLiked ? '❤️' : '🤍'}</span>
              <span>{optimisticLikes}</span>
            </button>

            <button className="flex items-center gap-2 hover:text-blue-500">
              <span>💬</span>
              <span>Comment</span>
            </button>

            <button className="flex items-center gap-2 hover:text-green-500">
              <span>🔄</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
  return date.toLocaleDateString();
}
```

### Create Post Component

Create `src/app/components/CreatePost.tsx`:

```typescript
'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';

interface CreatePostProps {
  userName: string;
  userAvatar?: string;
  onSubmit: (content: string, imageUrl: string) => void;
}

export default function CreatePost({ userName, userAvatar, onSubmit }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);

  function handleSubmit() {
    if (!content.trim()) return;
    onSubmit(content, imageUrl);
    setContent('');
    setImageUrl('');
    setShowImageUpload(false);
  }

  return (
    <div className="bg-white p-4 border-b">
      <div className="flex gap-3">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
          {userAvatar ? (
            <img src={userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            userName.charAt(0).toUpperCase()
          )}
        </div>

        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full p-2 text-lg resize-none border-none focus:outline-none"
            rows={3}
          />

          {showImageUpload && (
            <div className="mb-3">
              <ImageUpload onUpload={setImageUrl} currentImage={imageUrl} />
            </div>
          )}

          <div className="flex justify-between items-center border-t pt-3">
            <div className="flex gap-4">
              <button
                onClick={() => setShowImageUpload(!showImageUpload)}
                className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                title="Add image"
              >
                📷
              </button>
              <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full" title="Add emoji">
                😊
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Feed Component

Create `src/app/components/Feed.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';

interface Post {
  $id: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
}

interface FeedProps {
  currentUser?: {
    $id: string;
    name: string;
    avatar?: string;
  };
}

export default function Feed({ currentUser }: FeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
    // Poll for new posts every 30 seconds
    const interval = setInterval(loadPosts, 30000);
    return () => clearInterval(interval);
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

  async function handleCreatePost(content: string, imageUrl: string) {
    if (!currentUser) return;

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          imageUrl,
          authorId: currentUser.$id,
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar
        })
      });

      if (response.ok) {
        loadPosts(); // Refresh feed
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  async function handleLike(postId: string) {
    if (!currentUser) return;

    try {
      await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.$id })
      });
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {currentUser && (
        <CreatePost
          userName={currentUser.name}
          userAvatar={currentUser.avatar}
          onSubmit={handleCreatePost}
        />
      )}

      {loading ? (
        <div className="text-center py-8">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No posts yet. Be the first to share something!
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard
              key={post.$id}
              post={post}
              currentUserId={currentUser?.$id}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

## Part 3: Main Page (10 min)

Create `src/app/page.tsx`:

```typescript
import Feed from './components/Feed';
import Navbar from './components/Navbar';

// Mock current user
const currentUser = {
  $id: 'user1',
  name: 'Demo User',
  avatar: undefined
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-4">
        <Feed currentUser={currentUser} />
      </main>
    </div>
  );
}
```

## Key Features

1. **Optimistic Updates**: Like button updates immediately
2. **Polling**: Check for new posts every 30 seconds
3. **Time Ago**: Smart timestamps ("2m", "1h", "2d")
4. **Responsive**: Works on mobile and desktop

## Homework

1. Connect to real Appwrite backend
2. Add comments to posts
3. Implement user following
4. Add "Load More" pagination
5. Add real-time updates with Appwrite Realtime

---

**Next Session**: Styling and polish!
