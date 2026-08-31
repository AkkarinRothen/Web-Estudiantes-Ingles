import React, { useState } from 'react';
import { SENTENCE_ELEMENTS_ITEMS } from '../../data/activitiesData';
import { playSuccessSound, playErrorSound, speakText } from '../../utils/audio';
import FeedbackCard from '../common/FeedbackCard';
import ActivitySummaryModal from '../common/ActivitySummaryModal';
import { Volume2, Sparkles, User, Zap } from 'lucide-react';

export default function SentenceElementsActivity({ onComplete, addStars }) {
  const [items, setItems] = useState(SENTENCE_ELEMENTS_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subjectChoice, setSubjectChoice] = useState('');
  const [verbChoice, setVerbChoice] = useState('');
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const currentItem = items[currentIndex];
  const words = currentItem.fullSentence.replace(/[.?!]/g, '').split(' ');

  const handleVerify = () => {
    if (status) return;

    const clean = str => (str || '').toLowerCase().trim();
    const isSubjectOk = clean(subjectChoice) === clean(currentItem.subject);
    const isVerbOk = clean(verbChoice) === clean(currentItem.verb);

    const isCorrect = isSubjectOk && isVerbOk;

    if (isCorrect) {
      playSuccessSound();
      setStatus('correct');
      if (addStars) addStars(1);
    } else {
      playErrorSound();
      setStatus('incorrect');
      const mistakeObj = {
        id: `elements_${currentIndex}_${currentItem.fullSentence}`,
        question: `Separar: "${currentItem.fullSentence}"`,
        userAns: `Sujeto: ${subjectChoice || '?'}, Verbo: ${verbChoice || '?'}`,
        correctAns: `Sujeto: "${currentItem.subject}", Verbo: "${currentItem.verb}"`,
        hint: `¿Quién realiza la acción? (${currentItem.subject}). ¿Cuál es el verbo? (${currentItem.verb}).`,
        explanation: `En "${currentItem.fullSentence}": El Sujeto es "${currentItem.subject}" y el Verbo es "${currentItem.verb}".`,
        category: 'Partes de la Oración'
      };
      setMistakes(prev => [...prev.filter(m => m.id !== mistakeObj.id), mistakeObj]);
    }

    setResults(prev => [...prev, { item: currentItem, isCorrect }]);
  };

  const handleRetryWithHint = () => {
    setStatus(null);
  };

  const handleNext = () => {
    if (currentIndex + 1 < items.length) {
      setCurrentIndex(prev => prev + 1);
      setSubjectChoice('');
      setVerbChoice('');
      setStatus(null);
    } else {
      const correctCount = results.filter(r => r.isCorrect).length + (status === 'correct' ? 1 : 0);
      const totalCount = items.length;
      const starsEarned = Math.max(1, Math.round((correctCount / totalCount) * 4));
      const xpEarned = correctCount * 12;

      setIsFinished(true);
      if (onComplete) {
        onComplete({
          activityId: 'sentence-elements',
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
    const reviewItems = SENTENCE_ELEMENTS_ITEMS.filter(item => 
      mistakes.some(m => m.question.includes(item.fullSentence))
    );
    setItems(reviewItems);
    setCurrentIndex(0);
    setSubjectChoice('');
    setVerbChoice('');
    setStatus(null);
    setResults([]);
    setIsFinished(false);
    setIsReviewMode(true);
  };

  const handleRestart = () => {
    setItems(SENTENCE_ELEMENTS_ITEMS);
    setCurrentIndex(0);
    setSubjectChoice('');
    setVerbChoice('');
    setStatus(null);
    setResults([]);
    setMistakes([]);
    setIsFinished(false);
    setIsReviewMode(false);
  };

  const canSubmit = subjectChoice && verbChoice && status === null;

  return (
    <div className="activity-wizard-container">
      {/* Header */}
      <div className="activity-wizard-header">
        <div className="activity-meta">
          <span className="activity-badge-pill">
            <Sparkles size={14} /> Partes de la Oración
          </span>
          <span className="step-counter">
            Oración {currentIndex + 1} de {items.length}
          </span>
        </div>

        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }} 
          />
        </div>
      </div>

      {/* Main Card */}
      <div className="wizard-card animate-fade-in">
        <div className="wizard-instruction-row">
          <p className="wizard-instruction">
            Separa el <strong>Sujeto (¿Quién?)</strong> y el <strong>Verbo (¿Qué acción?)</strong>:
          </p>
          <button
            type="button"
            className="icon-btn-secondary"
            onClick={() => speakText(currentItem.fullSentence)}
            title="Escuchar oración"
            aria-label={`Escuchar ${currentItem.fullSentence}`}
          >
            <Volume2 size={20} />
          </button>
        </div>

        {/* Big Spotlight */}
        <div className="sentence-spotlight-box">
          <h3 className="spotlight-sentence-text">"{currentItem.fullSentence}"</h3>
        </div>

        {/* Word Selection Slots */}
        <div className="analysis-form-grid">
          {/* Subject Slot */}
          <div className="analysis-field-group">
            <label className="analysis-label">
              <User size={16} className="text-indigo-500" />
              <span>Sujeto (Subject - Who?):</span>
            </label>
            <div className="quick-chips-row">
              {words.map((w, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`chip-select-btn ${subjectChoice.toLowerCase() === w.toLowerCase() ? 'active' : ''}`}
                  onClick={() => !status && setSubjectChoice(w)}
                  disabled={status !== null}
                >
                  {w}
                </button>
              ))}
              {words.length > 2 && (
                <button
                  type="button"
                  className={`chip-select-btn ${subjectChoice.toLowerCase() === currentItem.subject.toLowerCase() ? 'active' : ''}`}
                  onClick={() => !status && setSubjectChoice(currentItem.subject)}
                  disabled={status !== null}
                >
                  {currentItem.subject}
                </button>
              )}
            </div>
          </div>

          {/* Verb Slot */}
          <div className="analysis-field-group">
            <label className="analysis-label">
              <Zap size={16} className="text-purple-500" />
              <span>Verbo (Verb - Action):</span>
            </label>
            <div className="quick-chips-row">
              {words.map((w, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`chip-select-btn ${verbChoice.toLowerCase() === w.toLowerCase() ? 'active' : ''}`}
                  onClick={() => !status && setVerbChoice(w)}
                  disabled={status !== null}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        {!status && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="btn-primary btn-submit-analysis"
              onClick={handleVerify}
              disabled={!canSubmit}
            >
              <span>Comprobar Elementos</span>
            </button>
          </div>
        )}

        {/* Feedback Card */}
        <FeedbackCard
          status={status}
          hint="El Sujeto responde a ¿Quién hace la acción? y el Verbo es la acción misma."
          explanation={
            status === 'correct'
              ? `¡Correcto! En "${currentItem.fullSentence}", el Sujeto es "${currentItem.subject}" y el Verbo es "${currentItem.verb}".`
              : `En "${currentItem.fullSentence}": El Sujeto es "${currentItem.subject}" y el Verbo es "${currentItem.verb}".`
          }
          speakContent={currentItem.fullSentence}
          onNext={handleNext}
          onRetry={handleRetryWithHint}
          allowRetry={true}
          nextLabel={currentIndex + 1 === items.length ? 'Ver Resultados 🎉' : 'Siguiente Oración'}
        />
      </div>

      {/* Summary Modal */}
      {isFinished && (
        <ActivitySummaryModal
          title={isReviewMode ? 'Repaso: Partes de la Oración' : 'Actividad: Partes de la Oración'}
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
