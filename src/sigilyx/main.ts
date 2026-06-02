import '../styles/global.css';
import { initializeLayout, sigilyxNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: sigilyxNavConfig },
    });
});
