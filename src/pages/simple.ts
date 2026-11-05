/**
 * Simple page entry point
 * For pages that use the site-wide layout (legal, error pages, etc.)
 */

import '../styles/global.css';
import { initSite } from '../site/client';

document.addEventListener('DOMContentLoaded', () => {
    initSite();
});
