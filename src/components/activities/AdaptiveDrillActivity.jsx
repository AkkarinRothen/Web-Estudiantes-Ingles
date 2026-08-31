import React, { useState, useEffect } from 'react';
import { playSuccessSound, playErrorSound, speakText } from '../../utils/audio';
import FeedbackCard from '../common/FeedbackCard';
import ActivitySummaryModal from '../common/ActivitySummaryModal';
import { Volume2, Sparkles, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function AdaptiveDrillActivity({
  drillData, // { title, description, questions, isDailyMission, xpReward, starsReward }
  onComplete,
  addStars,
  onBackToPath
}) {
  const questions = drillData.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Format-specific state
  const [selectedOption, setSelectedOption] = useState(null);
  const [assembledWords, setAssembledWords] = useState([]);
  const [audioSpeed, setAudioSpeed] = useState(0.9); // 0.8 (slow) or 1.0 (normal)
  const [showTranscription, setShowTranscription] = useState(false);

  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || {};

  // Auto-play audio for listening questions on question change
  useEffect(() => {
    if (currentQ.type === 'listening' && currentQ.audioText) {
      speakText(currentQ.audioText, audioSpeed);
    }
  }, [currentIndex, currentQ, audioSpeed]);

  const clean = str => (str || '').toLowerCase().replace(/[.?!]/g, '').trim();

  // Keyboard shortcut listener (1-4 for choices)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (status !== null || isFinished) return;
      if (currentQ.type === 'choice' || currentQ.type === 'listening' || currentQ.type === 'spot_error') {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= (currentQ.options?.length || 0)) {
          handleSelectOption(currentQ.options[num - 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, status, isFinished, currentQ]);

  const handleSelectOption = (opt) => {
    if (status) return;
    setSelectedOption(opt);

    const isCorrect = clean(opt) === clean(currentQ.correct);
    evaluateAnswer(isCorrect, opt);
  };

  const handleVerifyScramble = () => {
    if (status) return;
    const userSentence = assembledWords.join(' ');
    const isCorrect = clean(userSentence) === clean(currentQ.correct);
    evaluateAnswer(isCorrect, userSentence);
  };

  const evaluateAnswer = (isCorrect, userAns) => {
    if (isCorrect) {
      playSuccessSound();
      setStatus('correct');
      if (addStars) addStars(1);
    } else {
      playErrorSound();
      setStatus('incorrect');
      const mistakeObj = {
        id: `adaptive_${currentQ.id || currentIndex}`,
        question: currentQ.question || currentQ.audioText,
        userAns: userAns || '(Vacío)',
        correctAns: currentQ.correct,
        hint: currentQ.hint || 'Revisa la estructura de la oración.',
        explanation: currentQ.explanation || `La respuesta correcta es "${currentQ.correct}".`,
        category: currentQ.skillId || 'Refuerzo Adaptativo'
      };
      setMistakes(prev => [...prev.filter(m => m.id !== mistakeObj.id), mistakeObj]);
    }

    setResults(prev => [...prev, { question: currentQ, choice: userAns, isCorrect }]);
  };

  const handleRetryWithHint = () => {
    setStatus(null);
    setSelectedOption(null);
    setAssembledWords([]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setAssembledWords([]);
      setStatus(null);
      setShowTranscription(false);
    } else {
      const correctCount = results.filter(r => r.isCorrect).length + (status === 'correct' ? 1 : 0);
      const totalCount = questions.length;
      const starsEarned = drillData.starsReward || Math.max(1, Math.round(correctCount / 2));
      const xpEarned = drillData.xpReward || correctCount * 15;

      setIsFinished(true);
      if (onComplete) {
        onComplete({
          activityId: 'adaptive-drill',
          correctCount,
          totalCount,
          starsEarned,
          xpEarned,
          mistakes,
          isDailyMission: !!drillData.isDailyMission
        });
      }
    }
  };

  return (
    <div className="activity-wizard-container">
      {/* Header */}
      <div className="activity-wizard-header">
        {onBackToPath && (
          <div>
            <button type="button" className="btn-back-path" onClick={onBackToPath}>
              <ArrowLeft size={16} /> Volver a Mi Ruta
            </button>
          </div>
        )}

        <div className="activity-meta">
          <span className="activity-badge-pill" style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff' }}>
            <Sparkles size={14} /> {drillData.title}
          </span>
          <span className="step-counter">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
        </div>

        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} 
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="wizard-card animate-fade-in">
        <div className="wizard-instruction-row">
          <span className="rec-unit-tag">{currentQ.skillId?.replace('_', ' ').toUpperCase() || 'REFUERZO'}</span>
          
          {/* Audio Speed Selector for Listening exercises */}
          {currentQ.type === 'listening' && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted">Velocidad:</span>
              <button
                type="button"
                className={`btn-speed-toggle ${audioSpeed === 0.8 ? 'active' : ''}`}
                onClick={() => {
                  setAudioSpeed(0.8);
                  speakText(currentQ.audioText, 0.8);
                }}
              >
                0.8x Lenta
              </button>
              <button
                type="button"
                className={`btn-speed-toggle ${audioSpeed === 1.0 ? 'active' : ''}`}
                onClick={() => {
                  setAudioSpeed(1.0);
                  speakText(currentQ.audioText, 1.0);
                }}
              >
                1.0x Normal
              </button>
            </div>
          )}
        </div>

        {/* Question Title or Listening Box */}
        {currentQ.type === 'listening' ? (
          <div className="listening-spotlight-box">
            <button
              type="button"
              className="btn-play-audio-huge"
              onClick={() => speakText(currentQ.audioText, audioSpeed)}
              title="Escuchar audio"
            >
              <Volume2 size={36} />
              <span>Toca para escuchar el audio ({audioSpeed}x)</span>
            </button>

            {/* Optional Transcription Toggle */}
            <div className="mt-2 text-center">
              <button
                type="button"
                className="btn-link-sm"
                onClick={() => setShowTranscription(!showTranscription)}
              >
                {showTranscription ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{showTranscription ? 'Ocultar texto' : 'Ver transcripción escrita'}</span>
              </button>
              {showTranscription && (
                <p className="text-sm font-bold text-primary mt-1 animate-fade-in">
                  "{currentQ.audioText}"
                </p>
              )}
            </div>

            <p className="wizard-instruction mt-3 font-semibold text-center">{currentQ.question}</p>
          </div>
        ) : (
          <div className="sentence-spotlight-box">
            <h3 className="spotlight-sentence-text" style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>
              {currentQ.question}
            </h3>
          </div>
        )}

        {/* FORMAT: Choices Grid (choice, listening, spot_error) */}
        {(currentQ.type === 'choice' || currentQ.type === 'listening' || currentQ.type === 'spot_error') && (
          <div className="tactile-options-grid-2x2">
            {currentQ.options?.map((opt, idx) => {
              let stateClass = '';
              if (status) {
                if (clean(opt) === clean(currentQ.correct)) {
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
                </button>
              );
            })}
          </div>
        )}

        {/* FORMAT: Scramble (Word order) */}
        {currentQ.type === 'scramble' && (
          <div className="scramble-container">
            {/* Assembly dropzone */}
            <div className="assembly-dropzone">
              <div className="dropzone-label">Tu Oración Formada (Toca para remover):</div>
              <div className="dropzone-words-row">
                {assembledWords.length === 0 ? (
                  <span className="dropzone-placeholder">Toca las palabras de abajo en orden...</span>
                ) : (
                  assembledWords.map((word, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="assembled-word-chip animate-pop-in"
                      onClick={() => !status && setAssembledWords(prev => prev.filter((_, i) => i !== idx))}
                      disabled={status !== null}
                    >
                      <span>{word}</span>
                      <span className="chip-remove-icon">×</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Available words */}
            <div className="available-words-section">
              <span className="available-label">Palabras disponibles:</span>
              <div className="available-chips-row">
                {currentQ.words?.map((w, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="available-word-btn"
                    onClick={() => !status && setAssembledWords(prev => [...prev, w])}
                    disabled={status !== null}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {!status && (
              <div className="mt-4 flex justify-end gap-2">
                {assembledWords.length > 0 && (
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setAssembledWords([])}
                  >
                    Limpiar
                  </button>
                )}
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleVerifyScramble}
                  disabled={assembledWords.length === 0}
                >
                  Comprobar Orden
                </button>
              </div>
            )}
          </div>
        )}

        {/* Feedback Card */}
        <FeedbackCard
          status={status}
          hint={currentQ.hint}
          explanation={currentQ.explanation}
          speakContent={currentQ.correct || currentQ.audioText}
          onNext={handleNext}
          onRetry={handleRetryWithHint}
          allowRetry={true}
          nextLabel={currentIndex + 1 === questions.length ? 'Finalizar Misión 🎉' : 'Siguiente Pregunta'}
        />
      </div>

      {/* Summary Modal on Completion */}
      {isFinished && (
        <ActivitySummaryModal
          title={drillData.title}
          correctCount={results.filter(r => r.isCorrect).length}
          totalCount={questions.length}
          starsEarned={drillData.starsReward || 5}
          xpEarned={drillData.xpReward || 100}
          mistakes={mistakes}
          onRetryAll={() => {
            setCurrentIndex(0);
            setSelectedOption(null);
            setAssembledWords([]);
            setStatus(null);
            setResults([]);
            setIsFinished(false);
          }}
          onFinish={() => {
            if (onBackToPath) onBackToPath();
          }}
          finishLabel="Volver a Mi Ruta"
        />
      )}
    </div>
  );
}
