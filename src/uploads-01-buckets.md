# What Are Storage Buckets?

**Video**: 1 min — Files live in buckets, not the database

---

Files don't go in the database — they go in a **storage bucket**. The database stores only the **file ID** (a short reference string), and the UI uses that ID to fetch and display the file.

This keeps the database lean and lets Appwrite handle file delivery, resizing, and caching separately from your data.

Think of it as: database row → has a `imageId` field → that ID points to a file in the bucket.
