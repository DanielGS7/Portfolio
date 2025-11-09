# Portfolio Project - Quick Fixes Guide

## Priority Quick Wins (Do These First!)

### 1. Fix Language Switcher - No Full Page Reload
**File**: `/components/ui/language-switcher.tsx` (line 34)
**Current**:
```typescript
window.location.href = newPath;  // ❌ Full page reload, loses state
```
**Fix**:
```typescript
import { useRouter } from 'next/navigation';
// ... in component
const router = useRouter();
router.push(newPath);  // ✅ No reload, maintains state
```
**Impact**: Improves UX, maintains scroll position
**Time**: 5 minutes

---

### 2. Add ARIA Labels to Interactive Elements
**Files**: `/components/ui/language-switcher.tsx`, `/components/layout/header.tsx`
**Current**:
```typescript
<motion.button onClick={() => setIsOpen(!isOpen)}>
  {/* No aria-label or aria-expanded */}
</motion.button>
```
**Fix**:
```typescript
<motion.button 
  onClick={() => setIsOpen(!isOpen)}
  aria-label={isOpen ? "Close language menu" : "Open language menu"}
  aria-expanded={isOpen}
>
```
**Impact**: Better accessibility for screen readers
**Time**: 10 minutes

---

### 3. Move Placeholder Values to Environment Variables
**File**: `/app/[locale]/contact/page.tsx` (lines 13-19)
**Current**:
```typescript
const contactInfo = {
  email: 'daniel@example.com',  // ❌ Hardcoded placeholder
  phone: '+32 xxx xxx xxx',
};
```
**Fix**:
```typescript
const contactInfo = {
  email: process.env.NEXT_PUBLIC_EMAIL || 'contact@example.com',
  phone: process.env.NEXT_PUBLIC_PHONE || 'N/A',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN || '',
};
```
Create `.env.local`:
```
NEXT_PUBLIC_EMAIL=your.email@example.com
NEXT_PUBLIC_PHONE=+32 XXX XXX XXX
NEXT_PUBLIC_LINKEDIN=https://linkedin.com/in/your-profile
```
**Impact**: Safe to commit, easier configuration
**Time**: 10 minutes

---

### 4. Extract Hard-coded File Paths
**File**: `/app/[locale]/cv/page.tsx` (line 12)
**Current**:
```typescript
const cvPath = '/cv/Daniel_Garriga_Segui_CV.pdf';  // Duplicated elsewhere
```
**Fix - Create `/lib/constants/files.ts`**:
```typescript
export const FILES = {
  CV: '/cv/Daniel_Garriga_Segui_CV.pdf',
  RESUME: '/resume/resume.pdf',
} as const;

export type FileKey = keyof typeof FILES;
```
**Fix - Update page**:
```typescript
import { FILES } from '@/lib/constants/files';

const cvPath = FILES.CV;
```
**Impact**: Single source of truth, easier maintenance
**Time**: 5 minutes

---

### 5. Create Reusable AnimatedSection Component
**File**: Create `/components/layout/AnimatedSection.tsx`
```typescript
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSection({ 
  children, 
  delay = 0,
  className = '' 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
```

**Then in sections**, replace:
```typescript
// OLD - each file
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: '-100px' });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
>

// NEW - one line
<AnimatedSection>
```
**Impact**: 30+ lines of duplicated code eliminated
**Time**: 15 minutes

---

## Medium Priority Fixes (Do These Next)

### 6. Restore Scrollbar for Accessibility
**File**: `/app/globals.css` (lines 133-143)
**Current**:
```css
/* Hides scrollbar for everyone */
html::-webkit-scrollbar {
  display: none;
}
```
**Fix**:
```css
/* Style scrollbar instead of hiding */
html::-webkit-scrollbar {
  width: 10px;
}

html::-webkit-scrollbar-track {
  background: transparent;
}

html::-webkit-scrollbar-thumb {
  background: rgb(var(--color-primary));
  border-radius: 5px;
  opacity: 0.5;
}

html::-webkit-scrollbar-thumb:hover {
  opacity: 0.8;
}
```
**Impact**: Better accessibility, maintains custom look
**Time**: 5 minutes

---

### 7. Fix Hard-coded Redirect to Smart Locale Detection
**File**: `/app/page.tsx` (lines 1-21)
**Current**:
```typescript
router.replace('/nl');  // ❌ Always Dutch
```
**Fix**:
```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect user's preferred language
    const browserLang = navigator.language.split('-')[0];
    const supported = ['nl', 'en', 'fr'];
    const locale = supported.includes(browserLang) ? browserLang : 'nl';
    
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--background))]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--color-primary))] mx-auto mb-4"></div>
        <p className="text-[rgb(var(--text-light))]">Redirecting to Webcave...</p>
      </div>
    </div>
  );
}
```
**Impact**: Better UX, respects user's language preference
**Time**: 10 minutes

---

### 8. Remove Unnecessary suppressHydrationWarning
**File**: `/app/layout.tsx` (lines 9, 18)
**Current**:
```typescript
<html lang="nl" className="dark" suppressHydrationWarning>
  <body className="antialiased" suppressHydrationWarning>
```
**Fix**:
```typescript
<html lang="nl" className="dark">
  <body className="antialiased">
```
**Impact**: Cleaner code, removes false hydration warnings
**Time**: 2 minutes

---

### 9. Type the handleDrag Function
**File**: `/components/ui/timeline-nav.tsx` (lines 105-106)
**Current**:
```typescript
const handleDrag = (event: any, info: any) => {  // ❌ any types
```
**Fix**:
```typescript
import { type Drag, type DragHandlers } from 'framer-motion';

const handleDrag = ((event: DragEvent, info: any) => {
  // ... rest of code
}) as DragHandlers['onDrag'];
```
**Impact**: Better type safety
**Time**: 5 minutes

---

## Lower Priority (Nice to Have)

### 10. Extract Color/Icon Data to Constants
**Creates**: `/lib/constants/services-data.ts`
**Impact**: Single source of truth, easier to add new services/skills
**Time**: 20 minutes

---

## Summary of Time Investment

| Priority | Task | Time | Impact |
|----------|------|------|--------|
| 🔴 High | Fix language switcher | 5 min | High - Better UX |
| 🔴 High | Add ARIA labels | 10 min | High - Accessibility |
| 🔴 High | Environment variables | 10 min | High - Security |
| 🔴 High | File paths constant | 5 min | High - Maintenance |
| 🟡 Medium | AnimatedSection component | 15 min | High - DRY principle |
| 🟡 Medium | Restore scrollbar | 5 min | High - Accessibility |
| 🟡 Medium | Smart locale detection | 10 min | Medium - UX |
| 🟡 Medium | Remove suppressHydrationWarning | 2 min | Low - Code cleanup |
| 🟡 Medium | Type handleDrag | 5 min | Medium - Type safety |
| 🟢 Low | Extract constants | 20 min | Low - Maintenance |

**Total Time for All Quick Wins**: ~90 minutes
**Total Time for Medium Fixes**: ~52 minutes

---

## Testing These Changes

After each fix, test:

1. **Language Switcher**: Click language dropdown, change language, verify no full-page reload
2. **ARIA Labels**: Use screen reader or browser DevTools to verify labels
3. **Environment Variables**: Verify contact page shows real email/phone
4. **File Constants**: Change FILE.CV path and verify it updates everywhere
5. **Scrollbar**: Scroll page and verify custom scrollbar is visible
6. **Locale Detection**: Test with different browser language settings

---

## Next Steps

Once you complete these quick wins:

1. Set up testing (Jest + React Testing Library)
2. Consolidate scroll listeners into a Context
3. Split Timeline component into smaller pieces
4. Extract all remaining magic numbers to constants
5. Add E2E tests with Playwright

