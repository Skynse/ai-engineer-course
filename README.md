# AI Engineer (Full Stack) Course

[![Deploy](https://github.com/Skynse/ai-engineer-course/actions/workflows/deploy.yml/badge.svg)](https://github.com/Skynse/ai-engineer-course/actions/workflows/deploy.yml)

A 16-lesson full-stack course where you use Codex to build websites and apps with Next.js and Appwrite.

## Live Course Website

**View the course online**: https://skynse.github.io/ai-engineer-course

## Course Overview

- **Duration**: 16 Lessons (1.5 hours each) + Final Project Period
- **Tech Stack**: Next.js 16, Appwrite, TypeScript, Tailwind CSS, Bun
- **Prerequisites**: Basic JavaScript/React knowledge
- **Approach**: Learn by building, Codex-first development with verification

## What You Will Build

1. **Next.js TODO Lab** - Learn the shape of a frontend app before adding a backend
2. **Imageboard** - Build a continuous Appwrite-backed app across CRUD, auth, replies, uploads, and search
4. **Task Manager** - Practice CRUD operations
5. **Recipe Collection** - Handle file uploads
6. **Social Feed** - Complex data relationships
7. **Final Project** - Custom full-stack application

## Repository Structure

```
.
├── src/                      # Source markdown files
│   ├── README.md            # Course overview
│   ├── session-01.md        # Lesson 1: Full-Stack Foundations & Course Setup
│   ├── session-02.md        # Lesson 2: Next.js Introduction & First TODO App
│   ├── ...                  # Lessons 3-16
│   └── SUMMARY.md           # Navigation
├── course-site/             # Astro course website
├── demo-projects/           # Working demo applications
│   ├── task-manager.zip     # Complete reference implementation
│   ├── recipe-collection.zip # Project template
│   └── social-feed.zip      # Project template
└── .github/
    └── workflows/
        └── deploy.yml       # Auto-deploy to GitHub Pages
```

## Demo Projects

### ✅ Task Manager (Complete)
A fully working task management application with:
- Full CRUD operations
- User authentication
- Priority levels (Low, Medium, High)
- Filter by status (All, Active, Completed)
- Sort by date or priority
- Responsive design

**Status**: Ready to use immediately!

### 🔄 Recipe Collection (Template)
Next.js project scaffolded for you to build following Lesson 12.

### 🔄 Social Feed (Template)
Next.js project scaffolded for you to build following Lesson 13.

## Lesson Breakdown

| Lesson | Topic | Project |
|---------|-------|---------|
| 1 | Full-Stack Foundations & Course Setup | Terminology + workflow |
| 2 | Next.js Introduction & First TODO App | Local-only TODO lab |
| 3 | Imageboard Threads, CRUD, and the First Appwrite Build Loop | Text-only imageboard threads |
| 4 | Imageboard Authentication | Signed-in posting flow |
| 5 | Imageboard User Profiles | Profile system |
| 6 | Imageboard Boards and Thread Relationships | Boards + threads |
| 7 | Imageboard Replies | Thread replies |
| 8 | Imageboard Uploads | Thread image uploads |
| 9 | Imageboard Permissions & Security Basics | Safer posting permissions |
| 10 | Imageboard Queries, Search & Filtering | Thread search and filters |
| 11 | Demo App 1 | Task Manager |
| 12 | Demo App 2 | Recipe Collection |
| 13 | Demo App 3 | Social Feed |
| 14 | Styling & Polish | Style all apps |
| 15 | Final Project Planning | Project proposal |
| 16 | Final Project Building | Working prototype |

## Getting Started

### For Instructors

1. **View the course**: Visit https://skynse.github.io/ai-engineer-course
2. **Download demo projects**: Extract from `demo-projects/` folder
3. **Review the Codex workflow**: Start with `src/guide-codex-website-workflow.md`
4. **Connect Codex to Appwrite context**: Read `src/guide-codex-appwrite-mcp.md`
5. **Set up Appwrite**: Follow setup instructions in each project README

### For Learners

1. **Read the course** online
2. **Install Codex first** by following `src/guide-codex-install.md`
3. **Build Lesson 2 directly** to understand the Next.js basics without AI
4. **Use Codex to build along** with the Appwrite-backed lessons
5. **Use Task Manager** as a complete reference
6. **Create your own** Recipe Collection and Social Feed
7. **Complete final project** to graduate!

## Local Development

To edit and preview the course locally:

```bash
# Install dependencies
cd course-site
bun install

# Preview locally
bun run dev
```

## Contributing

This course is designed for educational use. Feel free to:
- Fork and customize for your needs
- Submit improvements via pull requests
- Report issues or suggestions

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Course Website](https://skynse.github.io/ai-engineer-course)

## Credits

- **Course Author**: Coding Minds
- **Technologies**: Next.js, Appwrite, Tailwind CSS, TypeScript
- **Built with**: Astro

## License

MIT License - Free for educational use!

---

**Ready to build real full-stack apps with modern AI tooling.**
