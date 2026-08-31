import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LearningPathView from './components/LearningPathView';
import VocabModule from './components/VocabModule';
import TheoryModule from './components/TheoryModule';
import ActivitiesModule from './components/ActivitiesModule';
import ProgressReportModal from './components/ProgressReportModal';
import { 
  loadProgress, 
  saveProgress, 
  recordActivityAttempt, 
  updateStreak 
} from './utils/progressStore';
import { Compass, BookOpen, GraduationCap, Gamepad2 } from 'lucide-react';

export default function App() {
  // Navigation tab: 'path' (Mi Ruta), 'vocab', 'theory', 'activities'
  const [activeTab, setActiveTab] = useState('path');
  
  // Progress & Gamification state
  const [progress, setProgress] = useState(loadProgress);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Active level context when launched from the guided path
  const [guidedContext, setGuidedContext] = useState(null); // { unit, level }
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
      // Map to activity ID
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

  // Activity Completion Handler
  const handleActivityComplete = (result) => {
    if (!result) return;
    const { activityId, correctCount, totalCount, starsEarned, xpEarned, mistakes } = result;

    const unitId = guidedContext?.unit?.id;
    const levelId = guidedContext?.level?.id;

    const updated = recordActivityAttempt({
      unitId,
      levelId,
      activityId,
      correctCount,
      totalCount,
      starsEarned,
      xpEarned,
      mistakes
    });

    setProgress(updated);
  };

  // Return to Path view
  const handleBackToPath = () => {
    setGuidedContext(null);
    setActiveTab('path');
  };

  return (
    <div className="app-container">
      <Header 
        progress={progress} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onOpenReport={() => setIsReportOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Desktop Main Navigation Tabs */}
      <nav className="nav-tabs desktop-nav">
        <button 
          type="button"
          onClick={() => {
            setGuidedContext(null);
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
      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav">
        <button
          type="button"
          className={`bottom-nav-item ${activeTab === 'path' ? 'active' : ''}`}
          onClick={() => {
            setGuidedContext(null);
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

      {/* Progress & Report Modal */}
      {isReportOpen && (
        <ProgressReportModal 
          progress={progress}
          onClose={() => setIsReportOpen(false)}
          onUpdateName={handleUpdateStudentName}
        />
      )}
    </div>
  );
}
