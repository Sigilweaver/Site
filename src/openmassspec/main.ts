import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, openmassspecNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: openmassspecNavConfig },
    });
});
