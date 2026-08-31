import React, { useState } from 'react';
import { WHO_WHAT_ITEMS } from '../../data/activitiesData';
import { playSuccessSound, playErrorSound, speakText } from '../../utils/audio';
import FeedbackCard from '../common/FeedbackCard';
import ActivitySummaryModal from '../common/ActivitySummaryModal';
import { Volume2, Sparkles, User, Zap } from 'lucide-react';

export default function WhoWhatActionActivity({ onComplete, addStars }) {
  const [items, setItems] = useState(WHO_WHAT_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [whoChoice, setWhoChoice] = useState('');
  const [verbChoice, setVerbChoice] = useState('');
  const [typeChoice, setTypeChoice] = useState('');
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const currentItem = items[currentIndex];

  // Tokenize the sentence to make quick tap buttons
  const sentenceWords = currentItem.sentence.replace(/[.?!]/g, '').split(' ');

  const handleVerify = () => {
    if (status) return;

    const clean = str => (str || '').toLowerCase().trim();
    const whoOk = clean(whoChoice) === clean(currentItem.who);
    const verbOk = clean(verbChoice) === clean(currentItem.verb);
    const typeOk = clean(typeChoice) === clean(currentItem.type);

    const isCorrect = whoOk && verbOk && typeOk;

    if (isCorrect) {
      playSuccessSound();
      setStatus('correct');
      if (addStars) addStars(1);
    } else {
      playErrorSound();
      setStatus('incorrect');
      const mistakeObj = {
        id: `whowhat_${currentIndex}_${currentItem.sentence}`,
        question: `Analizar: "${currentItem.sentence}"`,
        userAns: `Who: ${whoChoice || '?'}, Verb: ${verbChoice || '?'}, Tipo: ${typeChoice || '?'}`,
        correctAns: `Who: ${currentItem.who}, Verb: ${currentItem.verb}, Tipo: ${currentItem.typeLabel}`,
        hint: `¿Quién realiza la acción? (${currentItem.who}). ¿Qué hace? (${currentItem.verb}).`,
        explanation: `En "${currentItem.sentence}": El Sujeto (Who) es "${currentItem.who}", el Verbo es "${currentItem.verb}" y expresa ${currentItem.typeLabel}.`,
        category: '¿Quién y Qué Acción?'
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
      setWhoChoice('');
      setVerbChoice('');
      setTypeChoice('');
      setStatus(null);
    } else {
      const correctCount = results.filter(r => r.isCorrect).length + (status === 'correct' ? 1 : 0);
      const totalCount = items.length;
      const starsEarned = Math.max(1, Math.round((correctCount / totalCount) * 4));
      const xpEarned = correctCount * 14;

      setIsFinished(true);
      if (onComplete) {
        onComplete({
          activityId: 'who-what',
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
    const reviewItems = WHO_WHAT_ITEMS.filter(item => 
      mistakes.some(m => m.question.includes(item.sentence))
    );
    setItems(reviewItems);
    setCurrentIndex(0);
    setWhoChoice('');
    setVerbChoice('');
    setTypeChoice('');
    setStatus(null);
    setResults([]);
    setIsFinished(false);
    setIsReviewMode(true);
  };

  const handleRestart = () => {
    setItems(WHO_WHAT_ITEMS);
    setCurrentIndex(0);
    setWhoChoice('');
    setVerbChoice('');
    setTypeChoice('');
    setStatus(null);
    setResults([]);
    setMistakes([]);
    setIsFinished(false);
    setIsReviewMode(false);
  };

  const canSubmit = whoChoice && verbChoice && typeChoice && status === null;

  return (
    <div className="activity-wizard-container">
      {/* Header */}
      <div className="activity-wizard-header">
        <div className="activity-meta">
          <span className="activity-badge-pill">
            <Sparkles size={14} /> ¿Quién y Qué Acción?
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
            Analiza los elementos principales de la oración:
          </p>
          <button
            type="button"
            className="icon-btn-secondary"
            onClick={() => speakText(currentItem.sentence)}
            title="Escuchar oración"
            aria-label={`Escuchar ${currentItem.sentence}`}
          >
            <Volume2 size={20} />
          </button>
        </div>

        {/* Big Spotlight Sentence */}
        <div className="sentence-spotlight-box">
          <h3 className="spotlight-sentence-text">"{currentItem.sentence}"</h3>
        </div>

        {/* Interactive Form with tactile quick chips */}
        <div className="analysis-form-grid">
          {/* Question 1: Who? */}
          <div className="analysis-field-group">
            <label className="analysis-label">
              <User size={16} className="text-indigo-500" />
              <span>1. ¿Quién realiza la acción? (Who / Subject)</span>
            </label>
            <div className="quick-chips-row">
              {sentenceWords.map((w, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`chip-select-btn ${whoChoice.toLowerCase() === w.toLowerCase() ? 'active' : ''}`}
                  onClick={() => !status && setWhoChoice(w)}
                  disabled={status !== null}
                >
                  {w}
                </button>
              ))}
              {sentenceWords.length > 2 && (
                <button
                  type="button"
                  className={`chip-select-btn ${whoChoice.toLowerCase() === currentItem.who.toLowerCase() ? 'active' : ''}`}
                  onClick={() => !status && setWhoChoice(currentItem.who)}
                  disabled={status !== null}
                >
                  {currentItem.who}
                </button>
              )}
            </div>
          </div>

          {/* Question 2: What verb? */}
          <div className="analysis-field-group">
            <label className="analysis-label">
              <Zap size={16} className="text-purple-500" />
              <span>2. ¿Cuál es el verbo? (What action?)</span>
            </label>
            <div className="quick-chips-row">
              {sentenceWords.map((w, idx) => (
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

          {/* Question 3: Type of verb */}
          <div className="analysis-field-group">
            <label className="analysis-label">
              <span>3. ¿Qué tipo de verbo es?</span>
            </label>
            <div className="tactile-options-grid">
              <button
                type="button"
                className={`btn-tactile-choice-sm ${typeChoice === 'action' ? 'active' : ''}`}
                onClick={() => !status && setTypeChoice('action')}
                disabled={status !== null}
              >
                Acción (Correr, leer, bailar...)
              </button>
              <button
                type="button"
                className={`btn-tactile-choice-sm ${typeChoice === 'state' ? 'active' : ''}`}
                onClick={() => !status && setTypeChoice('state')}
                disabled={status !== null}
              >
                Estado (Ser / Estar - Is/Are)
              </button>
            </div>
          </div>
        </div>

        {/* Submit button when no feedback */}
        {!status && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="btn-primary btn-submit-analysis"
              onClick={handleVerify}
              disabled={!canSubmit}
            >
              <span>Comprobar Análisis</span>
            </button>
          </div>
        )}

        {/* Feedback Card */}
        <FeedbackCard
          status={status}
          hint={`Busca quién inicia la frase y qué acción realiza.`}
          explanation={
            status === 'correct'
              ? `¡Excelente! Sujeto: "${currentItem.who}", Verbo: "${currentItem.verb}" (${currentItem.typeLabel}).`
              : `En "${currentItem.sentence}": El Sujeto es "${currentItem.who}", el Verbo es "${currentItem.verb}" y representa ${currentItem.typeLabel}.`
          }
          speakContent={currentItem.sentence}
          onNext={handleNext}
          onRetry={handleRetryWithHint}
          allowRetry={true}
          nextLabel={currentIndex + 1 === items.length ? 'Ver Resultados 🎉' : 'Siguiente Oración'}
        />
      </div>

      {/* Summary Modal */}
      {isFinished && (
        <ActivitySummaryModal
          title={isReviewMode ? 'Repaso: ¿Quién y Qué Acción?' : 'Actividad: ¿Quién y Qué Acción?'}
          correctCount={results.filter(r => r.isCorrect).length}
          totalCount={items.length}
          starsEarned={Math.max(1, Math.round((results.filter(r => r.isCorrect).length / items.length) * 4))}
          xpEarned={results.filter(r => r.isCorrect).length * 14}
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
