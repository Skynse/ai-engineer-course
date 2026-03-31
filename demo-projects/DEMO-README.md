# AI Engineer Course - Demo Projects

This folder contains three demo project implementations for the AI Engineer (Full Stack) course.

## What's Included

### ✅ Task Manager (`task-manager/`)
**Status**: COMPLETE - Ready to use

A fully working task management application with:
- ✅ Complete CRUD operations
- ✅ User authentication
- ✅ Priority levels (Low, Medium, High)
- ✅ Filter by status (All, Active, Completed)
- ✅ Sort by date or priority
- ✅ Responsive design
- ✅ All components built and tested

**Files**: 36 source files + README

### 🔄 Recipe Collection (`recipe-collection/`)
**Status**: Structure created, needs completion

Next.js project scaffolded with:
- ✅ Appwrite SDK installed
- ✅ Directory structure
- ⚠️ Needs: Components, API routes, pages
- ⚠️ Needs: Image upload implementation
- ⚠️ Needs: Recipe form and display

### 🔄 Social Feed (`social-feed/`)
**Status**: Structure created, needs completion

Next.js project scaffolded with:
- ✅ Appwrite SDK installed
- ✅ Directory structure
- ⚠️ Needs: Components, API routes, pages
- ⚠️ Needs: Like functionality
- ⚠️ Needs: Real-time updates

## Quick Start

### Using Task Manager (Ready Now)

1. **Extract the zip**:
   ```bash
   unzip task-manager.zip
   cd task-manager
   ```

2. **Set up Appwrite**:
   - Create account at https://cloud.appwrite.io
   - Create project and database
   - Create `tasks` collection (see README.md inside)
   - Enable Email/Password auth

3. **Configure environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Appwrite credentials
   ```

4. **Run the app**:
   ```bash
   npm install
   npm run dev
   ```

5. **Open** http://localhost:3000

### Building Recipe Collection & Social Feed

These projects follow the same pattern as Task Manager. You can build them by:

1. Extracting the zip files
2. Following the course session notes (sessions 12-13)
3. Using Task Manager as a reference implementation

## Project Comparison

| Feature | Task Manager | Recipe Collection | Social Feed |
|---------|--------------|-------------------|-------------|
| **Difficulty** | Beginner | Intermediate | Advanced |
| **CRUD** | ✅ Complete | ⚠️ To build | ⚠️ To build |
| **Auth** | ✅ Complete | ⚠️ To build | ⚠️ To build |
| **Images** | ❌ No | ⚠️ To build | ⚠️ To build |
| **Filters** | ✅ Complete | ⚠️ To build | ⚠️ To build |
| **Real-time** | ❌ No | ❌ No | ⚠️ To build |
| **Ready to use** | ✅ Yes | ❌ No | ❌ No |

## Learning Path

1. **Start here**: Use Task Manager as a complete reference
2. **Practice**: Build Recipe Collection following Lesson 12
3. **Challenge**: Build Social Feed following Lesson 13

## Task Manager Features

### What You Learn

From the complete Task Manager implementation:

1. **Appwrite Setup**
   - Database collections
   - Attributes and indexes
   - Permissions
   - Authentication

2. **Next.js Patterns**
   - API routes
   - Server vs Client components
   - Form handling
   - State management

3. **UI Components**
   - Reusable components
   - Forms with validation
   - Lists and filtering
   - Responsive design

4. **Authentication Flow**
   - Sign up / Sign in
   - Protected routes
   - User context
   - Logout

5. **Full CRUD**
   - Create tasks
   - Read task list
   - Update tasks
   - Delete tasks
   - Toggle completion

### File Structure

```
task-manager/
├── src/
│   ├── app/
│   │   ├── api/tasks/          # API endpoints
│   │   │   ├── route.ts        # GET, POST
│   │   │   └── [id]/
│   │   │       └── route.ts    # PATCH, DELETE
│   │   ├── components/
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskFilters.tsx
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   ├── appwrite.ts
│   │   └── auth.ts
│   └── types/
│       └── task.ts
├── .env.example
└── README.md
```

## Next Steps

### For Course Instructors

1. **Review Task Manager** - It's complete and ready
2. **Complete other demos** - Or build them as exercises
3. **Add to course materials** - Include zips in distribution

### For Learners

1. **Study Task Manager** - Read the code, understand the patterns
2. **Run it locally** - Get it working with your Appwrite setup
3. **Modify it** - Add features, change styling
4. **Build Recipe Collection** - Use Task Manager as reference
5. **Build Social Feed** - Challenge yourself

## Support

- Task Manager: Ready to use, fully documented
- Recipe Collection & Social Feed: Build following course sessions 12-13
- Use Task Manager as reference implementation

## License

MIT - Use these projects for learning and teaching!
