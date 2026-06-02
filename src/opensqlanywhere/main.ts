import '../styles/global.css';
import { initializeLayout, opensqlanywhereNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: opensqlanywhereNavConfig },
    });
});
