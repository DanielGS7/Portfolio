'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect user's preferred language from browser
    const browserLang = navigator.language.split('-')[0];
    const supportedLocales = ['nl', 'en', 'fr'];
    const locale = supportedLocales.includes(browserLang) ? browserLang : 'nl';

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
