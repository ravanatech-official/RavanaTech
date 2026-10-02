import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Volume2, 
  HelpCircle,
  Building2, 
  Sparkles, 
  ShoppingBag, 
  Building, 
  Briefcase, 
  PhoneCall, 
  MessageSquare, 
  CalendarCheck, 
  FileText, 
  Users, 
  Cpu, 
  Layers, 
  Clock, 
  Shield, 
  Smartphone, 
  TrendingUp, 
  Zap, 
  Target, 
  AlertTriangle, 
  Award, 
  UserMinus, 
  Lightbulb,
  CheckCircle2,
  Filter,
  Flame,
  Globe,
  RefreshCw,
  Video
} from 'lucide-react';
import { Language, DecisionPathway, DecisionOption } from '../types';
import { sfx, speakVoice, stopVoice } from '../utils/audio';
import { InteractiveConceptualShowcase } from './InteractiveConceptualShowcase';

interface GuidedStepViewProps {
  pathway: DecisionPathway;
  currentStepIndex: number;
  language?: Language;
  onSelectOption: (stepIndex: number, option: DecisionOption) => void;
  onBackStep: () => void;
  onGoToReception: () => void;
  onHelpMeChoose?: () => void;
  selectedAnswers: Record<number, DecisionOption>;
}

export const GuidedStepView: React.FC<GuidedStepViewProps> = ({
  pathway,
  currentStepIndex,
  onSelectOption,
  onBackStep,
  onGoToReception,
  onHelpMeChoose,
  selectedAnswers,
}) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Safe fallback to step 1 if currentStepIndex is out of range
  const currentStep = pathway.steps.find((s) => s.stepIndex === currentStepIndex) || pathway.steps[0];
  const currentlySelectedOption = selectedAnswers[currentStepIndex];

  // Voice speech logic (Pure English)
  const speechText = currentStep.avatarSpeech.en || currentStep.stepQuestion.en;

  const playStepSpeech = () => {
    setIsPlayingVoice(true);
    speakVoice(speechText, 'en', {
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });
  };

  // Play audio upon question entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      playStepSpeech();
    }, 450);

    return () => {
      clearTimeout(timer);
      stopVoice();
    };
  }, [currentStepIndex, pathway.id]);

  const handleOptionClick = (option: DecisionOption) => {
    sfx.playClick();
    stopVoice();
    onSelectOption(currentStepIndex, option);
  };

  // Map Lucide icons cleanly
  const renderOptionIcon = (iconName: string) => {
    const iconClass = "w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 shrink-0";
    switch (iconName) {
      case 'Building2': return <Building2 className={iconClass} />;
      case 'Sparkles': return <Sparkles className={iconClass} />;
      case 'ShoppingBag': return <ShoppingBag className={iconClass} />;
      case 'Building': return <Building className={iconClass} />;
      case 'Briefcase': return <Briefcase className={iconClass} />;
      case 'PhoneCall': return <PhoneCall className={iconClass} />;
      case 'MessageSquare': return <MessageSquare className={iconClass} />;
      case 'CalendarCheck': return <CalendarCheck className={iconClass} />;
      case 'FileText': return <FileText className={iconClass} />;
      case 'Users': return <Users className={iconClass} />;
      case 'Cpu': return <Cpu className={iconClass} />;
      case 'Layers': return <Layers className={iconClass} />;
      case 'Clock': return <Clock className={iconClass} />;
      case 'Shield': return <Shield className={iconClass} />;
      case 'Smartphone': return <Smartphone className={iconClass} />;
      case 'TrendingUp': return <TrendingUp className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      case 'Target': return <Target className={iconClass} />;
      case 'AlertTriangle': return <AlertTriangle className={iconClass} />;
      case 'Award': return <Award className={iconClass} />;
      case 'UserMinus': return <UserMinus className={iconClass} />;
      case 'Lightbulb': return <Lightbulb className={iconClass} />;
      case 'Filter': return <Filter className={iconClass} />;
      case 'Flame': return <Flame className={iconClass} />;
      case 'Globe': return <Globe className={iconClass} />;
      case 'RefreshCw': return <RefreshCw className={iconClass} />;
      case 'Video': return <Video className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  const totalSteps = pathway.steps.length;
  const progressPct = Math.round((currentStepIndex / totalSteps) * 100);

  return (
    <div className="h-full max-h-full flex-1 flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-6 max-w-4xl mx-auto w-full overflow-hidden select-none">
      
      {/* 1. Header Navigation & Progress Bar (Universal Escape Bar) */}
      <div className="shrink-0 space-y-1.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={onBackStep}
              className="flex items-center gap-1 text-neutral-400 hover:text-amber-400 font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{currentStepIndex === 1 ? 'Reception' : 'Back'}</span>
            </button>
            <span className="text-neutral-700">|</span>
            <button
              type="button"
              onClick={onGoToReception}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              Reset
            </button>
            {pathway.id !== 'not_sure' && onHelpMeChoose && (
              <>
                <span className="text-neutral-700">|</span>
                <button
                  type="button"
                  onClick={onHelpMeChoose}
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer text-[11px]"
                >
                  <HelpCircle className="w-3 h-3 text-amber-400" />
                  <span>❓ Help Me Choose</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400">
              Question 0{currentStepIndex} of 0{totalSteps}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
              {pathway.badge.en}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* 2. Questionnaire Question: Prominent Headline + Exactly 1-Sentence Brief */}
      <div className="shrink-0 bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5 sm:p-3 my-1.5 shadow flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mini Founder Avatar */}
          <div className="relative shrink-0">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-950 border border-amber-400/40 p-0.5 overflow-hidden shadow ${
              isPlayingVoice ? 'ring-2 ring-amber-400' : ''
            }`}>
              <img 
                src="/assets/founder/founder_transparent_FINAL.png" 
                alt="Shanthapriya Silva"
                className="w-full h-full object-cover object-top rounded-lg bg-neutral-900"
              />
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-neutral-950 ${
              isPlayingVoice ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'
            }`}></span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
              <span className="font-bold text-amber-400 uppercase tracking-wider">
                {currentStep.stepTitle.en}
              </span>
              <span>·</span>
              <span>Shanthapriya Silva · Lead Architect</span>
            </div>
            
            {/* Prominent Question Headline */}
            <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-white tracking-tight mt-0.5 leading-snug">
              {currentStep.stepQuestion.en}
            </h2>

            {/* Exactly 1-Sentence Simple Brief */}
            <p className="text-[11px] sm:text-xs text-neutral-300 mt-0.5 leading-tight">
              {currentStep.stepSubBrief?.en || currentStep.avatarSpeech.en}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={playStepSpeech}
          className="p-2 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-amber-400 shrink-0 transition-colors cursor-pointer"
          title="Play English voice guide"
        >
          <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? 'animate-bounce text-amber-300' : ''}`} />
        </button>
      </div>

      {/* 3. The Questionnaire Option Choices (Zero-Scroll Touch Rows) */}
      <div className="flex-1 flex flex-col justify-center gap-2 sm:gap-2.5 max-h-[calc(100vh-210px)]">
        {currentStep.options.map((option, idx) => {
          const isSelected = currentlySelectedOption?.id === option.id;
          const isConceptualDemo = pathway.id === 'conceptual_showcase' && currentStepIndex === 1;

          return (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={`w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl border text-left cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 group active:scale-[0.99] ${
                isSelected
                  ? 'bg-amber-400/10 border-amber-400 shadow-md shadow-amber-400/20 ring-1 ring-amber-400'
                  : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                {/* Number Badge */}
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-400 group-hover:border-amber-400/50 group-hover:text-amber-300'
                }`}>
                  0{idx + 1}
                </div>

                {/* Option Icon */}
                <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-950 border border-neutral-800 shrink-0">
                  {renderOptionIcon(option.iconName)}
                </div>

                {/* Content: Clean Title + 1-Sentence Subtitle */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                      isSelected ? 'text-amber-300' : 'text-white group-hover:text-amber-200'
                    }`}>
                      {option.title.en}
                    </h3>
                    {option.tag && (
                      <span className="hidden md:inline-block text-[9px] font-mono text-neutral-400">
                        · {option.tag.en}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 group-hover:text-neutral-300 transition-colors line-clamp-1 leading-snug">
                    {option.subtitle.en}
                  </p>
                </div>
              </div>

              {/* Selection Indicator or Conceptual Demo Action */}
              <div className="shrink-0 flex items-center gap-2">
                {isConceptualDemo && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDemoId(option.id);
                      setIsDemoModalOpen(true);
                      sfx.playSuccess();
                    }}
                    className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-neutral-950 border border-amber-400/40 text-[10px] font-mono text-amber-300 hover:bg-amber-400 hover:text-neutral-950 transition-colors"
                  >
                    <span>Preview Demo</span>
                  </button>
                )}

                <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                  isSelected 
                    ? 'bg-amber-400 border-amber-400 text-neutral-950' 
                    : 'border-neutral-700 group-hover:border-neutral-500'
                }`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Footer Info: Express Guarantee */}
      <div className="shrink-0 flex items-center justify-between pt-1 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-mono">
        <span>Sprint Speed: Sub-second PageSpeed 95+</span>
        <span className="text-amber-400/90 font-bold">100% Zero-Slop Handcrafted Code</span>
      </div>

      {/* Conceptual Prototype Interactive Demo Modal */}
      {isDemoModalOpen && selectedDemoId && (
        <InteractiveConceptualShowcase
          demoId={selectedDemoId}
          isOpen={isDemoModalOpen}
          language="en"
          onClose={() => {
            setIsDemoModalOpen(false);
            setSelectedDemoId(null);
          }}
          onChooseThisModel={() => {
            setIsDemoModalOpen(false);
            setSelectedDemoId(null);
          }}
        />
      )}

    </div>
  );
};
