/**
 * Site-wide navigation configuration
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
    ctaButton?: {
        label: string;
        href: string;
    };
}

/**
 * Default site-wide navigation
 */
export const siteNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/',
    },
    links: [
        { label: 'Loom', href: '/loom/' },
        { label: 'OpenYXDB', href: '/openyxdb/' },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver', isExternal: true },
    ],
};

/**
 * Loom section navigation
 */
export const loomNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver Loom',
        href: '/loom/',
    },
    links: [
        { label: 'Docs', href: '/loom/docs' },
        { label: 'Contributing', href: '/loom/contributing.html' },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/Loom', isExternal: true },
    ],
    ctaButton: {
        label: 'Download',
        href: '/loom/downloads',
    },
};

/**
 * Loom simple navigation (legal/error pages)
 */
export const loomSimpleNavConfig: NavConfig = {
    logo: loomNavConfig.logo,
    links: [
        { label: 'Home', href: '/loom/' },
        { label: 'Downloads', href: '/loom/downloads' },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver', isExternal: true },
    ],
    ctaButton: loomNavConfig.ctaButton,
};

/**
 * OpenYXDB section navigation
 */
export const openyxdbNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/openyxdb/',
    },
    links: [
        { label: 'Docs', href: '/openyxdb/docs' },
        { label: 'PyPI', href: 'https://pypi.org/project/openyxdb/', isExternal: true },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/OpenYXDB', isExternal: true },
    ],
};

/**
 * OpenTFRaw section navigation
 */
export const opentfrawNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/opentfraw/',
    },
    links: [
        { label: 'Docs', href: '/opentfraw/docs' },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/OpenTFRaw', isExternal: true },
    ],
};

/**
 * OpenTDF section navigation
 */
export const opentdfNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/opentdf/',
    },
    links: [
        { label: 'Docs', href: '/opentdf/docs' },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/OpenTDF', isExternal: true },
    ],
};
