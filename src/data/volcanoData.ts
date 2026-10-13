import { ExplanationSection, QuizQuestion, StageInfo, StoryboardScene } from '../types';

export const STAGES: StageInfo[] = [
  {
    id: 'pos1_pengenalan',
    order: 1,
    title: 'Pos 1: Dermaga Ekspedisi',
    subtitle: 'Pengenalan & Dapur Magma',
    icon: 'mountain',
    badge: 'Visual Erupsi Utama',
    description: 'Kenali apa itu gunung berapi dan mengapa bisa meletus dengan bahasa sederhana bersama Kapten Nala!',
  },
  {
    id: 'pos2_eksplanasi',
    order: 2,
    title: 'Pos 2: Lembah Teks Eksplanasi',
    subtitle: 'Struktur Teks Bahasa Indonesia',
    icon: 'book-open',
    badge: 'Teks Eksplanasi Kelas 6',
    description: 'Pelajari 3 bagian utama teks eksplanasi: Pernyataan Umum, Deretan Penjelas, dan Penutup.',
  },
  {
    id: 'pos3_awan_panas',
    order: 3,
    title: 'Pos 3: Kawah Awan Panas',
    subtitle: 'Wedhus Gembel & Material Erupsi',
    icon: 'flame',
    badge: 'Visual Awan Panas HD',
    description: 'Pelajari bahaya awan panas bersuhu 600°C yang meluncur di lereng dan amati titik hot-spotnya!',
  },
  {
    id: 'pos4_lahar_video',
    order: 4,
    title: 'Pos 4: Lembah Sungai Lahar',
    subtitle: 'Lahar Dingin, Video & Simulasi',
    icon: 'sparkles',
    badge: 'Visual Lahar & Video',
    description: 'Saksikan aliran lahar dingin di sungai, tonton video edukasi, dan uji lab simulator letusan!',
  },
  {
    id: 'pos5_kuis',
    order: 5,
    title: 'Pos 5: Gua Uji Kapten Nala',
    subtitle: '3 Soal Kuis Tantangan (+10 Poin)',
    icon: 'help-circle',
    badge: 'Kuis 30 Poin',
    description: 'Uji pemahamanmu tentang proses letusan dan raih 30 koin poin emas maksimal!',
  },
  {
    id: 'pos6_sertifikat',
    order: 6,
    title: 'Pos 6: Mercusuar Kelulusan',
    subtitle: 'Rangkuman & Piagam Penjelajah',
    icon: 'award',
    badge: 'Sertifikat Kapten',
    description: 'Raih gelar Master Penjelajah Vulkanik dan cetak sertifikat resmi bertandatangan Kapten Nala!',
  },
];

export const PENJELASAN_SINGKAT = {
  judulUtama: 'Proses Terjadinya Gunung Meletus',
  ringkasan:
    'Gunung meletus adalah salah satu peristiwa alam yang sangat dahsyat dan menakjubkan. Peristiwa ini terjadi ketika cairan batuan yang sangat panas di dalam perut bumi (magma) terdorong keluar ke permukaan bumi oleh tekanan gas yang luar biasa kuat.',
  analogiBotolSoda: {
    judul: 'Rahasia Botol Soda yang Dikocok! 🥤',
    penjelasan:
      'Bayangkan sebotol minuman bersoda yang kamu kocok kuat-kuat. Di dalamnya terbentuk banyak gelembung gas bertekanan tinggi. Saat tutupnya dibuka, "Wuuush!", cairan soda akan menyembur keluar dengan sangat kencang. Persis seperti itulah cara kerja gunung meletus di perut bumi kita!',
  },
  faktaKunci: [
    {
      judul: 'Magma vs Lava',
      deskripsi:
        'Magma adalah batuan cair pijar saat masih di dalam perut bumi. Jika sudah keluar mengalir di permukaan, namanya berubah menjadi Lava.',
      icon: 'sparkles',
    },
    {
      judul: 'Penyebab Utama',
      deskripsi:
        'Adanya gas bertekanan sangat tinggi dan suhu super panas (mencapai lebih dari 1.000°C) di dalam dapur magma.',
      icon: 'flame',
    },
    {
      judul: 'Material yang Keluar',
      deskripsi:
        'Saat meletus, gunung mengeluarkan lava pijar, awan panas (wedhus gembel), abu vulkanik halus, dan bebatuan besar.',
      icon: 'wind',
    },
  ],
  suaraPemandu:
    'Ahoy para Kawan Penjelajah Cilik! Saya Kapten Nala! Selamat datang di Ekspedisi Petualangan Gunung Meletus! Di Pos 1 ini, kita meneliti apa itu gunung berapi dan rahasia tekanan gas yang mendorong magma keluar seperti botol soda yang dikocok kencang! Siap menjelajah bersama Kapten Nala?!',
};

export const TEKS_EKSPLANASI_DATA: ExplanationSection[] = [
  {
    title: '1. Pernyataan Umum',
    category: 'Pernyataan Umum',
    shortSummary: 'Berisi pengertian dan gambaran umum tentang peristiwa gunung meletus.',
    content: [
      'Gunung meletus merupakan fenomena alam yang terjadi akibat adanya endapan magma di dalam perut bumi yang keluar karena dorongan gas bertekanan tinggi.',
      'Gunung berapi adalah bukit atau gunung yang memiliki celah atau lubang kepundan tempat magma dan gas dapat keluar ke permukaan bumi.',
      'Peristiwa letusan gunung berapi atau erupsi tergolong bencana alam geologis yang sering terjadi di Indonesia karena negara kita berada di jalur Cincin Api Pasifik (Ring of Fire).',
    ],
    keyTerms: [
      { term: 'Gunung Berapi', meaning: 'Gunung yang memiliki lubang saluran magma aktif ke permukaan.' },
      { term: 'Erupsi', meaning: 'Proses pelepasan atau letusan material gunung api ke luar.' },
      { term: 'Cincin Api Pasifik', meaning: 'Jalur rangkaian gunung berapi aktif di dunia tempat Indonesia berada.' },
    ],
    guideSpeech:
      'Bagian pertama teks eksplanasi adalah Pernyataan Umum. Di sini kita menjelaskan apa itu gunung meletus, yaitu peristiwa keluarnya magma dari perut bumi karena dorongan gas bertekanan tinggi.',
  },
  {
    title: '2. Deretan Penjelas',
    category: 'Deretan Penjelas',
    shortSummary: 'Berisi urutan tahapan kronologis terjadinya letusan gunung dari awal sampai akhir.',
    content: [
      'Tahap 1 (Penumpukan Panas di Dapur Magma): Di kedalaman puluhan kilometer di bawah bumi, suhu sangat panas hingga mencairkan batuan menjadi magma yang terkumpul di dapur magma.',
      'Tahap 2 (Peningkatan Tekanan Gas): Gas vulkanik yang terperangkap di dalam dapur magma terus bertambah dan memuai sehingga menciptakan tekanan dorong ke arah atas permukaan bumi.',
      'Tahap 3 (Pergerakan Magma Naik): Karena massa jenis magma lebih ringan daripada batuan padat di sekelilingnya, magma bergerak naik mencari celah dan retakan melalui saluran utama (pipa kepundan).',
      'Tahap 4 (Terjadinya Erupsi Dahsyat): Ketika batuan penutup di kawah tidak lagi mampu menahan tekanan gas yang membara, terjadilah letusan! Gunung menyemburkan lava pijar, awan abu vulkanik ke langit, serta awan panas yang meluncur menuruni lereng.',
    ],
    keyTerms: [
      { term: 'Dapur Magma', meaning: 'Ruang penampungan batuan cair panas di kedalaman kerak bumi.' },
      { term: 'Pipa Kepundan', meaning: 'Saluran vertikal tempat naiknya magma menuju kawah.' },
      { term: 'Awan Panas', meaning: 'Gumpalan gas dan abu bersuhu tinggi yang meluncur sangat cepat di lereng gunung.' },
    ],
    guideSpeech:
      'Bagian kedua adalah Deretan Penjelas! Ini menceritakan urutan kejadian: mulai dari magma mencair di dapur magma, gas bertekanan tinggi menumpuk, magma naik lewat pipa kepundan, hingga meledak menjadi erupsi.',
  },
  {
    title: '3. Penutup (Kesimpulan & Interpretasi)',
    category: 'Penutup',
    shortSummary: 'Berisi kesimpulan dan pandangan akhir tentang dampak letusan bagi kehidupan manusia.',
    content: [
      'Meskipun gunung meletus dapat merusak lingkungan dan membahayakan keselamatan warga di sekitarnya, peristiwa ini juga membawa banyak manfaat jangka panjang bagi alam.',
      'Abu vulkanik yang telah mengendap dan lapuk bertahun-tahun akan membuat tanah pertanian menjadi sangat subur dan kaya mineral alami.',
      'Selain itu, letusan gunung berapi menghasilkan material bangunan seperti pasir dan batu kali berkualitas tinggi, serta memunculkan sumber mata air panas dan potensi energi panas bumi (geotermal).',
      'Oleh karena itu, masyarakat yang tinggal di dekat gunung berapi harus memahami langkah mitigasi bencana dan selalu mematuhi arahan peringatan dini dari pihak berwenang.',
    ],
    keyTerms: [
      { term: 'Interpretasi', meaning: 'Pendapat atau kesimpulan penulis tentang peristiwa yang dijelaskan.' },
      { term: 'Tanah Vulkanik', meaning: 'Tanah subur hasil pelapukan abu dan debu letusan gunung berapi.' },
      { term: 'Mitigasi Bencana', meaning: 'Upaya dan persiapan untuk mengurangi risiko bahaya saat bencana terjadi.' },
    ],
    guideSpeech:
      'Bagian terakhir adalah Penutup atau Kesimpulan. Gunung meletus memang berbahaya, tetapi abu vulkaniknya membuat tanah kita sangat subur dan menghasilkan pasir serta batuan berkualitas!',
  },
];

export const ANATOMI_GUNUNG = [
  {
    id: 'dapur_magma',
    nama: 'Dapur Magma (Magma Chamber)',
    warna: '#dc2626',
    posisi: 'Bawah Tengah',
    penjelasan:
      'Ruang raksasa di dalam kerak bumi tempat batuan meleleh menjadi cairan magma bersuhu lebih dari 1.000°C.',
  },
  {
    id: 'pipa_kepundan',
    nama: 'Pipa Kepundan (Conduit / Vent)',
    warna: '#ea580c',
    posisi: 'Batang Tengah',
    penjelasan:
      'Saluran atau pipa alami tempat magma merayap naik menembus lapisan kerak bumi menuju kawah puncak.',
  },
  {
    id: 'kawah_utama',
    nama: 'Kawah Utama (Crater)',
    warna: '#f59e0b',
    posisi: 'Puncak Gunung',
    penjelasan:
      'Mulut atau lubang mangkuk di puncak gunung tempat material letusan disemburkan ke udara bebas.',
  },
  {
    id: 'lelehan_lava',
    nama: 'Aliran Lava Pijar',
    warna: '#f97316',
    posisi: 'Lereng Gunung',
    penjelasan:
      'Magma cair panas yang telah keluar dari kawah dan mengalir menuruni lereng gunung.',
  },
  {
    id: 'awan_abu',
    nama: 'Awan Abu & Gas Vulkanik',
    warna: '#64748b',
    posisi: 'Atas Langit',
    penjelasan:
      'Kumpulan partikel debu halus batuan dan gas belerang yang terlempar tinggi membubung ke angkasa.',
  },
];

export const STORYBOARD_SCENES: StoryboardScene[] = [
  {
    id: 1,
    title: 'Adegan 1: Gunung Siap Meletus',
    phaseName: 'Fase Siaga / Waspada',
    subtitle: 'Penumpukan Magma & Peningkatan Tekanan Gas',
    description:
      'Di kedalaman bumi, suhu mencapai lebih dari 1.000°C. Batuan meleleh menjadi magma dan berkumpul di dapur magma. Gas-gas vulkanik terperangkap dan terus memuai, menciptakan dorongan kuat ke arah atas seperti botol soda yang dikocok kencang! Asap putih mulai mengepul di kawah puncak.',
    visualHighlights: [
      'Dapur magma membara merah cerah di bawah tanah',
      'Gas vulkanik mendidih dan menekan sumbat kawah',
      'Asap belerang mulai mengepul tipis dari kawah',
      'Terjadi gempa vulkanik halus di sekitar lereng',
    ],
    volcanoState: 'siaga',
    guideNarration:
      'Lihat Adegan 1 ini! Gunung sedang bersiap meletus. Magma di dapur magma semakin panas dan gasnya menumpuk kuat sekali. Klik titik nomor di gambar untuk memeriksa magma dan kawahnya!',
    hotspots: [
      {
        id: 'hs_magma',
        name: 'Magma (Dapur Magma)',
        category: 'Bawah Tanah',
        xPercent: 50,
        yPercent: 86,
        color: '#dc2626',
        shortDesc: 'Batuan cair berpijar sangat panas di dalam perut bumi.',
        detailedDesc:
          'Suhunya mencapai 1.000°C hingga 1.200°C! Di sini cairan magma tertampung dan terus menerima suplai panas dari dalam inti bumi.',
        guideVoice:
          'Ini adalah Dapur Magma! Ruangan raksasa di bawah bumi tempat batuan cair berpijar ditampung dengan suhu super panas!',
      },
      {
        id: 'hs_gas',
        name: 'Tekanan Gas Vulkanik',
        category: 'Pipa Tengah',
        xPercent: 50,
        yPercent: 60,
        color: '#ea580c',
        shortDesc: 'Uap air dan gas yang menekan kuat ke atas.',
        detailedDesc:
          'Gas yang terperangkap terus menumpuk. Tekanannya yang dahsyat inilah yang menjadi pemicu utama magma terdorong naik.',
        guideVoice:
          'Titik ini adalah pipa kepundan yang dipenuhi gas bertekanan tinggi. Seperti botol soda yang dikocok, gas ini mendorong magma keluar!',
      },
      {
        id: 'hs_kawah_siaga',
        name: 'Kawah Utama (Crater)',
        category: 'Puncak Gunung',
        xPercent: 50,
        yPercent: 35,
        color: '#f59e0b',
        shortDesc: 'Mulut kepundan yang mulai mengepulkan asap belerang.',
        detailedDesc:
          'Pada fase siaga, sumbat batuan di kawah mulai retak-retak akibat desakan dari bawah, memunculkan asap solfatara.',
        guideVoice:
          'Kawah utama mulai mengeluarkan asap putih belerang. Ini tanda peringatan bahwa gunung berapi sedang aktif!',
      },
    ],
  },
  {
    id: 2,
    title: 'Adegan 2: Detik-Detik Letusan (Erupsi Dahsyat)',
    phaseName: 'Fase Puncak Erupsi',
    subtitle: 'Sumbat Kawah Jebol & Material Menyembur ke Langit',
    description:
      'Duaaar! Batuan penutup kawah tidak sanggup lagi menahan tekanan gas yang membara. Sumbat kawah hancur meledak! Magma terlontar tinggi ke angkasa bersama jutaan ton abu vulkanik hitam dan bongkahan batu pijar (bom vulkanik).',
    visualHighlights: [
      'Ledakan dahsyat membuka lubang kawah secara luas',
      'Kolom abu vulkanik membubung puluhan kilometer ke angkasa',
      'Lontaran batu pijar (bom vulkanik) terlempar ke udara',
      'Kilatan petir vulkanik terjadi akibat gesekan debu',
    ],
    volcanoState: 'letusan',
    guideNarration:
      'Duaaar! Terjadilah letusan erupsi! Perhatikan semburan kolom abu vulkanik yang membubung tinggi dan lontaran batu pijar ke angkasa!',
    hotspots: [
      {
        id: 'hs_erupsi_kawah',
        name: 'Mulut Letusan (Erupsi)',
        category: 'Puncak Kawah',
        xPercent: 50,
        yPercent: 35,
        color: '#ef4444',
        shortDesc: 'Titik semburan utama magma cair dan gas panas.',
        detailedDesc:
          'Tempat pelepasan energi kinetik raksasa yang mengubah magma di dalam menjadi lava dan tefra di luar.',
        guideVoice:
          'Ini adalah kawah tempat terjadinya erupsi dahsyat! Energi gas meledak dan memuntahkan material panas ke udara.',
      },
      {
        id: 'hs_kolom_abu',
        name: 'Kolom Abu Vulkanik',
        category: 'Angkasa',
        xPercent: 50,
        yPercent: 12,
        color: '#475569',
        shortDesc: 'Awan abu pekat yang menjulang tinggi ke atmosfer.',
        detailedDesc:
          'Terdiri atas butiran halus kaca vulkanik dan mineral. Bisa menutupi sinar matahari dan mengganggu jalur penerbangan pesawat.',
        guideVoice:
          'Kolom abu vulkanik ini bisa membubung puluhan kilometer ke langit hingga membuat siang hari menjadi gelap gulita!',
      },
      {
        id: 'hs_bom_vulkanik',
        name: 'Bom Vulkanik & Batu Pijar',
        category: 'Udara Sekitar',
        xPercent: 32,
        yPercent: 24,
        color: '#b91c1c',
        shortDesc: 'Bongkahan batuan besar yang terlontar dari kawah.',
        detailedDesc:
          'Batuan beku yang terpental saat masih membara pijar. Berbahaya bagi wilayah dalam radius beberapa kilometer.',
        guideVoice:
          'Batu-batu besar yang terlontar ini disebut bom vulkanik. Batuan ini sangat panas dan meluncur cepat!',
      },
    ],
  },
  {
    id: 3,
    title: 'Adegan 3: Pelepasan Awan Panas & Aliran Lava',
    phaseName: 'Fase Aliran Material Berbahaya',
    subtitle: 'Awan Panas (Wedhus Gembel) & Lelehan Lava di Lereng',
    description:
      'Selain membubung ke atas, kubah lava yang runtuh memicu gulungan awan panas (wedhus gembel) yang meluncur sangat cepat menuruni lereng dengan suhu 600°C! Sementara itu, lelehan cairan lava pijar mengalir membakar apa saja di jalurnya.',
    visualHighlights: [
      'Awan panas bergulung-gulung meluncur di lembah gunung',
      'Kecepatan luncur awan panas bisa mencapai lebih dari 100 km/jam',
      'Aliran lava pijar mengalir perlahan dan membara merah',
      'Hujan abu vulkanik mulai turun menutupi dedaunan',
    ],
    volcanoState: 'awan_panas',
    guideNarration:
      'Hati-hati! Di Adegan 3 ini, awan panas atau wedhus gembel meluncur sangat cepat menuruni lereng. Suhunya bisa mencapai 600 derajat Celsius!',
    hotspots: [
      {
        id: 'hs_awan_panas',
        name: 'Awan Panas (Wedhus Gembel)',
        category: 'Lereng Gunung',
        xPercent: 68,
        yPercent: 48,
        color: '#71717a',
        shortDesc: 'Gas dan debu bersuhu 600°C yang meluncur sangat cepat!',
        detailedDesc:
          'Disebut wedhus gembel karena gumpalannya mirip bulu domba. Awan panas ini merupakan bahaya paling mematikan saat erupsi gunung api.',
        guideVoice:
          'Awan panas meluncur turun lereng dengan kecepatan ratusan kilometer per jam! Penduduk harus segera mengungsi menjauhi jalurnya.',
      },
      {
        id: 'hs_lava_pijar',
        name: 'Aliran Lava Pijar',
        category: 'Lereng Puncak',
        xPercent: 35,
        yPercent: 48,
        color: '#ea580c',
        shortDesc: 'Magma cair yang mengalir membakar permukaan lereng.',
        detailedDesc:
          'Lava pijar mengalir lebih lambat daripada awan panas, tetapi suhunya sangat tinggi dan menghancurkan apa pun yang dilewatinya.',
        guideVoice:
          'Ini adalah lava pijar! Magma yang sudah keluar ke permukaan bumi dan mengalir menuruni lereng.',
      },
      {
        id: 'hs_hujan_abu',
        name: 'Hujan Abu Vulkanik',
        category: 'Kaki Gunung',
        xPercent: 20,
        yPercent: 78,
        color: '#64748b',
        shortDesc: 'Abu halus yang turun menyelimuti rumah dan tumbuhan.',
        detailedDesc:
          'Penduduk wajib mengenakan masker karena abu vulkanik sangat tajam dan bisa mengganggu pernapasan (ISPA).',
        guideVoice:
          'Hujan abu membuat kita harus selalu menggunakan masker dan kacamata pelindung agar pernapasan tetap sehat.',
      },
    ],
  },
  {
    id: 4,
    title: 'Adegan 4: Aliran Lahar & Dampak Pasca Erupsi',
    phaseName: 'Fase Pasca Letusan & Pemulihan',
    subtitle: 'Banjir Lahar Dingin di Sungai & Kesuburan Tanah Baru',
    description:
      'Setelah letusan mereda, saat hujan deras mengguyur puncak gunung, air bercampur dengan endapan pasir dan abu membentuk aliran banjir lahar dingin yang meluncur di alur sungai. Dalam jangka panjang, abu vulkanik melapuk dan menjadikan tanah pertanian sangat subur!',
    visualHighlights: [
      'Aliran lumpur lahar dingin menerjang alur sungai di kaki gunung',
      'Puncak gunung membentuk kawah kaldera yang luas',
      'Material pasir dan batu kali menjadi bahan tambang bangunan',
      'Tanah pertanian kembali hijau dan sangat subur bertahun-tahun kemudian',
    ],
    volcanoState: 'lahar',
    guideNarration:
      'Pada Adegan 4, air hujan bercampur abu vulkanik menjadi aliran lahar dingin di sungai. Namun bertahun-tahun kemudian, tanah di sekitar gunung akan menjadi sangat subur untuk petani!',
    hotspots: [
      {
        id: 'hs_lahar_dingin',
        name: 'Aliran Lahar Dingin',
        category: 'Lembah Sungai',
        xPercent: 30,
        yPercent: 78,
        color: '#57534e',
        shortDesc: 'Banjir lumpur air hujan bercampur pasir dan batu besar.',
        detailedDesc:
          'Terjadi saat hujan lebat di puncak gunung menghanyutkan jutaan meter kubik material erupsi menuruni lembah sungai.',
        guideVoice:
          'Aliran lahar dingin adalah banjir lumpur pekat campuran air hujan dan batu vulkanik yang mengalir deras di sungai.',
      },
      {
        id: 'hs_tanah_subur',
        name: 'Tanah Vulkanik yang Subur',
        category: 'Daratan Kaki Gunung',
        xPercent: 75,
        yPercent: 82,
        color: '#16a34a',
        shortDesc: 'Berkah jangka panjang: tanah kaya hara untuk tanaman.',
        detailedDesc:
          'Abu vulkanik mengandung banyak mineral fosfor, kalium, dan magnesium yang membuat tanaman sayuran dan buah tumbuh subur.',
        guideVoice:
          'Lihat tanah hijau ini! Abu vulkanik yang telah lapuk menjadi pupuk alami yang sangat menyuburkan sawah dan kebun petani.',
      },
      {
        id: 'hs_kaldera',
        name: 'Kaldera & Kawah Baru',
        category: 'Puncak Gunung',
        xPercent: 50,
        yPercent: 35,
        color: '#78716c',
        shortDesc: 'Cekungan kawah luas yang terbentuk setelah erupsi.',
        detailedDesc:
          'Setelah ruang magma kosong, puncak gunung bisa runtuh membentuk kawah cekung raksasa yang disebut kaldera.',
        guideVoice:
          'Puncak gunung kini memiliki cekungan kawah luas yang disebut kaldera setelah seluruh isi magma dikeluarkan.',
      },
    ],
  },
];

export const KUIS_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: 'Cairan batuan yang sangat panas dan masih berada di dalam perut bumi disebut dengan istilah...',
    options: [
      {
        id: 'A',
        text: 'Lava',
        isCorrect: false,
        reason:
          'Salah: Lava adalah sebutan jika cairan batuan panas tersebut sudah berhasil keluar dan mengalir di permukaan bumi.',
      },
      {
        id: 'B',
        text: 'Magma',
        isCorrect: true,
        reason:
          'Benar (+10 Poin!): Magma adalah batuan cair pijar bersuhu ribuan derajat yang masih berada di dalam perut bumi (dapur magma).',
      },
      {
        id: 'C',
        text: 'Lahar dingin',
        isCorrect: false,
        reason:
          'Salah: Lahar dingin adalah banjir lumpur air hujan yang bercampur abu dan pasir vulkanik di alur sungai.',
      },
      {
        id: 'D',
        text: 'Abu vulkanik',
        isCorrect: false,
        reason:
          'Salah: Abu vulkanik adalah serpihan debu halus batuan yang terlempar ke angkasa, bukan batuan cair di dalam bumi.',
      },
    ],
    generalExplanation:
      'Magma adalah batuan cair pijar yang masih tersimpan di dalam perut bumi. Ketika magma berhasil keluar ke permukaan bumi saat letusan, sebutannya berubah menjadi Lava.',
    hint: 'Ingat! Huruf M untuk "Magma" yang masih "Mendalam" di dalam perut bumi!',
  },
  {
    id: 2,
    question: 'Apa yang dimaksud dengan "awan panas" (wedhus gembel) yang keluar saat gunung berapi meletus?',
    options: [
      {
        id: 'A',
        text: 'Awan putih biasa pembawa hujan gerimis',
        isCorrect: false,
        reason:
          'Salah: Awan putih biasa berisi uap air yang sejuk, sedangkan awan panas berisi gas beracun dan abu bersuhu 600°C!',
      },
      {
        id: 'B',
        text: 'Gumpalan gas dan debu bersuhu sangat tinggi (hingga 600°C) yang meluncur cepat di lereng',
        isCorrect: true,
        reason:
          'Benar (+10 Poin!): Awan panas atau wedhus gembel bergulung sangat cepat menuruni lereng dengan suhu ratusan derajat sehingga sangat mematikan.',
      },
      {
        id: 'C',
        text: 'Asap tebal dari pembakaran kayu oleh warga sekitar',
        isCorrect: false,
        reason:
          'Salah: Awan panas murni fenomena alam vulkanik dari letusan gunung, bukan asap buatan manusia.',
      },
      {
        id: 'D',
        text: 'Angin sejuk pegunungan yang berhembus di pagi hari',
        isCorrect: false,
        reason:
          'Salah: Awan panas bersuhu membakar dan sangat mematikan, sama sekali bukan angin sejuk.',
      },
    ],
    generalExplanation:
      'Awan panas (sering disebut wedhus gembel karena mirip bulu domba) adalah campuran gas vulkanik dan abu membara bersuhu mencapai 600°C yang meluncur deras menuruni lereng dengan kecepatan ratusan km/jam.',
    hint: 'Awan ini bergulung mirip bulu domba gembel dan suhunya sangat membakar!',
  },
  {
    id: 3,
    question: 'Bagaimana proses terbentuknya aliran "lahar dingin" di daerah sekitar gunung berapi?',
    options: [
      {
        id: 'A',
        text: 'Magma di dalam perut bumi tiba-tiba membeku menjadi es',
        isCorrect: false,
        reason:
          'Salah: Magma yang membeku di dalam bumi membentuk batuan beku granit, bukan aliran lahar dingin di sungai.',
      },
      {
        id: 'B',
        text: 'Air hujan lebat di puncak gunung bercampur dengan endapan abu, pasir, dan bebatuan vulkanik',
        isCorrect: true,
        reason:
          'Benar (+10 Poin!): Hujan lebat di puncak melarutkan jutaan meter kubik tumpukan pasir dan abu letusan menjadi banjir lumpur lahar di sungai.',
      },
      {
        id: 'C',
        text: 'Air laut yang mendadak pasang dan naik ke puncak gunung',
        isCorrect: false,
        reason:
          'Salah: Gunung berada di daratan tinggi sehingga air laut tidak mungkin naik ke puncak gunung.',
      },
      {
        id: 'D',
        text: 'Salju di puncak gunung mencair karena sinar terik matahari',
        isCorrect: false,
        reason:
          'Salah: Di Indonesia hampir semua gunung berapi tidak bersalju; lahar dipicu oleh guyuran air hujan lebat.',
      },
    ],
    generalExplanation:
      'Aliran lahar dingin terjadi ketika guyuran air hujan lebat di bagian puncak gunung bercampur dengan material pasir, kerikil, dan abu vulkanik sisa letusan, lalu meluncur deras menuruni lembah sungai.',
    hint: 'Kuncinya adalah air hujan lebat yang mencuci endapan abu dan pasir di lereng gunung!',
  },
];

