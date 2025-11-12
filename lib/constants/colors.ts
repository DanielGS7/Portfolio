/**
 * Color palette for Webcave portfolio
 *
 * Modern Developer palette - professional and clean
 */

export const colors = {
  light: {
    // Primary colors - Indigo/Violet professional palette
    primary: '#6366f1',        // Indigo 500
    primaryDark: '#4f46e5',    // Indigo 600
    secondary: '#8b5cf6',      // Violet 500
    tertiary: '#06b6d4',       // Cyan 500

    // Backgrounds
    background: '#fafafa',     // Neutral 50
    backgroundAlt: '#ffffff',  // White
    surface: 'rgba(255, 255, 255, 0.8)', // Glassmorphism surface

    // Text
    text: '#171717',           // Neutral 900
    textLight: '#404040',      // Neutral 700
    textMuted: '#737373',      // Neutral 500

    // Accent
    accent: '#8b5cf6',         // Violet 500
    accentHover: '#7c3aed',    // Violet 600

    // UI Elements
    border: '#e5e5e5',         // Neutral 200
    borderHover: '#d4d4d4',    // Neutral 300

    // Shadows
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowStrong: 'rgba(0, 0, 0, 0.2)',
  },

  dark: {
    // Primary colors
    primary: '#6366f1',        // Indigo 500
    primaryDark: '#818cf8',    // Indigo 400
    secondary: '#8b5cf6',      // Violet 500
    tertiary: '#06b6d4',       // Cyan 500

    // Backgrounds
    background: '#09090b',     // Zinc 950
    backgroundAlt: '#18181b',  // Zinc 900
    surface: 'rgba(24, 24, 27, 0.8)', // Glassmorphism dark surface

    // Text
    text: '#fafafa',           // Neutral 50
    textLight: '#d4d4d4',      // Neutral 300
    textMuted: '#a1a1aa',      // Zinc 400

    // Accent
    accent: '#8b5cf6',         // Violet 500
    accentHover: '#a78bfa',    // Violet 400

    // UI Elements
    border: '#27272a',         // Zinc 800
    borderHover: '#3f3f46',    // Zinc 700

    // Shadows
    shadow: 'rgba(0, 0, 0, 0.4)',
    shadowStrong: 'rgba(0, 0, 0, 0.6)',
  }
} as const;

export type ColorMode = 'light' | 'dark';
export type ColorPalette = typeof colors.light;
