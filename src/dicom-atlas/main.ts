import '../styles/global.css';
import { initializeLayout, dicomAtlasNavConfig } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initializeLayout({
        header: { config: dicomAtlasNavConfig, title: 'DICOM Atlas' },
    });
});
