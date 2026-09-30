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
  CheckCircle,
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
  Smartphone
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
    }, 400);

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
    const props = { className: "w-5 h-5 text-amber-400 shrink-0" };
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
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Top Header & Breadcrumbs */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-800/80 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onGoToReception}
            className="text-neutral-400 hover:text-amber-400 transition-colors"
          >
            {language === 'si' ? 'පිළිගැනීමේ මැදිරිය' : 'Virtual Reception'}
          </button>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-300 font-medium">
            {pathway.badge[language]}
          </span>
          <span className="text-neutral-600">/</span>
          <span className="text-amber-400 font-semibold">
            {language === 'si' ? `පියවර ${currentStepIndex} / 4` : `Step ${currentStepIndex} of 4`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackStep}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'si' ? 'පසුපසට (Back)' : 'Previous Step'}</span>
          </button>

          <button
            onClick={onGoToReception}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'si' ? 'මුලට (Start Over)' : 'Start Over'}</span>
          </button>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="relative z-10 w-full mb-6">
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
          <span>{currentStep.stepTitle[language]}</span>
          <span className="font-mono text-amber-400 font-semibold">{currentStepIndex * 25}%</span>
        </div>
        <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${currentStepIndex * 25}%` }}
          />
        </div>
      </div>

      {/* Virtual Architect Step Host Mini-Banner */}
      <div className="relative z-10 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-md mb-6 flex items-start sm:items-center gap-4">
        
        {/* Avatar Mini Icon */}
        <div className="relative shrink-0">
          <div className={`w-12 h-12 rounded-full bg-neutral-950 border ${isPlayingVoice ? 'border-amber-400 shadow-md shadow-amber-500/30' : 'border-neutral-700'} flex items-center justify-center`}>
            <div className="w-6 h-6 rounded-lg bg-amber-400 text-neutral-950 font-bold flex items-center justify-center text-xs">
              R
            </div>
          </div>
          {isPlayingVoice && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 animate-ping"></span>
          )}
        </div>

        {/* Speech Text */}
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
              {language === 'si' ? 'Digital Architect මගපෙන්වීම' : 'Digital Architect Voice Guidance'}
            </span>
            <button
              type="button"
              onClick={playStepSpeech}
              className="text-xs text-neutral-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
              title="Replay Voice"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? 'text-amber-400 animate-pulse' : ''}`} />
              <span className="hidden sm:inline">{language === 'si' ? 'හඬ අසන්න' : 'Listen'}</span>
            </button>
          </div>

          <p className="text-sm sm:text-base text-neutral-200 font-medium font-sans">
            &ldquo;{speechText}&rdquo;
          </p>
        </div>

      </div>

      {/* Main Question Header */}
      <div className="relative z-10 mb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-100 font-display">
          {currentStep.stepQuestion[language]}
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          {language === 'si'
            ? 'පහතින් ඇති විකල්ප 5 න් ඔබට වඩාත්ම ගැළපෙන අංකය මත Click කරන්න.'
            : 'Select one of the 5 options below to proceed immediately to the next step.'}
        </p>
      </div>

      {/* 5 Distinct Action Choices (The Dialog IVR Model) */}
      <div className="relative z-10 space-y-3 mb-8">
        {currentStep.options.map((option, idx) => {
          const isSelected = currentlySelectedOption?.id === option.id;
          const isConceptualDemo = pathway.id === 'conceptual_showcase' && currentStepIndex === 1;

          return (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={`w-full p-4 sm:p-5 rounded-xl border text-left cursor-pointer transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${
                isSelected
                  ? 'bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-500/15 ring-1 ring-amber-400'
                  : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-start sm:items-center gap-4">
                
                {/* Number Badge (01, 02, 03, 04, 05) */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-400 group-hover:border-amber-400/50 group-hover:text-amber-300'
                }`}>
                  0{idx + 1}
                </div>

                {/* Option Icon */}
                <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800/80 shrink-0">
                  {renderOptionIcon(option.iconName)}
                </div>

                {/* Option Details */}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                      isSelected ? 'text-amber-300' : 'text-neutral-100 group-hover:text-amber-200'
                    }`}>
                      {option.title[language]}
                    </h3>
                    {option.tag && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400">
                        {option.tag[language]}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {option.subtitle[language]}
                  </p>
                </div>

              </div>

              {/* Right Side Affordances */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {/* If it's a showcase demo, show preview button */}
                {isConceptualDemo && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      sfx.playClick();
                      setSelectedDemoId(option.id);
                      setIsDemoModalOpen(true);
                    }}
                    className="px-2.5 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-amber-400 hover:border-amber-400 transition-colors"
                  >
                    {language === 'si' ? 'සජීවීව බලන්න' : 'Live Preview'}
                  </button>
                )}

                {/* Checkmark or Selection Arrow */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-neutral-950 text-neutral-600 group-hover:text-amber-400 group-hover:border-neutral-700'
                }`}>
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 fill-current" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Selected Option Notification & Advance Indicator */}
      {currentlySelectedOption && (
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-amber-400/5 border border-amber-400/30 mb-4">
          <div className="text-xs text-neutral-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {language === 'si' ? 'ඔබ තෝරාගත් පිළිතුර:' : 'Selected:'} <strong className="text-amber-300">{currentlySelectedOption.title[language]}</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sfx.playStepTransition();
              onSelectOption(currentStepIndex, currentlySelectedOption);
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
          >
            <span>{currentStepIndex === 4 ? (language === 'si' ? 'මිල ගණන් සහ සැලැස්ම ලබාගන්න' : 'View Customized Quotation') : (language === 'si' ? 'ඊළඟ පියවරට යන්න' : 'Proceed to Next Step')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

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

      {/* Reassurance Footer */}
      <div className="relative z-10 pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
        <span>No commitment required · Change any option anytime</span>
        <span>Ravana Tech Guarantees 100% Client Satisfaction</span>
      </div>

    </div>
  );
};
