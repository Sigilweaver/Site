/**
 * Simple page entry point
 * For pages that use the site-wide layout (legal, error pages, etc.)
 */

import '../styles/global.css';
import { initializeLayout, siteNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: siteNavConfig, title: 'Sigilweaver' },
    });
});
