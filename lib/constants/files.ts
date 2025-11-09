/**
 * File paths used throughout the application
 * Single source of truth for all file references
 */

export const FILES = {
  CV: '/cv/Daniel_Garriga_Segui_CV.pdf',
  CV_FILENAME: 'Daniel_Garriga_Segui_CV.pdf',
} as const;

export type FileKey = keyof typeof FILES;
