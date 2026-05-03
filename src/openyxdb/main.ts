import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, openyxdbNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: openyxdbNavConfig, title: 'OpenYXDB' },
    });
});
