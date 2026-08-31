import React, { useEffect } from 'react';
import { Award, Sparkles, Star, Zap, RotateCcw, ArrowRight, XCircle, Volume2 } from 'lucide-react';
import { triggerConfetti, speakText } from '../../utils/audio';

export default function ActivitySummaryModal({
  title,
  correctCount,
  totalCount,
  starsEarned,
  xpEarned,
  mistakes = [],
  onRetryAll,
  onReviewMistakes,
  onFinish,
  finishLabel = 'Continuar mi Ruta'
}) {
  const percentage = Math.round((correctCount / (totalCount || 1)) * 100);
  const isPerfect = percentage === 100;

  useEffect(() => {
    if (percentage >= 70) {
      triggerConfetti();
    }
  }, [percentage]);

  return (
    <div className="summary-overlay animate-fade-in" role="dialog" aria-modal="true">
      <div className="summary-card animate-pop-in">
        <div className="summary-header">
          <div className="summary-icon-wrapper">
            {isPerfect ? (
              <Sparkles size={48} className="text-amber-500 animate-bounce-gentle" />
            ) : (
              <Award size={48} className="text-indigo-500" />
            )}
          </div>

          <h2 className="summary-title">
            {isPerfect ? '¡Puntaje Perfecto! 🏆' : percentage >= 70 ? '¡Excelente Trabajo! 🎉' : '¡Buen Intento! Sigue practicando 💪'}
          </h2>
          <p className="summary-subtitle">{title}</p>
        </div>

        {/* Stats Grid */}
        <div className="summary-stats-grid">
          <div className="stat-box">
            <span className="stat-label">Aciertos</span>
            <span className="stat-value text-indigo-600">{correctCount} / {totalCount}</span>
            <span className="stat-sub">{percentage}% de precisión</span>
          </div>

          <div className="stat-box">
            <span className="stat-label">Estrellas</span>
            <span className="stat-value text-amber-500 flex-center gap-1">
              <Star size={20} fill="currentColor" /> +{starsEarned}
            </span>
            <span className="stat-sub">¡Acumuladas!</span>
          </div>

          <div className="stat-box">
            <span className="stat-label">Experiencia</span>
            <span className="stat-value text-emerald-500 flex-center gap-1">
              <Zap size={20} fill="currentColor" /> +{xpEarned} XP
            </span>
            <span className="stat-sub">Progreso de nivel</span>
          </div>
        </div>

        {/* Mistakes Review List if any */}
        {mistakes && mistakes.length > 0 && (
          <div className="summary-mistakes-section">
            <h3 className="mistakes-heading">
              <XCircle size={18} className="text-rose-500" />
              <span>Oportunidades de Repaso ({mistakes.length}):</span>
            </h3>
            
            <div className="mistakes-list">
              {mistakes.map((m, idx) => (
                <div key={idx} className="mistake-item">
                  <div className="mistake-item-header">
                    <span className="mistake-sentence"><strong>Pregunta:</strong> {m.question || m.sentence || m.text}</span>
                    {(m.sentence || m.text) && (
                      <button 
                        type="button" 
                        className="icon-btn-micro" 
                        onClick={() => speakText(m.sentence || m.text)}
                        title="Escuchar"
                      >
                        <Volume2 size={16} />
                      </button>
                    )}
                  </div>
                  {m.explanation && (
                    <p className="mistake-explanation">
                      💡 <strong>Regla:</strong> {m.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="summary-actions">
          {mistakes && mistakes.length > 0 && onReviewMistakes && (
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={onReviewMistakes}
            >
              <RotateCcw size={18} />
              <span>Repasar Errores ({mistakes.length})</span>
            </button>
          )}

          {onRetryAll && (
            <button
              type="button"
              className="btn-outline flex-1"
              onClick={onRetryAll}
            >
              <RotateCcw size={18} />
              <span>Repetir Todo</span>
            </button>
          )}

          <button
            type="button"
            className="btn-primary flex-1 btn-finish-highlight"
            onClick={onFinish}
          >
            <span>{finishLabel}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
