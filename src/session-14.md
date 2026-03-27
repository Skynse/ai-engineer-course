# Session 14: Styling & Polish

**Duration**: 1.5 hours  
**Goal**: Make all our apps look professional

## Learning Objectives

By the end of this session, students will:
- Apply consistent styling across apps
- Use Tailwind effectively
- Add loading states and animations
- Create responsive designs

## Part 1: Tailwind CSS Best Practices (20 min)

### Utility-First Approach

Instead of writing CSS:
```css
/* Don't do this */
.card {
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

Use Tailwind utilities:
```html
<!-- Do this -->
<div class="p-4 bg-white rounded-lg shadow">
```

### Common Patterns

**Cards:**
```html
<div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
```

**Buttons:**
```html
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
```

**Forms:**
```html
<input class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
```

### Responsive Design

```html
<!-- Mobile-first: stacks on mobile, side-by-side on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |

## Part 2: Loading States (25 min)

### Skeleton Loaders

Create `src/app/components/Skeleton.tsx`:

```typescript
export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

// Usage
export function PostSkeleton() {
  return (
    <div className="bg-white p-4 border-b">
      <div className="flex gap-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
```

### Loading Buttons

```typescript
interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export default function LoadingButton({ loading, children, onClick }: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
```

## Part 3: Error Handling (20 min)

### Error Boundaries

Create `src/app/components/ErrorMessage.tsx`:

```typescript
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">⚠️</span>
        <span className="font-semibold">Something went wrong</span>
      </div>
      <p className="text-sm mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
```

### Empty States

```typescript
interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Usage
<EmptyState
  icon="📭"
  title="No messages yet"
  description="Be the first to leave a message!"
  action={{ label: 'Write Message', onClick: () => setShowForm(true) }}
/>
```

## Part 4: Common UI Components (25 min)

### Modal Component

Create `src/app/components/Modal.tsx`:

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
```

### Toast Notifications

Create `src/app/components/Toast.tsx`:

```typescript
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`fixed bottom-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in`}>
      {message}
    </div>
  );
}
```

## Styling Checklist

Apply to all three demo apps:

- [ ] Consistent color scheme
- [ ] Loading states for all async operations
- [ ] Error handling with user-friendly messages
- [ ] Empty states for empty lists
- [ ] Responsive design (mobile-friendly)
- [ ] Smooth transitions and animations
- [ ] Accessible forms with proper labels
- [ ] Consistent spacing and typography

## Key Takeaways

1. **Consistency**: Use the same patterns across your app
2. **Feedback**: Always show loading/error states
3. **Mobile First**: Design for mobile, enhance for desktop
4. **Accessibility**: Proper labels, focus states, contrast
5. **Performance**: Lazy load images, optimize animations

## Homework

1. Apply consistent styling to Task Manager
2. Style the Recipe Collection app
3. Polish the Social Feed app
4. Create a style guide document
5. Add dark mode support (optional)

---

**Next Session**: Final Project Planning!
