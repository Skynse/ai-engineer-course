# Add Image Upload to Posts

**Video**: 2 min — File input, upload to bucket, store the file ID on the post

---

The bucket exists. Now wire up the post form to let users attach an image. The image goes to the bucket; the file ID gets saved on the post document.

## Prompt it

```text
Add image upload to the post creation form in this social site app.

Requirements:
- Add a file input to the post form
- Upload the image to the Appwrite `post-images` bucket
- Store the resulting file ID on the post document as `imageId`
- Images are optional — submitting a post without an image should still work

Use Appwrite Storage SDK. Keep the upload flow simple.
```

## Verify

- Uploading an image creates a file visible in Appwrite Storage
- The post document in Appwrite shows a non-empty `imageId`
- Submitting a post without an image works and leaves `imageId` empty
