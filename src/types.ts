export interface ConceptualProject {
  id: string;
  title: string;
  fullTitle: string;
  filename: string;
  category: 'dining' | 'luxury' | 'fitness' | 'creative' | 'lifestyle';
  categoryLabel: string;
  domain: string;
  description: string;
  techStack: string[];
  accentColor: string;
  icon: string;
  image: string;
  tags: string[];
}

export interface DeckScreen {
  id: string;
  route: string;
  label: string;
  title: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface SystemTelemetry {
  status: string;
  engine: string;
  uptime: string;
  timestamp: string;
  telemetry: {
    loadSpeed: string;
    securityScore: string;
    activeServices: number;
    readyBlueprints: number;
  };
}

export interface DocumentSample {
  id: string;
  title: string;
  discipline: string;
  authority: string;
  status: string;
  date: string;
  filename: string;
  cloudPath: string;
  confidence: string;
  previewHtml: string;
}

export interface MdrRecord {
  id: string;
  title: string;
  discipline: string;
  revision: string;
  status: string;
  loggedAt: string;
  verifiedBy: string;
}

export interface RawDataRecord {
  id: string;
  entity: string;
  phone: string;
  date: string;
  vat: string;
  status: 'CLEAN' | 'DEDUPLICATED' | 'STANDARDIZED';
}

export interface TechRadarItem {
  id: string;
  name: string;
  category: 'models' | 'cloud' | 'devtools';
  catLabel: string;
  icon: string;
  short: string;
  desc: string;
  stats: {
    speed: string;
    usage: string;
    roi: string;
  };
}

export interface CvExperience {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

export interface UserCvProfile {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  portfolioUrl: string;
  profile: string;
  experience: CvExperience[] | string;
  education: string[];
  skills: string[];
  rawCv?: string;
}
