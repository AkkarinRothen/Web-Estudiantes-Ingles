import React, { useState } from 'react';
import { INTRUDER_ITEMS } from '../../data/activitiesData';
import { playSuccessSound, playErrorSound, speakText } from '../../utils/audio';
import FeedbackCard from '../common/FeedbackCard';
import ActivitySummaryModal from '../common/ActivitySummaryModal';
import { Volume2, Sparkles } from 'lucide-react';

export default function IntruderActivity({ onComplete, addStars, filterType }) {
  // Optional filter for specific unit focus
  const getInitialItems = () => {
    if (filterType === 'subjects') {
      return INTRUDER_ITEMS.filter(i => i.question.toLowerCase().includes('subject'));
    }
    if (filterType === 'verbs') {
      return INTRUDER_ITEMS.filter(i => i.question.toLowerCase().includes('verb'));
    }
    return INTRUDER_ITEMS;
  };

  const [items, setItems] = useState(getInitialItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const currentItem = items[currentIndex];

  const handleSelectOption = (opt) => {
    if (status) return;
    setSelectedOption(opt);

    const isCorrect = opt === currentItem.intruder;
    if (isCorrect) {
      playSuccessSound();
      setStatus('correct');
      if (addStars) addStars(1);
    } else {
      playErrorSound();
      setStatus('incorrect');
      const mistakeObj = {
        id: `intruder_${currentIndex}_${currentItem.question}`,
        question: currentItem.question,
        userAns: opt,
        correctAns: currentItem.intruder,
        hint: `Observa bien qué función cumple cada una de las 4 opciones.`,
        explanation: currentItem.reason,
        category: 'Encuentra el Intruso'
      };
      setMistakes(prev => [...prev.filter(m => m.id !== mistakeObj.id), mistakeObj]);
    }

    setResults(prev => [...prev, { item: currentItem, choice: opt, isCorrect }]);
  };

  const handleRetryWithHint = () => {
    setStatus(null);
    setSelectedOption(null);
  };

  const handleNext = () => {
    if (currentIndex + 1 < items.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setStatus(null);
    } else {
      const correctCount = results.filter(r => r.isCorrect).length + (status === 'correct' ? 1 : 0);
      const totalCount = items.length;
      const starsEarned = Math.max(1, Math.round((correctCount / totalCount) * 5));
      const xpEarned = correctCount * 15;

      setIsFinished(true);
      if (onComplete) {
        onComplete({
          activityId: 'intruder',
          correctCount,
          totalCount,
          starsEarned,
          xpEarned,
          mistakes
        });
      }
    }
  };

  const handleReviewMistakesOnly = () => {
    if (mistakes.length === 0) return;
    const reviewItems = getInitialItems().filter(item => 
      mistakes.some(m => m.question === item.question)
    );
    setItems(reviewItems);
    setCurrentIndex(0);
    setSelectedOption(null);
    setStatus(null);
    setResults([]);
    setIsFinished(false);
    setIsReviewMode(true);
  };

  const handleRestart = () => {
    setItems(getInitialItems());
    setCurrentIndex(0);
    setSelectedOption(null);
    setStatus(null);
    setResults([]);
    setMistakes([]);
    setIsFinished(false);
    setIsReviewMode(false);
  };

  return (
    <div className="activity-wizard-container">
      {/* Header */}
      <div className="activity-wizard-header">
        <div className="activity-meta">
          <span className="activity-badge-pill">
            <Sparkles size={14} /> Encuentra al Intruso
          </span>
          <span className="step-counter">
            Pregunta {currentIndex + 1} de {items.length}
          </span>
        </div>

        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }} 
          />
        </div>
      </div>

      {/* Main Question Wizard Card */}
      <div className="wizard-card animate-fade-in">
        <div className="wizard-instruction-row">
          <h3 className="wizard-question-title">{currentItem.question}</h3>
        </div>

        <p className="wizard-sub-hint">
          Toca la palabra que <strong>NO</strong> pertenece a la categoría:
        </p>

        {/* 4 Choices Grid */}
        <div className="tactile-options-grid-2x2">
          {currentItem.options.map((opt, idx) => {
            let stateClass = '';
            if (status) {
              if (opt === currentItem.intruder) {
                stateClass = 'opt-correct';
              } else if (selectedOption === opt) {
                stateClass = 'opt-incorrect';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                className={`btn-tactile-choice ${stateClass}`}
                onClick={() => handleSelectOption(opt)}
                disabled={status !== null}
              >
                <span className="choice-word">{opt}</span>
                <button
                  type="button"
                  className="icon-btn-audio-inner"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(opt);
                  }}
                  title="Escuchar"
                  aria-label={`Escuchar ${opt}`}
                >
                  <Volume2 size={16} />
                </button>
              </button>
            );
          })}
        </div>

        {/* Feedback Card */}
        <FeedbackCard
          status={status}
          hint="Identifica cuál de las 4 opciones es una acción (verbo) o un sujeto (persona/cosa) diferente al resto."
          explanation={currentItem.reason}
          speakContent={currentItem.intruder}
          onNext={handleNext}
          onRetry={handleRetryWithHint}
          allowRetry={true}
          nextLabel={currentIndex + 1 === items.length ? 'Ver Resultados 🎉' : 'Siguiente Pregunta'}
        />
      </div>

      {/* Summary Modal */}
      {isFinished && (
        <ActivitySummaryModal
          title={isReviewMode ? 'Repaso: Encuentra al Intruso' : 'Actividad: Encuentra al Intruso'}
          correctCount={results.filter(r => r.isCorrect).length}
          totalCount={items.length}
          starsEarned={Math.max(1, Math.round((results.filter(r => r.isCorrect).length / items.length) * 5))}
          xpEarned={results.filter(r => r.isCorrect).length * 15}
          mistakes={mistakes}
          onRetryAll={handleRestart}
          onReviewMistakes={mistakes.length > 0 ? handleReviewMistakesOnly : null}
          onFinish={() => {
            if (onComplete) onComplete({ close: true });
          }}
          finishLabel="Volver a la Ruta"
        />
      )}
    </div>
  );
}
