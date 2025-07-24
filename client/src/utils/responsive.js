// Responsive utility functions and constants for the Campus Map application

export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
};

// Media query strings
export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.tablet}px)`,
  mobileOnly: `@media (max-width: ${breakpoints.mobile - 1}px)`,
  tabletAndUp: `@media (min-width: ${breakpoints.mobile}px)`,
};

// Responsive spacing utilities
export const spacing = {
  mobile: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  tablet: {
    xs: 6,
    sm: 12,
    md: 20,
    lg: 28,
    xl: 36,
  },
  desktop: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
};

// Touch-friendly sizes
export const touchTarget = {
  minimum: 44, // iOS/Android minimum touch target
  comfortable: 48, // More comfortable touch target
  large: 56, // Large touch target for important actions
};

// Responsive font sizes
export const typography = {
  mobile: {
    h1: '2rem',
    h2: '1.75rem',
    h3: '1.5rem',
    h4: '1.25rem',
    h5: '1.125rem',
    h6: '1rem',
    body1: '0.875rem',
    body2: '0.75rem',
    caption: '0.625rem',
  },
  tablet: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1.125rem',
    body1: '1rem',
    body2: '0.875rem',
    caption: '0.75rem',
  },
  desktop: {
    h1: '3rem',
    h2: '2.5rem',
    h3: '2rem',
    h4: '1.75rem',
    h5: '1.5rem',
    h6: '1.25rem',
    body1: '1rem',
    body2: '0.875rem',
    caption: '0.75rem',
  },
};

// Responsive helper functions
export const getResponsiveValue = (mobile, tablet, desktop, currentBreakpoint) => {
  switch (currentBreakpoint) {
    case 'mobile':
      return mobile;
    case 'tablet':
      return tablet || mobile;
    case 'desktop':
    default:
      return desktop || tablet || mobile;
  }
};

export const getSpacing = (size, breakpoint = 'desktop') => {
  return spacing[breakpoint][size] || spacing.desktop[size];
};

// Map-specific responsive utilities
export const mapConfig = {
  mobile: {
    zoom: 15,
    height: '50vh', // For sideload overlay
    buttonSize: 'small',
    sideloadWidth: '100%',
  },
  tablet: {
    zoom: 15.5,
    height: '91vh',
    buttonSize: 'medium',
    sideloadWidth: '50vw',
  },
  desktop: {
    zoom: 16,
    height: '91vh',
    buttonSize: 'medium',
    sideloadWidth: '30vw',
  },
};

// Component-specific responsive utilities
export const componentConfig = {
  navbar: {
    mobile: {
      logoHeight: 35,
      searchWidth: '100%',
      menuType: 'drawer',
    },
    tablet: {
      logoHeight: 40,
      searchWidth: '250px',
      menuType: 'inline',
    },
    desktop: {
      logoHeight: 45,
      searchWidth: '300px',
      menuType: 'inline',
    },
  },
  filterButtons: {
    mobile: {
      type: 'speedDial',
      position: { bottom: 16, right: 16 },
    },
    tablet: {
      type: 'panel',
      position: { bottom: 50, right: 30 },
    },
    desktop: {
      type: 'panel',
      position: { bottom: 50, right: 30 },
    },
  },
  popup: {
    mobile: {
      buttonHeight: 44,
      fontSize: '0.875rem',
      padding: '12px 16px',
    },
    tablet: {
      buttonHeight: 36,
      fontSize: '0.875rem',
      padding: '8px 16px',
    },
    desktop: {
      buttonHeight: 32,
      fontSize: '0.75rem',
      padding: '6px 12px',
    },
  },
};

// Accessibility helpers
export const a11y = {
  focusVisible: {
    outline: '2px solid #1976d2',
    outlineOffset: '2px',
  },
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
  highContrast: '@media (prefers-contrast: high)',
};

// Performance optimization flags
export const performance = {
  enableAnimations: (breakpoint) => breakpoint !== 'mobile',
  enableParallax: (breakpoint) => breakpoint === 'desktop',
  enableHoverEffects: (breakpoint) => breakpoint !== 'mobile',
  reducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};

export default {
  breakpoints,
  mediaQueries,
  spacing,
  touchTarget,
  typography,
  getResponsiveValue,
  getSpacing,
  mapConfig,
  componentConfig,
  a11y,
  performance,
};
