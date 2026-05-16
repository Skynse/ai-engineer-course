# Media Uploads

**Video**: 2 min — Storage buckets, file references, image upload on posts

---

Files don't go in the database. Files go in a **storage bucket**. The database stores a **reference** (the file ID) so the UI knows what to display.

## Step 1 — Create the bucket

```text
In my Appwrite project, create a storage bucket called `post-images`.
Allow jpg, png, webp, gif. Max file size: 5MB.
Set permissions so logged-in users can upload.
```

## Step 2 — Add image upload to posts

```text
Add image upload to the post creation form in this social site app.

Requirements:
- Add a file input to the post form
- Upload the image to the Appwrite `post-images` bucket
- Store the resulting file ID on the post document as `imageId`
- Display the image on the feed page and post detail page
- If a post has no image, show only the text content — no broken image placeholder
- Images are optional

Use Appwrite Storage SDK. Keep the upload flow simple.
```

## Step 3 — Profile avatars (optional)

```text
Add avatar upload to the user profile page.
Upload to the same `post-images` bucket, store the file ID on the profile document.
Show the avatar next to the user's name on posts and comments.
```

## Verify

- Uploading an image creates a file visible in Appwrite Storage
- The post shows the image after a page refresh
- Submitting a post without an image works fine
