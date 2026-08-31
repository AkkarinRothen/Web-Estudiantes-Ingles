import React, { useState } from 'react';
import { LEARNING_UNITS } from '../data/learningUnits';
import DailyMissionCard from './DailyMissionCard';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Star, 
  Zap, 
  Flame, 
  FileText, 
  BookOpen, 
  Trophy, 
  RotateCcw, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function LearningPathView({
  progress,
  onStartLevel,
  onStartChallenge,
  onStartDailyMission,
  onOpenReport,
  onOpenTheory,
  onOpenVocab
}) {
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  // Find the next recommended activity
  const getNextRecommended = () => {
    for (const unit of LEARNING_UNITS) {
      const uProg = (progress.unitProgress && progress.unitProgress[unit.id]) || { levelsCompleted: [], mastered: false };
      const completedSet = new Set(uProg.levelsCompleted || []);
      
      for (const lvl of unit.levels) {
        if (!completedSet.has(lvl.id)) {
          return { unit, level: lvl, isChallenge: false };
        }
      }

      // If all levels completed but not yet mastered challenge
      if (!uProg.mastered && unit.masterChallenge) {
        return { unit, level: unit.masterChallenge, isChallenge: true };
      }
    }
    return { unit: LEARNING_UNITS[0], level: LEARNING_UNITS[0].levels[0], allDone: true };
  };

  const nextRec = getNextRecommended();
  const mistakesCount = (progress.mistakesLog || []).length;

  return (
    <div className="learning-path-container animate-fade-in">
      {/* Top Banner: Student Progress Quick Overview */}
      <div className="path-hero-card">
        <div className="path-hero-info">
          <div className="hero-badge-row">
            <span className="hero-level-chip">
              <Zap size={15} fill="currentColor" /> Nivel {progress.level || 1}
            </span>
            <span className="hero-streak-chip">
              <Flame size={15} fill="currentColor" /> {progress.currentStreak || 1} días de racha
            </span>
          </div>
          <h2 className="path-hero-title">
            ¡Hola, {progress.studentName || 'Estudiante'} {progress.avatar || '🎓'}!
          </h2>
          <p className="path-hero-sub">
            Sigue tu ruta de inglés paso a paso o entrena en tu misión diaria.
          </p>
        </div>

        <div className="path-hero-actions">
          <button 
            type="button" 
            className="btn-glass-report"
            onClick={onOpenReport}
            title="Ver estadísticas e informe"
          >
            <Trophy size={18} className="text-amber-400" />
            <span>Mi Informe & Logros</span>
          </button>
        </div>
      </div>

      {/* Daily Smart Mission Card */}
      <DailyMissionCard 
        progress={progress} 
        onStartMission={onStartDailyMission} 
      />

      {/* Recommended Next Step Callout */}
      {nextRec && nextRec.level && (
        <div className="recommended-card animate-pulse-gentle">
          <div className="recommended-badge">
            <Sparkles size={16} />
            <span>{nextRec.isChallenge ? 'Desafío Integrador Recomendado 🏆' : 'Siguiente Actividad Recomendada'}</span>
          </div>

          <div className="recommended-main-content">
            <div className="rec-text-group">
              <span className="rec-unit-tag">
                {nextRec.unit.title} • {nextRec.isChallenge ? 'Evaluación de Dominio' : nextRec.level.difficulty}
              </span>
              <h3 className="rec-level-title">{nextRec.level.name || nextRec.level.title}</h3>
              <p className="rec-level-desc">{nextRec.level.description}</p>
            </div>

            <button
              type="button"
              className="btn-start-action"
              onClick={() => {
                if (nextRec.isChallenge) {
                  onStartChallenge(nextRec.unit);
                } else {
                  onStartLevel(nextRec.unit, nextRec.level);
                }
              }}
            >
              <span>¡Comenzar ahora!</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Review mistakes callout if any */}
      {mistakesCount > 0 && (
        <div className="mistakes-review-banner">
          <div className="flex items-center gap-3">
            <ShieldCheck size={26} className="text-cyan-500" />
            <div>
              <strong>Tienes {mistakesCount} pregunta{mistakesCount > 1 ? 's' : ''} para repasar</strong>
              <p className="text-xs text-muted">Asegura tu aprendizaje resolviendo las preguntas que tuviste dudas.</p>
            </div>
          </div>
          <button 
            type="button"
            className="btn-review-sm"
            onClick={() => onStartLevel(LEARNING_UNITS[0], { id: 'review_mistakes', name: 'Repaso de Preguntas', activityType: 'mistakes_review' })}
          >
            <RotateCcw size={16} />
            <span>Repasar Ahora</span>
          </button>
        </div>
      )}

      {/* 4 Thematic Progressive Units Grid */}
      <div className="units-section-header">
        <h3 className="section-title">
          <BookOpen size={20} className="text-indigo-500" />
          <span>Unidades de Aprendizaje (Ruta Guiada)</span>
        </h3>
        <p className="section-desc">Completa los 3 niveles y supera el Desafío Integrador Final.</p>
      </div>

      <div className="units-grid">
        {LEARNING_UNITS.map((unit) => {
          const uProg = (progress.unitProgress && progress.unitProgress[unit.id]) || { percentage: 0, levelsCompleted: [], mastered: false, challengeScore: null };
          const completedSet = new Set(uProg.levelsCompleted || []);
          const allLevelsDone = completedSet.size >= 3;
          const isMastered = uProg.mastered;
          const isExpanded = selectedUnitId === unit.id;

          return (
            <div 
              key={unit.id} 
              className={`unit-card ${isMastered ? 'unit-completed' : ''} ${isExpanded ? 'unit-expanded' : ''}`}
            >
              {/* Unit Header */}
              <div 
                className="unit-card-header"
                onClick={() => setSelectedUnitId(isExpanded ? null : unit.id)}
              >
                <div className="unit-number-pill" style={{ background: unit.themeColor }}>
                  Unidad {unit.number}
                </div>

                <div className="unit-header-text">
                  <h4 className="unit-title">{unit.title}</h4>
                  <span className="unit-tagline">{unit.tagline}</span>
                </div>

                <div className="unit-progress-pill">
                  {isMastered ? (
                    <span className="pill-complete"><Trophy size={16} /> 100% Dominado</span>
                  ) : (
                    <span className="pill-pct">{uProg.percentage || 0}%</span>
                  )}
                  <ChevronRight size={18} className={`chevron-icon ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
              </div>

              {/* Unit Progress Bar */}
              <div className="unit-bar-wrapper">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${uProg.percentage || 0}%`, background: unit.gradient }} 
                  />
                </div>
              </div>

              {/* Levels inside Unit */}
              <div className={`unit-levels-list ${isExpanded ? 'show' : ''}`}>
                <p className="unit-description">{unit.description}</p>

                {/* Quick helpers */}
                <div className="unit-helpers-row">
                  {unit.vocabCategory && onOpenVocab && (
                    <button 
                      type="button" 
                      className="btn-unit-helper"
                      onClick={() => onOpenVocab(unit.vocabCategory)}
                    >
                      <BookOpen size={14} />
                      <span>Vocabulario de la Unidad</span>
                    </button>
                  )}
                  {unit.grammarId && onOpenTheory && (
                    <button 
                      type="button" 
                      className="btn-unit-helper"
                      onClick={() => onOpenTheory(unit.grammarId)}
                    >
                      <FileText size={14} />
                      <span>Ficha de Teoría</span>
                    </button>
                  )}
                </div>

                {/* 3 Difficulty Levels */}
                <div className="levels-wrapper">
                  {unit.levels.map((lvl) => {
                    const isDone = completedSet.has(lvl.id);
                    return (
                      <div 
                        key={lvl.id} 
                        className={`level-item-row ${isDone ? 'level-done' : ''}`}
                      >
                        <div className="level-item-left">
                          <div className={`level-status-icon ${isDone ? 'status-done' : 'status-ready'}`}>
                            {isDone ? <CheckCircle2 size={18} /> : <Play size={16} fill="currentColor" />}
                          </div>
                          <div>
                            <div className="level-name-row">
                              <strong className="level-name">{lvl.name}</strong>
                              <span className={`diff-tag diff-${lvl.difficulty.toLowerCase()}`}>
                                {lvl.difficulty}
                              </span>
                            </div>
                            <p className="level-desc">{lvl.description}</p>
                          </div>
                        </div>

                        <div className="level-item-right">
                          <div className="level-rewards">
                            <span className="reward-stars"><Star size={13} fill="currentColor" /> {lvl.stars}</span>
                            <span className="reward-xp"><Zap size={13} fill="currentColor" /> {lvl.xp} XP</span>
                          </div>
                          <button
                            type="button"
                            className={`btn-play-level ${isDone ? 'btn-replay' : 'btn-play-action'}`}
                            onClick={() => onStartLevel(unit, lvl)}
                          >
                            {isDone ? 'Repasar' : 'Jugar'}
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Unit Final Challenge Item */}
                  {unit.masterChallenge && (
                    <div className={`level-item-row challenge-row ${isMastered ? 'challenge-mastered' : allLevelsDone ? 'challenge-unlocked' : 'challenge-locked'}`}>
                      <div className="level-item-left">
                        <div className="level-status-icon" style={{ background: isMastered ? 'var(--success-bg)' : 'rgba(245, 158, 11, 0.15)', color: isMastered ? 'var(--success-text)' : '#d97706' }}>
                          <Trophy size={18} />
                        </div>
                        <div>
                          <div className="level-name-row">
                            <strong className="level-name text-amber-600">{unit.masterChallenge.title}</strong>
                            <span className="diff-tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                              Evaluación de Unidad
                            </span>
                          </div>
                          <p className="level-desc">{unit.masterChallenge.description}</p>
                        </div>
                      </div>

                      <div className="level-item-right">
                        <div className="level-rewards">
                          <span className="reward-stars"><Star size={13} fill="currentColor" /> {unit.masterChallenge.stars}</span>
                          <span className="reward-xp"><Zap size={13} fill="currentColor" /> {unit.masterChallenge.xp} XP</span>
                        </div>
                        <button
                          type="button"
                          className="btn-play-level btn-play-action"
                          style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}
                          onClick={() => onStartChallenge(unit)}
                        >
                          {isMastered ? 'Repetir Desafío' : 'Iniciar Desafío'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
