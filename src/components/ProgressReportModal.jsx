import React, { useState } from 'react';
import { X, Award, Star, Flame, Trophy, Download, Printer, CheckCircle2, BookOpen } from 'lucide-react';
import { BADGES } from '../utils/progressStore';

export default function ProgressReportModal({ progress, onClose, onUpdateName }) {
  const [studentName, setStudentName] = useState(progress.studentName || 'Estudiante');
  const [isEditingName, setIsEditingName] = useState(false);

  const handleSaveName = () => {
    setIsEditingName(false);
    if (onUpdateName) onUpdateName(studentName);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `reporte_ingles_${studentName.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const unitTitles = {
    'unit-1': 'Unidad 1: Sujetos y Pronombres',
    'unit-2': 'Unidad 2: Verbos de Acción',
    'unit-3': 'Unidad 3: La Oración Simple',
    'unit-4': 'Unidad 4: Habilidades (Can & Can\'t)'
  };

  return (
    <div className="report-modal-overlay animate-fade-in" role="dialog" aria-modal="true">
      <div className="report-modal-card animate-pop-in">
        {/* Modal Header */}
        <div className="report-modal-header no-print">
          <div className="report-header-info">
            <h2 className="report-title">📊 Informe Pedagógico y Progreso</h2>
            <p className="report-subtitle">Resumen de desempeño y logros de aprendizaje</p>
          </div>
          <button
            type="button"
            className="icon-btn-close"
            onClick={onClose}
            aria-label="Cerrar ventana"
          >
            <X size={22} />
          </button>
        </div>

        {/* Printable Document Body */}
        <div className="report-content-body print-area">
          {/* Header Profile Section */}
          <div className="report-student-card">
            <div className="student-info-left">
              <div className="student-avatar-badge">
                <Trophy size={32} className="text-amber-500" />
              </div>
              <div>
                <div className="student-name-row">
                  {isEditingName ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        className="input-name-edit"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Nombre del estudiante"
                        autoFocus
                      />
                      <button className="btn-sm-save" onClick={handleSaveName}>Guardar</button>
                    </div>
                  ) : (
                    <h3 className="student-name" onClick={() => setIsEditingName(true)} title="Toca para cambiar nombre">
                      {studentName} ✏️
                    </h3>
                  )}
                </div>
                <p className="report-date">
                  Fecha de emisión: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="student-level-badge">
              <span className="level-badge-title">Nivel {progress.level || 1}</span>
              <span className="level-badge-xp">{progress.xp || 0} XP acumulados</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="report-metrics-grid">
            <div className="report-metric-box">
              <Star className="text-amber-500" size={24} fill="currentColor" />
              <div className="metric-text-group">
                <span className="metric-val">{progress.stars || 0}</span>
                <span className="metric-label">Estrellas Totales</span>
              </div>
            </div>

            <div className="report-metric-box">
              <Flame className="text-orange-500" size={24} fill="currentColor" />
              <div className="metric-text-group">
                <span className="metric-val">{progress.currentStreak || 1} días</span>
                <span className="metric-label">Racha Activa</span>
              </div>
            </div>

            <div className="report-metric-box">
              <Award className="text-purple-500" size={24} />
              <div className="metric-text-group">
                <span className="metric-val">{(progress.unlockedBadges || []).length} / {BADGES.length}</span>
                <span className="metric-label">Insignias Obtenidas</span>
              </div>
            </div>
          </div>

          {/* Progress per Unit */}
          <div className="report-section">
            <h4 className="report-section-title">
              <BookOpen size={18} />
              <span>Avance por Unidades de Aprendizaje</span>
            </h4>

            <div className="report-units-list">
              {['unit-1', 'unit-2', 'unit-3', 'unit-4'].map(uId => {
                const uProg = (progress.unitProgress && progress.unitProgress[uId]) || { percentage: 0, levelsCompleted: [] };
                return (
                  <div key={uId} className="report-unit-row">
                    <div className="unit-row-meta">
                      <span className="unit-name">{unitTitles[uId]}</span>
                      <span className="unit-pct-badge">{uProg.percentage || 0}%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${uProg.percentage || 0}%` }}
                      />
                    </div>
                    <div className="unit-levels-tag">
                      {(uProg.levelsCompleted || []).length} de 3 niveles completados
                      {uProg.percentage === 100 && ' — ¡Completada con éxito! ✅'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges Section */}
          <div className="report-section">
            <h4 className="report-section-title">
              <Trophy size={18} />
              <span>Insignias y Logros Pedagógicos</span>
            </h4>

            <div className="report-badges-grid">
              {BADGES.map(badge => {
                const isUnlocked = (progress.unlockedBadges || []).includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`report-badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                  >
                    <div className="badge-icon-box" style={{ background: isUnlocked ? badge.color : undefined }}>
                      {isUnlocked ? <CheckCircle2 size={20} color="#fff" /> : '🔒'}
                    </div>
                    <div className="badge-info">
                      <strong className="badge-name">{badge.name}</strong>
                      <p className="badge-desc">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="report-footer-actions no-print">
          <button
            type="button"
            className="btn-outline"
            onClick={handleExportJSON}
            title="Descargar copia de seguridad en JSON"
          >
            <Download size={18} />
            <span>Descargar JSON</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={handlePrint}
            title="Imprimir o Guardar como PDF"
          >
            <Printer size={18} />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
