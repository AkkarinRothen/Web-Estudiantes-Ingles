import React, { useState } from 'react';
import { X, Award, Star, Flame, Trophy, Download, Printer, CheckCircle2, BookOpen, FileSpreadsheet, Sparkles, Lightbulb } from 'lucide-react';
import { BADGES, exportProgressCSV } from '../utils/progressStore';

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

  const handleExportCSV = () => {
    const csvData = exportProgressCSV(progress);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", url);
    downloadAnchor.setAttribute("download", `analitica_ingles_${studentName.toLowerCase().replace(/\s+/g, '_')}.csv`);
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

  // Identify strengths and areas for improvement
  const getPedagogicalInsights = () => {
    const strengths = [];
    const improvements = [];

    ['unit-1', 'unit-2', 'unit-3', 'unit-4'].forEach(uId => {
      const uProg = progress.unitProgress?.[uId];
      if (uProg?.mastered || (uProg?.percentage || 0) >= 90) {
        strengths.push(unitTitles[uId].split(':')[1].trim());
      } else if ((uProg?.percentage || 0) < 60 && (uProg?.levelsCompleted?.length || 0) > 0) {
        improvements.push(unitTitles[uId].split(':')[1].trim());
      }
    });

    return { strengths, improvements };
  };

  const insights = getPedagogicalInsights();

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
                <span style={{ fontSize: '2rem' }}>{progress.avatar || '🎓'}</span>
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

          {/* Pedagogical Insights Box */}
          <div className="report-insights-box">
            <div className="insights-row">
              <div className="insight-col">
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm mb-1">
                  <Sparkles size={16} /> Fortalezas Consolidadas:
                </div>
                <p className="text-xs text-secondary">
                  {insights.strengths.length > 0
                    ? insights.strengths.join(', ')
                    : 'Avanzando en las primeras actividades de la ruta.'}
                </p>
              </div>

              <div className="insight-col">
                <div className="flex items-center gap-1 text-amber-600 font-bold text-sm mb-1">
                  <Lightbulb size={16} /> Áreas Recomendadas de Refuerzo:
                </div>
                <p className="text-xs text-secondary">
                  {insights.improvements.length > 0
                    ? insights.improvements.join(', ')
                    : 'Mantén la práctica continua para consolidar las siguientes unidades.'}
                </p>
              </div>
            </div>
          </div>

          {/* Progress per Unit */}
          <div className="report-section">
            <h4 className="report-section-title">
              <BookOpen size={18} />
              <span>Avance y Dominio por Unidades de Aprendizaje</span>
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
                      {uProg.mastered && ' • 🏆 ¡Dominio Certificado en Desafío Maestro!'}
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

        {/* Modal Action Buttons with CSV export for teachers */}
        <div className="report-footer-actions no-print flex-wrap">
          <button
            type="button"
            className="btn-outline flex-1"
            onClick={handleExportCSV}
            title="Descargar datos en CSV para Google Sheets / Excel"
          >
            <FileSpreadsheet size={18} className="text-emerald-500" />
            <span>Descargar CSV (Docente)</span>
          </button>

          <button
            type="button"
            className="btn-outline flex-1"
            onClick={handleExportJSON}
            title="Descargar copia de respaldo en JSON"
          >
            <Download size={18} />
            <span>Descargar JSON</span>
          </button>

          <button
            type="button"
            className="btn-primary flex-1"
            onClick={handlePrint}
            title="Imprimir o Guardar como PDF"
          >
            <Printer size={18} />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
