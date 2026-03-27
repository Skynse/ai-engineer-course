# Session 9: Permissions & Security Basics

**Duration**: 1.5 hours  
**Goal**: Understand who can access what and how to secure your app

## Learning Objectives

By the end of this session, students will:
- Understand Appwrite permission system
- Set proper collection and document permissions
- Implement ownership checks
- Know basic security best practices

## Part 1: Understanding Permissions (20 min)

### Types of Permissions

**Collection-level permissions** (apply to all documents):
- Create: Who can create new documents
- Read: Who can read documents
- Update: Who can modify documents
- Delete: Who can remove documents

**Document-level permissions** (apply to specific documents):
- Same as above, but per-document
- Overrides collection permissions

### Permission Roles

| Role | Description |
|------|-------------|
| `any` | Anyone (even guests) |
| `users` | Any authenticated user |
| `user:[ID]` | Specific user |
| `guests` | Non-logged in users |

## Part 2: Setting Up Proper Permissions (40 min)

### Example: Blog Posts Permissions

**Collection Settings** (general defaults):
- Create: `users` (only logged-in users can write)
- Read: `any` (everyone can read published posts)
- Update: `user:[ID]` (only author)
- Delete: `user:[ID]` (only author)

**Document-level example** (in code):
```typescript
await databases.createDocument(
  DATABASE_ID,
  POSTS_COLLECTION,
  ID.unique(),
  { /* data */ },
  [
    Permission.read(Role.any()),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId))
  ]
);
```

### Practical Exercise: Private Posts

Let's implement a "private post" feature:

#### Update Posts Collection

Add `isPrivate` boolean field to `posts` collection.

#### Update Get Posts API

Update `src/app/api/posts/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { databases, DATABASE_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';

const POSTS_COLLECTION = 'posts';

export async function GET(request: Request) {
  try {
    // Get current user (if logged in)
    const cookies = request.headers.get('cookie');
    let currentUserId = null;
    
    // Try to get user from session (simplified - in real app use proper auth)
    // For now, we'll pass userId as query param for demo
    const { searchParams } = new URL(request.url);
    currentUserId = searchParams.get('userId');

    // Build query: published posts OR user's own posts
    const queries = [
      Query.equal('published', true),
      Query.orderDesc('$createdAt')
    ];

    // If user is logged in, also get their private posts
    // This is simplified - in production use proper server-side auth
    
    const posts = await databases.listDocuments(
      DATABASE_ID,
      POSTS_COLLECTION,
      queries
    );
    
    // Filter private posts on server
    const visiblePosts = posts.documents.filter((post: any) => {
      if (!post.isPrivate) return true;
      if (currentUserId && post.authorId === currentUserId) return true;
      return false;
    });

    return NextResponse.json({ posts: visiblePosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
```

#### Update Create Post to Support Privacy

```typescript
// In POST handler
const { title, content, authorId, authorName, featuredImage, isPrivate } = body;

const post = await databases.createDocument(
  DATABASE_ID,
  POSTS_COLLECTION,
  ID.unique(),
  {
    title: title.trim(),
    content: content.trim(),
    authorId,
    authorName: authorName || 'Anonymous',
    featuredImage: featuredImage || null,
    isPrivate: isPrivate || false,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
);
```

#### Add Privacy Toggle to Form

Update `src/app/blog/new/page.tsx`:

```typescript
const [isPrivate, setIsPrivate] = useState(false);

// In form
<div className="flex items-center gap-2">
  <input
    type="checkbox"
    id="isPrivate"
    checked={isPrivate}
    onChange={(e) => setIsPrivate(e.target.checked)}
    className="w-4 h-4"
  />
  <label htmlFor="isPrivate" className="text-sm">
    Make this post private (only you can see it)
  </label>
</div>

// In submit
body: JSON.stringify({
  title,
  content,
  authorId: user.$id,
  authorName: user.name,
  featuredImage,
  isPrivate
})
```

### Show Privacy Status

Add to blog list:

```typescript
<div className="flex items-center gap-2">
  {post.isPrivate && (
    <span className="text-xs bg-gray-200 px-2 py-1 rounded">Private</span>
  )}
  <Link href={`/user/${post.authorId}`} className="text-blue-500 hover:underline">
    {post.authorName}
  </Link>
  <span className="mx-2">•</span>
  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
</div>
```

## Part 3: Security Best Practices (30 min)

### 1. Never Trust Client Input

**Bad:**
```typescript
// Client sends userId - DON'T DO THIS
const { userId, content } = body;
// Use userId directly - SECURITY RISK!
```

**Good:**
```typescript
// Always verify on server
const session = await account.getSession('current');
const userId = session.userId; // From server, not client
```

### 2. Validate All Data

```typescript
// Check types, lengths, formats
if (!title || typeof title !== 'string' || title.length > 200) {
  return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
}

// Sanitize content (basic example)
const sanitizedContent = content
  .replace(/<script[^<]*(?:(?!</script>)<[^<]*)*<\/script>/gi, '')
  .trim();
```

### 3. Use Principle of Least Privilege

- Give minimum permissions needed
- Start restrictive, open up as needed
- Regular permission audits

### 4. Secure Your API Keys

**Environment Variables:**
```
# .env.local
NEXT_PUBLIC_APPWRITE_PROJECT_ID=xxx
# NEVER expose API keys to client!
APPWRITE_API_KEY=xxx # Server only
```

### 5. Ownership Verification

Always verify the user owns the resource:

```typescript
// Before updating a post
const post = await databases.getDocument(DATABASE_ID, POSTS_COLLECTION, postId);

if (post.authorId !== currentUserId) {
  return NextResponse.json(
    { error: 'Not authorized' },
    { status: 403 }
  );
}

// Now safe to update
```

## Security Checklist Exercise

Let's audit our blog app:

- [ ] Only authors can edit/delete their posts
- [ ] Private posts are only visible to author
- [ ] Users can only update their own profile
- [ ] File uploads are validated (type, size)
- [ ] Comments can only be deleted by author

## Key Takeaways

1. **Permissions**: Set at both collection and document level
2. **Roles**: Use `any`, `users`, or specific `user:[ID]`
3. **Validation**: Always check data on server
4. **Ownership**: Verify before allowing edits
5. **Least privilege**: Minimum permissions necessary

## Homework

1. Implement server-side ownership check for post updates
2. Add admin role that can edit any post
3. Create a "draft" status with different permissions
4. Add rate limiting (conceptual - research how to implement)

---

**Next Session**: Queries, search, and filtering!
