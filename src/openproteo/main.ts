import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, openproteoNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: openproteoNavConfig, title: 'OpenProteo' },
    });
});
