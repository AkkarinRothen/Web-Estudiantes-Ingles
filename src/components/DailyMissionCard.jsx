import React from 'react';
import { Sparkles, Zap, Flame, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DailyMissionCard({ progress, onStartMission }) {
  const today = new Date().toISOString().split('T')[0];
  
  // Safe check if mission was completed today in session logs
  const isCompletedToday = (progress?.sessionsLog || []).some(
    s => s && s.isDailyMission && typeof s.timestamp === 'string' && s.timestamp.startsWith(today)
  );

  return (
    <div className={`daily-mission-card ${isCompletedToday ? 'mission-completed' : ''} animate-fade-in`}>
      <div className="daily-mission-left">
        <div className="daily-mission-badge">
          <Sparkles size={16} />
          <span>{isCompletedToday ? '¡Misión Diaria Cumplida!' : 'Misión Diaria de Refuerzo'}</span>
        </div>

        <h3 className="daily-mission-title">
          {isCompletedToday ? '¡Excelente constancia hoy! 🎉' : '5 Preguntas Inteligentes de Refuerzo'}
        </h3>
        <p className="daily-mission-desc">
          {isCompletedToday 
            ? 'Has asegurado tu racha y sumado +100 XP. ¡Puedes repetir para seguir entrenando!'
            : 'Preguntas seleccionadas a medida de tus áreas de práctica para consolidar lo aprendido.'}
        </p>

        <div className="daily-mission-rewards-row">
          <span className="reward-chip-xp">
            <Zap size={14} fill="currentColor" /> +100 XP
          </span>
          <span className="reward-chip-streak">
            <Flame size={14} fill="currentColor" /> +1 Día de Racha
          </span>
          <span className="reward-chip-shield">
            <ShieldCheck size={14} /> Refuerzo Adaptativo
          </span>
        </div>
      </div>

      <div className="daily-mission-right">
        <button
          type="button"
          className={`btn-start-mission ${isCompletedToday ? 'btn-mission-done' : ''}`}
          onClick={onStartMission}
        >
          {isCompletedToday ? (
            <>
              <CheckCircle2 size={18} />
              <span>Practicar de Nuevo</span>
            </>
          ) : (
            <>
              <span>Comenzar Misión</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
