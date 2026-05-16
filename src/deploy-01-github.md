# Push to GitHub

**Video**: 1 min — Create a repo and push your code

---

The video walks you through creating the GitHub repo and logging in. Once that's done, run these commands in your project folder:

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Verify

- `bun run build` succeeds locally before you push
- The repo appears on github.com with your project files
