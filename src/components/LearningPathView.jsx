import React, { useState } from 'react';
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
  ShieldCheck,
  Headphones,
  Compass
} from 'lucide-react';

export default function LearningPathView({
  progress,
  activeCourse,
  onStartLevel,
  onStartChallenge,
  onStartDailyMission,
  onOpenReport,
  onOpenTheory,
  onOpenVocab,
  onOpenPhonetics,
  onOpenCoursesCatalog
}) {
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const units = Array.isArray(activeCourse?.units) ? activeCourse.units : [];

  // Find the next recommended activity within the active course
  const getNextRecommended = () => {
    if (!units || units.length === 0) return null;
    
    for (const unit of units) {
      if (!unit || !Array.isArray(unit.levels)) continue;
      const uProg = (progress?.unitProgress && progress.unitProgress[unit.id]) || { levelsCompleted: [], mastered: false };
      const completedSet = new Set(uProg.levelsCompleted || []);
      
      for (const lvl of unit.levels) {
        if (lvl && !completedSet.has(lvl.id)) {
          return { unit, level: lvl, isChallenge: false };
        }
      }

      // If all levels completed but not yet mastered challenge
      if (!uProg.mastered && unit.masterChallenge) {
        return { unit, level: unit.masterChallenge, isChallenge: true };
      }
    }
    
    if (units.length > 0 && units[0]?.levels && units[0].levels.length > 0) {
      return { unit: units[0], level: units[0].levels[0], allDone: true };
    }
    return null;
  };

  const nextRec = getNextRecommended();
  const mistakesCount = (progress?.mistakesLog || []).length;

  return (
    <div className="learning-path-container animate-fade-in">
      {/* Top Banner: Student Progress Quick Overview */}
      <div className="path-hero-card">
        <div className="path-hero-info">
          <div className="hero-badge-row">
            <span className="hero-level-chip">
              <Zap size={15} fill="currentColor" /> Nivel {progress?.level || 1}
            </span>
            <span className="hero-streak-chip">
              <Flame size={15} fill="currentColor" /> {progress?.currentStreak || 1} días de racha
            </span>
            <span className="hero-level-chip" style={{ background: 'rgba(6, 182, 212, 0.3)' }}>
              <Compass size={15} /> {activeCourse?.name?.split(':')[0] || 'Curso Actual'}
            </span>
          </div>
          <h2 className="path-hero-title">
            ¡Hola, {progress?.studentName || 'Estudiante'} {progress?.avatar || '🎓'}!
          </h2>
          <p className="path-hero-sub">
            {activeCourse?.name || 'Ruta de Aprendizaje'}: {activeCourse?.subtitle || 'Sigue tu plan paso a paso.'}
          </p>
        </div>

        <div className="path-hero-actions">
          <button 
            type="button" 
            className="btn-glass-report"
            onClick={onOpenCoursesCatalog}
            title="Cambiar o explorar catálogo de cursos"
          >
            <BookOpen size={16} className="text-cyan-300" />
            <span>Cambiar Curso</span>
          </button>

          <button 
            type="button" 
            className="btn-glass-report"
            onClick={onOpenReport}
            title="Ver estadísticas e informe"
          >
            <Trophy size={16} className="text-amber-400" />
            <span>Mi Informe</span>
          </button>
        </div>
      </div>

      {/* Quick Access to Phonetics Lab Banner */}
      <div className="phonetics-callout-banner animate-fade-in" onClick={onOpenPhonetics} style={{ cursor: 'pointer' }}>
        <div className="flex items-center gap-3">
          <div className="phonetics-callout-icon">
            <Headphones size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <strong className="text-sm font-bold text-cyan-700">Laboratorio de Fonética & Pronunciación 🗣️</strong>
              <span className="diff-tag diff-básico">14 Sonidos Vocálicos</span>
            </div>
            <p className="text-xs text-secondary mt-0.5">
              Entrena sonidos del inglés (/æ/, /ɛ/, /ɪ/, etc.), pares mínimos y graba tu propia voz.
            </p>
          </div>
        </div>
        <button type="button" className="btn-drill-action" style={{ background: '#06b6d4', color: '#fff', border: 'none' }}>
          <span>Abrir Lab</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Daily Smart Mission Card */}
      <DailyMissionCard 
        progress={progress} 
        onStartMission={onStartDailyMission} 
      />

      {/* Recommended Next Step Callout */}
      {nextRec && nextRec.unit && nextRec.level && (
        <div className="recommended-card animate-pulse-gentle">
          <div className="recommended-badge">
            <Sparkles size={16} />
            <span>{nextRec.isChallenge ? 'Desafío Integrador Recomendado 🏆' : 'Siguiente Actividad Recomendada'}</span>
          </div>

          <div className="recommended-main-content">
            <div className="rec-text-group">
              <span className="rec-unit-tag">
                {nextRec.unit.title || 'Actividad'} • {nextRec.isChallenge ? 'Evaluación de Dominio' : (nextRec.level.difficulty || 'Práctica')}
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
            onClick={() => {
              if (units && units.length > 0 && units[0]?.levels) {
                onStartLevel(units[0], { id: 'review_mistakes', name: 'Repaso de Preguntas', activityType: 'mistakes_review' });
              }
            }}
          >
            <RotateCcw size={16} />
            <span>Repasar Ahora</span>
          </button>
        </div>
      )}

      {/* Units Grid */}
      <div className="units-section-header">
        <h3 className="section-title">
          <BookOpen size={20} className="text-indigo-500" />
          <span>Unidades del Curso: {activeCourse?.name || 'Ruta Guiada'}</span>
        </h3>
        <p className="section-desc">Completa los niveles de cada unidad y desbloquea el Desafío Integrador.</p>
      </div>

      <div className="units-grid">
        {units.map((unit) => {
          const uProg = (progress?.unitProgress && progress.unitProgress[unit.id]) || { percentage: 0, levelsCompleted: [], mastered: false, challengeScore: null };
          const completedSet = new Set(uProg.levelsCompleted || []);
          const allLevelsDone = completedSet.size >= (unit.levels?.length || 3);
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
                <div className="unit-number-pill" style={{ background: unit.themeColor || '#6366f1' }}>
                  Unidad {unit.number || ''}
                </div>

                <div className="unit-header-text">
                  <div className="flex items-center gap-2">
                    <h4 className="unit-title">{unit.title}</h4>
                    {unit.vowelSound && (
                      <span className="diff-tag diff-intermedio" title="Sonido Vocálico de la Unidad">
                        🗣️ {unit.vowelSound}
                      </span>
                    )}
                  </div>
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
                    style={{ width: `${uProg.percentage || 0}%`, background: unit.gradient || 'var(--primary)' }} 
                  />
                </div>
              </div>

              {/* Levels inside Unit */}
              <div className={`unit-levels-list ${isExpanded ? 'show' : ''}`}>
                <p className="unit-description">{unit.description}</p>

                {/* Quick helpers */}
                <div className="unit-helpers-row">
                  {unit.vowelSound && (
                    <button
                      type="button"
                      className="btn-unit-helper"
                      onClick={onOpenPhonetics}
                      style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#0891b2' }}
                    >
                      <Headphones size={14} />
                      <span>Sonido Vocálico: {unit.vowelSound}</span>
                    </button>
                  )}
                  {unit.vocabCategory && onOpenVocab && (
                    <button 
                      type="button" 
                      className="btn-unit-helper"
                      onClick={() => onOpenVocab(unit.vocabCategory)}
                    >
                      <BookOpen size={14} />
                      <span>Vocabulario</span>
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

                {/* Difficulty Levels */}
                <div className="levels-wrapper">
                  {unit.levels?.map((lvl) => {
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
                              <span className={`diff-tag diff-${lvl.difficulty?.toLowerCase() || 'básico'}`}>
                                {lvl.difficulty}
                              </span>
                            </div>
                            <p className="level-desc">{lvl.description}</p>
                          </div>
                        </div>

                        <div className="level-item-right">
                          <div className="level-rewards">
                            <span className="reward-stars"><Star size={13} fill="currentColor" /> {lvl.stars || 3}</span>
                            <span className="reward-xp"><Zap size={13} fill="currentColor" /> {lvl.xp || 30} XP</span>
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
                          <span className="reward-stars"><Star size={13} fill="currentColor" /> {unit.masterChallenge.stars || 5}</span>
                          <span className="reward-xp"><Zap size={13} fill="currentColor" /> {unit.masterChallenge.xp || 80} XP</span>
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
