/**
 * Small HTML string helpers for the build-time renderers.
 */

const ESCAPES: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

export function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/** Escape text and render `code` spans. */
export function inline(value: string): string {
    return escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>');
}

/** Strip the inline markup used in catalog text, for meta tags. */
export function plain(value: string): string {
    return value.replace(/[`[\]]/g, '');
}

/** Render a headline; text inside [brackets] gets the accent colour. */
export function headline(value: string): string {
    return escapeHtml(value).replace(/\[([^\]]+)\]/g, '<span class="text-accent">$1</span>');
}

/** Attributes for a link that leaves sigilweaver.app. */
export function externalAttrs(href: string): string {
    return /^https?:\/\//.test(href) ? ' rel="noopener noreferrer"' : '';
}

export function html(strings: TemplateStringsArray, ...values: unknown[]): string {
    let out = '';
    strings.forEach((s, i) => {
        out += s;
        if (i < values.length) {
            const v = values[i];
            out += Array.isArray(v) ? v.join('') : v === undefined || v === null || v === false ? '' : String(v);
        }
    });
    return out;
}
