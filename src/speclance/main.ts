import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, speclanceNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: speclanceNavConfig },
    });
});
