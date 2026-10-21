import React, { useState, useEffect, useCallback } from 'react';
import { Header, ScreenId } from './components/Header';
import { FooterDeck } from './components/FooterDeck';
import { MatrixRain } from './components/MatrixRain';
import { Toast, ToastMessage } from './components/Toast';
import { ProjectModal } from './components/ProjectModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { AboutScreen } from './components/screens/AboutScreen';
import { SystemsScreen } from './components/screens/SystemsScreen';
import { ProjectsScreen } from './components/screens/ProjectsScreen';
import { ContactScreen } from './components/screens/ContactScreen';
import { AiLabScreen } from './components/screens/AiLabScreen';
import { CONCEPTUAL_PROJECTS, ConceptualProject } from './data/projectsData';

const SCREEN_TITLES: Record<ScreenId, string> = {
  home: 'RAVANA TECH | Web, Software & AI',
  about: 'ABOUT // RAVANA TECH | Web, Software & AI',
  systems: 'SERVICES // RAVANA TECH | Web, Software & AI',
  projects: 'PROJECTS // RAVANA TECH | Web, Software & AI',
  contact: 'CONTACT // RAVANA TECH | Web, Software & AI',
  'ai-lab': 'AI & AUTOMATION LAB // RAVANA TECH | Shanthapriya Silva'
};

const ORDERED_SCREENS: ScreenId[] = ['home', 'about', 'systems', 'projects', 'contact', 'ai-lab'];

export const App: React.FC = () => {
  // Parse initial route from window.location.pathname
  const getInitialScreen = (): ScreenId => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    if (path === 'about') return 'about';
    if (path === 'systems' || path === 'services' || path === 'all-services') return 'systems';
    if (path === 'projects' || path === 'archive' || path === 'gallery') return 'projects';
    if (path === 'contact') return 'contact';
    if (path === 'ai-lab' || path === 'lab' || path === 'automation') return 'ai-lab';
    return 'home';
  };

  const [currentScreen, setCurrentScreen] = useState<ScreenId>(getInitialScreen);
  const [activePreviewProject, setActivePreviewProject] = useState<ConceptualProject | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, icon = 'bx-check-circle') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const navigateTo = useCallback((screen: ScreenId, updateHistory = true) => {
    setCurrentScreen(screen);
    document.title = SCREEN_TITLES[screen] || SCREEN_TITLES.home;

    if (updateHistory && typeof window !== 'undefined') {
      const targetUrl = screen === 'home' ? '/' : `/${screen}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ screen }, '', targetUrl);
      }
    }
  }, []);

  // Popstate handling for browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.screen) {
        navigateTo(e.state.screen, false);
      } else {
        navigateTo(getInitialScreen(), false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigateTo]);

  // Global keyboard shortcuts (Left/Right arrow for screens when modal is closed)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePreviewProject) return; // Let modal handle its own arrow keys
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      const idx = ORDERED_SCREENS.indexOf(currentScreen);
      if (e.key === 'ArrowRight' && idx < ORDERED_SCREENS.length - 1) {
        navigateTo(ORDERED_SCREENS[idx + 1]);
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        navigateTo(ORDERED_SCREENS[idx - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePreviewProject, currentScreen, navigateTo]);

  // Modal navigation (next/prev project)
  const handleModalNavigate = (direction: number) => {
    if (!activePreviewProject) return;
    const currentIdx = CONCEPTUAL_PROJECTS.findIndex((p) => p.id === activePreviewProject.id);
    if (currentIdx === -1) return;

    let nextIdx = currentIdx + direction;
    if (nextIdx < 0) nextIdx = CONCEPTUAL_PROJECTS.length - 1;
    if (nextIdx >= CONCEPTUAL_PROJECTS.length) nextIdx = 0;

    setActivePreviewProject(CONCEPTUAL_PROJECTS[nextIdx]);
  };

  return (
    <div className="ravana-app-wrapper">
      {/* Skip to Content for A11y */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header */}
      <Header currentScreen={currentScreen} onNavigate={navigateTo} />

      {/* Main Command Deck */}
      <main className="l-main" id="main-content" role="main">
        {/* GPU-Throttled Matrix Rain Canvas Background */}
        <MatrixRain />

        {/* Global Watermark */}
        <div className="deck-global-watermark" aria-hidden="true" />

        {/* Deck Screens: Keep active screen visible with zero delay */}
        <div className="deck-screens-viewport" style={{ position: 'relative', height: '100%', width: '100%' }}>
          {currentScreen === 'home' && <HomeScreen onNavigate={navigateTo} />}
          {currentScreen === 'about' && <AboutScreen onNavigate={navigateTo} />}
          {currentScreen === 'systems' && <SystemsScreen onNavigate={navigateTo} />}
          {currentScreen === 'projects' && (
            <ProjectsScreen onOpenPreview={(p) => setActivePreviewProject(p)} />
          )}
          {currentScreen === 'contact' && <ContactScreen onToast={addToast} />}
          {currentScreen === 'ai-lab' && (
            <AiLabScreen onNavigate={navigateTo} onToast={addToast} />
          )}
        </div>
      </main>

      {/* Footer Command Deck Bar */}
      <FooterDeck currentScreen={currentScreen} onNavigate={navigateTo} />

      {/* Silicon Valley Lightbox & Device Frame Simulator */}
      <ProjectModal
        project={activePreviewProject}
        onClose={() => setActivePreviewProject(null)}
        onNavigate={handleModalNavigate}
        onToast={addToast}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} />
    </div>
  );
};
