'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FILES } from '@/lib/constants/files';

export default function CVPage() {
  const t = useTranslations('cv');
  const [pdfError, setPdfError] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = FILES.CV;
    link.download = FILES.CV_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-[rgb(var(--color-primary))]" style={{ fontFamily: 'var(--font-display)' }}>
            {t('title')}
          </h1>

          <motion.button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[rgb(var(--color-primary))] text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t('download')}
          </motion.button>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          className="glass-strong rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!pdfError ? (
            <iframe
              src={FILES.CV}
              className="w-full h-[80vh] bg-white"
              title="CV Viewer"
              onError={() => setPdfError(true)}
            />
          ) : (
            <div className="w-full h-[80vh] flex items-center justify-center bg-[rgb(var(--background-alt))]">
              <div className="text-center p-8">
                <div className="text-6xl mb-6">📄</div>
                <h3 className="text-2xl font-bold mb-3 text-[rgb(var(--foreground))]">
                  CV Not Found
                </h3>
                <p className="text-[rgb(var(--text-light))] mb-6 max-w-md">
                  Please upload your CV (PDF format) to <code className="px-2 py-1 rounded bg-[rgba(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]">/public{FILES.CV}</code>
                </p>
                <div className="p-4 bg-[rgba(var(--color-accent)/0.1)] rounded-xl text-left text-sm text-[rgb(var(--text-light))] max-w-lg mx-auto">
                  <p className="font-semibold mb-2">Steps:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Create folder: <code className="text-[rgb(var(--color-accent))]">/public/cv/</code></li>
                    <li>Upload your PDF as: <code className="text-[rgb(var(--color-accent))]">{FILES.CV_FILENAME}</code></li>
                    <li>Refresh this page</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Alternative: List view for mobile */}
        <motion.div
          className="mt-8 p-6 glass rounded-2xl border-2 border-[rgb(var(--color-primary))] border-dashed lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-[rgb(var(--text-light))] text-center">
            📱 For better viewing on mobile, please download the PDF using the button above
          </p>
        </motion.div>
      </div>
    </div>
  );
}
