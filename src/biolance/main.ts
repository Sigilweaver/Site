import '../styles/global.css';
import { initializeLayout, biolanceNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: biolanceNavConfig },
    });
});
