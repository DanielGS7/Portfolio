'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Placeholder contact info - Daniel will fill these in
  const contactInfo = {
    email: 'daniel@example.com',
    phone: '+32 xxx xxx xxx',
    linkedin: 'https://linkedin.com/in/daniel-garriga-segui',
    teams: 'daniel@example.com',
    whatsapp: '+32xxxxxxxxx',
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const contactMethods = [
    {
      key: 'email',
      icon: '📧',
      value: contactInfo.email,
      action: () => copyToClipboard(contactInfo.email, 'email'),
      actionLabel: copiedEmail ? '✓ Copied!' : t('copyEmail'),
      color: 'var(--color-primary)',
    },
    {
      key: 'phone',
      icon: '📱',
      value: contactInfo.phone,
      action: () => copyToClipboard(contactInfo.phone, 'phone'),
      actionLabel: copiedPhone ? '✓ Copied!' : t('copyPhone'),
      color: 'var(--color-accent)',
    },
    {
      key: 'linkedin',
      icon: '💼',
      value: 'LinkedIn',
      action: () => window.open(contactInfo.linkedin, '_blank'),
      actionLabel: t('open'),
      color: 'var(--color-tertiary)',
    },
    {
      key: 'teams',
      icon: '👥',
      value: contactInfo.teams,
      action: () => window.open(`https://teams.microsoft.com/l/chat/0/0?users=${contactInfo.teams}`, '_blank'),
      actionLabel: t('open'),
      color: 'var(--color-secondary)',
    },
    {
      key: 'whatsapp',
      icon: '💬',
      value: t('available'),
      action: () => window.open(`https://wa.me/${contactInfo.whatsapp.replace(/\s/g, '')}`, '_blank'),
      actionLabel: t('open'),
      color: 'var(--color-accent)',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>
          <p className="text-xl text-[rgb(var(--text-light))] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.key}
              className="group glass-strong rounded-3xl p-8 hover:scale-105 transition-transform shadow-lg hover:shadow-xl border border-[rgba(var(--color-primary)/0.1)] text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                style={{ backgroundColor: `rgba(${method.color}/0.1)` }}
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {method.icon}
              </motion.div>

              {/* Content */}
              <div className="flex-1 w-full">
                <h3 className="text-lg font-bold mb-2 text-[rgb(var(--foreground))]">
                  {t(method.key)}
                </h3>
                <p className="text-sm text-[rgb(var(--text-light))] mb-4">
                  {method.value}
                </p>
                <motion.button
                  onClick={method.action}
                  className="text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[rgba(var(--color-primary)/0.1)] transition-colors"
                  style={{ color: `rgb(${method.color})` }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {method.actionLabel}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Note */}
        <motion.div
          className="p-6 glass rounded-2xl border-2 border-[rgb(var(--color-accent))] border-dashed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-[rgb(var(--text-light))] text-center">
            💡 <strong>Note:</strong> Update contact information in /app/[locale]/contact/page.tsx
          </p>
        </motion.div>
      </div>
    </div>
  );
}
