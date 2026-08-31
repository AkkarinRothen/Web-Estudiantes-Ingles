import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LearningPathView from './components/LearningPathView';
import VocabModule from './components/VocabModule';
import TheoryModule from './components/TheoryModule';
import ActivitiesModule from './components/ActivitiesModule';
import ProgressReportModal from './components/ProgressReportModal';
import ProfileManagerModal from './components/common/ProfileManagerModal';
import WelcomeOnboardingModal from './components/common/WelcomeOnboardingModal';
import UnitChallengeActivity from './components/activities/UnitChallengeActivity';
import { 
  loadProgress, 
  saveProgress, 
  recordActivityAttempt, 
  updateStreak,
  hasSeenOnboarding,
  markOnboardingAsSeen
} from './utils/progressStore';
import { Compass, BookOpen, GraduationCap, Gamepad2 } from 'lucide-react';
import { LEARNING_UNITS } from './data/learningUnits';

export default function App() {
  // Navigation tab: 'path' (Mi Ruta), 'vocab', 'theory', 'activities', 'challenge'
  const [activeTab, setActiveTab] = useState('path');
  
  // Progress & Gamification state
  const [progress, setProgress] = useState(loadProgress);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isProfilesOpen, setIsProfilesOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => !hasSeenOnboarding());

  // Active level or challenge context
  const [guidedContext, setGuidedContext] = useState(null); // { unit, level }
  const [activeChallengeUnit, setActiveChallengeUnit] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTheoryId, setSelectedTheoryId] = useState(null);
  const [activityFilterType, setActivityFilterType] = useState(null);
  const [defaultActivityId, setDefaultActivityId] = useState('can-cant');

  // Theme state with local persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('english_app_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('english_app_theme', theme);
  }, [theme]);

  // Check streaks on mount
  useEffect(() => {
    setProgress(prev => updateStreak(prev));
  }, []);

  // Global Keyboard Shortcuts (Escape closes modals)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsReportOpen(false);
        setIsProfilesOpen(false);
        setIsOnboardingOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addStars = (count = 1) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        stars: (prev.stars || 0) + count,
        xp: (prev.xp || 0) + (count * 15),
        level: Math.floor(((prev.xp || 0) + (count * 15)) / 100) + 1
      };
      saveProgress(updated);
      return updated;
    });
  };

  const handleUpdateStudentName = (name) => {
    setProgress(prev => {
      const updated = { ...prev, studentName: name };
      saveProgress(updated);
      return updated;
    });
  };

  const handleProfileChanged = (newProfile) => {
    setProgress(newProfile);
  };

  // Launching a specific level from LearningPathView
  const handleStartLevel = (unit, level) => {
    setGuidedContext({ unit, level });

    if (level.activityType === 'vocab') {
      setSelectedCategory(level.vocabFilter || 'ALL');
      setActiveTab('vocab');
    } else if (level.activityType === 'theory') {
      setSelectedTheoryId(level.theoryId || unit.grammarId);
      setActiveTab('theory');
    } else if (level.activityType === 'mistakes_review') {
      setActivityFilterType(null);
      setDefaultActivityId('can-cant');
      setActiveTab('activities');
    } else {
      const actMap = {
        'can-cant': 'can-cant',
        'structure-builder': 'structure',
        'sentence-elements': 'elements',
        'subject-verb': 'classifier',
        'intruder': 'intruder',
        'who-what': 'whowhat'
      };
      setDefaultActivityId(actMap[level.activityType] || 'can-cant');
      setActivityFilterType(level.filterType || null);
      setActiveTab('activities');
    }
  };

  // Launching a Unit Master Challenge
  const handleStartChallenge = (unit) => {
    setActiveChallengeUnit(unit);
    setActiveTab('challenge');
  };

  // Activity or Challenge Completion Handler
  const handleActivityComplete = (result) => {
    if (!result) return;
    const { activityId, correctCount, totalCount, starsEarned, xpEarned, mistakes, isMasterChallenge } = result;

    const unitId = guidedContext?.unit?.id || activeChallengeUnit?.id;
    const levelId = guidedContext?.level?.id || activeChallengeUnit?.masterChallenge?.id;

    const updated = recordActivityAttempt({
      unitId,
      levelId,
      activityId,
      correctCount,
      totalCount,
      starsEarned,
      xpEarned,
      mistakes,
      isMasterChallenge
    });

    setProgress(updated);
  };

  // Onboarding action: start first lesson
  const handleStartFirstLessonFromOnboarding = () => {
    markOnboardingAsSeen();
    setIsOnboardingOpen(false);
    handleStartLevel(LEARNING_UNITS[0], LEARNING_UNITS[0].levels[0]);
  };

  const handleCloseOnboarding = () => {
    markOnboardingAsSeen();
    setIsOnboardingOpen(false);
  };

  // Return to Path view
  const handleBackToPath = () => {
    setGuidedContext(null);
    setActiveChallengeUnit(null);
    setActiveTab('path');
  };

  return (
    <div className="app-container">
      <Header 
        progress={progress} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onOpenReport={() => setIsReportOpen(true)}
        onOpenProfiles={() => setIsProfilesOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Desktop Main Navigation Tabs */}
      <nav className="nav-tabs desktop-nav">
        <button 
          type="button"
          onClick={() => {
            setGuidedContext(null);
            setActiveChallengeUnit(null);
            setActiveTab('path');
          }} 
          className={`nav-tab ${activeTab === 'path' ? 'active' : ''}`}
        >
          <Compass size={18} />
          <span>Mi Ruta Guiada</span>
        </button>

        <button 
          type="button"
          onClick={() => {
            setSelectedCategory('ALL');
            setActiveTab('vocab');
          }} 
          className={`nav-tab ${activeTab === 'vocab' ? 'active' : ''}`}
        >
          <BookOpen size={18} />
          <span>Vocabulario</span>
        </button>

        <button 
          type="button"
          onClick={() => {
            setSelectedTheoryId(null);
            setActiveTab('theory');
          }} 
          className={`nav-tab ${activeTab === 'theory' ? 'active' : ''}`}
        >
          <GraduationCap size={18} />
          <span>Fichas Teoría</span>
        </button>

        <button 
          type="button"
          onClick={() => {
            setActivityFilterType(null);
            setActiveTab('activities');
          }} 
          className={`nav-tab ${activeTab === 'activities' ? 'active' : ''}`}
        >
          <Gamepad2 size={18} />
          <span>Juegos Libres (6)</span>
        </button>
      </nav>

      {/* Main Tab Content */}
      <main className="main-content-wrapper">
        {activeTab === 'path' && (
          <LearningPathView 
            progress={progress}
            onStartLevel={handleStartLevel}
            onStartChallenge={handleStartChallenge}
            onOpenReport={() => setIsReportOpen(true)}
            onOpenTheory={(theoryId) => {
              setSelectedTheoryId(theoryId);
              setActiveTab('theory');
            }}
            onOpenVocab={(category) => {
              setSelectedCategory(category);
              setActiveTab('vocab');
            }}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabModule 
            addStars={addStars} 
            initialCategory={selectedCategory} 
            onBackToPath={guidedContext ? handleBackToPath : null} 
          />
        )}

        {activeTab === 'theory' && (
          <TheoryModule 
            initialTheoryId={selectedTheoryId} 
            onBackToPath={guidedContext ? handleBackToPath : null} 
          />
        )}

        {activeTab === 'activities' && (
          <ActivitiesModule 
            addStars={addStars} 
            onActivityComplete={handleActivityComplete}
            defaultActivity={defaultActivityId}
            filterType={activityFilterType}
            onBackToPath={guidedContext ? handleBackToPath : null}
          />
        )}

        {activeTab === 'challenge' && activeChallengeUnit && (
          <div className="unit-challenge-page animate-fade-in">
            <div style={{ marginBottom: '1rem' }}>
              <button
                type="button"
                className="btn-back-path"
                onClick={handleBackToPath}
              >
                ← Volver a Mi Ruta
              </button>
            </div>

            <UnitChallengeActivity 
              unit={activeChallengeUnit}
              addStars={addStars}
              onComplete={handleActivityComplete}
              onOpenTheory={(theoryId) => {
                setSelectedTheoryId(theoryId);
                setActiveTab('theory');
              }}
              onOpenVocab={(category) => {
                setSelectedCategory(category);
                setActiveTab('vocab');
              }}
            />
          </div>
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav">
        <button
          type="button"
          className={`bottom-nav-item ${activeTab === 'path' || activeTab === 'challenge' ? 'active' : ''}`}
          onClick={() => {
            setGuidedContext(null);
            setActiveChallengeUnit(null);
            setActiveTab('path');
          }}
          aria-label="Mi Ruta"
        >
          <Compass size={22} />
          <span>Mi Ruta</span>
        </button>

        <button
          type="button"
          className={`bottom-nav-item ${activeTab === 'vocab' ? 'active' : ''}`}
          onClick={() => {
            setSelectedCategory('ALL');
            setActiveTab('vocab');
          }}
          aria-label="Vocabulario"
        >
          <BookOpen size={22} />
          <span>Vocabulario</span>
        </button>

        <button
          type="button"
          className={`bottom-nav-item ${activeTab === 'theory' ? 'active' : ''}`}
          onClick={() => {
            setSelectedTheoryId(null);
            setActiveTab('theory');
          }}
          aria-label="Teoría"
        >
          <GraduationCap size={22} />
          <span>Teoría</span>
        </button>

        <button
          type="button"
          className={`bottom-nav-item ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => {
            setActivityFilterType(null);
            setActiveTab('activities');
          }}
          aria-label="Juegos"
        >
          <Gamepad2 size={22} />
          <span>Juegos</span>
        </button>
      </nav>

      {/* Welcome Onboarding Modal for First Time Visitors */}
      {isOnboardingOpen && (
        <WelcomeOnboardingModal
          onStartFirstLesson={handleStartFirstLessonFromOnboarding}
          onClose={handleCloseOnboarding}
        />
      )}

      {/* Progress & Report Modal */}
      {isReportOpen && (
        <ProgressReportModal 
          progress={progress}
          onClose={() => setIsReportOpen(false)}
          onUpdateName={handleUpdateStudentName}
        />
      )}

      {/* Profile Manager Modal */}
      {isProfilesOpen && (
        <ProfileManagerModal
          currentProfile={progress}
          onClose={() => setIsProfilesOpen(false)}
          onProfileChanged={handleProfileChanged}
        />
      )}
    </div>
  );
}
