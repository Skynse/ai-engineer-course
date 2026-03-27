# Session 16: Final Project Building & Review

**Duration**: 1.5 hours  
**Goal**: Build core features and get help with blockers

## Session Structure

This is a **work session** with instructor support. You'll work on your final project while getting help as needed.

## Part 1: Quick Check-in (10 min)

### Status Updates

Each student shares (30 seconds each):
- What project did you choose?
- What's your progress so far?
- What's your biggest blocker?
- What will you work on today?

### Common Blockers

Based on past sessions, watch out for:
1. **Permission errors** - Check collection settings
2. **API route issues** - Test endpoints in browser/Postman
3. **Image upload** - Verify bucket permissions
4. **Authentication** - Session handling
5. **Database queries** - Check indexes and syntax

## Part 2: Work Session (60 min)

### Recommended Workflow

**Step 1: Database Setup**
- Verify all collections created
- Check permissions are correct
- Add sample data for testing

**Step 2: API Routes**
- Build one CRUD route at a time
- Test each route before moving on
- Use console.log to debug

**Step 3: Frontend Components**
- Start with data fetching
- Build presentational components
- Connect to API

**Step 4: Integration**
- Wire everything together
- Test user flows
- Fix bugs

### Getting Unstuck

**If you get stuck:**

1. **Read the error message carefully**
   - What file? What line?
   - What's the specific error?

2. **Check the obvious**
   - Is the server running? `npm run dev`
   - Is the database accessible?
   - Are environment variables set?

3. **Simplify**
   - Comment out complex code
   - Test with hardcoded data
   - Build minimal reproduction

4. **Use AI assistance**
   ```
   "I'm getting this error: [paste error]
   Here's my code: [paste relevant code]
   What's wrong?"
   ```

5. **Ask for help**
   - Raise your hand
   - Share screen with instructor
   - Ask a classmate

### Code Review Checklist

Before asking for help, check:
- [ ] File paths are correct
- [ ] Import statements are correct
- [ ] Variable names match
- [ ] No typos in function names
- [ ] Correct HTTP methods (GET, POST, etc.)
- [ ] Proper async/await usage
- [ ] Error handling in place

## Part 3: Mini-Demos (20 min)

### Show and Tell

3-4 students volunteer to show their progress:
- 3-minute demo
- 2-minute feedback from instructor and peers

### Common Issues Discussion

We'll address common problems found during work session:
- Database connection issues
- Authentication flow problems
- Image upload troubleshooting
- State management questions

## Quick Reference Guide

### Appwrite Client Setup

```typescript
// lib/appwrite.ts
import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

export const DATABASE_ID = 'your-database-id';
export const COLLECTION_NAME = 'your-collection';
export const BUCKET_ID = 'your-bucket';
```

### Basic API Route Pattern

```typescript
// app/api/resource/route.ts
import { NextResponse } from 'next/server';
import { databases, DATABASE_ID } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

const COLLECTION = 'collection-name';

export async function GET() {
  try {
    const data = await databases.listDocuments(DATABASE_ID, COLLECTION);
    return NextResponse.json({ data: data.documents });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const doc = await databases.createDocument(
      DATABASE_ID,
      COLLECTION,
      ID.unique(),
      body
    );
    return NextResponse.json({ data: doc }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Image Upload Pattern

```typescript
// Client side
async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  return data.url;
}

// API route
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  const uploaded = await storage.createFile(
    BUCKET_ID,
    ID.unique(),
    file
  );
  
  const url = storage.getFileView(BUCKET_ID, uploaded.$id);
  return NextResponse.json({ url });
}
```

### Auth Helper Pattern

```typescript
// lib/auth.ts
export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}

// In component
const { user, loading } = useAuth();
if (loading) return <Loading />;
if (!user) return <LoginPrompt />;
```

## Deployment Checklist

Before you finish:

- [ ] **Environment Variables**
  - Set in Vercel dashboard
  - Never commit `.env.local`

- [ ] **Appwrite Configuration**
  - Production project setup
  - Collections and permissions correct
  - Bucket permissions correct

- [ ] **Code Quality**
  - No console.log statements (or remove them)
  - Error handling in place
  - Loading states work

- [ ] **Testing**
  - All features work end-to-end
  - Test on mobile
  - Test with different users

- [ ] **Documentation**
  - README with setup instructions
  - List of features
  - Screenshots if helpful

## Final Project Tips

1. **Start Simple**: Build MVP first, add features later
2. **Test Early**: Don't wait until the end to test
3. **Commit Often**: Save your work frequently
4. **Ask Early**: Don't wait 3 days with a blocker
5. **Focus on Working**: Better to have fewer working features than many broken ones

## Post-Session Support

After this session:
- Instructor available via chat/email
- Office hours schedule posted
- Peer help encouraged
- AI assistants available

## You're Almost Done!

After 2-3 weeks of building:
- Deploy your app
- Record your presentation
- Submit everything
- Celebrate! 🎉

## Resources

- **Appwrite Status**: status.appwrite.io
- **Vercel Docs**: vercel.com/docs
- **Debugging Guide**: Link to common errors
- **Example Projects**: Link to demo apps

---

**Congratulations on completing the course!**

You now have the skills to build full-stack applications with:
- ✅ Next.js frontend
- ✅ Appwrite backend
- ✅ Authentication
- ✅ Database operations
- ✅ File uploads
- ✅ API design
- ✅ Responsive UI

**Keep building, keep learning!**
