import '../styles/global.css';
import { initializeLayout, openkspaceNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: openkspaceNavConfig, title: 'OpenKSpace' },
    });
});
