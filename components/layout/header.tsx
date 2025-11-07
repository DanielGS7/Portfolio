'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { ThemeToggle } from '../ui/theme-toggle';
import { LanguageSwitcher } from '../ui/language-switcher';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/lib/i18n/config';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as Locale) || 'nl';
  const { scrollY } = useScroll();

  // Transform scroll to header background opacity and blur
  const headerBgOpacity = useTransform(scrollY, [0, 100], [0.7, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [12, 20]);

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/contact`, label: t('contact') },
    { href: `/${locale}/cv`, label: t('cv') },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === '/';
    }
    return pathname === href;
  };

  return (
    <motion.header className="fixed inset-x-0 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          className="rounded-full shadow-lg border border-[rgba(var(--border)/0.3)]"
          style={{
            backgroundColor: useTransform(headerBgOpacity, (v) => `rgba(var(--surface), ${v})`),
            backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
            WebkitBackdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          }}
        >
          <nav className="flex items-center justify-between px-8 py-4">
          {/* Logo / Brand */}
          <Link href={`/${locale}`}>
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] bg-clip-text text-transparent px-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              WEBCAVE
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    'px-5 py-2.5 rounded-full text-base font-medium transition-colors relative',
                    isActive(item.href)
                      ? 'text-[rgb(var(--color-primary))]'
                      : 'text-[rgb(var(--text-light))] hover:text-[rgb(var(--foreground))]'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[rgb(var(--color-primary))]"
                      layoutId="nav-indicator"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right side - Theme & Language */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden px-6 pb-3 flex items-center justify-center gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-[rgba(var(--color-primary)/0.2)] text-[rgb(var(--color-primary))]'
                    : 'text-[rgb(var(--text-light))] hover:text-[rgb(var(--foreground))]'
                )}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
      </div>
    </motion.header>
  );
}
