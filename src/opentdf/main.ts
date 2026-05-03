import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, opentdfNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: opentdfNavConfig, title: 'OpenTDF' },
    });
});
