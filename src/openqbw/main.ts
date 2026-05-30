import '../styles/global.css';
import { initializeLayout, openqbwNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: openqbwNavConfig, title: 'OpenQBW' },
    });
});
