/**
 * Simple page entry point
 * For Loom pages that don't need full site functionality (error pages, legal pages)
 */

import '../../styles/global.css';
import '@styles/main.css';
import { initSite } from '../../site/client';
import { createIcons, Clipboard, Heart, BookOpen } from 'lucide';

document.addEventListener('DOMContentLoaded', () => {
  initSite();

  createIcons({
    icons: {
      Clipboard,
      Heart,
      BookOpen
    }
  });
});
