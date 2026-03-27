# Session 12: Demo App 2 - Recipe Collection

**Duration**: 1.5 hours  
**Goal**: Build a recipe sharing app with images

## What We're Building

A **Recipe Collection** app where users can:
- Create recipes with photos
- Add ingredients and instructions
- Categorize recipes (breakfast, lunch, dinner, etc.)
- Search recipes by name or category
- Save favorite recipes

## Learning Objectives

By the end of this session, students will:
- Work with structured data (ingredients list)
- Implement image galleries
- Create many-to-many relationships (recipes ↔ categories)
- Build a more complex UI

## Part 1: Database Design (10 min)

### Collections

**recipes collection:**
- `title` (string, required)
- `description` (string)
- `imageUrl` (string)
- `prepTime` (integer, minutes)
- `cookTime` (integer, minutes)
- `servings` (integer)
- `ingredients` (string array)
- `instructions` (string array)
- `categoryIds` (string array)
- `userId` (string, required)
- `userName` (string)
- `createdAt` (datetime)

**categories collection:**
- `name` (string, required)
- `icon` (string, emoji)

## Part 2: Recipe Components (50 min)

### Recipe Card Component

Create `src/app/components/RecipeCard.tsx`:

```typescript
import Link from 'next/link';

interface Recipe {
  $id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  userName: string;
  userId: string;
  createdAt: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Link href={`/recipes/${recipe.$id}`}>
      <article className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>⏱️ {totalTime} min</span>
            <span>👥 {recipe.servings} servings</span>
          </div>

          <div className="mt-3 text-sm text-gray-500">
            by {recipe.userName}
          </div>
        </div>
      </article>
    </Link>
  );
}
```

### Recipe Form Component

Create `src/app/components/RecipeForm.tsx`:

```typescript
'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';

interface RecipeFormProps {
  onSubmit: (data: RecipeData) => void;
  onCancel: () => void;
}

interface RecipeData {
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
}

export default function RecipeForm({ onSubmit, onCancel }: RecipeFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(30);
  const [servings, setServings] = useState(4);
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);

  function addIngredient() {
    setIngredients([...ingredients, '']);
  }

  function updateIngredient(index: number, value: string) {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  }

  function removeIngredient(index: number) {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  function addInstruction() {
    setInstructions([...instructions, '']);
  }

  function updateInstruction(index: number, value: string) {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  }

  function removeInstruction(index: number) {
    setInstructions(instructions.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      title,
      description,
      imageUrl,
      prepTime,
      cookTime,
      servings,
      ingredients: ingredients.filter((i) => i.trim()),
      instructions: instructions.filter((i) => i.trim())
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold">Add New Recipe</h2>

      <ImageUpload onUpload={setImageUrl} currentImage={imageUrl} />

      <div>
        <label className="block text-sm font-medium mb-1">Recipe Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g., Homemade Pizza"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded h-20"
          placeholder="Brief description of the dish..."
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Prep Time (min)</label>
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cook Time (min)</label>
          <input
            type="number"
            value={cookTime}
            onChange={(e) => setCookTime(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Servings</label>
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
            min="1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder={`Ingredient ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="text-red-500 px-2"
              disabled={ingredients.length === 1}
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-blue-500 text-sm hover:underline"
        >
          + Add Ingredient
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Instructions</label>
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <span className="py-2 text-gray-500">{index + 1}.</span>
            <textarea
              value={instruction}
              onChange={(e) => updateInstruction(index, e.target.value)}
              className="flex-1 p-2 border rounded h-16"
              placeholder={`Step ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeInstruction(index)}
              className="text-red-500 px-2"
              disabled={instructions.length === 1}
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addInstruction}
          className="text-blue-500 text-sm hover:underline"
        >
          + Add Step
        </button>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Recipe
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
```

## Part 3: Recipe Detail Page (20 min)

Create `src/app/recipes/[id]/page.tsx`:

```typescript
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

// Mock data for demo
const mockRecipe = {
  $id: '1',
  title: 'Homemade Pizza',
  description: 'Delicious homemade pizza with fresh ingredients',
  imageUrl: '',
  prepTime: 20,
  cookTime: 15,
  servings: 4,
  ingredients: [
    '2 cups flour',
    '1 cup water',
    '1 packet yeast',
    '1/2 cup tomato sauce',
    '2 cups mozzarella cheese',
    'Toppings of choice'
  ],
  instructions: [
    'Mix flour, water, and yeast to make dough',
    'Let dough rise for 1 hour',
    'Roll out dough and add sauce',
    'Add cheese and toppings',
    'Bake at 450°F for 15 minutes'
  ],
  userName: 'Chef John',
  userId: 'user1',
  createdAt: new Date().toISOString()
};

export default function RecipePage() {
  const params = useParams();
  const recipe = mockRecipe; // In real app, fetch by params.id

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        ← Back to Recipes
      </Link>

      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>

      <p className="text-gray-600 mb-6">{recipe.description}</p>

      <div className="flex gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
        <div>
          <span className="text-gray-500">Prep Time</span>
          <p className="font-semibold">{recipe.prepTime} min</p>
        </div>
        <div>
          <span className="text-gray-500">Cook Time</span>
          <p className="font-semibold">{recipe.cookTime} min</p>
        </div>
        <div>
          <span className="text-gray-500">Servings</span>
          <p className="font-semibold">{recipe.servings}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </span>
                <p className="pt-1">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t text-sm text-gray-500">
        Recipe by {recipe.userName} • Posted {new Date(recipe.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
```

## Key Features

1. **Dynamic Lists**: Add/remove ingredients and instructions
2. **Image Upload**: Feature image for each recipe
3. **Structured Data**: Arrays for ingredients/steps
4. **Time Display**: Prep time, cook time, total time

## Homework

1. Connect to Appwrite backend
2. Add categories with filtering
3. Add search functionality
4. Add "Save to favorites" feature
5. Add recipe ratings

---

**Next Session**: Demo App 3 - Social Feed!
