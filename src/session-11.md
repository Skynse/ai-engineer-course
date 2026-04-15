# Lesson 11: Demo Projects

**Duration**: 30 minutes  
**Goal**: Explore three pre-built apps and get each one running locally with Appwrite

## What You Have

Three demo projects are included in the course files as zips:

- `task-manager` — a kanban board with drag-and-drop ordering
- `recipe-collection` — recipes with image uploads and array fields
- `social-feed` — posts, likes, comments, and ownership-based deletes

Each one is a complete working app. Your job is to get them running and read through the code.

## Setup (Same For All Three)

1. Unzip the project and open it in your editor
2. Ask Codex to create the Appwrite project in the cloud and wire it up locally:

```text
Create a new Appwrite project for this app. Set up the database, collections, and any storage buckets it needs. Wire up the local environment so the app can connect to it.
```

3. Run the app and confirm it loads

That's it. Repeat for each project.

## What Each One Teaches

**Task Manager** — how to model board state with a `status` field instead of a checkbox, and how to keep stable card ordering across drag-and-drop moves

**Recipe Collection** — how to use array fields for ingredients and instructions, and how to store file references (not files) in a document when handling image uploads

**Social Feed** — how likes work as a user ID array, how comments link to posts via `postId`, and why deleting a post means cleaning up its comments and uploaded image too

## What To Do

Spend time in each app. Use it, read the code, and ask Codex questions about anything you don't understand. These projects are references you can come back to throughout the rest of the course.

---

**Next**: Styling and UI polish
