import '../styles/global.css';
import { initializeLayout, openqvdNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: openqvdNavConfig },
    });
});
