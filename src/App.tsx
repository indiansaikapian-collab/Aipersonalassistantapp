import { useState, useEffect } from 'react';
import { Splash } from './components/Splash';
import { Onboarding } from './components/Onboarding';
import { MainDashboard } from './components/MainDashboard';
import { TriggersScreen } from './components/TriggersScreen';
import { MemoriesScreen } from './components/MemoriesScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { MomentsScreen } from './components/MomentsScreen';
import { CreateTriggerScreen } from './components/CreateTriggerScreen';
import { PermissionsScreen } from './components/PermissionsScreen';
import { VoiceInteractionOverlay } from './components/VoiceInteractionOverlay';
import { FloatingAssistant } from './components/FloatingAssistant';
import { Toaster } from './components/ui/sonner';

// Add viewport meta tags for mobile optimization
if (typeof document !== 'undefined') {
  const setViewport = () => {
    let viewport = document.querySelector('meta[name=viewport]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    );
  };

  const setThemeColor = () => {
    let themeColor = document.querySelector('meta[name=theme-color]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColor);
    }
    themeColor.setAttribute('content', '#1E88E5');
  };

  const setMobileWebAppCapable = () => {
    let capable = document.querySelector('meta[name=mobile-web-app-capable]');
    if (!capable) {
      capable = document.createElement('meta');
      capable.setAttribute('name', 'mobile-web-app-capable');
      document.head.appendChild(capable);
    }
    capable.setAttribute('content', 'yes');
  };

  const setAppleCapable = () => {
    let appleCapable = document.querySelector('meta[name=apple-mobile-web-app-capable]');
    if (!appleCapable) {
      appleCapable = document.createElement('meta');
      appleCapable.setAttribute('name', 'apple-mobile-web-app-capable');
      document.head.appendChild(appleCapable);
    }
    appleCapable.setAttribute('content', 'yes');
    
    let appleStatus = document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]');
    if (!appleStatus) {
      appleStatus = document.createElement('meta');
      appleStatus.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
      document.head.appendChild(appleStatus);
    }
    appleStatus.setAttribute('content', 'black-translucent');
  };

  setViewport();
  setThemeColor();
  setMobileWebAppCapable();
  setAppleCapable();
}

export type Screen = 
  | 'splash'
  | 'onboarding'
  | 'dashboard'
  | 'triggers'
  | 'memories'
  | 'settings'
  | 'moments'
  | 'create-trigger'
  | 'permissions';

export type AssistantState = 'idle' | 'listening' | 'processing' | 'responding' | 'executing' | 'error';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [assistantState, setAssistantState] = useState<AssistantState>('idle');
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(true);

  useEffect(() => {
    // Simulate splash screen
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('dashboard');
  };

  const handleVoiceActivation = () => {
    setShowVoiceOverlay(true);
    setAssistantState('listening');
  };

  const handleVoiceClose = () => {
    setShowVoiceOverlay(false);
    setAssistantState('idle');
  };

  useEffect(() => {
    // Prevent pull-to-refresh on mobile
    const preventPullToRefresh = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      const touch = e.touches[0];
      if (touch.clientY > 0 && window.scrollY === 0) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });

    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    const preventZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', preventZoom, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh);
      document.removeEventListener('touchend', preventZoom);
    };
  }, []);

  return (
    <div className="mobile-app-container relative w-full min-h-screen bg-[#F5F7FA] overflow-hidden touch-none select-none">
      {/* Main Screen Content */}
      {currentScreen === 'splash' && <Splash />}
      {currentScreen === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}
      {currentScreen === 'dashboard' && (
        <MainDashboard 
          onNavigate={setCurrentScreen}
          assistantState={assistantState}
          onVoiceActivation={handleVoiceActivation}
        />
      )}
      {currentScreen === 'triggers' && <TriggersScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'memories' && <MemoriesScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'settings' && <SettingsScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'moments' && <MomentsScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'create-trigger' && <CreateTriggerScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'permissions' && <PermissionsScreen onNavigate={setCurrentScreen} />}

      {/* Voice Interaction Overlay */}
      {showVoiceOverlay && (
        <VoiceInteractionOverlay 
          state={assistantState} 
          onClose={handleVoiceClose}
          onStateChange={setAssistantState}
        />
      )}

      {/* Floating Assistant Button */}
      {hasCompletedOnboarding && currentScreen !== 'splash' && currentScreen !== 'onboarding' && showFloatingButton && (
        <FloatingAssistant onActivate={handleVoiceActivation} />
      )}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default App;
