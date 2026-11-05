/**
 * Contributing page entry point
 */

import '../../styles/global.css';
import '@styles/main.css';
import { initSite } from '../../site/client';
import { createIcons, Wand2, Server, Network, Scroll, Globe, BookOpen, Rocket, Heart } from 'lucide';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  initSite();

  // Initialize icons
  createIcons({
    icons: {
      Wand2, Server, Network, Scroll, Globe, BookOpen, Rocket, Heart
    }
  });
});
