# Session 8: File Uploads

**Duration**: 1.5 hours  
**Goal**: Upload and display images using Appwrite Storage

## Learning Objectives

By the end of this session, students will:
- Use Appwrite Storage for file uploads
- Display uploaded images
- Handle file input in forms
- Understand basic image handling

## Part 1: Storage Overview (15 min)

### What is Appwrite Storage?

- Store files (images, documents, etc.)
- Automatic image optimization
- Built-in CDN for fast delivery
- Permission-based access control

### Creating a Storage Bucket

1. Go to **Storage** in Appwrite Console
2. Click **Create Bucket**
3. Name: `images`
4. Set permissions:
   - Anyone can read files
   - Only authenticated users can create

## Part 2: Upload Implementation (45 min)

### Update Appwrite Client

Update `src/lib/appwrite.ts`:

```typescript
import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID');

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

export const DATABASE_ID = 'main';
export const BUCKET_ID = 'images'; // Your bucket ID
```

### Create Upload API Route

Create `src/app/api/upload/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { storage, BUCKET_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only images are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large (max 5MB)' },
        { status: 400 }
      );
    }

    // Upload to Appwrite
    const uploadedFile = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      file
    );

    // Get file URL
    const fileUrl = storage.getFileView(BUCKET_ID, uploadedFile.$id);

    return NextResponse.json({
      fileId: uploadedFile.$id,
      url: fileUrl
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
```

### Create Upload Component

Create `src/app/components/ImageUpload.tsx`:

```typescript
'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string;
}

export default function ImageUpload({ onUpload, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      onUpload(data.url);
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Failed to upload image');
      setPreview(currentImage); // Reset preview on error
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        {preview ? (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 rounded"
            />
            <button
              type="button"
              onClick={() => {
                setPreview(undefined);
                onUpload('');
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              ×
            </button>
          </div>
        ) : (
          <div>
            <label className="cursor-pointer">
              <div className="text-gray-500 mb-2">Click to upload image</div>
              <div className="text-sm text-gray-400">PNG, JPG up to 5MB</div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        )}
      </div>

      {uploading && (
        <div className="text-center text-gray-500">Uploading...</div>
      )}
    </div>
  );
}
```

## Part 3: Using Images in Blog Posts (30 min)

### Update Posts Collection

Add `featuredImage` attribute to `posts` collection (string, optional).

### Update New Post Page

Update `src/app/blog/new/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';
import Navbar from '../../components/Navbar';
import ImageUpload from '../../components/ImageUpload';

export default function NewPost() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
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
          authorName: user.name,
          featuredImage
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
            <label className="block text-sm font-medium mb-1">Featured Image</label>
            <ImageUpload onUpload={setFeaturedImage} />
          </div>

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

### Update Posts API to Handle Images

Update `src/app/api/posts/route.ts` POST handler:

```typescript
const { title, content, authorId, authorName, featuredImage } = body;

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
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
);
```

### Display Images in Blog

Update `src/app/blog/page.tsx`:

```typescript
// Inside the article mapping
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

    <div className="text-sm text-gray-500">
      <Link href={`/user/${post.authorId}`} className="text-blue-500 hover:underline">
        {post.authorName}
      </Link>
      <span className="mx-2">•</span>
      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
    </div>
  </div>
</article>
```

## Key Concepts

1. **FormData**: Use FormData for file uploads
2. **Preview**: Show image preview before upload
3. **Validation**: Check file type and size
4. **Storage URL**: Use `storage.getFileView()` to get public URL

## Homework

1. Add image upload to user profiles (avatar)
2. Add multiple image upload support
3. Create an image gallery component
4. Add drag-and-drop upload

---

**Next Session**: Understanding permissions and security!
