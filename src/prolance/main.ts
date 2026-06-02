import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, prolanceNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: prolanceNavConfig },
    });
});
