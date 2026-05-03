import '../styles/global.css';
import './styles/main.css';
import { initializeLayout, opentfrawNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: opentfrawNavConfig, title: 'OpenTFRaw' },
    });
});
