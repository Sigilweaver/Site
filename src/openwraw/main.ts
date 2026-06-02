import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, openwrawNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: openwrawNavConfig },
    });
});
