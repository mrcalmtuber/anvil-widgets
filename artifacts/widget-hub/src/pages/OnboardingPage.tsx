import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Welcome to Widget Hub",
    subtitle: "Your personal command center for iPhone widgets — browse, customize, and build your perfect home screen.",
    bgColor: "#007AFF",
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <rect width="72" height="72" rx="18" fill="#007AFF" fillOpacity="0.15"/>
        <rect x="14" y="14" width="18" height="18" rx="5" fill="#007AFF"/>
        <rect x="38" y="14" width="18" height="18" rx="5" fill="#4FC3F7"/>
        <rect x="14" y="38" width="18" height="18" rx="5" fill="#34C759"/>
        <rect x="38" y="38" width="18" height="18" rx="5" fill="#FF9500"/>
      </svg>
    ),
  },
  {
    title: "Customize Everything",
    subtitle: "Tap any widget to personalize it — change your city, tasks, goals, song, and much more.",
    bgColor: "#BF5AF2",
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <rect width="72" height="72" rx="18" fill="#BF5AF2" fillOpacity="0.15"/>
        <path d="M22 36h28M36 22v28" stroke="#BF5AF2" strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="36" cy="36" r="10" fill="#BF5AF2" fillOpacity="0.25" stroke="#BF5AF2" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: "Build Your Screen",
    subtitle: "Add widgets to My Screen to preview your layout. Create the home screen you've always wanted.",
    bgColor: "#34C759",
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <rect width="72" height="72" rx="18" fill="#34C759" fillOpacity="0.15"/>
        <rect x="20" y="12" width="32" height="48" rx="6" stroke="#34C759" strokeWidth="2.5" fill="none"/>
        <rect x="26" y="22" width="9" height="9" rx="2.5" fill="#34C759"/>
        <rect x="37" y="22" width="9" height="9" rx="2.5" fill="#4FC3F7"/>
        <rect x="26" y="35" width="20" height="7" rx="2.5" fill="#34C759" fillOpacity="0.4"/>
        <rect x="26" y="46" width="13" height="5" rx="2" fill="#34C759" fillOpacity="0.25"/>
      </svg>
    ),
  },
];

interface OnboardingPageProps {
  onComplete: () => void;
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      localStorage.setItem("onboarding-complete", "true");
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding-complete", "true");
    onComplete();
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-[100dvh] w-full bg-black text-white flex flex-col items-center justify-between px-6 pt-14 pb-12">
      <div className="w-full flex justify-end h-6">
        {currentSlide < slides.length - 1 && (
          <button onClick={handleSkip} className="text-[14px] text-white/40 font-medium" data-testid="skip-onboarding">
            Skip
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="flex flex-col items-center text-center gap-6 flex-1 justify-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="mb-2">{slide.icon}</div>
          <h1 className="text-[30px] font-bold tracking-tight leading-tight">{slide.title}</h1>
          <p className="text-[16px] text-white/55 leading-relaxed max-w-[280px]">{slide.subtitle}</p>
        </motion.div>
      </AnimatePresence>

      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentSlide ? 20 : 6,
                height: 6,
                backgroundColor: i === currentSlide ? "#ffffff" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full max-w-xs h-14 rounded-2xl bg-white text-black font-semibold text-[16px] flex items-center justify-center gap-2"
          data-testid="onboarding-next"
        >
          {currentSlide < slides.length - 1 ? (
            <>Next <ChevronRight className="w-4 h-4" /></>
          ) : (
            "Get Started"
          )}
        </button>
      </div>
    </div>
  );
}
