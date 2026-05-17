import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, opentimstdfNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: opentimstdfNavConfig, title: 'OpenTimsTDF' },
    });
});
