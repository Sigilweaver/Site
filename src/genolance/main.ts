import '../styles/global.css';
import { initializeLayout, genolanceNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: genolanceNavConfig },
    });
});
