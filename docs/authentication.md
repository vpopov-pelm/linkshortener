# Authentication Guide

This document defines authentication standards and patterns for the LinkShortener project.

## Overview

**All authentication in this application is handled exclusively by Clerk. No other authentication methods should be implemented.**

- Authentication provider: [Clerk](https://clerk.com)
- Protected routes: `/dashboard` and all sub-routes
- Public routes: `/` (homepage), `/sign-in`, `/sign-up`
- Authentication type: JWT-based via Clerk

---

## Clerk Integration

### Environment Variables

Required environment variables in `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

### Accessing User Information

#### Server Components

```typescript
import { currentUser } from '@clerk/nextjs/server';

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return <div>Welcome, {user.firstName}</div>;
}
```

#### Client Components

```typescript
"use client";

import { useUser } from '@clerk/nextjs';

export default function UserProfile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  return <div>Welcome, {user?.firstName}</div>;
}
```

#### API Routes

```typescript
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Process authenticated request
  return Response.json({ userId });
}
```

---

## Protected Routes

### Dashboard Route (`/dashboard`)

The `/dashboard` page is a protected route that requires authentication.

**Implementation**:

```typescript
// app/dashboard/page.tsx
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="dashboard">
      {/* Dashboard content */}
    </div>
  );
}
```

### Middleware Protection

Use Clerk middleware in `middleware.ts` to protect routes:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

---

## Homepage Navigation

### Behavior

- **Unauthenticated users**: Access homepage (`/`) normally
- **Authenticated users**: Redirect to `/dashboard` automatically

### Implementation

```typescript
// app/page.tsx
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="homepage">
      {/* Homepage for unauthenticated users */}
    </div>
  );
}
```

---

## Sign In & Sign Up Modals

### Modal-Based Authentication

Sign in and sign up flows **must always launch as modals**. Never redirect to separate sign-in/sign-up pages.

### Implementation with Clerk Components

```typescript
"use client";

import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function AuthButtons() {
  return (
    <div className="flex gap-4">
      <SignInButton mode="modal">
        <button>Sign In</button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button>Sign Up</button>
      </SignUpButton>
    </div>
  );
}
```

### User Menu with Sign Out

```typescript
"use client";

import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

export default function UserNav() {
  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </>
  );
}
```

---

## Best Practices

1. **Always check authentication in server components** before accessing protected data
2. **Use `auth().protect()`** in middleware for route-level protection
3. **Handle redirects properly** with `redirect()` function from `next/navigation`
4. **Never hardcode credentials** in code or commit `.env.local`
5. **Use modal mode** for all sign-in and sign-up flows
6. **Log out users** by redirecting to authenticated route handlers that use Clerk's `signOut()`

---

## Error Handling

### Unauthorized Access

When accessing protected routes without authentication:

```typescript
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Continue with authenticated logic
}
```

---

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk + Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk API Reference](https://clerk.com/docs/reference/backend-api)
