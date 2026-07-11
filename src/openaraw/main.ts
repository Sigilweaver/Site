import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, openarawNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: openarawNavConfig },
    });
});
