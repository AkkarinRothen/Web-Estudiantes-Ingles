import React from 'react';
import { X, BookOpen, Check, Compass, Award, ArrowRight } from 'lucide-react';
import { COURSES_CATALOG } from '../data/coursesCatalog';

export default function CoursesCatalogModal({ activeCourseId, onSelectCourse, onClose }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Compass': return <Compass size={24} />;
      case 'BookOpen': return <BookOpen size={24} />;
      case 'Award': return <Award size={24} />;
      default: return <BookOpen size={24} />;
    }
  };

  return (
    <div className="summary-overlay animate-fade-in" role="dialog" aria-modal="true">
      <div className="report-modal-card animate-pop-in" style={{ maxWidth: '680px' }}>
        <div className="report-modal-header">
          <div className="flex items-center gap-2">
            <BookOpen size={24} className="text-indigo-500" />
            <div>
              <h2 className="report-title">Catálogo de Cursos y Libros Curriculares</h2>
              <p className="report-subtitle">Selecciona el programa de estudio según tu nivel o plan de clase</p>
            </div>
          </div>
          <button type="button" className="icon-btn-close" onClick={onClose} aria-label="Cerrar">
            <X size={22} />
          </button>
        </div>

        {/* Courses list */}
        <div className="flex flex-col gap-3 mt-2">
          {COURSES_CATALOG.map(course => {
            const isActive = course.id === activeCourseId;
            return (
              <div 
                key={course.id} 
                className={`course-catalog-card glass-card ${isActive ? 'course-active-border' : ''}`}
              >
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="course-icon-badge" style={{ background: course.color, color: '#fff' }}>
                      {getIcon(course.badgeIcon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="course-card-title">{course.name}</h3>
                        <span className="diff-tag diff-básico">{course.levelTag}</span>
                      </div>
                      <p className="text-xs text-muted">{course.subtitle}</p>
                    </div>
                  </div>

                  {isActive && (
                    <span className="pill-complete"><Check size={14} /> Curso Activo</span>
                  )}
                </div>

                <p className="text-xs text-secondary mt-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-3 pt-2 border-t border-color flex-wrap gap-2">
                  <span className="text-xs font-bold text-muted">
                    📖 {course.unitsCount} Unidades Temáticas Estructuradas
                  </span>

                  <button
                    type="button"
                    className={`btn-play-level ${isActive ? 'btn-replay' : 'btn-play-action'}`}
                    onClick={() => {
                      onSelectCourse(course.id);
                      onClose();
                    }}
                  >
                    {isActive ? 'Continuar este Curso' : 'Cambiar a este Curso'}
                    {!isActive && <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }} />}
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
