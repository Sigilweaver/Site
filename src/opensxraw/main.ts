import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, opensxrawNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: opensxrawNavConfig },
    });
});
