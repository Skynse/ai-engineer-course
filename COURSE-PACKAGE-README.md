# AI Engineer (Full Stack) Course - Complete Package

## What's Included

This package contains everything needed to run the AI Engineer (Full Stack) course with a Codex-first workflow.

### 📚 Course Materials (Astro course site)

**Location**: `src/` for lesson content and `course-site/` for the Astro preview site  
**Format**: HTML website with search

Contains:
- Course overview and prerequisites
- 16 detailed lesson plans
- A dedicated Codex website workflow guide
- A dedicated Appwrite MCP setup guide
- Complete code examples where they are intentionally still provided
- Step-by-step instructions
- Homework assignments
- Troubleshooting guides

**Lessons**:
1. Full-Stack Foundations & Course Setup
2. Next.js Introduction & First TODO App
3. CRUD, API Routes, and the First Appwrite Build Loop
4. Simple Authentication
5. User Profiles
6. Building a Blog - Relationships 101
7. Comments System
8. File Uploads
9. Permissions & Security Basics
10. Queries, Search & Filtering
11. Demo App 1: Task Manager
12. Demo App 2: Recipe Collection
13. Demo App 3: Social Feed
14. Styling & Polish
15. Final Project Planning
16. Final Project Building & Review

### 💻 Demo Projects

**Location**: `demo-projects/` folder

Three working demo applications:

#### ✅ Task Manager (`task-manager.zip`) - **COMPLETE**
- **Size**: 85KB
- **Status**: Ready to use immediately
- **Difficulty**: Beginner
- **Features**:
  - Full CRUD operations
  - User authentication
  - Priority levels
  - Filter & sort
  - Responsive design
- **What's included**:
  - Complete source code (36 files)
  - API routes
  - All components
  - Authentication
  - README with setup instructions
  - Environment template

#### 🔄 Recipe Collection (`recipe-collection.zip`) - **STRUCTURE**
- **Size**: 72KB
- **Status**: Project scaffolded, needs completion
- **Difficulty**: Intermediate
- **What's included**:
  - Next.js project structure
  - Appwrite SDK installed
  - Directory setup
  - Ready to build following Lesson 12

#### 🔄 Social Feed (`social-feed.zip`) - **STRUCTURE**
- **Size**: 72KB
- **Status**: Project scaffolded, needs completion
- **Difficulty**: Advanced
- **What's included**:
  - Next.js project structure
  - Appwrite SDK installed
  - Directory setup
  - Ready to build following Lesson 13

## Quick Start Guide

### For Instructors

1. **Review the course**:
   ```bash
   # Run the Astro preview
   cd course-site
   bun install
   bun run dev
   ```

2. **Test Task Manager**:
   ```bash
   cd demo-projects
   unzip task-manager.zip
   cd task-manager
   # Follow README.md inside
   ```

3. **Prepare for class**:
   - Review lesson plans
   - Review the Codex workflow guide
   - Review the Appwrite MCP guide
   - Set up demo projects
   - Test with Appwrite

### For Learners

1. **Read the course**:
   - Start with README.md
   - Install Codex first
   - Read the Codex workflow guide
   - Read the Appwrite MCP guide
   - Go through Lessons 1-16

2. **Build the projects**:
   - Start with Task Manager (complete reference)
   - Build Recipe Collection (Lesson 12)
   - Build Social Feed (Lesson 13)

3. **Create final project**:
   - Follow Lesson 15 planning
   - Build in Lesson 16 and after

## Course Structure

```
ai-engineer-course/
├── src/                      # Source markdown files
│   ├── README.md
│   ├── session-01.md
│   ├── ...
│   └── session-16.md
├── course-site/              # Astro site for preview/build
└── demo-projects/            # Working code
    ├── task-manager.zip      # ✅ Complete
    ├── recipe-collection.zip # 🔄 Structure
    ├── social-feed.zip       # 🔄 Structure
    └── README.md             # Demo docs
```

## Teaching Recommendations

### Using Task Manager

**Option 1**: Use as complete reference
- Study the code
- Learn patterns and best practices
- Use as starting point for modifications

**Option 2**: Build together in class
- Code along together
- Explain each part
- Answer questions live

**Option 3**: Build independently
- Provide Task Manager as reference
- Build from scratch
- Compare their solution to reference

### Building Other Demos

Recipe Collection and Social Feed are designed to be built by following the course sessions. This provides:
- Hands-on practice
- Real coding experience
- Problem-solving opportunities
- Portfolio projects

### Lesson Flow

**Week 1-2**: Foundation (Lessons 1-5)
- Set up environment
- Learn basics
- Start the imageboard app

**Week 3-4**: Features (Lessons 6-10)
- Continue the imageboard app
- File uploads
- Security
- Search

**Week 5**: Demo Apps (Lessons 11-13)
- Task Manager (reference)
- Recipe Collection (build)
- Social Feed (build)

**Week 6**: Polish & Projects (Lessons 14-16)
- Styling
- Planning
- Building

**Week 7-8**: Final Projects
- Work independently
- Instructor support
- Presentations

## Technical Requirements

### For Learners

- **Node.js**: 18+ installed
- **Code Editor**: VS Code recommended
- **Browser**: Chrome, Firefox, or Edge
- **Appwrite Account**: Free tier at cloud.appwrite.io
- **Git**: For version control (optional)

### For Instructors

- All learner requirements, plus:
- **Bun**: For running the Astro preview site
- **Zip tool**: For distributing projects

## Customization

### Modifying Course Content

1. Edit markdown files in `src/`
2. Run the Astro preview or build from `course-site/`
3. Publish the updated site output

### Adding Lessons

1. Create `session-XX.md` in `src/`
2. Add to `src/SUMMARY.md`
3. Rebuild the Astro site

### Updating Demo Projects

1. Extract zip
2. Make changes
3. Re-zip
4. Update `demo-projects/`

## Support & Resources

### Documentation
- **Next.js**: https://nextjs.org/docs
- **Appwrite**: https://appwrite.io/docs
- **Tailwind**: https://tailwindcss.com/docs
- **React**: https://react.dev

### Communities
- Appwrite Discord
- Next.js Discord
- Reactiflux

### Getting Help

1. Check lesson notes
2. Review demo project code
3. Search documentation
4. Ask in course forum
5. Use Codex as the primary build/debug assistant

## License

MIT License - Free to use for teaching and learning!

## Credits

- **Course Author**: Coding Minds
- **Technologies**: Next.js, Appwrite, Tailwind CSS, TypeScript
- **Inspired by**: Real-world use cases from swapcard project

---

**Ready to teach the next generation of Codex-first full-stack developers! 🚀**
