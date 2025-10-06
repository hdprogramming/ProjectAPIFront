// src/utils/ExperimentIcons.js

import { 
    faPlug, faMicrochip, faMagnet, faRecycle, faBatteryFull, 
    faCalculator, faBolt, faSliders, faVial, faRocket, faAtom 
} from '@fortawesome/free-solid-svg-icons'; 

// Tüm ikonları, veri setinizdeki 'icon' alanıyla eşleşecek key'lerle topluyoruz.
export const IconsTable = {
    // Key'ler (solda), veri setinizdeki 'icon' değerleridir.
    'plug': faPlug,
    'microchip': faMicrochip,
    'magnet': faMagnet,
    'recycle': faRecycle,
    'battery': faBatteryFull,
    'calculator': faCalculator,
    'bolt': faBolt,
    'sliders': faSliders,
    'vial': faVial, // Varsayılan için bir isim verilebilir
    'rocket': faRocket,
    'atom': faAtom,
};

// Bilinmeyen ikonlar için varsayılan bir ikon tanımlıyoruz.
export const DEFAULT_ICON = faVial;