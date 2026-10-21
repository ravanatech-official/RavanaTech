import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { DeckScreen, SystemTelemetry, UserCvProfile } from './types.ts';
import { CONCEPTUAL_PROJECTS } from './data/projectsData.ts';
import { MatrixRainCanvas } from './components/MatrixRainCanvas.tsx';
import { HeaderNav } from './components/HeaderNav.tsx';
import { CommandDeckFooter } from './components/CommandDeckFooter.tsx';
import { HomeScreen } from './components/screens/HomeScreen.tsx';
import { AboutScreen } from './components/screens/AboutScreen.tsx';
import { ServicesScreen } from './components/screens/ServicesScreen.tsx';
import { ProjectsScreen } from './components/screens/ProjectsScreen.tsx';
import { ContactScreen } from './components/screens/ContactScreen.tsx';
import { AiLabScreen } from './components/screens/AiLabScreen.tsx';
import { ProjectPreviewModal } from './components/modals/ProjectPreviewModal.tsx';
import { CvEditorModal } from './components/modals/CvEditorModal.tsx';

const SCREENS: DeckScreen[] = [
  { id: 'home', route: '/', label: 'HOME', title: 'RAVANA TECH | Web, Software & AI' },
  { id: 'about', route: '/about', label: 'ABOUT', title: 'ABOUT // RAVANA TECH | Web, Software & AI' },
  { id: 'systems', route: '/systems', label: 'SERVICES', title: 'SERVICES // RAVANA TECH | Web, Software & AI' },
  { id: 'projects', route: '/projects', label: 'PROJECTS', title: 'PROJECTS // RAVANA TECH | Web, Software & AI' },
  { id: 'contact', route: '/contact', label: 'CONTACT', title: 'CONTACT // RAVANA TECH | Web, Software & AI' },
  { id: 'ai-lab', route: '/ai-lab', label: 'AI LAB', title: 'AI & AUTOMATION LAB // RAVANA TECH | Shanthapriya Silva' },
];

const DEFAULT_PROFILE: UserCvProfile = {
  name: 'SHANTHAPRIYA SILVA',
  title: 'DOCUMENT CONTROLLER & AUTOMATION SPECIALIST',
  phone: '+94 78 847 0610',
  email: 'hello.ravanatech@gmail.com',
  location: 'Open to UAE / Gulf Relocation & Global Remote',
  portfolioUrl: 'https://ravanatec.web.app/ai-lab',
  profile:
    'Meticulous and tech-empowered Document Controller & Data Management Specialist with a distinctive competitive edge in AI Workflow Automation and Electronic Document Management Systems (EDMS). Combines strict ISO 9001:2015 document control governance with modern cognitive AI tooling (Google AI Studio, Gemini, Google App Scripts, Cloud Databases) to eliminate manual logging bottlenecks, achieving 100% revision accuracy and accelerating transmittal turnaround by over 80%.',
  experience: [
    {
      role: 'Lead Document Controller & Automation Architect',
      company: 'Ravana Tech',
      dates: '2024 - Present',
      bullets: [
        'Architected and managed cloud EDMS workflows handling 5,000+ digital engineering drawings, technical specifications, and vendor invoices with zero filing collisions or lost revisions.',
        'Automated transmittal ingestion pipelines using AI OCR and Google App Scripts, reducing daily manual logging time from 4.5 hours to under 15 minutes.',
        'Maintained 100% audit-readiness under ISO 9001 document retention protocols, standardizing naming conventions across Civil, MEP, and Architectural packages.',
        'Engineered 0-error batch data extraction pipelines for commercial documents, auto-verifying VAT numbers, line totals, and purchase order cross-references.',
      ],
    },
    {
      role: 'Data Entry & Document Control Specialist',
      company: 'Independent Contracting & Business Services',
      dates: '2022 - 2024',
      bullets: [
        'Triaged and digitized thousands of legacy paper records, vendor submittals, and customer inventories into structured cloud databases with 99.98% verified accuracy.',
        'Formulated standardized data entry templates and automated regex validation scripts that eliminated typographical errors and duplicate records.',
        'Coordinated transmittal distributions between project managers, engineers, and subcontractors, ensuring 24-hour turnaround on urgent RFIs and shop drawings.',
      ],
    },
  ],
  education: [
    'Specialized Training: Electronic Document Management Systems (EDMS), ISO Quality Documentation Standards.',
    'Applied AI & Automation: Google AI Studio, Gemini Flash OCR, Cloud Database Architecture, Prompt Engineering.',
    'Languages: English (Professional Working Proficiency), Sinhala (Native).',
  ],
  skills: [
    'Document Control & EDMS: Master Document Register (MDR), Submittal & Transmittal Ingestion, RFI & NCR Logs, Drawing Revision Control, ISO 9001:2015 Quality Standards.',
    'Data Entry & Validation: High-Speed Touch Typing (75+ WPM / 10,000+ KPH), 100% Zero-Error Schema Validation, 3-Way PO & Invoice Matching, Batch Record Cleansing.',
    'AI & Automation Superpowers: Google AI Studio, Gemini Flash Multimodal OCR, Claude 3.5, Google App Scripts (GAS) macro automation, Firebase Firestore, GitHub, GCP Cloud Storage.',
    'Productivity Suites: Advanced Microsoft Excel (Pivot Tables, Advanced Formulas, VLOOKUP), Google Workspace Cloud Architecture.',
  ],
  rawCv: '',
};

export const App: React.FC = () => {
  const [screenIndex, setScreenIndex] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<string>('Bespoke High-Speed Websites');
  const [telemetry, setTelemetry] = useState<SystemTelemetry | null>(null);

  // Project Modal State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalProjectIndex, setModalProjectIndex] = useState<number>(0);

  // CV Profile & Editor State
  const [userProfile, setUserProfile] = useState<UserCvProfile>(() => {
    try {
      const saved = localStorage.getItem('ravana_user_real_cv');
      if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
    } catch (e) {}
    return DEFAULT_PROFILE;
  });
  const [cvModalOpen, setCvModalOpen] = useState<boolean>(false);

  // Switch Screen Handler
  const navigateTo = useCallback((target: string | number, updateHistory = true) => {
    let nextIndex = 0;
    if (typeof target === 'number') {
      nextIndex = Math.max(0, Math.min(SCREENS.length - 1, target));
    } else {
      const clean = String(target || '').toLowerCase().replace(/^[/#]+|[/#]+$/g, '').trim();
      const idx = SCREENS.findIndex((s) => s.id === clean || s.route === `/${clean}`);
      nextIndex = idx !== -1 ? idx : 0;
    }

    setScreenIndex(nextIndex);
    const screen = SCREENS[nextIndex];
    if (screen) {
      document.title = screen.title;
      if (updateHistory && window.location.pathname !== screen.route) {
        window.history.pushState({ screenIndex: nextIndex, screenId: screen.id }, '', screen.route);
      }
    }
  }, []);

  // Fetch telemetry
  useEffect(() => {
    fetch('/api/health')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.telemetry) setTelemetry(data);
      })
      .catch(() => {});
  }, []);

  // Popstate & Initial Route setup
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.screenIndex === 'number') {
        navigateTo(e.state.screenIndex, false);
      } else {
        navigateTo(window.location.pathname, false);
      }
    };

    // Check current path or preview hash
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (hash && hash.startsWith('#preview=')) {
      const pid = hash.replace('#preview=', '');
      const idx = CONCEPTUAL_PROJECTS.findIndex((p) => p.id === pid);
      if (idx !== -1) {
        setModalProjectIndex(idx);
        setModalOpen(true);
      }
    }
    navigateTo(path, false);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigateTo]);

  // Keyboard hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if (modalOpen || cvModalOpen) return;

      if (screenIndex === 5) {
        // Inside AI Lab, Escape returns to Contact
        if (e.key === 'Escape') {
          e.preventDefault();
          navigateTo('contact');
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        if (screenIndex < 4) navigateTo(screenIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (screenIndex > 0) navigateTo(screenIndex - 1);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        navigateTo(parseInt(e.key, 10) - 1);
      } else if (e.key === '6' || e.key.toLowerCase() === 'l') {
        e.preventDefault();
        navigateTo('ai-lab');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screenIndex, modalOpen, cvModalOpen, navigateTo]);

  // Modal navigation
  const handleOpenProjectModal = (index: number) => {
    setModalProjectIndex(index);
    setModalOpen(true);
    const p = CONCEPTUAL_PROJECTS[index];
    if (p) {
      window.history.replaceState(null, '', `#preview=${p.id}`);
    }
  };

  const handleCloseProjectModal = () => {
    setModalOpen(false);
    if (window.location.hash.startsWith('#preview=')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleNavigateModal = (direction: number) => {
    let nextIdx = modalProjectIndex + direction;
    if (nextIdx < 0) nextIdx = CONCEPTUAL_PROJECTS.length - 1;
    if (nextIdx >= CONCEPTUAL_PROJECTS.length) nextIdx = 0;
    setModalProjectIndex(nextIdx);
    const p = CONCEPTUAL_PROJECTS[nextIdx];
    if (p) {
      window.history.replaceState(null, '', `#preview=${p.id}`);
    }
  };

  const handleSaveCv = (updated: UserCvProfile) => {
    setUserProfile(updated);
    try {
      localStorage.setItem('ravana_user_real_cv', JSON.stringify(updated));
    } catch (e) {}
    setCvModalOpen(false);
  };

  const handleResetCv = () => {
    try {
      localStorage.removeItem('ravana_user_real_cv');
    } catch (e) {}
    setUserProfile(DEFAULT_PROFILE);
    setCvModalOpen(false);
  };

  const currentScreen = SCREENS[screenIndex] || SCREENS[0];

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header */}
      <HeaderNav currentScreenId={currentScreen.id} onNavigate={(id) => navigateTo(id)} />

      {/* Main Command Deck */}
      <main className="l-main" id="main-content" role="main">
        {/* Matrix Rain Canvas */}
        <MatrixRainCanvas />

        {/* Global Logo Watermark */}
        <div className="deck-global-watermark" aria-hidden="true" />

        {/* Screens */}
        <HomeScreen
          isActive={screenIndex === 0}
          onNavigate={(id) => navigateTo(id)}
          projectCount={CONCEPTUAL_PROJECTS.length}
        />

        <AboutScreen
          isActive={screenIndex === 1}
          onNavigate={(id) => navigateTo(id)}
        />

        <ServicesScreen
          isActive={screenIndex === 2}
          onNavigate={(id) => navigateTo(id)}
          onSelectService={(svc) => setSelectedService(svc)}
        />

        <ProjectsScreen
          isActive={screenIndex === 3}
          projects={CONCEPTUAL_PROJECTS}
          onOpenPreview={handleOpenProjectModal}
        />

        <ContactScreen
          isActive={screenIndex === 4}
          selectedService={selectedService}
          onNavigate={(id) => navigateTo(id)}
        />

        <AiLabScreen
          isActive={screenIndex === 5}
          onNavigate={(id) => navigateTo(id)}
          onOpenCvEditor={() => setCvModalOpen(true)}
          userProfile={userProfile}
        />
      </main>

      {/* Command Deck Footer */}
      <CommandDeckFooter
        screens={SCREENS}
        currentIndex={screenIndex}
        onNavigateIndex={(idx) => navigateTo(idx)}
        telemetry={telemetry}
      />

      {/* Interactive Project Preview Lightbox Modal */}
      <ProjectPreviewModal
        isOpen={modalOpen}
        currentIndex={modalProjectIndex}
        projects={CONCEPTUAL_PROJECTS}
        onClose={handleCloseProjectModal}
        onNavigateModal={handleNavigateModal}
      />

      {/* Real CV Customizer Modal */}
      <CvEditorModal
        isOpen={cvModalOpen}
        userProfile={userProfile}
        onSave={handleSaveCv}
        onReset={handleResetCv}
        onClose={() => setCvModalOpen(false)}
      />
    </>
  );
};
