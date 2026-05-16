# Create the Bucket

**Video**: 1 min — Create the post-images bucket in Appwrite

---

Before uploading anything, the bucket needs to exist. Use this prompt to create it with the right settings.

## Prompt it

```text
In my Appwrite project, create a storage bucket called `post-images`.
Allow jpg, png, webp, gif. Max file size: 5MB.
Set permissions so logged-in users can upload.
```

## Verify

- The `post-images` bucket appears in Appwrite Storage
- Allowed file types and size limit are set correctly
- Permissions show authenticated users can create files

![Appwrite Storage bucket created](/assets/docs/appwrite/create-bucket.png)
