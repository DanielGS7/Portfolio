import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { ThemeProvider } from '@/lib/hooks/use-theme';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titles = {
    nl: 'Webcave - Daniel Garriga Segui | Full-Stack Developer',
    en: 'Webcave - Daniel Garriga Segui | Full-Stack Developer',
    fr: 'Webcave - Daniel Garriga Segui | Développeur Full-Stack',
  };

  const descriptions = {
    nl: 'Portfolio van Daniel Garriga Segui - Full-Stack Developer & LLM Integration Enthousiast gespecialiseerd in site migratie en moderne weboplossingen.',
    en: 'Portfolio of Daniel Garriga Segui - Full-Stack Developer & LLM Integration Enthusiast specializing in site migration and modern web solutions.',
    fr: 'Portfolio de Daniel Garriga Segui - Développeur Full-Stack & Passionné d\'intégration LLM spécialisé dans la migration de sites et les solutions web modernes.',
  };

  return {
    title: titles[locale as Locale] || titles.nl,
    description: descriptions[locale as Locale] || descriptions.nl,
    keywords: ['Full-Stack Developer', 'LLM Integration', 'Data Migration', 'Web Development', 'Next.js', 'React'],
    authors: [{ name: 'Daniel Garriga Segui' }],
    openGraph: {
      title: titles[locale as Locale] || titles.nl,
      description: descriptions[locale as Locale] || descriptions.nl,
      type: 'website',
      locale: locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Fetch messages for the locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider defaultTheme="dark">
        <div className="min-h-screen flex flex-col w-full">
          <Header />
          <main className="flex-1 pt-24 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
