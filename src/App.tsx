import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { WorldMapStep } from './components/WorldMapStep';
import { AvatarReception } from './components/AvatarReception';
import { GuidedStepView } from './components/GuidedStepView';
import { FinalQuotationStep } from './components/FinalQuotationStep';
import { Language, LocationData, MainPathwayId, DecisionOption } from './types';
import { DECISION_PATHWAYS } from './data/decisionTree';
import { sfx, stopVoice } from './utils/audio';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'map' | 'reception' | 'step' | 'final'>('map');
  const [language, setLanguage] = useState<Language>('si');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [activePathwayId, setActivePathwayId] = useState<MainPathwayId | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, DecisionOption>>({});
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sfx.isMuted = nextMute;
    if (nextMute) {
      stopVoice();
    }
  };

  // Switch Language
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  // Screen 1 Handler: Location selected on World Map
  const handleLocationSelected = (selectedLoc: LocationData, autoLanguage: Language) => {
    setLocation(selectedLoc);
    setLanguage(autoLanguage);
    setActiveScreen('reception');
  };

  // Screen 2 Handler: Pathway selected from Reception (Options 1 to 5)
  const handleSelectPathway = (pathwayId: MainPathwayId) => {
    setActivePathwayId(pathwayId);
    setCurrentStepIndex(1);
    setSelectedAnswers({});
    setActiveScreen('step');
  };

  // Screen 3 Handler: Option chosen inside guided step
  const handleSelectOptionInStep = (stepIdx: number, option: DecisionOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [stepIdx]: option,
    }));

    // Check if next step is available
    if (stepIdx < 4) {
      setCurrentStepIndex(stepIdx + 1);
    } else {
      // Reached Step 5: Final Quotation Step
      setActiveScreen('final');
    }
  };

  // Navigation: Go back one step
  const handleBackStep = () => {
    sfx.playClick();
    if (currentStepIndex > 1) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      setActiveScreen('reception');
    }
  };

  // Navigation: Reset to reception
  const handleGoToReception = () => {
    sfx.playClick();
    stopVoice();
    setActiveScreen('reception');
  };

  // Navigation: Reset to world map
  const handleResetLocation = () => {
    sfx.playClick();
    stopVoice();
    setActiveScreen('map');
  };

  const currentPathway = DECISION_PATHWAYS.find((p) => p.id === activePathwayId) || DECISION_PATHWAYS[0];

  return (
    <div className="h-[100dvh] max-h-[100dvh] bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950 overflow-hidden">
      
      {/* 3-Zone Clean Top Navigation */}
      <TopBar
        language={language}
        onLanguageChange={handleLanguageChange}
        location={location}
        onResetLocation={handleResetLocation}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        activeScreen={activeScreen}
        onGoToReception={handleGoToReception}
      />

      {/* Main View Area: Contained & Zero-Scroll Optimized */}
      <main className="flex-1 min-h-0 flex flex-col overflow-y-auto sm:overflow-hidden">
        
        {/* Screen 1: World Map Arrival */}
        {activeScreen === 'map' && (
          <WorldMapStep
            onLocationSelected={handleLocationSelected}
            currentLanguage={language}
          />
        )}

        {/* Screen 2: Virtual Reception - Zero-Scroll Guided Questionnaire Selection */}
        {activeScreen === 'reception' && (
          <AvatarReception
            language={language}
            location={location}
            onSelectPathway={handleSelectPathway}
            onBackToMap={handleResetLocation}
          />
        )}

        {/* Screen 3: Guided Multi-step Questionnaire Journey (Steps 1 to 4) */}
        {activeScreen === 'step' && (
          <GuidedStepView
            pathway={currentPathway}
            currentStepIndex={currentStepIndex}
            language={language}
            onSelectOption={handleSelectOptionInStep}
            onBackStep={handleBackStep}
            onGoToReception={handleGoToReception}
            selectedAnswers={selectedAnswers}
          />
        )}

        {/* Screen 4: Step 5 Final Quotation Breakdown & 1-Click WhatsApp/Email Dispatch */}
        {activeScreen === 'final' && (
          <FinalQuotationStep
            pathway={currentPathway}
            language={language}
            location={location}
            selectedAnswers={selectedAnswers}
            onStartOver={handleGoToReception}
            onBackToPreviousStep={() => {
              setCurrentStepIndex(4);
              setActiveScreen('step');
            }}
          />
        )}

      </main>

    </div>
  );
}
