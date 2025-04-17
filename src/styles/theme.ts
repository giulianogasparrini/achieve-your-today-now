
// Theme configuration and constants

// Color palette
export const colors = {
  primary: {
    light: 'hsl(var(--primary) / 0.8)',
    DEFAULT: 'hsl(var(--primary))',
    dark: 'hsl(var(--primary) / 1.2)',
  },
  secondary: {
    light: 'hsl(var(--secondary) / 0.8)',
    DEFAULT: 'hsl(var(--secondary))',
    dark: 'hsl(var(--secondary) / 1.2)',
  },
  accent: {
    light: 'hsl(var(--accent) / 0.8)',
    DEFAULT: 'hsl(var(--accent))',
    dark: 'hsl(var(--accent) / 1.2)',
  },
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
  progress: {
    low: '#FF6B6B',
    medium: '#FFD166',
    high: '#06D6A0',
  },
  theme: {
    teal: '#06D6A0',
    purple: '#9B5DE5',
    blue: '#00BBF9',
    pink: '#F15BB5',
    orange: '#FF8600',
  },
};

// Breakpoints for responsive design
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Spacing scale
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// Font configuration
export const typography = {
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['Menlo', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
};

// Border radius
export const borderRadius = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',
  DEFAULT: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
};

// Animation durations
export const animation = {
  fast: '0.15s',
  normal: '0.3s',
  slow: '0.5s',
};

// Export the complete theme
const theme = {
  colors,
  breakpoints,
  spacing,
  typography,
  borderRadius,
  shadows,
  animation,
};

export default theme;
