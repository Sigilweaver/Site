/**
 * Site-wide Header Component
 * Responsive navigation with mobile menu
 */

import { NavConfig, siteNavConfig } from './config';

export interface HeaderOptions {
    config?: NavConfig;
    title?: string;
}

export function createHeader(options: HeaderOptions = {}): string {
    const { config = siteNavConfig, title } = options;

    const displayTitle = title || 'Sigilweaver';

    return `
    <nav class="fixed top-0 w-full z-50 nav-bar" role="navigation" aria-label="Main navigation">
      <div class="container mx-auto px-6 py-3">
        <div class="flex items-center justify-between">
          <a href="${config.logo.href}" class="flex items-center space-x-2 group">
            <img src="${config.logo.src}" alt="${config.logo.alt}" width="32" height="32" class="w-8 h-8">
            <span class="text-xl font-bold text-mystic-200 group-hover:text-gold-400 transition-colors">${displayTitle}</span>
          </a>
          <div class="hidden md:flex items-center space-x-8">
            ${config.links.map(link => `
              <a href="${link.href}"
                 class="nav-link"
                 ${link.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                ${link.label}
              </a>
            `).join('')}
            ${config.ctaButton ? `
              <a href="${config.ctaButton.href}" class="cta-button">
                ${config.ctaButton.label}
              </a>
            ` : ''}
          </div>
          <button class="md:hidden text-mystic-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-opacity-50 rounded-md p-1" id="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </nav>

    <div id="mobile-menu" class="fixed top-[60px] left-0 w-full z-40 md:hidden mobile-menu hidden" role="navigation" aria-label="Mobile navigation">
      <div class="container mx-auto px-6 py-3">
        <div class="space-y-3" role="menu">
          ${config.links.map(link => `
            <a href="${link.href}"
               class="block nav-link mobile-link"
               role="menuitem"
               ${link.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>
              ${link.label}
            </a>
          `).join('')}
          ${config.ctaButton ? `
            <a href="${config.ctaButton.href}" class="block cta-button text-center mobile-link" role="menuitem">
              ${config.ctaButton.label}
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}
