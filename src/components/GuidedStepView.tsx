import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Building2,
  ShoppingBag,
  Layers,
  Flame,
  UserCheck,
  Lightbulb,
  FileCheck,
  RefreshCw,
  TrendingUp,
  Zap,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  CalendarCheck,
  Award,
  Crown,
  Clock,
  HelpCircle,
  Bot,
  MessageSquareCode,
  FileSpreadsheet,
  UserPlus,
  Share2,
  Cpu,
  PhoneCall,
  Languages,
  Globe2,
  Mic,
  Eye,
  Check,
  Target,
  Shield,
  Compass,
  HeartPulse,
  Building,
  CheckCheck,
  FileText,
  AlertTriangle,
  UserMinus,
  Coins,
  Hourglass,
  Globe,
  Users,
  Plane,
  Briefcase,
  Heart,
  Shuffle,
  MessageSquare,
  Filter,
  PlusCircle,
  Smile,
  Video,
  Phone,
  MapPin,
  Mail,
  Moon,
  Calculator,
  Handshake,
  Calendar,
  Palette,
  Copy,
  Server,
  Smartphone,
  Database,
  Repeat
} from 'lucide-react';
import { Language, DecisionPathway, DecisionOption } from '../types';
import { sfx, speakVoice, stopVoice } from '../utils/audio';
import { InteractiveConceptualShowcase } from './InteractiveConceptualShowcase';

interface GuidedStepViewProps {
  pathway: DecisionPathway;
  currentStepIndex: number; // 1 to 4
  language: Language;
  onSelectOption: (stepIndex: number, option: DecisionOption) => void;
  onBackStep: () => void;
  onGoToReception: () => void;
  selectedAnswers: Record<number, DecisionOption>;
}

export const GuidedStepView: React.FC<GuidedStepViewProps> = ({
  pathway,
  currentStepIndex,
  language,
  onSelectOption,
  onBackStep,
  onGoToReception,
  selectedAnswers,
}) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const currentStep = pathway.steps.find((s) => s.stepIndex === currentStepIndex) || pathway.steps[0];
  const currentlySelectedOption = selectedAnswers[currentStepIndex];

  // Avatar speech for the active step
  const speechText = currentStep.avatarSpeech[language];

  const playStepSpeech = () => {
    setIsPlayingVoice(true);
    speakVoice(speechText, language, {
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      playStepSpeech();
    }, 350);

    return () => {
      clearTimeout(timer);
      stopVoice();
    };
  }, [currentStepIndex, language]);

  const handleOptionClick = (option: DecisionOption) => {
    sfx.playClick();
    onSelectOption(currentStepIndex, option);
  };

  // Helper to map string iconName to Lucide component
  const renderOptionIcon = (iconName: string) => {
    const props = { className: "w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 shrink-0" };
    switch (iconName) {
      case 'Building2': return <Building2 {...props} />;
      case 'ShoppingBag': return <ShoppingBag {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'UserCheck': return <UserCheck {...props} />;
      case 'Lightbulb': return <Lightbulb {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'RefreshCw': return <RefreshCw {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'CreditCard': return <CreditCard {...props} />;
      case 'MessageCircle': return <MessageCircle {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'CalendarCheck': return <CalendarCheck {...props} />;
      case 'Award': return <Award {...props} />;
      case 'Crown': return <Crown {...props} />;
      case 'Clock': return <Clock {...props} />;
      case 'HelpCircle': return <HelpCircle {...props} />;
      case 'Bot': return <Bot {...props} />;
      case 'MessageSquareCode': return <MessageSquareCode {...props} />;
      case 'FileSpreadsheet': return <FileSpreadsheet {...props} />;
      case 'UserPlus': return <UserPlus {...props} />;
      case 'Share2': return <Share2 {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'PhoneCall': return <PhoneCall {...props} />;
      case 'Languages': return <Languages {...props} />;
      case 'Globe2': return <Globe2 {...props} />;
      case 'Mic': return <Mic {...props} />;
      case 'Eye': return <Eye {...props} />;
      case 'Check': return <Check {...props} />;
      case 'Target': return <Target {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'HeartPulse': return <HeartPulse {...props} />;
      case 'Building': return <Building {...props} />;
      case 'CheckCheck': return <CheckCheck {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'AlertTriangle': return <AlertTriangle {...props} />;
      case 'UserMinus': return <UserMinus {...props} />;
      case 'Coins': return <Coins {...props} />;
      case 'Hourglass': return <Hourglass {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Plane': return <Plane {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Shuffle': return <Shuffle {...props} />;
      case 'MessageSquare': return <MessageSquare {...props} />;
      case 'Filter': return <Filter {...props} />;
      case 'PlusCircle': return <PlusCircle {...props} />;
      case 'Smile': return <Smile {...props} />;
      case 'Video': return <Video {...props} />;
      case 'Phone': return <Phone {...props} />;
      case 'MapPin': return <MapPin {...props} />;
      case 'Mail': return <Mail {...props} />;
      case 'Moon': return <Moon {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'Handshake': return <Handshake {...props} />;
      case 'Calendar': return <Calendar {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Copy': return <Copy {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Smartphone': return <Smartphone {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Repeat': return <Repeat {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const totalSteps = pathway.steps.length;
  const progressPct = Math.round((currentStepIndex / totalSteps) * 100);

  return (
    <div className="h-full max-h-full flex-1 flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-6 max-w-4xl mx-auto w-full overflow-hidden select-none">
      
      {/* 1. Header Navigation & Sleek Progress Bar */}
      <div className="shrink-0 space-y-1.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <button
            type="button"
            onClick={onBackStep}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentStepIndex === 1 ? (language === 'si' ? 'Reception' : 'Reception') : (language === 'si' ? 'පෙර ප්‍රශ්නය' : 'Previous')}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400">
              {language === 'si' ? `ප්‍රශ්න අංක 0${currentStepIndex} / 0${totalSteps}` : `Question 0${currentStepIndex} of 0${totalSteps}`}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
              {pathway.badge[language]}
            </span>
          </div>

          <button
            type="button"
            onClick={onGoToReception}
            className="text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            {language === 'si' ? 'මුලට' : 'Reset'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* 2. Questionnaire Question & Speech Prompt with Mini Founder Avatar */}
      <div className="shrink-0 bg-neutral-900/90 border border-neutral-800 rounded-xl p-2 sm:p-2.5 my-1 sm:my-1.5 shadow flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Mini Founder Avatar */}
          <div className="relative shrink-0">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-950 border border-amber-400/40 p-0.5 overflow-hidden shadow ${
              isPlayingVoice ? 'ring-2 ring-amber-400' : ''
            }`}>
              <img 
                src="/assets/founder/founder_transparent_FINAL.png" 
                alt="Shanthapriya"
                className="w-full h-full object-cover object-top rounded-lg bg-neutral-900"
              />
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-neutral-950 ${
              isPlayingVoice ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'
            }`}></span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className="font-bold text-amber-400 uppercase tracking-wider">
                {currentStep.stepTitle[language]}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400 font-medium">
                {language === 'si' ? 'ශාන්තප්‍රිය' : 'Shanthapriya'}
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
              {currentStep.stepQuestion[language]}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={playStepSpeech}
          className="p-2 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-amber-400 shrink-0 transition-colors"
          title="Play voice guide"
        >
          <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? 'animate-bounce text-amber-300' : ''}`} />
        </button>
      </div>

      {/* 3. The 5 Questionnaire Option Choices (Zero-Scroll Touch Rows) */}
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

                {/* Option Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                      isSelected ? 'text-amber-300' : 'text-neutral-100 group-hover:text-amber-200'
                    }`}>
                      {option.title[language]}
                    </h3>
                    {option.tag && (
                      <span className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 shrink-0">
                        {option.tag[language]}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {option.subtitle[language]}
                  </p>
                </div>
              </div>

              {/* Right Side: Demo Preview & Checkmark */}
              <div className="shrink-0 flex items-center gap-2">
                {isConceptualDemo && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      sfx.playClick();
                      setSelectedDemoId(option.id);
                      setIsDemoModalOpen(true);
                    }}
                    className="px-2 py-1 text-[11px] font-medium rounded-lg bg-neutral-950 border border-neutral-800 text-amber-400 hover:border-amber-400 transition-colors"
                  >
                    {language === 'si' ? 'Preview' : 'Preview'}
                  </button>
                )}

                <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-neutral-950 text-neutral-600 group-hover:text-amber-400 border border-neutral-800'
                }`}>
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 fill-current" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Advance Bar */}
      <div className="shrink-0 pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-3 text-xs">
        <div className="text-[11px] text-neutral-400 truncate">
          {currentlySelectedOption ? (
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">
                {language === 'si' ? 'තෝරාගත් පිළිතුර:' : 'Selected:'} <strong className="text-amber-300">{currentlySelectedOption.title[language]}</strong>
              </span>
            </span>
          ) : (
            <span>{language === 'si' ? 'පිළිතුරක් තෝරන්න (1 සිට 5 දක්වා)' : 'Select an option to advance'}</span>
          )}
        </div>

        {currentlySelectedOption && (
          <button
            type="button"
            onClick={() => {
              sfx.playStepTransition();
              onSelectOption(currentStepIndex, currentlySelectedOption);
            }}
            className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition-transform active:scale-95 shrink-0"
          >
            <span>{currentStepIndex === 4 ? (language === 'si' ? 'මිල ගණන් බලන්න' : 'View Quote') : (language === 'si' ? 'ඊළඟ පියවර' : 'Next')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Modal for Conceptual Live Previews */}
      {isDemoModalOpen && selectedDemoId && (
        <InteractiveConceptualShowcase
          demoId={selectedDemoId}
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          onChooseThisModel={() => {
            setIsDemoModalOpen(false);
            const opt = currentStep.options.find(o => o.id === selectedDemoId);
            if (opt) handleOptionClick(opt);
          }}
          language={language}
        />
      )}

    </div>
  );
};
