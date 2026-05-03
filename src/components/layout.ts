/**
 * Site-wide layout initialization
 * Injects shared header/footer and sets up navigation
 */

import { createHeader, HeaderOptions } from './Header';
import { createFooter, FooterConfig, defaultFooterConfig } from './Footer';
import { siteNavConfig } from './config';

export interface LayoutOptions {
    header?: HeaderOptions | false;
    footer?: FooterConfig | false;
    betaBanner?: boolean;
}

/**
 * Initialize the page layout
 */
export function initializeLayout(options: LayoutOptions = {}): void {
    const { header = {}, footer = defaultFooterConfig, betaBanner = false } = options;

    // Skip link
    document.body.insertAdjacentHTML(
        'afterbegin',
        `<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gold-500 text-mystic-900 px-4 py-2 rounded-md z-50 font-semibold">Skip to main content</a>`
    );

    // Header
    if (header !== false) {
        const headerContainer = document.getElementById('header-root');
        const html = createHeader(header);
        if (headerContainer) {
            headerContainer.innerHTML = html;
        } else {
            document.body.insertAdjacentHTML('afterbegin', html);
        }

        // Optional beta banner after header
        if (betaBanner) {
            const nav = document.querySelector('nav[role="navigation"]');
            if (nav) {
                nav.insertAdjacentHTML('afterend', `
          <div class="fixed top-[60px] w-full z-40 bg-gold-500/90 backdrop-blur-sm text-mystic-900 text-center text-sm py-2 px-4 font-medium" role="status">
            <span class="inline-flex items-center gap-2 flex-wrap justify-center">
              <span class="bg-mystic-900 text-gold-400 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Private Beta</span>
              <span>Sigilweaver Loom is in private beta — the repository is private and downloads are not yet available.</span>
            </span>
          </div>
        `);
            }
        }
    }

    // Footer
    if (footer !== false) {
        const footerContainer = document.getElementById('footer-root');
        const html = createFooter(footer);
        if (footerContainer) {
            footerContainer.innerHTML = html;
        } else {
            document.body.insertAdjacentHTML('beforeend', html);
        }
    }

    // Navigation behavior
    initializeMobileMenu();
    initializeScrollEffect();
}

function initializeMobileMenu(): void {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const open = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden', open);
        toggle.setAttribute('aria-expanded', String(!open));
    });

    document.querySelectorAll('.mobile-link').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!menu.classList.contains('hidden') && !menu.contains(e.target as Node) && !toggle.contains(e.target as Node)) {
            menu.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });
}

function initializeScrollEffect(): void {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.pageYOffset > 50) {
                    nav.classList.add('backdrop-blur-md', 'bg-mystic-900/95');
                } else {
                    nav.classList.remove('backdrop-blur-md', 'bg-mystic-900/95');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}
