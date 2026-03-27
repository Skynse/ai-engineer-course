# AI Engineer (Full Stack) Course

[![Deploy](https://github.com/Skynse/ai-engineer-course/actions/workflows/deploy.yml/badge.svg)](https://github.com/Skynse/ai-engineer-course/actions/workflows/deploy.yml)

A comprehensive 16-session course teaching full-stack development with Next.js and Appwrite.

## Live Course Website

**View the course online**: https://skynse.github.io/ai-engineer-course

## Course Overview

- **Duration**: 16 Sessions (1.5 hours each) + Final Project Period
- **Tech Stack**: Next.js 16, Appwrite, TypeScript, Tailwind CSS
- **Prerequisites**: Basic JavaScript/React knowledge
- **Approach**: Learn by building, AI-assisted development

## What Students Will Build

1. **Guestbook** - Learn Appwrite basics
2. **Blog with Comments** - Master relationships
3. **Task Manager** - Practice CRUD operations
4. **Recipe Collection** - Handle file uploads
5. **Social Feed** - Complex data relationships
6. **Final Project** - Custom full-stack application

## Repository Structure

```
.
├── src/                      # Source markdown files
│   ├── README.md            # Course overview
│   ├── session-01.md        # Session 1: Introduction & Setup
│   ├── session-02.md        # Session 2: Basic CRUD Operations
│   ├── ...                  # Sessions 3-16
│   └── SUMMARY.md           # Navigation
├── book.toml                # mdBook configuration
├── custom.css               # Styling
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
Next.js project scaffolded for students to build following Session 12.

### 🔄 Social Feed (Template)
Next.js project scaffolded for students to build following Session 13.

## Session Breakdown

| Session | Topic | Project |
|---------|-------|---------|
| 1 | Introduction & Setup | Guestbook initialized |
| 2 | Basic CRUD Operations | Complete Guestbook |
| 3 | Next.js Integration | Guestbook with forms |
| 4 | Simple Authentication | Auth-enabled Guestbook |
| 5 | User Profiles | Profile system |
| 6 | Relationships | Simple Blog |
| 7 | Comments System | Blog with comments |
| 8 | File Uploads | Photo gallery feature |
| 9 | Permissions | Private posts |
| 10 | Queries & Search | Search functionality |
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
3. **Set up Appwrite**: Follow setup instructions in each project README

### For Students

1. **Read the course** online
2. **Build along** with each session
3. **Use Task Manager** as a complete reference
4. **Create your own** Recipe Collection and Social Feed
5. **Complete final project** to graduate!

## Local Development

To edit and preview the course locally:

```bash
# Install mdBook
cargo install mdbook

# Serve locally
mdbook serve

# Build
mdbook build
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

- **Course Author**: Austin Amakye Ansah
- **Technologies**: Next.js, Appwrite, Tailwind CSS, TypeScript
- **Built with**: mdBook

## License

MIT License - Free for educational use!

---

**Ready to build the next generation of full-stack developers! 🚀**
