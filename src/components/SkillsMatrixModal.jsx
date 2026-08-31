import React from 'react';
import { X, Sparkles, Trophy, Play, CheckCircle2, AlertCircle, Layers, Zap, UserCheck, BookOpen, CheckCircle } from 'lucide-react';
import { calculateSkillsMastery } from '../utils/adaptiveEngine';

export default function SkillsMatrixModal({ progress, onClose, onStartSkillDrill }) {
  const skills = calculateSkillsMastery(progress);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck size={20} />;
      case 'Zap': return <Zap size={20} />;
      case 'Layers': return <Layers size={20} />;
      case 'CheckCircle': return <CheckCircle size={20} />;
      case 'BookOpen': return <BookOpen size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  return (
    <div className="summary-overlay animate-fade-in" role="dialog" aria-modal="true">
      <div className="report-modal-card animate-pop-in" style={{ maxWidth: '640px' }}>
        <div className="report-modal-header">
          <div className="flex items-center gap-2">
            <Layers size={24} className="text-indigo-500" />
            <div>
              <h2 className="report-title">Matriz de Micro-Habilidades</h2>
              <p className="report-subtitle">Diagnóstico y entrenamiento focalizado por regla gramatical</p>
            </div>
          </div>
          <button type="button" className="icon-btn-close" onClick={onClose} aria-label="Cerrar">
            <X size={22} />
          </button>
        </div>

        {/* Skills Grid */}
        <div className="skills-matrix-list">
          {skills.map(skill => {
            return (
              <div key={skill.id} className="skill-matrix-card">
                <div className="skill-card-top">
                  <div className="flex items-center gap-3">
                    <div className="skill-icon-pill" style={{ background: skill.color, color: '#fff' }}>
                      {getIcon(skill.icon)}
                    </div>
                    <div>
                      <strong className="skill-name">{skill.name}</strong>
                      <p className="skill-tagline">{skill.tagline}</p>
                    </div>
                  </div>

                  <div className="skill-pct-badge">
                    {skill.mastered ? (
                      <span className="pill-complete"><Trophy size={14} /> Dominado</span>
                    ) : (
                      <span className="pill-pct">{skill.percentage}%</span>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="progress-bar-container mt-2">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${skill.percentage}%`, background: skill.color }}
                  />
                </div>

                {/* Card Action */}
                <div className="skill-card-bottom mt-3">
                  <span className="text-xs text-muted">
                    {skill.pendingMistakes > 0 
                      ? `💡 ${skill.pendingMistakes} error(es) registrado(s) para reforzar`
                      : 'Listo para práctica o consolidación'}
                  </span>

                  <button
                    type="button"
                    className="btn-drill-action"
                    onClick={() => {
                      onClose();
                      onStartSkillDrill(skill.id);
                    }}
                  >
                    <Play size={14} fill="currentColor" />
                    <span>Entrenar ({skill.name.split(' ')[0]})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
