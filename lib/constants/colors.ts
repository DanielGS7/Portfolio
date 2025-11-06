/**
 * Color palette for Webcave portfolio
 *
 * Light mode inspired by empoweredbysuperfoods.com
 * Dark mode adjusted using color theory for accessibility and visual harmony
 */

export const colors = {
  light: {
    // Primary colors
    primary: '#e2ae2b',        // Gold/Amber - main accent
    primaryDark: '#7f6700',    // Dark brown
    secondary: '#7d185e',      // Purple accent
    tertiary: '#0036aa',       // Navy blue

    // Backgrounds
    background: '#fff9f6',     // Cream background
    backgroundAlt: '#ffffff',  // White secondary
    surface: 'rgba(255, 255, 255, 0.8)', // Glassmorphism surface

    // Text
    text: '#474747',           // Dark gray text
    textLight: '#666666',      // Lighter text
    textMuted: '#999999',      // Muted text

    // Accent
    accent: '#00b5dd',         // Cyan accent
    accentHover: '#0096b8',    // Darker cyan

    // UI Elements
    border: '#e0e0e0',
    borderHover: '#c0c0c0',

    // Shadows
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowStrong: 'rgba(0, 0, 0, 0.2)',
  },

  dark: {
    // Primary colors (adjusted for dark mode)
    primary: '#f5c842',        // Brighter gold for dark bg
    primaryDark: '#d4a528',    // Medium gold
    secondary: '#b5549f',      // Lighter purple for dark bg
    tertiary: '#4d7fff',       // Brighter blue for visibility

    // Backgrounds
    background: '#0a0a0a',     // Near black
    backgroundAlt: '#141414',  // Dark gray
    surface: 'rgba(20, 20, 20, 0.8)', // Glassmorphism dark surface

    // Text
    text: '#e8e8e8',           // Light gray text
    textLight: '#b8b8b8',      // Medium gray
    textMuted: '#888888',      // Muted gray

    // Accent
    accent: '#1dd1ff',         // Brighter cyan for dark mode
    accentHover: '#00b8e6',    // Hover cyan

    // UI Elements
    border: '#2a2a2a',
    borderHover: '#404040',

    // Shadows
    shadow: 'rgba(0, 0, 0, 0.4)',
    shadowStrong: 'rgba(0, 0, 0, 0.6)',
  }
} as const;

export type ColorMode = 'light' | 'dark';
export type ColorPalette = typeof colors.light;
