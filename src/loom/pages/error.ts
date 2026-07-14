/**
 * Error page entry point
 * For error pages (403, 404, 418, 500, 502, 503)
 * These pages only have styles, no interactive elements
 */

import '../../styles/global.css';
import '@styles/main.css';
import { createIcons, Shield, Lock, Key, Clipboard, MessageSquare, Coffee, Wand2, Bomb, Sparkles, Scroll, Bird, Orbit, Zap, Wrench, Timer, Moon, Settings, Brush, Clock } from 'lucide';

document.addEventListener('DOMContentLoaded', () => {
  createIcons({
    icons: {
      Shield, Lock, Key, Clipboard, MessageSquare, Coffee, Wand2, Bomb, Sparkles, Scroll, Bird, Orbit, Zap, Wrench, Timer, Moon, Settings, Brush, Clock
    }
  });
});
