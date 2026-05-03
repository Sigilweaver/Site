/**
 * Site-wide Footer Component
 */

export interface FooterLink {
    label: string;
    href: string;
    isExternal?: boolean;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterConfig {
    columns: FooterColumn[];
    copyright: string;
}

export const defaultFooterConfig: FooterConfig = {
    columns: [
        {
            title: 'Projects',
            links: [
                { label: 'Loom', href: '/loom/' },
                { label: 'OpenYXDB', href: '/openyxdb/' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { label: 'Loom Docs', href: '/loom/docs' },
                { label: 'Loom Downloads', href: '/loom/downloads' },
                { label: 'GitHub', href: 'https://github.com/Sigilweaver', isExternal: true },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Terms of Use', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
            ],
        },
    ],
    copyright: `© ${new Date().getFullYear()} Sigilweaver Holdings LLC. Sigilweaver™ is a trademark of Sigilweaver Holdings LLC.`,
};

export function createFooter(config: FooterConfig = defaultFooterConfig): string {
    return `
    <footer class="bg-mystic-900 border-t border-mystic-700 py-12 mt-auto">
      <div class="container mx-auto px-6 max-w-4xl">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
          ${config.columns.map(col => `
            <div>
              <h4 class="font-semibold text-mystic-200 mb-3 text-sm uppercase tracking-wider">${col.title}</h4>
              <ul class="space-y-2 text-mystic-400 text-sm">
                ${col.links.map(link => `
                  <li>
                    <a href="${link.href}"
                       class="hover:text-gold-400 transition-colors"
                       ${link.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                      ${link.label}
                    </a>
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        <div class="border-t border-mystic-700 pt-8 text-center text-mystic-400 text-sm">
          <p>${config.copyright}</p>
        </div>
      </div>
    </footer>
  `;
}
