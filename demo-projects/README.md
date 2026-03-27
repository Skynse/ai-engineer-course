# AI Engineer Course - Demo Projects

This folder contains three complete, working demo applications built with Next.js and Appwrite.

## Projects Overview

### 1. Task Manager (`task-manager/`)
**Difficulty**: Beginner  
**Features**:
- Create tasks with priorities (Low, Medium, High)
- Mark tasks complete/incomplete
- Edit and delete tasks
- Filter by status (All, Active, Completed)
- Sort by priority or date
- User authentication
- Protected routes

**Key Concepts**:
- Full CRUD operations
- Client-side filtering/sorting
- Form handling
- Authentication flow

### 2. Recipe Collection (`recipe-collection/`)
**Difficulty**: Intermediate  
**Features**:
- Create recipes with photos
- Add ingredients and instructions (dynamic lists)
- Cooking time and servings
- Recipe categories
- Search and filter
- User profiles

**Key Concepts**:
- File uploads
- Dynamic form fields
- Array data handling
- Image optimization
- Complex data structures

### 3. Social Feed (`social-feed/`)
**Difficulty**: Advanced  
**Features**:
- Create posts with text/images
- Like posts (with optimistic UI)
- User timelines
- Real-time updates (polling)
- Comment system
- Follow/unfollow users

**Key Concepts**:
- Optimistic updates
- Real-time data
- Complex relationships
- Activity feeds
- Social features

## Quick Start

### Task Manager

1. Extract `task-manager.zip`
2. Follow the README.md inside
3. Set up Appwrite (instructions included)
4. Run `npm install && npm run dev`

### Recipe Collection & Social Feed

These projects follow the same pattern as Task Manager:
1. Set up the database collections
2. Configure environment variables
3. Install dependencies
4. Run the development server

## Common Setup Steps

### 1. Appwrite Setup

For each project:
1. Create an Appwrite Cloud account
2. Create a new project
3. Create a database
4. Create collections (see project READMEs)
5. Set permissions
6. Enable Email/Password auth

### 2. Environment Variables

Create `.env.local` in each project:

```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_DATABASE_ID=your_database_id
NEXT_PUBLIC_COLLECTION_ID=your_collection_id
```

### 3. Install & Run

```bash
cd [project-name]
npm install
npm run dev
```

## Project Structure

Each project follows this structure:

```
project-name/
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── components/   # React components
│   │   ├── auth/         # Auth pages
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Main page
│   ├── lib/
│   │   ├── appwrite.ts   # Appwrite config
│   │   └── auth.ts       # Auth helpers
│   └── types/
│       └── [types].ts    # TypeScript types
├── .env.example          # Environment template
├── README.md             # Project docs
└── package.json
```

## Learning Path

1. **Start with Task Manager** - Learn the basics
2. **Move to Recipe Collection** - Add file uploads
3. **Finish with Social Feed** - Advanced features

## Customization Ideas

### Task Manager
- Add due dates
- Add tags/categories
- Add task reminders
- Add task statistics dashboard

### Recipe Collection
- Add nutrition info
- Add ratings/reviews
- Add meal planning
- Add shopping list generator

### Social Feed
- Add stories
- Add direct messaging
- Add notifications
- Add hashtag support

## Troubleshooting

### Common Issues

**"Project not found"**
- Check your Project ID in `.env.local`
- Ensure Appwrite endpoint is correct

**"Permission denied"**
- Check collection permissions in Appwrite console
- Ensure user is authenticated

**"Module not found"**
- Run `npm install`
- Check import paths

**Images not loading**
- Check bucket permissions
- Verify image URL is correct

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Appwrite Docs](https://appwrite.io/docs)
- [Course Materials](../book/index.html)

## Support

For help:
1. Check the project README.md
2. Review course session notes
3. Ask in course forum
4. Check Appwrite documentation

## License

MIT - Feel free to use these projects as starting points for your own apps!
