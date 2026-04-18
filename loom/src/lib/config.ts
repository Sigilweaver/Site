/**
 * Navigation configuration
 * Centralized config for header navigation links
 */

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavConfig {
  logo: {
    src: string;
    alt: string;
    href: string;
  };
  links: NavLink[];
  ctaButton: {
    label: string;
    href: string;
  };
}

/**
 * Default navigation configuration
 * Used across all pages for consistent navigation
 */
export const navConfig: NavConfig = {
  logo: {
    src: '/loom/icons/sigilweaver-logo.svg',
    alt: 'Sigilweaver Loom Logo',
    href: '/loom/',
  },
  links: [
    { label: 'Docs', href: '/loom/docs', isExternal: false },
    { label: 'Contributing', href: '/loom/contributing.html' },
  ],
  ctaButton: {
    label: 'Download',
    href: '/loom/downloads',
  },
};

/**
 * Simplified navigation for legal/error pages
 */
export const simpleNavConfig: NavConfig = {
  logo: navConfig.logo,
  links: [
    { label: 'Home', href: '/loom/' },
    { label: 'Downloads', href: '/loom/downloads' },
    { label: 'GitHub', href: 'https://github.com/Sigilweaver', isExternal: true },
  ],
  ctaButton: navConfig.ctaButton,
};
