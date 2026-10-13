export type StageId = 'pos1_pengenalan' | 'pos2_eksplanasi' | 'pos3_awan_panas' | 'pos4_lahar_video' | 'pos5_kuis' | 'pos6_sertifikat';

export interface StageInfo {
  id: StageId;
  order: number;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  description: string;
}

export interface HotspotElement {
  id: string;
  name: string;
  category: string;
  xPercent: number; // 0 to 100 on canvas
  yPercent: number; // 0 to 100 on canvas
  color: string;
  shortDesc: string;
  detailedDesc: string;
  guideVoice: string;
}

export interface StoryboardScene {
  id: number;
  title: string;
  phaseName: string;
  subtitle: string;
  description: string;
  visualHighlights: string[];
  hotspots: HotspotElement[];
  guideNarration: string;
  volcanoState: 'siaga' | 'letusan' | 'awan_panas' | 'lahar';
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  reason: string; // Explains why this specific option is correct or wrong
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  generalExplanation: string;
  hint: string;
}

export interface ExplanationSection {
  title: string;
  category: 'Pernyataan Umum' | 'Deretan Penjelas' | 'Penutup';
  shortSummary: string;
  content: string[];
  keyTerms: { term: string; meaning: string }[];
  guideSpeech: string;
}

