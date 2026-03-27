# Session 15: Final Project Planning

**Duration**: 1.5 hours  
**Goal**: Plan and design final projects

## Overview

Students will work on a custom full-stack application for the next 2-3 weeks. Today, we'll plan and design these projects.

## Project Options

Choose one or propose your own:

### Option 1: Book Tracker
A Goodreads-style app for tracking books

**Features:**
- User authentication
- Add books (title, author, cover image, description)
- Reading status (Want to Read, Reading, Read)
- Rate and review books
- View reading history
- Search/filter books

**Collections:**
- `books` - book information
- `userBooks` - user's books with status and rating

### Option 2: Event Planner
An app for creating and managing events

**Features:**
- User authentication
- Create events (title, date, location, description, image)
- RSVP system (Going, Maybe, Not Going)
- Event discovery/search
- View attendees
- Event categories

**Collections:**
- `events` - event details
- `rsvps` - user RSVPs
- `categories` - event types

### Option 3: Study Notes
A note-taking app for students

**Features:**
- User authentication
- Create subjects/courses
- Add notes with rich text
- Organize with tags
- Search notes
- Share notes with classmates
- Study mode (flashcards)

**Collections:**
- `subjects` - courses/subjects
- `notes` - individual notes
- `tags` - organization tags

### Option 4: Your Own Idea
Propose a custom project! Must include:
- User authentication
- At least 2 related collections
- File upload feature (images)
- Search or filter functionality

## Planning Template

### 1. Project Name
Give your project a catchy name!

### 2. Problem Statement
What problem does your app solve? (2-3 sentences)

### 3. User Stories
Write 3-5 user stories:
- As a [type of user], I want [goal] so that [benefit]

Example:
- As a book lover, I want to track books I've read so that I can remember my favorites
- As a student, I want to organize my notes by subject so that I can study efficiently

### 4. Features List
List all features (must-haves and nice-to-haves):

**Must-Haves (MVP):**
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

**Nice-to-Haves:**
- [ ] Advanced feature 1
- [ ] Advanced feature 2

### 5. Database Design
Draw your collections and relationships:

```
collection1:
  - field1 (type)
  - field2 (type)
  - relationTo: collection2

collection2:
  - field1 (type)
  - field2 (type)
  - relationTo: collection1
```

### 6. Page Structure
List all pages in your app:

- `/` - Home/Landing
- `/auth/signin` - Login
- `/auth/signup` - Register
- `/dashboard` - User dashboard
- ... (add your pages)

### 7. API Endpoints
List your API routes:

- `GET /api/resource` - List all
- `POST /api/resource` - Create
- `GET /api/resource/:id` - Get one
- `PATCH /api/resource/:id` - Update
- `DELETE /api/resource/:id` - Delete

### 8. Component List
List reusable components you'll build:

- Navbar
- Footer
- Card
- Form inputs
- ... (your components)

### 9. Wireframes
Sketch rough layouts for key pages (can be on paper):

- Home page
- Main feature page
- Detail page
- Form page

### 10. Timeline
Plan your 2-3 weeks:

**Week 1:**
- Day 1-2: Setup project and database
- Day 3-4: Build authentication
- Day 5-7: Core CRUD features

**Week 2:**
- Day 1-3: Main features and UI
- Day 4-5: Additional features
- Day 6-7: Testing and bug fixes

**Week 3 (if needed):**
- Polish and extra features
- Deployment
- Presentation prep

## Today's Activity (90 min)

### Phase 1: Choose and Research (20 min)
- Select your project idea
- Research similar apps for inspiration
- Define the core problem you're solving

### Phase 2: Planning (40 min)
Fill out the planning template above

### Phase 3: Database Design (20 min)
- Create collections in Appwrite console
- Add attributes and set permissions
- Test with sample data

### Phase 4: Initial Setup (10 min)
- Create Next.js project
- Install dependencies
- Set up basic folder structure

## Requirements Checklist

Your final project must have:

- [ ] **Authentication**
  - Sign up / Sign in
  - Protected routes
  - User profiles

- [ ] **Database**
  - At least 2 related collections
  - Proper relationships
  - Appropriate permissions

- [ ] **File Upload**
  - Image upload using Appwrite Storage
  - Display uploaded images

- [ ] **CRUD Operations**
  - Create, Read, Update, Delete
  - Working API routes
  - Functional UI

- [ ] **Search/Filter**
  - Search functionality OR
  - Filter by categories/status

- [ ] **UI/UX**
  - Responsive design
  - Loading states
  - Error handling
  - Professional styling

- [ ] **Deployment**
  - Deployed to Vercel
  - Working Appwrite backend
  - Publicly accessible URL

## Presentation Guidelines

Prepare a 5-10 minute presentation covering:

1. **Demo** (3-5 min)
   - Walk through main features
   - Show it working end-to-end

2. **Technical Overview** (2-3 min)
   - Tech stack used
   - Database design
   - Architecture decisions

3. **Challenges & Learnings** (1-2 min)
   - What was difficult?
   - What did you learn?
   - What would you do differently?

4. **Q&A** (2-3 min)
   - Answer questions from peers

## Resources

- **Appwrite Docs**: appwrite.io/docs
- **Next.js Docs**: nextjs.org/docs
- **Tailwind Docs**: tailwindcss.com/docs
- **Course Materials**: Link to session notes

## Questions to Ask Before Starting

1. Is my scope realistic for 2-3 weeks?
2. Do I understand the database relationships?
3. Have I planned the API endpoints?
4. Do I have a clear idea of the UI?
5. What are the biggest technical risks?

## Getting Help

During the project period, you can:
- Review session notes
- Ask AI assistants for help
- Post in course forum/chat
- Schedule office hours with instructor
- Collaborate with classmates (but code your own project)

## Submission Requirements

Submit by the deadline:
- [ ] GitHub repository link
- [ ] Deployed app URL
- [ ] 5-10 minute presentation video OR
- [ ] Live demo session attendance

---

**Next Session**: Final project building and Q&A!
