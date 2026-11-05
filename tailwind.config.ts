import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/**/*.{html,ts,js}',
    ],
    theme: {
        extend: {
            colors: {
                // Semantic tokens, defined as RGB channels in src/styles/global.css.
                page: 'rgb(var(--c-page) / <alpha-value>)',
                surface: 'rgb(var(--c-surface) / <alpha-value>)',
                line: 'rgb(var(--c-line) / <alpha-value>)',
                strong: 'rgb(var(--c-strong) / <alpha-value>)',
                body: 'rgb(var(--c-body) / <alpha-value>)',
                muted: 'rgb(var(--c-muted) / <alpha-value>)',
                subtle: 'rgb(var(--c-subtle) / <alpha-value>)',
                accent: 'rgb(var(--c-accent) / <alpha-value>)',
                primary: 'rgb(var(--c-primary) / <alpha-value>)',
                // Legacy palette used by the hand-written pages. Values are CSS
                // variables so they follow the light/dark theme.
                mystic: Object.fromEntries(
                    [900, 800, 700, 600, 500, 400, 300, 200, 100].map((n) => [n, `rgb(var(--mystic-${n}) / <alpha-value>)`]),
                ),
                gold: Object.fromEntries(
                    [500, 400, 300, 200].map((n) => [n, `rgb(var(--gold-${n}) / <alpha-value>)`]),
                ),
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
                mystical: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                glow: 'glow 2s ease-in-out infinite alternate',
                'data-flow': 'dataFlow 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    from: { boxShadow: '0 0 5px rgb(var(--mystic-500) / 0.5)' },
                    to: { boxShadow: '0 0 20px rgb(var(--mystic-500) / 0.8), 0 0 30px rgb(var(--mystic-500) / 0.6)' },
                },
                dataFlow: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { transform: 'translateX(100vw)', opacity: '0' },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
