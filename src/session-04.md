# Session 4: Simple Authentication

**Duration**: 1.5 hours  
**Goal**: Add user login and registration to our app

## Learning Objectives

By the end of this session, students will:
- Understand Appwrite's authentication system
- Create login and signup pages
- Protect routes based on authentication status
- Store user data in our database

## Part 1: Authentication Overview (15 min)

### How Appwrite Auth Works

1. User enters credentials
2. Appwrite validates and creates a session
3. Session is stored in a cookie
4. Every request includes the cookie automatically
5. Appwrite knows who the user is

### What We'll Build

- Sign up page
- Login page
- Logout button
- Protected pages
- User data sync with our database

## Part 2: Setup Authentication (30 min)

### Step 1: Enable Email/Password Auth

In Appwrite Console:
1. Go to **Auth** → **Settings**
2. Enable **Email/Password** provider
3. Configure email settings (optional for now)

### Step 2: Update Appwrite Client

Update `src/lib/appwrite.ts`:

```typescript
import { Client, Databases, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID');

export const databases = new Databases(client);
export const account = new Account(client);

export const DATABASE_ID = 'main';
export const MESSAGES_COLLECTION = 'messages';
export const USERS_COLLECTION = 'users';
```

### Step 3: Create Auth Helper Functions

Create `src/lib/auth.ts`:

```typescript
import { account, databases, DATABASE_ID, USERS_COLLECTION } from './appwrite';
import { ID } from 'appwrite';

export async function signUp(email: string, password: string, name: string) {
  // Create the account
  const user = await account.create(ID.unique(), email, password, name);
  
  // Create a session
  await account.createEmailPasswordSession(email, password);
  
  // Create user document in our database
  await databases.createDocument(
    DATABASE_ID,
    USERS_COLLECTION,
    user.$id,
    {
      email,
      name,
      createdAt: new Date().toISOString()
    }
  );
  
  return user;
}

export async function signIn(email: string, password: string) {
  return await account.createEmailPasswordSession(email, password);
}

export async function signOut() {
  return await account.deleteSession('current');
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}
```

### Step 4: Create Users Collection

In Appwrite Console:
1. Create new collection: `users`
2. Add attributes:
   - `email` (string, required)
   - `name` (string, required)
   - `createdAt` (datetime, required)
3. Set permissions:
   - Users can read their own document
   - Users can update their own document

## Part 3: Auth Pages (45 min)

### Create Sign Up Page

Create `src/app/auth/signup/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { signUp } from '@/lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp(email, password, name);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
```

### Create Sign In Page

Create `src/app/auth/signin/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
```

## Part 4: Add Auth to Guestbook (15 min)

### Create Auth Context

Create `src/app/components/AuthProvider.tsx`:

```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signOut } from '@/lib/auth';

interface User {
  $id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  async function logout() {
    await signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### Update Layout

Update `src/app/layout.tsx`:

```typescript
import { AuthProvider } from './components/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### Add Navigation

Create `src/app/components/Navbar.tsx`:

```typescript
'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Guestbook</Link>
        
        <div>
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.name}!</span>
              <button
                onClick={logout}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link href="/auth/signin" className="text-blue-500 hover:underline">
                Sign In
              </Link>
              <Link href="/auth/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
```

### Update Main Page

Update `src/app/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import MessageList from './components/MessageList';
import AddMessageForm from './components/AddMessageForm';
import { useAuth } from './components/AuthProvider';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();

  function handleMessageAdded() {
    setRefreshKey(prev => prev + 1);
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Guestbook</h1>
        
        {user ? (
          <AddMessageForm onMessageAdded={handleMessageAdded} />
        ) : (
          <p className="text-center text-gray-600 mb-8">
            Please sign in to leave a message
          </p>
        )}
        
        <MessageList refresh={refreshKey} />
      </main>
    </div>
  );
}
```

## Key Takeaways

1. **Appwrite handles sessions**: Cookies are managed automatically
2. **Always sync with your database**: Store user info in your own collections
3. **Protect routes**: Check auth status before showing protected content
4. **Context API**: Great for sharing auth state across components

## Homework

1. Auto-fill the author field with the logged-in user's name
2. Add a "Forgot Password" link (prepare for next session)
3. Show user's email in the navbar
4. Add a loading spinner while checking auth status

---

**Next Session**: User profiles and data management!
