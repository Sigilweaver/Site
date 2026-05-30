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
        { label: 'Docs', href: '/docs/' },
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
        { label: 'PyPI', href: 'https://pypi.org/project/opentfraw/', isExternal: true },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/OpenTFRaw', isExternal: true },
    ],
};

/**
 * OpenTimsTDF section navigation
 */
export const opentimstdfNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/opentimstdf/',
    },
    links: [
        { label: 'Docs', href: '/opentimstdf/docs' },
        { label: 'PyPI', href: 'https://pypi.org/project/opentimstdf/', isExternal: true },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/OpenTimsTDF', isExternal: true },
    ],
};

/**
 * OpenWRaw section navigation
 */
export const openwrawNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/openwraw/',
    },
    links: [
        { label: 'Docs', href: '/openwraw/docs' },
        { label: 'PyPI', href: 'https://pypi.org/project/openwraw/', isExternal: true },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/OpenWRaw', isExternal: true },
    ],
};

/**
 * OpenProteo section navigation
 */
export const openproteoNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/openproteo/',
    },
    links: [
        { label: 'Docs', href: '/openproteo/docs' },
        { label: 'PyPI', href: 'https://pypi.org/project/openproteo/', isExternal: true },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/OpenProteo', isExternal: true },
    ],
};

/**
 * OpenSQLAnywhere section navigation
 */
export const opensqlanywhereNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/opensqlanywhere/',
    },
    links: [
        { label: 'Docs', href: '/opensqlanywhere/docs' },
        { label: 'crates.io', href: 'https://crates.io/crates/opensqlany', isExternal: true },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/OpenSQLAnywhere', isExternal: true },
    ],
};

/**
 * OpenQBW section navigation
 */
export const openqbwNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/openqbw/',
    },
    links: [
        { label: 'Docs', href: '/openqbw/docs' },
        { label: 'PyPI', href: 'https://pypi.org/project/openqbw/', isExternal: true },
        { label: 'crates.io', href: 'https://crates.io/crates/openqbw', isExternal: true },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/OpenQBW', isExternal: true },
    ],
};

/**
 * OpenKSpace section navigation
 */
export const openkspaceNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/openkspace/',
    },
    links: [
        { label: 'crates.io', href: 'https://crates.io/crates/openkspace-cli', isExternal: true },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/OpenKSpace', isExternal: true },
    ],
};

/**
 * DICOM Atlas section navigation
 */
export const dicomAtlasNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/dicom-atlas/',
    },
    links: [
        { label: 'PyPI', href: 'https://pypi.org/project/dicom-map/', isExternal: true },
        { label: 'crates.io', href: 'https://crates.io/crates/dicom-map', isExternal: true },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/DICOM-Atlas', isExternal: true },
    ],
};

/**
 * SigilYX section navigation
 */
export const sigilyxNavConfig: NavConfig = {
    logo: {
        src: '/icons/sigilweaver-logo.svg',
        alt: 'Sigilweaver',
        href: '/sigilyx/',
    },
    links: [
        { label: 'PyPI', href: 'https://pypi.org/project/sigilyx/', isExternal: true },
        { label: 'crates.io', href: 'https://crates.io/crates/sigilyx', isExternal: true },
        { label: 'GitHub', href: 'https://github.com/Sigilweaver/SigilYX', isExternal: true },
    ],
};
