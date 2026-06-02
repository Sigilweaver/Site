import './styles/global.css';
import { initializeLayout, siteNavConfig } from './components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: siteNavConfig },
    });
});
