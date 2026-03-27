# Session 10: Queries, Search & Filtering

**Duration**: 1.5 hours  
**Goal**: Master data retrieval with queries and search

## Learning Objectives

By the end of this session, students will:
- Use Appwrite queries effectively
- Implement search functionality
- Filter and sort data
- Understand pagination basics

## Part 1: Query Basics (15 min)

### What are Queries?

Queries let you:
- Filter data (e.g., posts by author)
- Sort data (e.g., newest first)
- Limit results (e.g., 10 posts at a time)
- Search text

### Basic Query Syntax

```typescript
import { Query } from 'appwrite';

// Filter by equality
databases.listDocuments(DATABASE_ID, COLLECTION, [
  Query.equal('authorId', 'user123')
]);

// Sort descending (newest first)
databases.listDocuments(DATABASE_ID, COLLECTION, [
  Query.orderDesc('$createdAt')
]);

// Limit results
databases.listDocuments(DATABASE_ID, COLLECTION, [
  Query.limit(10)
]);

// Combine multiple
databases.listDocuments(DATABASE_ID, COLLECTION, [
  Query.equal('published', true),
  Query.orderDesc('$createdAt'),
  Query.limit(10)
]);
```

## Part 2: Implementing Search (35 min)

### Search by Title/Content

Update `src/app/api/posts/route.ts`:

```typescript
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const author = searchParams.get('author');
    const sort = searchParams.get('sort') || 'newest';

    const queries = [];

    // Always filter published posts
    queries.push(Query.equal('published', true));

    // Search by title or content
    if (search) {
      // Note: Appwrite uses contains for text search
      queries.push(Query.search('title', search));
    }

    // Filter by author
    if (author) {
      queries.push(Query.equal('authorId', author));
    }

    // Sorting
    if (sort === 'newest') {
      queries.push(Query.orderDesc('$createdAt'));
    } else if (sort === 'oldest') {
      queries.push(Query.orderAsc('$createdAt'));
    } else if (sort === 'title') {
      queries.push(Query.orderAsc('title'));
    }

    const posts = await databases.listDocuments(
      DATABASE_ID,
      POSTS_COLLECTION,
      queries
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
```

### Create Search Component

Create `src/app/components/SearchFilters.tsx`:

```typescript
'use client';

import { useState } from 'react';

interface SearchFiltersProps {
  onSearch: (filters: { search: string; author: string; sort: string }) => void;
  initialFilters?: {
    search?: string;
    author?: string;
    sort?: string;
  };
}

export default function SearchFilters({ onSearch, initialFilters }: SearchFiltersProps) {
  const [search, setSearch] = useState(initialFilters?.search || '');
  const [author, setAuthor] = useState(initialFilters?.author || '');
  const [sort, setSort] = useState(initialFilters?.sort || 'newest');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch({ search, author, sort });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Filter by author..."
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
```

### Update Blog Page

Update `src/app/blog/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import SearchFilters from '../components/SearchFilters';

interface Post {
  $id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  featuredImage?: string;
  isPrivate?: boolean;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    author: '',
    sort: 'newest'
  });

  useEffect(() => {
    loadPosts();
  }, [filters]);

  async function loadPosts() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.author) params.append('author', filters.author);
      if (filters.sort) params.append('sort', filters.sort);

      const response = await fetch(`/api/posts?${params.toString()}`);
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog</h1>
          <Link
            href="/blog/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Write Post
          </Link>
        </div>

        <SearchFilters onSearch={setFilters} initialFilters={filters} />

        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No posts found. Try adjusting your filters.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.$id} className="bg-white rounded-lg shadow overflow-hidden">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <Link href={`/blog/${post.$id}`}>
                    <h2 className="text-2xl font-bold mb-2 hover:text-blue-500">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content.substring(0, 200)}
                    {post.content.length > 200 && '...'}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {post.isPrivate && (
                      <span className="bg-gray-200 px-2 py-1 rounded">Private</span>
                    )}
                    <Link href={`/user/${post.authorId}`} className="text-blue-500 hover:underline">
                      {post.authorName}
                    </Link>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
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

## Part 3: Pagination Concepts (20 min)

### Why Pagination?

- Performance: Don't load 1000 posts at once
- User experience: Manageable chunks
- Bandwidth: Reduce data transfer

### How Pagination Works

```typescript
// Page 1: Get first 10
databases.listDocuments(DATABASE_ID, COLLECTION, [
  Query.limit(10),
  Query.offset(0)
]);

// Page 2: Get next 10
databases.listDocuments(DATABASE_ID, COLLECTION, [
  Query.limit(10),
  Query.offset(10)
]);

// Better: Use cursor-based pagination for real apps
// (More efficient for large datasets)
```

### Implementing Simple Pagination

Add to blog API:

```typescript
const page = parseInt(searchParams.get('page') || '1');
const limit = 10;
const offset = (page - 1) * limit;

queries.push(Query.limit(limit));
queries.push(Query.offset(offset));

// Return total count for pagination UI
const total = posts.total;
```

## Key Query Types

| Query | Purpose | Example |
|-------|---------|---------|
| `equal` | Exact match | `Query.equal('status', 'active')` |
| `notEqual` | Exclude value | `Query.notEqual('type', 'draft')` |
| `search` | Text search | `Query.search('title', 'hello')` |
| `greaterThan` | > comparison | `Query.greaterThan('price', 100)` |
| `lessThan` | < comparison | `Query.lessThan('age', 18)` |
| `between` | Range | `Query.between('date', start, end)` |
| `orderAsc` | Sort A-Z | `Query.orderAsc('name')` |
| `orderDesc` | Sort Z-A | `Query.orderDesc('createdAt')` |
| `limit` | Max results | `Query.limit(10)` |
| `offset` | Skip N results | `Query.offset(20)` |

## Key Takeaways

1. **Filters**: Use queries to narrow down results
2. **Sorting**: Order results any way you need
3. **Search**: Use `Query.search()` for text
4. **Pagination**: Essential for large datasets
5. **Combine**: Multiple queries work together

## Homework

1. Add pagination to blog list (Next/Previous buttons)
2. Add date range filter (posts from last week/month)
3. Add tag/category filter
4. Implement "Load More" button instead of pagination

---

**Next Session**: Demo App 1 - Task Manager!
