import React from 'react';
import { BookOpen, Star, Moon, Sun, Flame, Zap, Trophy, Layers, GraduationCap } from 'lucide-react';

export default function Header({ 
  progress, 
  theme, 
  toggleTheme, 
  onOpenReport,
  onOpenProfiles,
  onOpenSkillsMatrix,
  onOpenTeacherManager,
  setActiveTab
}) {
  return (
    <header className="app-header">
      <div className="header-brand" onClick={() => setActiveTab('path')} style={{ cursor: 'pointer' }}>
        <div className="brand-icon">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="brand-title">English Practice</h1>
          <p className="brand-subtitle">Ruta de Aprendizaje • Nivel Primario/Secundario</p>
        </div>
      </div>

      <div className="header-actions">
        {/* Profile Switcher Trigger */}
        <button
          type="button"
          className="header-profile-btn"
          onClick={onOpenProfiles}
          title="Cambiar o Administrar Perfiles de Alumnos"
          aria-label="Cambiar o Administrar Perfiles"
        >
          <span className="profile-btn-avatar">{progress.avatar || '🎓'}</span>
          <span className="profile-btn-name hide-mobile-sm">{progress.studentName || 'Estudiante'}</span>
        </button>

        {/* Streak indicator */}
        <div className="header-streak-badge" title="Racha de días de práctica consecutivos">
          <Flame size={17} className="text-orange-500" fill="currentColor" />
          <span>{progress.currentStreak || 1} d</span>
        </div>

        {/* Stars counter */}
        <div className="stat-badge" title="Estrellas acumuladas">
          <Star size={17} className="text-amber-400" fill="currentColor" />
          <span>{progress.stars || 0}</span>
        </div>

        {/* XP Level badge */}
        <div className="header-xp-badge" title="Puntos de Experiencia">
          <Zap size={16} className="text-emerald-400" fill="currentColor" />
          <span>Nv. {progress.level || 1}</span>
        </div>

        {/* Skills Matrix Button */}
        <button
          type="button"
          className="header-tool-btn"
          onClick={onOpenSkillsMatrix}
          title="Ver Matriz de Micro-Habilidades"
          aria-label="Matriz de Habilidades"
        >
          <Layers size={17} />
          <span className="hide-mobile-sm">Habilidades</span>
        </button>

        {/* Teacher Panel Button */}
        <button
          type="button"
          className="header-tool-btn"
          onClick={onOpenTeacherManager}
          title="Gestor Docente de Contenido y Tareas"
          aria-label="Modo Docente"
        >
          <GraduationCap size={17} />
          <span className="hide-mobile-sm">Docente</span>
        </button>

        {/* Report / Stats Button */}
        <button
          type="button"
          className="header-report-btn"
          onClick={onOpenReport}
          title="Ver Informe y Logros"
          aria-label="Ver Informe y Logros"
        >
          <Trophy size={18} />
          <span className="hide-mobile-sm">Informe</span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          type="button"
          onClick={toggleTheme} 
          className="theme-toggle-btn"
          title="Cambiar tema claro / oscuro"
          aria-label="Cambiar tema claro / oscuro"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}
