/**
 * Contributing page entry point
 */

import '../../styles/global.css';
import '@styles/main.css';
import { initializeLayout, loomNavConfig } from '../../components';
import { createIcons, Wand2, Server, Network, Scroll, Globe, BookOpen, Rocket, Heart } from 'lucide';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  initializeLayout({
    header: { config: loomNavConfig },
    betaBanner: true,
  });

  // Initialize icons
  createIcons({
    icons: {
      Wand2, Server, Network, Scroll, Globe, BookOpen, Rocket, Heart
    }
  });
});
