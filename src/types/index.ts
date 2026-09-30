export type Language = 'si' | 'en';

export interface LocationData {
  country: string;
  code: string;
  isSriLanka: boolean;
  flag: string;
  region: string;
  coordinates?: { x: number; y: number };
}

export type MainPathwayId = 
  | 'new_website'
  | 'ai_automation'
  | 'conceptual_showcase'
  | 'sales_boost'
  | 'vip_consultation';

export interface DecisionOption {
  id: string;
  indexNumber: number; // 1 to 5
  title: {
    en: string;
    si: string;
  };
  subtitle: {
    en: string;
    si: string;
  };
  iconName: string;
  tag?: {
    en: string;
    si: string;
  };
  voiceGuidance?: {
    en: string;
    si: string;
  };
  costWeight?: number; // for quotation calculation
  timelineDays?: number;
}

export interface DecisionStep {
  stepIndex: number; // 1 to 5
  stepTitle: {
    en: string;
    si: string;
  };
  stepQuestion: {
    en: string;
    si: string;
  };
  avatarSpeech: {
    en: string;
    si: string;
  };
  options: DecisionOption[];
}

export interface DecisionPathway {
  id: MainPathwayId;
  number: number; // 1 to 5
  title: {
    en: string;
    si: string;
  };
  subtitle: {
    en: string;
    si: string;
  };
  shortDescription: {
    en: string;
    si: string;
  };
  icon: string;
  badge: {
    en: string;
    si: string;
  };
  steps: DecisionStep[];
}

export interface ClientInquiry {
  pathwayId: MainPathwayId;
  selectedAnswers: {
    stepIndex: number;
    stepTitle: string;
    optionId: string;
    optionTitle: string;
    costWeight?: number;
    timelineDays?: number;
  }[];
  clientName?: string;
  clientContact?: string;
  clientEmail?: string;
  clientNote?: string;
  estimatedCostRange: {
    min: number;
    max: number;
    currency: 'LKR' | 'USD';
  };
  estimatedTimeline: string;
}
