# Lesson 8: Imageboard Uploads

**Duration**: 1.5 hours  
**Goal**: Introduce file uploads with Appwrite Storage and show how to verify storage assumptions before generating UI code

## Learning Objectives

By the end of this lesson, you will:
- explain the difference between file storage and database records
- design a small upload flow
- use Codex to add uploads in bounded steps
- verify buckets and file references before wiring UI
- test file type, size, and display behavior

## Part 1: Concept

A database record is not the same thing as a file.

In a typical app:

- the file lives in storage
- the database stores metadata or the file id
- the UI uses that reference to display the asset later

You need to understand this before prompting for upload features.

## Part 2: Product Goal

The lesson outcome should be:

- users can upload an image for a thread
- the image is stored in Appwrite Storage
- the thread stores a reference to that file
- the uploaded image can be displayed in the imageboard UI

## Part 3: Prompting Sequence

Recommended sequence:

1. inspect Appwrite buckets first
2. prompt for an upload flow plan
3. verify file constraints the app should enforce
4. prompt for the upload handler
5. test with a valid image
6. test with an invalid file
7. prompt for the display step

### Example Prompt

Plan a beginner-friendly image upload flow for this imageboard app.

Requirements:
- Appwrite Storage for the file
- threads store only the file reference
- basic validation for file type and size
- keep the UI plain
- return the files and routes I should implement first

## Part 4: Copy-Paste Schema Brief

```text
Imageboard upload update:

Add these optional fields to threads:
- imageFileId: string, optional
- imageAlt: string, optional, max 120

Create one storage bucket for thread images.

Rules:
- images are optional
- the thread can still exist without an image
- the database stores only the file reference, not the file itself
```

## Part 5: What You Must Verify

You should verify:

1. the bucket id is real
2. the uploaded file is visible in Appwrite Storage
3. the database stores the expected file reference
4. broken files or invalid types fail cleanly
5. the UI can render the uploaded asset after refresh

Keep in mind that storage bugs often come from:

- wrong bucket ids
- wrong permissions
- wrong assumptions about what should live in the database
