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
                mystic: {
                    900: '#1a0b2e',
                    800: '#2d1b42',
                    700: '#4c2a6b',
                    600: '#6b3fa0',
                    500: '#8b5cf6',
                    400: '#a78bfa',
                    300: '#c4b5fd',
                    200: '#ddd6fe',
                    100: '#f3f0ff',
                },
                gold: {
                    500: '#f59e0b',
                    400: '#fbbf24',
                    300: '#fcd34d',
                    200: '#fef3c7',
                },
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
                    from: { boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)' },
                    to: { boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.6)' },
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
