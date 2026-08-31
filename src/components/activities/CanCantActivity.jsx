import React, { useState } from 'react';
import { CAN_CANT_ITEMS } from '../../data/activitiesData';
import { playSuccessSound, playErrorSound, speakText } from '../../utils/audio';
import FeedbackCard from '../common/FeedbackCard';
import ActivitySummaryModal from '../common/ActivitySummaryModal';
import { Sparkles, Volume2 } from 'lucide-react';

export default function CanCantActivity({ onComplete, addStars }) {
  const [items, setItems] = useState(CAN_CANT_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null); // 'can' | "can't"
  const [status, setStatus] = useState(null); // 'correct' | 'incorrect'
  const [results, setResults] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const currentItem = items[currentIndex];

  const handleSelect = (choice) => {
    if (status) return; // Prevent selecting while viewing feedback
    setSelectedChoice(choice);
    
    const isCorrect = choice === currentItem.correct;
    if (isCorrect) {
      playSuccessSound();
      setStatus('correct');
      if (addStars) addStars(1);
    } else {
      playErrorSound();
      setStatus('incorrect');
      const mistakeObj = {
        id: `cancant_${currentIndex}_${currentItem.sentence}`,
        question: currentItem.sentence,
        userAns: choice,
        correctAns: currentItem.correct,
        hint: currentItem.hint,
        explanation: `La respuesta correcta es "${currentItem.correct}". Pista: ${currentItem.hint}.`,
        category: 'Can & Can\'t'
      };
      setMistakes(prev => [...prev.filter(m => m.id !== mistakeObj.id), mistakeObj]);
    }

    setResults(prev => [...prev, { item: currentItem, choice, isCorrect }]);
  };

  const handleRetryWithHint = () => {
    setStatus(null);
    setSelectedChoice(null);
  };

  const handleNext = () => {
    if (currentIndex + 1 < items.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedChoice(null);
      setStatus(null);
    } else {
      // Activity completed
      const correctCount = results.filter(r => r.isCorrect).length + (status === 'correct' ? 1 : 0);
      const totalCount = items.length;
      const starsEarned = Math.max(1, Math.round((correctCount / totalCount) * 4));
      const xpEarned = correctCount * 12;

      setIsFinished(true);
      if (onComplete) {
        onComplete({
          activityId: 'can-cant',
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
    const reviewItems = CAN_CANT_ITEMS.filter(item => 
      mistakes.some(m => m.question === item.sentence)
    );
    setItems(reviewItems);
    setCurrentIndex(0);
    setSelectedChoice(null);
    setStatus(null);
    setResults([]);
    setIsFinished(false);
    setIsReviewMode(true);
  };

  const handleRestart = () => {
    setItems(CAN_CANT_ITEMS);
    setCurrentIndex(0);
    setSelectedChoice(null);
    setStatus(null);
    setResults([]);
    setMistakes([]);
    setIsFinished(false);
    setIsReviewMode(false);
  };

  const sentenceText = currentItem 
    ? currentItem.sentence.replace('______', selectedChoice || '______') 
    : '';

  return (
    <div className="activity-wizard-container">
      {/* Activity Header */}
      <div className="activity-wizard-header">
        <div className="activity-meta">
          <span className="activity-badge-pill">
            <Sparkles size={14} /> Can vs. Can't
          </span>
          <span className="step-counter">
            Pregunta {currentIndex + 1} de {items.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }} 
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="wizard-card animate-fade-in">
        <div className="wizard-instruction-row">
          <p className="wizard-instruction">
            ¿El sujeto <strong>puede (can)</strong> o <strong>no puede (can't)</strong> realizar esta acción?
          </p>
          <button
            type="button"
            className="icon-btn-secondary"
            onClick={() => speakText(sentenceText)}
            title="Escuchar oración completa"
            aria-label="Escuchar oración completa"
          >
            <Volume2 size={20} />
          </button>
        </div>

        {/* Big Sentence Display */}
        <div className="sentence-spotlight-box">
          <div className="sentence-spotlight-text">
            {currentItem.sentence.split('______').map((chunk, idx, arr) => (
              <React.Fragment key={idx}>
                <span>{chunk}</span>
                {idx < arr.length - 1 && (
                  <span className={`blank-slot ${selectedChoice ? (status === 'correct' ? 'blank-correct' : 'blank-incorrect') : 'blank-empty'}`}>
                    {selectedChoice || '______'}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Big Tactile Choice Buttons */}
        <div className="tactile-options-grid">
          <button
            type="button"
            className={`btn-tactile-option ${selectedChoice === 'can' ? (status === 'correct' ? 'opt-correct' : 'opt-incorrect') : ''}`}
            onClick={() => handleSelect('can')}
            disabled={status !== null}
          >
            <div className="opt-title">CAN</div>
            <div className="opt-sub">Sí puede / Tiene la habilidad</div>
          </button>

          <button
            type="button"
            className={`btn-tactile-option ${selectedChoice === "can't" ? (status === 'correct' ? 'opt-correct' : 'opt-incorrect') : ''}`}
            onClick={() => handleSelect("can't")}
            disabled={status !== null}
          >
            <div className="opt-title">CAN'T</div>
            <div className="opt-sub">No puede / No tiene la habilidad</div>
          </button>
        </div>

        {/* Pedagogical Feedback & Hints */}
        <FeedbackCard
          status={status}
          hint={currentItem.hint}
          explanation={
            status === 'correct'
              ? `¡Exacto! "${currentItem.sentence.replace('______', currentItem.correct)}" — ${currentItem.hint}.`
              : `Piénsalo bien: ${currentItem.hint}. Por lo tanto usamos "${currentItem.correct}".`
          }
          speakContent={currentItem.sentence.replace('______', currentItem.correct)}
          onNext={handleNext}
          onRetry={handleRetryWithHint}
          allowRetry={true}
          nextLabel={currentIndex + 1 === items.length ? 'Ver Resultados 🎉' : 'Siguiente Pregunta'}
        />
      </div>

      {/* Summary Modal on Completion */}
      {isFinished && (
        <ActivitySummaryModal
          title={isReviewMode ? 'Repaso de Can & Can\'t' : 'Actividad: Can & Can\'t'}
          correctCount={results.filter(r => r.isCorrect).length}
          totalCount={items.length}
          starsEarned={Math.max(1, Math.round((results.filter(r => r.isCorrect).length / items.length) * 4))}
          xpEarned={results.filter(r => r.isCorrect).length * 12}
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
