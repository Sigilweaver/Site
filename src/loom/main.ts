/**
 * Loom main entry point
 */

import '../styles/global.css';
import '@styles/main.css';
import { initSite } from '../site/client';
import { createIcons, Shield, Check, Globe, Clipboard, AlertTriangle, BookOpen, Search, Sparkles, Lock, Lightbulb, Key, MessageSquare, UserCog, Moon, Settings, Brush, Coffee, Clock, Loader2, Zap, Wrench, Timer, Bomb, UserX, RefreshCw, FileText, Mail, Wand2, Menu, Heart, Target } from 'lucide';

document.addEventListener('DOMContentLoaded', () => {
  initSite();

  createIcons({
    icons: {
      Shield, Check, Globe, Clipboard, AlertTriangle, BookOpen, Search, Sparkles, Lock, Lightbulb, Key, MessageSquare, UserCog, Moon, Settings, Brush, Coffee, Clock, Loader2, Zap, Wrench, Timer, Bomb, UserX, RefreshCw, FileText, Mail, Wand2, Menu, Heart, Target
    }
  });
});
