/**
 * Browser behaviour for the server-rendered header and page widgets:
 * mobile menu, header shadow on scroll, and copy buttons.
 */

function initMobileMenu(): void {
    const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    const setOpen = (open: boolean) => {
        menu.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', () => setOpen(menu.hidden));
    menu.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.hidden) {
            setOpen(false);
            toggle.focus();
        }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
        if (e.matches) setOpen(false);
    });
}

function initHeaderShadow(): void {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
}

function initCopyButtons(): void {
    document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
        button.addEventListener('click', async () => {
            const text = button.dataset.copy ?? '';
            try {
                await navigator.clipboard.writeText(text);
                button.classList.add('is-copied');
                window.setTimeout(() => button.classList.remove('is-copied'), 1600);
            } catch (err) {
                // Clipboard access can be denied (insecure context, permissions).
                // Say so instead of pretending the copy worked.
                console.warn('Copy to clipboard failed:', err);
                button.setAttribute('title', 'Copy failed: select the text and copy it manually');
            }
        });
    });
}

type Theme = 'light' | 'dark';

function storedTheme(): Theme | null {
    try {
        const t = localStorage.getItem('theme');
        return t === 'light' || t === 'dark' ? t : null;
    } catch {
        // Storage can be blocked (private mode, cookie settings); fall back to the system theme.
        return null;
    }
}

function initThemeToggle(): void {
    const root = document.documentElement;
    const system = window.matchMedia('(prefers-color-scheme: light)');
    const apply = (theme: Theme) => {
        root.setAttribute('data-theme', theme);
        document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((b) => {
            b.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        });
    };

    apply(storedTheme() ?? (system.matches ? 'light' : 'dark'));
    system.addEventListener('change', (e) => {
        if (!storedTheme()) apply(e.matches ? 'light' : 'dark');
    });

    document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
        button.hidden = false;
        button.addEventListener('click', () => {
            const next: Theme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            apply(next);
            try {
                localStorage.setItem('theme', next);
            } catch (err) {
                console.warn('Could not save the theme choice; it applies to this page only.', err);
            }
        });
    });
}

export function initSite(): void {
    initThemeToggle();
    initMobileMenu();
    initHeaderShadow();
    initCopyButtons();
}
