import kaptenNalaImg from './kapten_nala_1791906531237.jpg';
import gunungMeletusImg from './gunung_meletus_1791906529026.jpg';
import awanPanasImg from './awan_panas_1791906529510.jpg';
import aliranLaharImg from './aliran_lahar_1791906530533.jpg';

export {
  kaptenNalaImg,
  gunungMeletusImg,
  awanPanasImg,
  aliranLaharImg,
};

export const resolveAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const clean = path.replace(/^\//, '');
  return `${base}${clean}`;
};

// Also export as a dictionary with semantic keys and metadata
export const APP_IMAGES = {
  kaptenNala: {
    src: kaptenNalaImg,
    fallback: resolveAssetUrl('images/kapten_nala.jpg'),
    alt: 'Kapten Nala - Komandan Ekspedisi Sains Vulkanik',
    title: 'Kapten Nala',
    description: 'Pemandu cilik ramah penjelajah gunung api Indonesia.',
  },
  gunungMeletus: {
    src: gunungMeletusImg,
    fallback: resolveAssetUrl('images/gunung_meletus.jpg'),
    alt: 'Visualisasi Detail Bagian Erupsi Gunung Berapi',
    title: 'Anatomi & Erupsi Gunung Api',
    description: 'Visualisasi lengkap kolom abu, kawah, magma, lava, dan bom vulkanik.',
  },
  awanPanas: {
    src: awanPanasImg,
    fallback: resolveAssetUrl('images/awan_panas.jpg'),
    alt: 'Gumpalan Awan Panas (Pyroclastic Flow) Meluncur di Lereng Merapi',
    title: 'Awan Panas (Wedhus Gembel)',
    description: 'Gulungan gas dan abu bersuhu 600°C yang meluncur sangat cepat di lereng gunung.',
  },
  aliranLahar: {
    src: aliranLaharImg,
    fallback: resolveAssetUrl('images/aliran_lahar.jpg'),
    alt: 'Aliran Banjir Lahar Dingin & Batu-Batu Besar di Sungai',
    title: 'Banjir Lahar Dingin di Sungai',
    description: 'Hujan lebat di puncak melarutkan abu vulkanik menjadi banjir lumpur dan menghanyutkan batu raksasa.',
  },
};

