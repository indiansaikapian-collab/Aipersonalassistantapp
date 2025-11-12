import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Mic, Shield, Waves, CheckCircle2, ChevronRight } from 'lucide-react';
import { DeltaLogo } from './DeltaLogo';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: DeltaLogo,
    title: "Assistant at Your Command",
    subtitle: "Voice-controlled AI powered by Gemini",
    description: "Lake is your intelligent assistant that helps you control your device, manage tasks, and automate your daily activities with simple voice commands."
  },
  {
    icon: Shield,
    title: "Grant Necessary Permissions",
    subtitle: "Lake needs these to assist you hands-free",
    description: "To provide the best experience, Lake requires access to your microphone, accessibility services, and notifications. All permissions are optional but recommended.",
    features: [
      { icon: Mic, text: "Microphone for voice commands" },
      { icon: Shield, text: "Accessibility for device control" },
      { icon: CheckCircle2, text: "Notifications for alerts" },
      { icon: Waves, text: "Display overlay for visual feedback" }
    ]
  },
  {
    icon: Waves,
    title: "Voice Features",
    subtitle: "Just say 'Hey Lake' to start",
    description: "Activate Lake hands-free with the wake word, or press the microphone button. Lake understands natural conversation and can help with complex tasks.",
    features: [
      "Wake word activation",
      "Hands-free control",
      "Natural conversation",
      "Context awareness"
    ]
  },
  {
    icon: CheckCircle2,
    title: "You're All Set!",
    subtitle: "Ready to get started",
    description: "You can now start using Lake. Here are some quick tips to get you started:",
    tips: [
      "Say 'Hey Lake' to activate voice commands",
      "Hold the home button for quick access",
      "Create triggers to automate tasks",
      "Lake remembers your preferences"
    ]
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1E88E5] to-[#0D47A1] flex flex-col">
      {/* Stepper */}
      <div className="flex justify-center items-center gap-2 pt-12 pb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : index < currentSlide 
                  ? 'w-2 bg-white/60' 
                  : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center w-full max-w-md"
          >
            {/* Icon */}
            <div className="mb-8">
              {currentSlide === 0 ? (
                <DeltaLogo size={100} state="idle" animated />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <slide.icon className="w-12 h-12 text-white" />
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-white text-3xl mb-3">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 text-lg mb-6">
              {slide.subtitle}
            </p>

            {/* Description */}
            <p className="text-white/70 mb-8 leading-relaxed">
              {slide.description}
            </p>

            {/* Features/Tips */}
            {slide.features && (
              <div className="w-full space-y-4 mb-8">
                {slide.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 text-left bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    {typeof feature === 'object' ? (
                      <>
                        <feature.icon className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{feature.text}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{feature}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {slide.tips && (
              <div className="w-full space-y-3 mb-8">
                {slide.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 text-left">
                    <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-8 space-y-4">
        <Button
          onClick={handleNext}
          className="w-full h-14 bg-white text-[#1E88E5] hover:bg-white/90 rounded-3xl text-lg"
        >
          {isLastSlide ? 'Get Started' : 'Continue'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
        
        {!isLastSlide && (
          <button
            onClick={handleSkip}
            className="w-full text-white/70 hover:text-white transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
