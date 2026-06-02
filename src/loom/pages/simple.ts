/**
 * Simple page entry point
 * For Loom pages that don't need full site functionality (error pages, legal pages)
 */

import '../../styles/global.css';
import '@styles/main.css';
import { initializeLayout, loomSimpleNavConfig } from '../../components';
import { createIcons, Clipboard, Heart } from 'lucide';

document.addEventListener('DOMContentLoaded', () => {
  initializeLayout({
    header: { config: loomSimpleNavConfig },
  });

  createIcons({
    icons: {
      Clipboard,
      Heart
    }
  });
});
