import React, { useState, useEffect } from 'react';
import { playSuccessSound, playErrorSound, speakText } from '../../utils/audio';
import FeedbackCard from '../common/FeedbackCard';
import ActivitySummaryModal from '../common/ActivitySummaryModal';
import { Trophy, Volume2, AlertTriangle, BookOpen, FileText } from 'lucide-react';

export default function UnitChallengeActivity({
  unit,
  onComplete,
  addStars,
  onOpenTheory,
  onOpenVocab
}) {
  const challenge = unit.masterChallenge;
  const [questions, setQuestions] = useState(challenge.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const currentQ = questions[currentIndex];

  // Keyboard shortcut support: 1, 2, 3, 4 for options
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status !== null || isFinished) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= currentQ.options.length) {
        handleSelectOption(currentQ.options[num - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, status, isFinished, currentQ]);

  const handleSelectOption = (opt) => {
    if (status) return;
    setSelectedOption(opt);

    const isCorrect = opt === currentQ.correct;
    if (isCorrect) {
      playSuccessSound();
      setStatus('correct');
      if (addStars) addStars(1);
    } else {
      playErrorSound();
      setStatus('incorrect');
      const mistakeObj = {
        id: `challenge_${unit.id}_${currentIndex}`,
        question: currentQ.question,
        userAns: opt,
        correctAns: currentQ.correct,
        hint: currentQ.hint,
        explanation: currentQ.explanation,
        category: unit.title
      };
      setMistakes(prev => [...prev.filter(m => m.id !== mistakeObj.id), mistakeObj]);
    }

    setResults(prev => [...prev, { question: currentQ, choice: opt, isCorrect }]);
  };

  const handleRetryWithHint = () => {
    setStatus(null);
    setSelectedOption(null);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setStatus(null);
    } else {
      const correctCount = results.filter(r => r.isCorrect).length + (status === 'correct' ? 1 : 0);
      const totalCount = questions.length;
      const accuracy = Math.round((correctCount / totalCount) * 100);
      const isPassed = accuracy >= 70;
      const starsEarned = isPassed ? challenge.stars : Math.max(1, Math.round(correctCount / 2));
      const xpEarned = isPassed ? challenge.xp : correctCount * 12;

      setIsFinished(true);
      if (onComplete) {
        onComplete({
          unitId: unit.id,
          levelId: challenge.id,
          activityId: 'unit-challenge',
          correctCount,
          totalCount,
          starsEarned,
          xpEarned,
          mistakes,
          isMasterChallenge: true
        });
      }
    }
  };

  const handleReviewMistakesOnly = () => {
    if (mistakes.length === 0) return;
    const reviewQuestions = challenge.questions.filter(q => 
      mistakes.some(m => m.question === q.question)
    );
    setQuestions(reviewQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setStatus(null);
    setResults([]);
    setIsFinished(false);
    setIsReviewMode(true);
  };

  const handleRestart = () => {
    setQuestions(challenge.questions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setStatus(null);
    setResults([]);
    setMistakes([]);
    setIsFinished(false);
    setIsReviewMode(false);
  };

  const correctCount = results.filter(r => r.isCorrect).length;
  const accuracy = Math.round((correctCount / (questions.length || 1)) * 100);
  const needsReinforcement = isFinished && accuracy < 60;

  return (
    <div className="activity-wizard-container">
      {/* Challenge Header */}
      <div className="activity-wizard-header">
        <div className="activity-meta">
          <span className="activity-badge-pill" style={{ background: unit.themeColor, color: '#fff' }}>
            <Trophy size={14} /> {challenge.title}
          </span>
          <span className="step-counter">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
        </div>

        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%`, background: unit.gradient }} 
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="wizard-card animate-fade-in">
        <div className="wizard-instruction-row">
          <div className="rec-unit-tag">Evaluación de Dominio • Umbral: 70%</div>
          <button
            type="button"
            className="icon-btn-secondary"
            onClick={() => speakText(currentQ.question)}
            title="Escuchar pregunta"
            aria-label="Escuchar pregunta"
          >
            <Volume2 size={20} />
          </button>
        </div>

        {/* Big Spotlight Question Box */}
        <div className="sentence-spotlight-box">
          <h3 className="spotlight-sentence-text" style={{ fontSize: '1.45rem', color: 'var(--text-primary)' }}>
            {currentQ.question}
          </h3>
        </div>

        {/* Options Grid (with 1, 2, 3, 4 keyboard shortcuts indicator) */}
        <div className="tactile-options-grid-2x2">
          {currentQ.options.map((opt, idx) => {
            let stateClass = '';
            if (status) {
              if (opt === currentQ.correct) {
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
                <div className="flex items-center gap-2">
                  <span className="key-shortcut-tag">{idx + 1}</span>
                  <span className="choice-word">{opt}</span>
                </div>
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

        {/* Pedagogical Feedback */}
        <FeedbackCard
          status={status}
          hint={currentQ.hint}
          explanation={currentQ.explanation}
          speakContent={currentQ.correct}
          onNext={handleNext}
          onRetry={handleRetryWithHint}
          allowRetry={true}
          nextLabel={currentIndex + 1 === questions.length ? 'Finalizar Desafío 🏆' : 'Siguiente Pregunta'}
        />
      </div>

      {/* Summary Modal on Completion */}
      {isFinished && (
        <>
          <ActivitySummaryModal
            title={isReviewMode ? `Repaso: ${challenge.title}` : challenge.title}
            correctCount={correctCount}
            totalCount={questions.length}
            starsEarned={accuracy >= 70 ? challenge.stars : Math.max(1, Math.round(correctCount / 2))}
            xpEarned={accuracy >= 70 ? challenge.xp : correctCount * 12}
            mistakes={mistakes}
            onRetryAll={handleRestart}
            onReviewMistakes={mistakes.length > 0 ? handleReviewMistakesOnly : null}
            onFinish={() => {
              if (onComplete) onComplete({ close: true });
            }}
            finishLabel="Volver a la Ruta"
          />

          {/* Reinforcement Route Callout if <60% */}
          {needsReinforcement && (
            <div className="reinforcement-banner animate-pop-in">
              <div className="flex items-center gap-3">
                <AlertTriangle size={26} className="text-amber-500" />
                <div>
                  <strong>Ruta de Refuerzo Recomendada</strong>
                  <p className="text-xs text-muted">
                    Para consolidar este tema antes de reintentar el Desafío, te recomendamos revisar:
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {unit.vocabCategory && onOpenVocab && (
                  <button className="btn-sm-refuerzo" onClick={() => onOpenVocab(unit.vocabCategory)}>
                    <BookOpen size={14} /> Vocabulario
                  </button>
                )}
                {unit.grammarId && onOpenTheory && (
                  <button className="btn-sm-refuerzo" onClick={() => onOpenTheory(unit.grammarId)}>
                    <FileText size={14} /> Ficha de Teoría
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
