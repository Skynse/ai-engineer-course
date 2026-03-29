#!/bin/bash
# Appwrite Setup Script
# Creates all necessary databases and collections for the demo projects

# Configuration
APPWRITE_ENDPOINT="http://localhost:8080/v1"
APPWRITE_PROJECT_ID="69c8c44d000062729335"
APPWRITE_API_KEY="standard_05666ba01b8f5f505d8dd0c3e6c36fda06bee7fa522fe62089e5fdee2a78baca3f58b0d111567af118f9cc3d849d2adb99a917a715d57a2a168e6e86392e1b7b348d7f87972308ebd1b84d1071cd750d8afd55e6df1047ef749b1825037d195e5fc2def90551186c834921cb82e1e6efeb9536ecddfb6de5e6600e44949342db"

HEADERS=(
  -H "Content-Type: application/json"
  -H "X-Appwrite-Project: ${APPWRITE_PROJECT_ID}"
  -H "X-Appwrite-Key: ${APPWRITE_API_KEY}"
)

echo "Setting up Appwrite databases and collections..."

# ============================================================
# TASK MANAGER
# ============================================================
echo ""
echo "=== Task Manager ==="

echo "Creating taskmanager database..."
curl -s -X POST "${APPWRITE_ENDPOINT}/databases" \
  "${HEADERS[@]}" \
  -d '{"databaseId": "taskmanager", "name": "Task Manager"}' | jq .

echo "Creating tasks collection..."
curl -s -X POST "${APPWRITE_ENDPOINT}/databases/taskmanager/collections" \
  "${HEADERS[@]}" \
  -d '{
    "collectionId": "tasks",
    "name": "Tasks",
    "documentSecurity": false,
    "permissions": ["create(\"users\")", "read(\"users\")", "update(\"users\")", "delete(\"users\")"]
  }' | jq .

# Task attributes
for attr in \
  '{"key": "title", "size": 255, "required": true}' \
  '{"key": "description", "size": 2000, "required": false, "default": ""}' \
  '{"key": "priority", "size": 20, "required": false, "default": "medium"}' \
  '{"key": "order", "size": 64, "required": false}' \
  '{"key": "userId", "size": 255, "required": true}' \
  '{"key": "userName", "size": 255, "required": false, "default": "Anonymous"}' \
  '{"key": "completedAt", "size": 255, "required": false}'; do
  echo "  Creating string attribute: $(echo "$attr" | jq -r .key)"
  curl -s -X POST "${APPWRITE_ENDPOINT}/databases/taskmanager/collections/tasks/attributes/string" \
    "${HEADERS[@]}" \
    -d "$attr" | jq .
done

echo "  Creating enum attribute: status"
curl -s -X POST "${APPWRITE_ENDPOINT}/databases/taskmanager/collections/tasks/attributes/enum" \
  "${HEADERS[@]}" \
  -d '{
    "key": "status",
    "elements": ["backlog", "in-progress", "done"],
    "required": false,
    "default": "backlog"
  }' | jq .

echo "  Creating boolean attribute: completed"
curl -s -X POST "${APPWRITE_ENDPOINT}/databases/taskmanager/collections/tasks/attributes/boolean" \
  "${HEADERS[@]}" \
  -d '{"key": "completed", "required": false, "default": false}' | jq .

# ============================================================
# SOCIAL FEED
# ============================================================
echo ""
echo "=== Social Feed ==="

echo "Creating social database..."
curl -s -X POST "${APPWRITE_ENDPOINT}/databases" \
  "${HEADERS[@]}" \
  -d '{"databaseId": "social", "name": "Social Feed"}' | jq .

echo "Creating posts collection..."
curl -s -X POST "${APPWRITE_ENDPOINT}/databases/social/collections" \
  "${HEADERS[@]}" \
  -d '{
    "collectionId": "posts",
    "name": "Posts",
    "documentSecurity": false,
    "permissions": ["create(\"users\")", "read(\"users\")", "update(\"users\")", "delete(\"users\")"]
  }' | jq .

# Post attributes
for attr in \
  '{"key": "content", "size": 500, "required": true}' \
  '{"key": "imageId", "size": 255, "required": false}' \
  '{"key": "userId", "size": 255, "required": true}' \
  '{"key": "userName", "size": 255, "required": false, "default": "Anonymous"}'; do
  echo "  Creating string attribute: $(echo "$attr" | jq -r .key)"
  curl -s -X POST "${APPWRITE_ENDPOINT}/databases/social/collections/posts/attributes/string" \
    "${HEADERS[@]}" \
    -d "$attr" | jq .
done

echo "  Creating string[] attribute: likes"
curl -s -X POST "${APPWRITE_ENDPOINT}/databases/social/collections/posts/attributes/string" \
  "${HEADERS[@]}" \
  -d '{"key": "likes", "size": 255, "required": false, "array": true}' | jq .

echo "Creating comments collection..."
curl -s -X POST "${APPWRITE_ENDPOINT}/databases/social/collections" \
  "${HEADERS[@]}" \
  -d '{
    "collectionId": "comments",
    "name": "Comments",
    "documentSecurity": false,
    "permissions": ["create(\"users\")", "read(\"users\")", "update(\"users\")", "delete(\"users\")"]
  }' | jq .

for attr in \
  '{"key": "postId", "size": 36, "required": true}' \
  '{"key": "content", "size": 1000, "required": true}' \
  '{"key": "userId", "size": 36, "required": true}' \
  '{"key": "userName", "size": 255, "required": true}'; do
  echo "  Creating comments string attribute: $(echo "$attr" | jq -r .key)"
  curl -s -X POST "${APPWRITE_ENDPOINT}/databases/social/collections/comments/attributes/string" \
    "${HEADERS[@]}" \
    -d "$attr" | jq .
done

# ============================================================
# RECIPE COLLECTION
# ============================================================
echo ""
echo "=== Recipe Collection ==="

echo "Creating recipes database..."
curl -s -X POST "${APPWRITE_ENDPOINT}/databases" \
  "${HEADERS[@]}" \
  -d '{"databaseId": "recipes", "name": "Recipe Collection"}' | jq .

echo "Creating recipes collection..."
curl -s -X POST "${APPWRITE_ENDPOINT}/databases/recipes/collections" \
  "${HEADERS[@]}" \
  -d '{
    "collectionId": "recipes",
    "name": "Recipes",
    "documentSecurity": false,
    "permissions": ["create(\"users\")", "read(\"users\")", "update(\"users\")", "delete(\"users\")"]
  }' | jq .

# Recipe string attributes
for attr in \
  '{"key": "title", "size": 255, "required": true}' \
  '{"key": "description", "size": 2000, "required": false, "default": ""}' \
  '{"key": "imageId", "size": 255, "required": false}' \
  '{"key": "userId", "size": 255, "required": true}' \
  '{"key": "userName", "size": 255, "required": false, "default": "Anonymous"}'; do
  echo "  Creating string attribute: $(echo "$attr" | jq -r .key)"
  curl -s -X POST "${APPWRITE_ENDPOINT}/databases/recipes/collections/recipes/attributes/string" \
    "${HEADERS[@]}" \
    -d "$attr" | jq .
done

echo "  Creating enum attribute: category"
curl -s -X POST "${APPWRITE_ENDPOINT}/databases/recipes/collections/recipes/attributes/enum" \
  "${HEADERS[@]}" \
  -d '{
    "key": "category",
    "elements": ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Beverage", "Other"],
    "required": false,
    "default": "Other"
  }' | jq .

# Recipe array attributes
for attr in \
  '{"key": "ingredients", "size": 500, "required": false, "array": true}' \
  '{"key": "instructions", "size": 2000, "required": false, "array": true}'; do
  echo "  Creating string[] attribute: $(echo "$attr" | jq -r .key)"
  curl -s -X POST "${APPWRITE_ENDPOINT}/databases/recipes/collections/recipes/attributes/string" \
    "${HEADERS[@]}" \
    -d "$attr" | jq .
done

# Recipe integer attributes
for attr in \
  '{"key": "cookingTime", "required": false, "min": 0, "max": 9999, "default": 0}' \
  '{"key": "servings", "required": false, "min": 1, "max": 999, "default": 1}'; do
  echo "  Creating integer attribute: $(echo "$attr" | jq -r .key)"
  curl -s -X POST "${APPWRITE_ENDPOINT}/databases/recipes/collections/recipes/attributes/integer" \
    "${HEADERS[@]}" \
    -d "$attr" | jq .
done

echo ""
echo "Setup complete! All databases and collections have been created."
echo ""
echo "Note: Attribute creation is asynchronous. Wait a few seconds before using the collections."
