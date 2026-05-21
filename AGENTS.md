# Agent Instructions - LinkShortener Project

This document outlines the coding standards, conventions, and best practices for the LinkShortener project. All LLM-assisted code contributions should adhere to these guidelines.

## Project Overview

LinkShortener is a URL shortening service built with modern web technologies. The project uses Next.js for the backend and frontend, TypeScript for type safety, and Drizzle ORM for database management.

**Stack**: Next.js 16 | React 19 | TypeScript | Tailwind CSS | Clerk Auth | Drizzle ORM | Neon Database

---

## ⚠️ CRITICAL REQUIREMENT

**BEFORE GENERATING ANY CODE**, you MUST:

1. **ALWAYS read** the relevant individual instruction files in the `/docs` directory
2. Follow domain-specific patterns and requirements from those files
3. Never skip or bypass specialized documentation

This ensures consistency across the project and prevents conflicts with established patterns for authentication, UI components, and other specialized areas.

See [Individual Agent Instruction Files](#individual-agent-instruction-files) section below for the complete list of specialized documentation.

---

## File Structure & Organization

```
/app                 - Next.js App Router pages and layouts
/components          - Reusable React components
  /ui               - UI component library (shadcn components)
/db                 - Database schema and migrations
/lib                - Utility functions and helpers
/public             - Static assets
/docs               - Documentation (including individual agent instructions)
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserButton.tsx`, `LinkCard.tsx`)
- **Files**: kebab-case for non-component files (e.g., `api-utils.ts`, `url-validator.ts`)
- **Directories**: lowercase (e.g., `/components`, `/lib`, `/db`)
- **Functions/Methods**: camelCase (e.g., `getUserLinks()`, `validateUrl()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_URL_LENGTH`, `API_TIMEOUT`)
- **CSS Classes**: lowercase with hyphens (e.g., `link-card`, `btn-primary`)

---

## TypeScript Standards

### Strict Mode

All code must pass TypeScript strict mode. Configuration in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Type Definitions

1. **Always define explicit types** for function parameters and return values:

   ```typescript
   // ✅ Good
   function getUserLinks(userId: string): Promise<Link[]> {
     // Implementation
   }

   // ❌ Avoid
   function getUserLinks(userId) {
     // Implementation
   }
   ```

2. **Use interfaces for objects** in public APIs:

   ```typescript
   interface LinkData {
     originalUrl: string;
     shortCode: string;
     createdAt: Date;
     expiresAt?: Date;
   }
   ```

3. **Avoid `any` type**—use `unknown` if necessary and narrow the type:

   ```typescript
   // ✅ Good
   function processData(data: unknown): string {
     if (typeof data === "string") {
       return data.toUpperCase();
     }
     return "";
   }

   // ❌ Avoid
   function processData(data: any): string {
     return data.toUpperCase();
   }
   ```

4. **Use type aliases for union types**:
   ```typescript
   type ApiResponse<T> =
     | { success: true; data: T }
     | { success: false; error: string };
   ```

---

## React & Next.js Standards

⚠️ **BEFORE implementing React/Next.js code, check `/docs/ui-components.md` and `/docs/authentication.md` for specialized patterns.**

### Client vs Server Components

- **Server Components** (default): Use for data fetching, database access, secrets
- **Client Components**: Mark with `"use client"` at the top of the file when needed for interactivity

```typescript
// ✅ Server Component (default)
export default function LinksList() {
  const links = db.query.links.findMany(); // Can access DB directly
  return <div>{/* Render links */}</div>;
}

// ✅ Client Component
"use client";

import { useState } from "react";

export default function LinkForm() {
  const [url, setUrl] = useState("");
  // Handle form submission
  return <form>{/* Form JSX */}</form>;
}
```

### Component Structure

1. **Functional Components Only**: No class components
2. **Component Export**: Use `export default` for single components per file
3. **Props Interface**: Define props explicitly

```typescript
interface LinkCardProps {
  id: string;
  shortCode: string;
  originalUrl: string;
  clickCount: number;
  onDelete: (id: string) => void;
}

export default function LinkCard({
  id,
  shortCode,
  originalUrl,
  clickCount,
  onDelete,
}: LinkCardProps) {
  return (
    <div className="link-card">
      {/* Component content */}
    </div>
  );
}
```

### Hooks Best Practices

- Keep hooks at the top of the component
- Separate concerns using custom hooks
- Name custom hooks starting with `use` (e.g., `useLinks`, `useAuth`)

```typescript
// ✅ Custom Hook
function useLinks(userId: string) {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks(userId)
      .then(setLinks)
      .finally(() => setLoading(false));
  }, [userId]);

  return { links, loading };
}
```

---

## Styling Standards

⚠️ **BEFORE implementing styling, refer to `/docs/ui-components.md` for UI component and Tailwind CSS standards.**

### Tailwind CSS

- Use Tailwind CSS classes for all styling
- Follow the utility-first approach
- Maintain consistent spacing using Tailwind's scale (4px base unit)

```typescript
// ✅ Good
<div className="flex items-center gap-4 rounded-lg bg-slate-50 p-4 shadow-sm hover:shadow-md transition-shadow">
  <span className="text-sm font-medium text-slate-700">Link Short Code</span>
</div>

// ❌ Avoid inline styles or CSS modules
<div style={{ display: 'flex', padding: '16px' }}>Content</div>
```

### Class Organization

Order Tailwind classes logically:

1. Layout & Display (`flex`, `grid`, `block`, `hidden`)
2. Spacing (`p-*`, `m-*`, `gap-*`)
3. Sizing (`w-*`, `h-*`)
4. Colors (`bg-*`, `text-*`, `border-*`)
5. Typography (`text-*`, `font-*`, `leading-*`)
6. Effects (`shadow-*`, `rounded-*`, `opacity-*`)
7. State & Interactions (`hover:*`, `focus:*`, `active:*`)
8. Responsive (`sm:*`, `md:*`, `lg:*`, `dark:*`)

### Component Variants (Class Variance Authority)

Use `class-variance-authority` (CVA) for component variants:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
        ghost: 'hover:bg-slate-100',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export default function Button({ children, variant, size }: ButtonProps) {
  return <button className={buttonVariants({ variant, size })}>{children}</button>;
}
```

---

## Database & Data Access

### Drizzle ORM Patterns

1. **Schema Definition** (`db/schema.ts`):

   ```typescript
   import {
     pgTable,
     text,
     timestamp,
     integer,
     varchar,
   } from "drizzle-orm/pg-core";

   export const links = pgTable("links", {
     id: text("id").primaryKey(),
     shortCode: varchar("short_code", { length: 8 }).unique(),
     originalUrl: text("original_url").notNull(),
     userId: text("user_id").notNull(),
     clickCount: integer("click_count").default(0),
     createdAt: timestamp("created_at").defaultNow(),
     expiresAt: timestamp("expires_at"),
   });
   ```

2. **Database Queries**: Use server components or API routes

   ```typescript
   import { db } from "@/db";
   import { links } from "@/db/schema";

   export async function getUserLinks(userId: string) {
     return db.query.links.findMany({
       where: (fields) => eq(fields.userId, userId),
     });
   }
   ```

3. **Query Result Types**: Define interfaces for results
   ```typescript
   interface Link {
     id: string;
     shortCode: string;
     originalUrl: string;
     clickCount: number;
     createdAt: Date;
     expiresAt?: Date;
   }
   ```

### Data Validation

Use validation libraries (e.g., Zod) for API inputs:

```typescript
import { z } from "zod";

const createLinkSchema = z.object({
  originalUrl: z.string().url("Invalid URL"),
  customCode: z.string().min(3).max(8).optional(),
  expiresAt: z.date().optional(),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;
```

---

## API Routes & Endpoints

### API Route Structure

API routes should be in `app/api/[route]/route.ts`:

```typescript
// app/api/links/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    // Process request

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### Error Handling

1. Catch and log errors appropriately
2. Return proper HTTP status codes
3. Provide meaningful error messages to clients

```typescript
try {
  // Operation
} catch (error) {
  if (error instanceof ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  console.error("Unexpected error:", error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
```

---

## Authentication (Clerk)

⚠️ **BEFORE implementing authentication, ALWAYS read `/docs/authentication.md` for complete Clerk integration patterns.**

### Accessing User Info

```typescript
// Server Component
import { currentUser } from '@clerk/nextjs/server';

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return <div>Welcome, {user.firstName}</div>;
}
```

### Protecting Routes

⚠️ **IMPORTANT**: `middleware.ts` is **DEPRECATED** in this project's version of Next.js. **NEVER use `middleware.ts`**. Use `proxy.ts` instead for authentication middleware and route protection.

1. Use Clerk middleware in `proxy.ts` (not middleware.ts)
2. Check authentication in server components
3. Use `<SignedIn>` / `<SignedOut>` components in client components

---

## Performance & Optimization

### Image Optimization

Always use `next/image` for images:

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={100}
  height={100}
  priority={true} // Only for above-the-fold images
/>
```

### Data Fetching

- Use server components for data fetching when possible
- Cache queries appropriately using `unstable_cache`
- Minimize re-renders with proper dependency arrays in hooks

### Code Splitting

- Lazy load components when appropriate using `dynamic`:

  ```typescript
  import dynamic from 'next/dynamic';

  const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
    loading: () => <div>Loading...</div>,
  });
  ```

---

## Testing Standards

### Test File Location

- Unit tests: `*.test.ts` or `*.spec.ts` in same directory as source
- Integration tests: `__tests__/` directory

### Test Naming

```typescript
describe("Link", () => {
  it("should create a shortened URL", () => {
    // Test implementation
  });

  it("should validate long URLs", () => {
    // Test implementation
  });
});
```

---

## Security Best Practices

1. **Never commit secrets** to version control
2. **Validate all inputs** on the server side
3. **Sanitize URLs** before storing in database
4. **Use environment variables** for sensitive configuration
5. **Implement rate limiting** on public endpoints
6. **Use HTTPS only** in production
7. **Validate CORS** origins appropriately

### Environment Variables

```env
# .env.local (Never commit!)
DATABASE_URL=postgresql://user:password@host/db
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
```

---

## Linting & Code Quality

### ESLint

The project uses ESLint with Next.js and TypeScript configurations. Run linting:

```bash
npm run lint
```

**ESLint Rules**:

- Follow Next.js best practices
- TypeScript strict mode rules
- No unused variables
- Proper import ordering

### Code Style

- 2-space indentation
- Semicolons required
- Single quotes for strings (when possible; JSX uses double)
- No trailing commas on single-line objects
- Maximum line length: 100 characters (soft limit)

---

## Common Patterns

### Utility Functions

Place utility functions in `/lib`:

```typescript
// lib/url-utils.ts
export function generateShortCode(length: number = 6): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

### Custom Hooks

Place custom hooks in `/lib/hooks`:

```typescript
// lib/hooks/useLinks.ts
import { useState, useEffect } from "react";

export function useLinks(userId: string) {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`/api/links?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch links");
        const data = await response.json();
        setLinks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [userId]);

  return { links, isLoading, error };
}
```

### Form Handling

```typescript
"use client";

import { useState } from 'react';

interface FormData {
  originalUrl: string;
  customCode?: string;
}

export default function LinkForm() {
  const [formData, setFormData] = useState<FormData>({
    originalUrl: '',
    customCode: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create link');
      }

      // Reset form on success
      setFormData({ originalUrl: '', customCode: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

---

## Documentation Requirements

### Code Comments

- Comment complex logic, not obvious code
- Keep comments up-to-date with code changes
- Use JSDoc for functions in utility files

```typescript
/**
 * Generates a unique short code for URL shortening
 * @param length - Length of the short code (default: 6)
 * @returns A random alphanumeric string
 */
export function generateShortCode(length: number = 6): string {
  // Implementation
}
```

### File Headers

Include a brief description at the top of utility files:

```typescript
/**
 * URL utilities for validation and transformation
 * Handles URL normalization, validation, and short code generation
 */

import type { URL } from "url";
```

---

## Build & Deployment

### Build Process

```bash
npm run build    # Build for production
npm run dev      # Development server
npm run lint     # Run linter
npm start        # Start production server
```

### Environment Setup

1. Copy `.env.example` to `.env.local`
2. Fill in all required environment variables
3. Never commit `.env.local`

---

## Continuous Improvement

- Review existing code patterns before implementing new features
- Keep dependencies updated
- Monitor for deprecated APIs
- Refactor legacy code gradually
- Document architectural decisions

---

## References & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Best Practices](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Drizzle ORM Guide](https://orm.drizzle.team)
- [Clerk Documentation](https://clerk.com/docs)

---

## Individual Agent Instruction Files

### ⚠️ MANDATORY: Read Before Coding

For specialized tasks and workflows, individual agent instructions are available in the `/docs` directory. **ALWAYS refer to the relevant .md file BEFORE generating any code.** These files contain critical domain-specific patterns, conventions, and requirements that must be followed.

Failing to read these files will result in code that violates project standards and may require rework.

### Available Documentation

#### 1. [Authentication](docs/authentication.md) - **READ THIS FOR ALL AUTH WORK**

- Clerk-based authentication patterns and best practices
- Protected routes and middleware
- Dashboard route protection
- Homepage redirect for authenticated users
- Sign in/sign up modal flows
- **Requirement**: All auth via Clerk only

#### 2. [UI Components](docs/ui-components.md) - **READ THIS FOR ALL UI WORK**

- shadcn/ui component standards and usage patterns
- Component composition and organization
- Tailwind CSS styling guidelines and conventions
- **Requirement**: All UI elements use shadcn/ui
- **Requirement**: No custom UI components allowed

---

**Before starting ANY feature, task, or code generation:**

- Check if there's a relevant .md file in `/docs`
- If yes, read it completely
- If unsure, default to reading the relevant documentation
- Use these patterns as your primary reference

---

**Last Updated**: May 2026  
**Version**: 1.0.0
