# What is Authentication?

**Video**: 1 min — What auth does and what it doesn't do

---

Authentication answers one question: **who is the current user?** It handles signup, login, logout, and sessions — nothing more.

It does **not** store display names, bios, or avatars. That's a separate `profiles` collection you manage yourself. The two are linked by a `userId` field.

- **Auth account** = email, password, session (Appwrite manages this)
- **Profile** = display name, bio, avatar (you manage this in a collection)
