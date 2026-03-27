# AI Engineer (Full Stack) Course - Complete Package

## What's Included

This package contains everything you need to run the AI Engineer (Full Stack) course.

### 📚 Course Materials (mdbook)

**Location**: `book/` folder or view online  
**Format**: HTML website with search

Contains:
- Course overview and prerequisites
- 16 detailed session plans
- Complete code examples
- Step-by-step instructions
- Homework assignments
- Troubleshooting guides

**Sessions**:
1. Introduction & Setup
2. Basic CRUD Operations
3. Next.js Integration & API Routes
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
  - Ready for students to build following Session 12

#### 🔄 Social Feed (`social-feed.zip`) - **STRUCTURE**
- **Size**: 72KB
- **Status**: Project scaffolded, needs completion
- **Difficulty**: Advanced
- **What's included**:
  - Next.js project structure
  - Appwrite SDK installed
  - Directory setup
  - Ready for students to build following Session 13

## Quick Start Guide

### For Instructors

1. **Review the course**:
   ```bash
   # Open the book
   cd book
   start index.html  # Windows
   open index.html   # Mac
   ```

2. **Test Task Manager**:
   ```bash
   cd demo-projects
   unzip task-manager.zip
   cd task-manager
   # Follow README.md inside
   ```

3. **Prepare for class**:
   - Review session plans
   - Set up demo projects
   - Test with Appwrite

### For Students

1. **Read the course**:
   - Start with README.md
   - Go through sessions 1-16

2. **Build the projects**:
   - Start with Task Manager (complete reference)
   - Build Recipe Collection (Session 12)
   - Build Social Feed (Session 13)

3. **Create final project**:
   - Follow Session 15 planning
   - Build in Session 16 and after

## Course Structure

```
ai-engineer-course/
├── book/                      # Generated HTML website
│   ├── index.html            # Start here
│   ├── session-01.html       # All 16 sessions
│   ├── ...
│   └── session-16.html
├── book.toml                 # mdbook configuration
├── custom.css                # Styling
├── src/                      # Source markdown files
│   ├── README.md
│   ├── session-01.md
│   ├── ...
│   └── session-16.md
└── demo-projects/            # Working code
    ├── task-manager.zip      # ✅ Complete
    ├── recipe-collection.zip # 🔄 Structure
    ├── social-feed.zip       # 🔄 Structure
    └── README.md             # Demo docs
```

## Teaching Recommendations

### Using Task Manager

**Option 1**: Use as complete reference
- Students study the code
- Learn patterns and best practices
- Use as starting point for modifications

**Option 2**: Build together in class
- Code along with students
- Explain each part
- Answer questions live

**Option 3**: Students build independently
- Provide Task Manager as reference
- Students build from scratch
- Compare their solution to reference

### Building Other Demos

Recipe Collection and Social Feed are designed to be built by students following the course sessions. This provides:
- Hands-on practice
- Real coding experience
- Problem-solving opportunities
- Portfolio projects

### Session Flow

**Week 1-2**: Foundation (Sessions 1-5)
- Set up environment
- Learn basics
- Build Guestbook

**Week 3-4**: Features (Sessions 6-10)
- Blog with comments
- File uploads
- Security
- Search

**Week 5**: Demo Apps (Sessions 11-13)
- Task Manager (reference)
- Recipe Collection (build)
- Social Feed (build)

**Week 6**: Polish & Projects (Sessions 14-16)
- Styling
- Planning
- Building

**Week 7-8**: Final Projects
- Students work independently
- Instructor support
- Presentations

## Technical Requirements

### For Students

- **Node.js**: 18+ installed
- **Code Editor**: VS Code recommended
- **Browser**: Chrome, Firefox, or Edge
- **Appwrite Account**: Free tier at cloud.appwrite.io
- **Git**: For version control (optional)

### For Instructors

- All student requirements, plus:
- **mdbook**: For editing course materials
- **Zip tool**: For distributing projects

## Customization

### Modifying Course Content

1. Edit markdown files in `src/`
2. Run `mdbook build` to regenerate HTML
3. Distribute updated `book/` folder

### Adding Sessions

1. Create `session-XX.md` in `src/`
2. Add to `src/SUMMARY.md`
3. Rebuild with `mdbook build`

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

1. Check session notes
2. Review demo project code
3. Search documentation
4. Ask in course forum
5. Use AI assistants

## License

MIT License - Free to use for teaching and learning!

## Credits

- **Course Author**: Coding Minds
- **Technologies**: Next.js, Appwrite, Tailwind CSS, TypeScript
- **Inspired by**: Real-world use cases from swapcard project

---

**Ready to teach the next generation of AI-assisted full-stack developers! 🚀**
