import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, AlertCircle, Volume2, ArrowRight, RotateCcw } from 'lucide-react';
import { speakText } from '../../utils/audio';

export default function FeedbackCard({
  status, // null | 'correct' | 'incorrect'
  hint,
  explanation,
  speakContent,
  onNext,
  onRetry,
  allowRetry = true,
  nextLabel = 'Siguiente Pregunta'
}) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="feedback-card-container">
      {/* Micro-hint button (Before answering or when reviewing) */}
      {!status && hint && (
        <div className="hint-section">
          {!showHint ? (
            <button
              type="button"
              className="hint-toggle-btn"
              onClick={() => setShowHint(true)}
              aria-label="Ver pista de ayuda"
            >
              <Lightbulb size={18} className="hint-icon" />
              <span>¿Necesitas una pista? (💡 Toca aquí)</span>
            </button>
          ) : (
            <div className="hint-box animate-fade-in">
              <div className="hint-header">
                <Lightbulb size={18} className="text-amber-500" />
                <strong>Pista Didáctica:</strong>
              </div>
              <p className="hint-text">{hint}</p>
            </div>
          )}
        </div>
      )}

      {/* Answer feedback alert (After answering) */}
      {status && (
        <div className={`feedback-banner ${status === 'correct' ? 'feedback-success' : 'feedback-error'} animate-pop-in`}>
          <div className="feedback-content">
            <div className="feedback-title-row">
              {status === 'correct' ? (
                <>
                  <CheckCircle2 size={24} className="feedback-icon-success" />
                  <span className="feedback-heading">¡Excelente! Muy bien hecho 🎉</span>
                </>
              ) : (
                <>
                  <AlertCircle size={24} className="feedback-icon-error" />
                  <span className="feedback-heading">¡Casi! Repasemos la regla 💡</span>
                </>
              )}

              {speakContent && (
                <button
                  type="button"
                  className="icon-btn-secondary"
                  onClick={() => speakText(speakContent)}
                  title="Escuchar pronunciación"
                  aria-label="Escuchar pronunciación"
                >
                  <Volume2 size={20} />
                </button>
              )}
            </div>

            {explanation && (
              <p className="feedback-explanation">
                {explanation}
              </p>
            )}
          </div>

          <div className="feedback-actions">
            {status === 'incorrect' && allowRetry && onRetry && (
              <button
                type="button"
                className="btn-retry"
                onClick={() => {
                  setShowHint(true);
                  onRetry();
                }}
              >
                <RotateCcw size={18} />
                <span>Reintentar con pista</span>
              </button>
            )}

            {onNext && (
              <button
                type="button"
                className="btn-primary btn-next-action"
                onClick={onNext}
                autoFocus
              >
                <span>{nextLabel}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
