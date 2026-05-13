# UI Components - shadcn/ui Guide

This document defines UI component standards for the LinkShortener project.

## Overview

**All UI elements in this application use shadcn/ui components. No custom components should be created. Always use shadcn/ui components.**

- Component library: [shadcn/ui](https://ui.shadcn.com)
- Styling: Tailwind CSS
- Component location: `/components/ui/`
- Custom components: **DO NOT CREATE** — use shadcn/ui instead

---

## Installation & Setup

### Adding Components

Install shadcn/ui components using the CLI:

```bash
npx shadcn-ui@latest add [component-name]
```

Example:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
```

Components are installed to `/components/ui/` and ready to use immediately.

---

## Available Components

Common shadcn/ui components used in LinkShortener:

- **Button** - Interactive buttons with variants (primary, secondary, ghost, outline)
- **Card** - Container for content with header, footer, and body
- **Input** - Text input fields with validation support
- **Label** - Form labels
- **Dialog** - Modal dialogs for important user interactions
- **Form** - React Hook Form integration for complex forms
- **Select** - Dropdown selection components
- **Textarea** - Multi-line text input
- **Toast** - Non-blocking notifications
- **Popover** - Floating content containers
- **Dropdown Menu** - Context menus and action menus
- **Alert** - Alert messages (success, error, warning, info)
- **Badge** - Small labels and tags
- **Separator** - Visual dividers

Browse all components: [shadcn/ui Components](https://ui.shadcn.com/docs/components)

---

## Usage Patterns

### Button Component

```typescript
import { Button } from '@/components/ui/button';

export default function Example() {
  return (
    <div className="flex gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}
```

### Card Component

```typescript
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function LinkCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Link Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>https://example.com/very-long-url</p>
      </CardContent>
      <CardFooter>
        <Button>Copy</Button>
      </CardFooter>
    </Card>
  );
}
```

### Form with Input

```typescript
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function LinkForm() {
  const [url, setUrl] = useState('');

  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="url">Original URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <Button type="submit">Create Link</Button>
    </form>
  );
}
```

### Dialog for Modals

```typescript
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export default function DeleteLinkDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete Link</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this link?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### Alert Component

```typescript
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ErrorAlert() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Failed to create link. Please try again.</AlertDescription>
    </Alert>
  );
}
```

---

## Customization

### Component Props

All shadcn/ui components accept standard HTML attributes and custom props:

```typescript
<Button
  onClick={handleClick}
  disabled={isLoading}
  className="custom-class"
  type="submit"
>
  Click Me
</Button>
```

### Tailwind CSS Overrides

Extend component styling with Tailwind classes:

```typescript
<Button className="w-full py-6 text-lg">
  Full Width Button
</Button>

<Card className="border-2 border-blue-500 shadow-lg">
  <CardContent>Custom Styled Card</CardContent>
</Card>
```

### Variants

Most shadcn/ui components support multiple variants:

```typescript
// Button variants
<Button variant="default" />      // Primary
<Button variant="secondary" />    // Secondary
<Button variant="outline" />      // Outlined
<Button variant="ghost" />        // Minimal
<Button variant="destructive" />  // Red/Error

// Size variants
<Button size="sm" />    // Small
<Button size="md" />    // Medium (default)
<Button size="lg" />    // Large
<Button size="icon" />  // Icon-only
```

---

## Icons

shadcn/ui integrates with [Lucide Icons](https://lucide.dev/):

```typescript
import { Copy, Trash2, Edit2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LinkActions() {
  return (
    <div className="flex gap-2">
      <Button size="icon" variant="ghost">
        <Copy className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Edit2 className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

---

## Best Practices

1. **Always import from `/components/ui/`** — Never create alternative UI component files
2. **Use semantic variants** — `variant="destructive"` for delete actions, not custom colors
3. **Leverage Tailwind for spacing** — Use `gap-`, `p-`, `m-` classes to compose layouts
4. **Follow existing patterns** — Check existing components in `/components/ui/` for consistency
5. **Use Lucide Icons** — Pair icons with components from the Lucide library
6. **Compose components** — Build complex UIs by combining multiple shadcn/ui components
7. **Respect accessibility** — All shadcn/ui components include ARIA attributes by default

---

## When to Avoid Custom Components

❌ **DO NOT create custom components for:**

- Buttons, inputs, forms
- Modals, dialogs, popovers
- Cards, containers
- Dropdowns, selects, menus
- Alerts, toasts, notifications
- Any standard UI element

✅ **DO create custom components for:**

- Business logic composition (e.g., `LinksList`, `UserDashboard`)
- Feature-specific wrappers that combine multiple shadcn/ui components
- Application-specific layouts and sections

Example of a proper custom component that uses shadcn/ui:

```typescript
// ✅ Custom component using shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LinkListItemProps {
  id: string;
  shortCode: string;
  originalUrl: string;
  clickCount: number;
}

export default function LinkListItem({
  id,
  shortCode,
  originalUrl,
  clickCount,
}: LinkListItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{shortCode}</span>
          <Badge>{clickCount} clicks</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{originalUrl}</p>
        <Button className="mt-4">View Analytics</Button>
      </CardContent>
    </Card>
  );
}
```

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Component Gallery](https://ui.shadcn.com/docs/components)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
