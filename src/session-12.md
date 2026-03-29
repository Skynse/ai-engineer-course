# Session 12: Recipe Collection Demo

**Duration**: 1.5 hours  
**Goal**: Build a recipe app with storage-backed images and richer document fields

## What We're Building

A recipe collection app with:

- image uploads via Appwrite Storage
- structured recipe documents instead of flat text records
- array fields for `ingredients` and `instructions`
- category, cooking time, and servings metadata
- edit and delete flows

## Why This Session Matters

This session moves from simple records to shaped content.

A recipe is a better teaching example than a guestbook message because it forces students to model:

- text fields
- number fields
- array fields
- optional file references
- ownership fields

That is much closer to the kinds of documents real apps store.

## Database Schema

**recipes collection:**

- `title` (string, required)
- `description` (string, optional)
- `ingredients` (string array)
- `instructions` (string array)
- `cookingTime` (integer)
- `servings` (integer)
- `category` (enum or string with fixed values)
- `imageId` (string, optional)
- `userId` (string, required)
- `userName` (string, required)

**storage bucket:**

- `recipe-images`

## Key Concepts

### 1. Store File References, Not Files, In Documents

Recipe documents should store:

```typescript
imageId: uploadedFile.$id
```

The binary file lives in Appwrite Storage. The document only keeps the reference.

### 2. Arrays Are First-Class Appwrite Fields

This is the first demo where one text box per concept stops being a good model.

Good examples:

- `ingredients: string[]`
- `instructions: string[]`

That makes the UI, validation, and rendering much cleaner than one giant textarea.

### 3. Image Upload Flow

The core pattern is:

1. user selects an image
2. upload file to Storage
3. save returned file id into the recipe document
4. render the image from the file id later

Conceptually:

```typescript
const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), imageFile);

await databases.createDocument(DATABASE_ID, RECIPES_COLLECTION_ID, ID.unique(), {
  ...recipeData,
  imageId: uploadedFile.$id,
});
```

### 4. Edit Flows Need To Respect Existing Images

When students edit a recipe, they should understand the difference between:

- keeping the current image
- replacing the current image
- removing the image entirely

That is a common source of beginner bugs.

## Component Structure

The recipe demo is organized around item and list rendering:

```text
components/
├── RecipeList.tsx
├── RecipeItem.tsx
└── Navbar.tsx
```

## Implementation Notes

1. Validate that students always keep at least one ingredient and one instruction.
2. Make category options explicit rather than letting AI invent inconsistent category names.
3. Show students how to generate image URLs from Appwrite Storage using the stored `imageId`.
4. Keep delete flows honest: if a recipe is deleted, think about whether its image should also be deleted from storage.

## Demo Project Reference

The recipe demo files live in `demo-projects/recipe-collection/`.

Students should inspect:

- `src/types/recipe.ts`
- `src/app/components/RecipeList.tsx`
- `src/app/components/RecipeItem.tsx`

## Homework

1. Add search by title or category.
2. Add a dedicated recipe form instead of editing only inside the card.
3. Ask AI to design a schema for ratings and reviews, then explain whether it should be embedded or moved to a separate collection.

---

**Next**: Social Feed (comments, likes, images, and deletion flows)
