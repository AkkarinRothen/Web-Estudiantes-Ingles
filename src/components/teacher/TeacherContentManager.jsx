import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Upload, 
  Trash2, 
  Play, 
  Check, 
  FileText, 
  ArrowLeft,
  Volume2
} from 'lucide-react';
import { 
  TEMPLATE_TYPES, 
  getCustomPackages, 
  saveCustomPackage, 
  deleteCustomPackage, 
  exportPackageJSON, 
  importPackageJSON 
} from '../../utils/customContentStore';
import { MICRO_SKILLS } from '../../utils/adaptiveEngine';
import { speakText } from '../../utils/audio';

export default function TeacherContentManager({ onBackToStudentView, onLaunchCustomPackage }) {
  const [packages, setPackages] = useState(getCustomPackages);
  const [isCreatingPackage, setIsCreatingPackage] = useState(false);
  const [activePackage, setActivePackage] = useState(null);
  
  // Package form state
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgAuthor, setPkgAuthor] = useState('');
  const [pkgItems, setPkgItems] = useState([]);

  // New Question Form state inside package
  const [selectedTemplate, setSelectedTemplate] = useState('choice');
  const [qText, setQText] = useState('');
  const [qAudio, setQAudio] = useState('');
  const [qOptions, setQOptions] = useState(['', '', '', '']);
  const [qWords, setQWords] = useState('');
  const [qCorrect, setQCorrect] = useState('');
  const [qHint, setQHint] = useState('');
  const [qExplanation, setQExplanation] = useState('');
  const [qSkill, setQSkill] = useState('pronouns');

  const [notification, setNotification] = useState(null);

  const handleStartNewPackage = () => {
    setIsCreatingPackage(true);
    setActivePackage(null);
    setPkgTitle('');
    setPkgAuthor('');
    setPkgItems([]);
  };

  const handleAddItemToPackage = (e) => {
    e.preventDefault();
    if (!qText.trim() && selectedTemplate !== 'listening') {
      setNotification('Por favor escribe el enunciado de la pregunta.');
      return;
    }
    if (!qCorrect.trim()) {
      setNotification('Por favor indica la respuesta correcta.');
      return;
    }

    const newItem = {
      id: `item_${Date.now()}`,
      type: selectedTemplate,
      question: qText || (selectedTemplate === 'listening' ? 'Escucha el audio y selecciona la opción correcta:' : ''),
      audioText: qAudio || qCorrect,
      options: (selectedTemplate === 'choice' || selectedTemplate === 'listening' || selectedTemplate === 'spot_error') ? qOptions.filter(o => o.trim()) : undefined,
      words: selectedTemplate === 'scramble' ? qWords.split(' ').filter(w => w.trim()) : undefined,
      correct: qCorrect.trim(),
      hint: qHint.trim() || 'Presta atención a las reglas vistas en clase.',
      explanation: qExplanation.trim() || `La respuesta correcta es "${qCorrect}".`,
      skillId: qSkill
    };

    setPkgItems(prev => [...prev, newItem]);
    
    // Reset item form
    setQText('');
    setQAudio('');
    setQOptions(['', '', '', '']);
    setQWords('');
    setQCorrect('');
    setQHint('');
    setQExplanation('');
    setNotification('¡Ejercicio añadido al paquete! 🎉');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveFullPackage = () => {
    if (!pkgTitle.trim()) {
      setNotification('Por favor escribe un título para el paquete.');
      return;
    }
    if (pkgItems.length === 0) {
      setNotification('Debes agregar al menos 1 ejercicio antes de guardar.');
      return;
    }

    const newPkg = {
      id: activePackage ? activePackage.id : `pkg_${Date.now()}`,
      title: pkgTitle.trim(),
      author: pkgAuthor.trim() || 'Docente',
      version: '1.0',
      items: pkgItems
    };

    const updated = saveCustomPackage(newPkg);
    setPackages(updated);
    setIsCreatingPackage(false);
    setActivePackage(null);
    setNotification('¡Paquete de tareas guardado con éxito! ✅');
  };

  const handleDeletePackage = (pkgId) => {
    if (window.confirm('¿Seguro que deseas eliminar este paquete de tareas?')) {
      const updated = deleteCustomPackage(pkgId);
      setPackages(updated);
    }
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importPackageJSON(event.target.result);
      if (res.success) {
        setPackages(getCustomPackages());
        setNotification('¡Paquete importado correctamente! 📦');
      } else {
        setNotification(res.error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="teacher-panel-container animate-fade-in">
      {/* Top Header */}
      <div className="teacher-panel-header">
        <div className="flex items-center gap-3">
          <button type="button" className="btn-back-path" onClick={onBackToStudentView}>
            <ArrowLeft size={18} /> Volver a la Vista de Estudiante
          </button>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-2 mt-2">
          <div>
            <h2 className="teacher-panel-title">📚 Gestor Docente de Contenido y Tareas</h2>
            <p className="teacher-panel-sub">Crea ejercicios personalizados, expórtalos en JSON o pruébalos con tus alumnos.</p>
          </div>

          {!isCreatingPackage && (
            <div className="flex gap-2">
              <label className="btn-outline flex items-center gap-2" style={{ cursor: 'pointer', margin: 0 }}>
                <Upload size={16} />
                <span>Cargar Tarea JSON</span>
                <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
              </label>

              <button type="button" className="btn-primary" onClick={handleStartNewPackage}>
                <Plus size={18} />
                <span>Crear Nuevo Paquete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="hint-box animate-fade-in mt-2 mb-2 font-bold">
          {notification}
        </div>
      )}

      {/* Package List View */}
      {!isCreatingPackage ? (
        <div className="packages-grid mt-4">
          {packages.length === 0 ? (
            <div className="glass-card text-center p-8">
              <FileText size={48} className="text-muted mx-auto mb-2" />
              <h3 className="text-lg font-bold">No hay paquetes personalizados creados aún</h3>
              <p className="text-sm text-muted mt-1 max-w-md mx-auto">
                Crea tu primer paquete de ejercicios para enriquecer las lecciones o descarga un archivo JSON para compartirlo con tus estudiantes.
              </p>
              <button type="button" className="btn-primary mt-4" onClick={handleStartNewPackage}>
                <Plus size={18} /> Crear Primer Paquete
              </button>
            </div>
          ) : (
            packages.map(pkg => (
              <div key={pkg.id} className="package-card glass-card">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="diff-tag diff-básico">Paquete Docente v{pkg.version || '1.0'}</span>
                    <h3 className="package-title mt-1">{pkg.title}</h3>
                    <p className="text-xs text-muted">Por: {pkg.author || 'Docente'} • {pkg.items?.length || 0} ejercicio(s)</p>
                  </div>

                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="icon-btn-micro"
                      onClick={() => exportPackageJSON(pkg)}
                      title="Descargar archivo JSON para compartir con estudiantes"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      type="button"
                      className="icon-btn-micro text-rose-500"
                      onClick={() => handleDeletePackage(pkg.id)}
                      title="Eliminar paquete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="package-actions mt-4 flex gap-2">
                  <button
                    type="button"
                    className="btn-primary flex-1"
                    onClick={() => onLaunchCustomPackage(pkg)}
                  >
                    <Play size={16} fill="currentColor" />
                    <span>Lanzar Tarea en Modo Alumno</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Package Creation & Editor Form */
        <div className="package-editor-layout mt-4">
          <div className="glass-card flex-1">
            <h3 className="text-lg font-bold mb-3">1. Datos del Paquete</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold text-muted block mb-1">Título de la Tarea / Lección:</label>
                <input
                  type="text"
                  className="form-control"
                  value={pkgTitle}
                  onChange={(e) => setPkgTitle(e.target.value)}
                  placeholder="Ej: Tarea Verbos y Pronombres - Semana 3"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted block mb-1">Nombre del Profesor / Autor:</label>
                <input
                  type="text"
                  className="form-control"
                  value={pkgAuthor}
                  onChange={(e) => setPkgAuthor(e.target.value)}
                  placeholder="Ej: Profe Laura"
                />
              </div>
            </div>

            <hr className="my-4 border-t border-color" />

            <h3 className="text-lg font-bold mb-2">2. Añadir Ejercicio (Plantilla)</h3>
            
            {/* Template Selector */}
            <div className="template-picker-grid mb-4">
              {TEMPLATE_TYPES.map(tpl => (
                <button
                  key={tpl.type}
                  type="button"
                  className={`template-pick-btn ${selectedTemplate === tpl.type ? 'active' : ''}`}
                  onClick={() => setSelectedTemplate(tpl.type)}
                >
                  <strong className="block text-sm">{tpl.name}</strong>
                  <span className="text-xs text-muted block">{tpl.desc}</span>
                </button>
              ))}
            </div>

            {/* Exercise Form */}
            <form onSubmit={handleAddItemToPackage} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-muted block mb-1">Micro-Habilidad Pedagógica:</label>
                <select 
                  value={qSkill} 
                  onChange={(e) => setQSkill(e.target.value)}
                  className="form-control"
                >
                  {MICRO_SKILLS.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.tagline})</option>
                  ))}
                </select>
              </div>

              {selectedTemplate === 'listening' ? (
                <div>
                  <label className="text-xs font-bold text-muted block mb-1">Texto en Inglés para el Audio Audible:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      value={qAudio}
                      onChange={(e) => setQAudio(e.target.value)}
                      placeholder="Ej: She reads a good book."
                      required
                    />
                    <button
                      type="button"
                      className="icon-btn-secondary"
                      onClick={() => speakText(qAudio || 'Test audio')}
                      title="Probar audio"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold text-muted block mb-1">Enunciado de la Pregunta:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    placeholder="Ej: ¿Cuál es el pronombre para 'Ellos'?"
                    required
                  />
                </div>
              )}

              {/* Scramble Words Field */}
              {selectedTemplate === 'scramble' ? (
                <div>
                  <label className="text-xs font-bold text-muted block mb-1">Palabras separadas por espacio para desordenar:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={qWords}
                    onChange={(e) => setQWords(e.target.value)}
                    placeholder="Ej: school. They go to"
                    required
                  />
                </div>
              ) : (
                /* Options Fields for Choice, Listening, Spot Error */
                <div>
                  <label className="text-xs font-bold text-muted block mb-1">4 Opciones de Respuesta:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {qOptions.map((opt, idx) => (
                      <input
                        key={idx}
                        type="text"
                        className="form-control"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...qOptions];
                          updated[idx] = e.target.value;
                          setQOptions(updated);
                        }}
                        placeholder={`Opción ${idx + 1}`}
                        required={idx < 2}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-muted block mb-1">Respuesta Exacta Correcta:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={qCorrect}
                    onChange={(e) => setQCorrect(e.target.value)}
                    placeholder="Ej: They go to school."
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted block mb-1">Pista Opcional (💡):</label>
                  <input
                    type="text"
                    className="form-control"
                    value={qHint}
                    onChange={(e) => setQHint(e.target.value)}
                    placeholder="Ej: El sujeto va primero..."
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-muted block mb-1">Explicación de la Regla (se muestra al responder):</label>
                <input
                  type="text"
                  className="form-control"
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  placeholder="Ej: Sujeto (They) + Verbo (go) + Complemento..."
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button type="submit" className="btn-secondary">
                  <Plus size={16} /> Añadir Ejercicio al Paquete
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar: Package Summary & Items List */}
          <div className="package-sidebar glass-card" style={{ width: '320px' }}>
            <h3 className="text-md font-bold mb-2">Ejercicios en este paquete ({pkgItems.length}):</h3>
            
            <div className="sidebar-items-scroll">
              {pkgItems.length === 0 ? (
                <p className="text-xs text-muted italic">Aún no has agregado preguntas.</p>
              ) : (
                pkgItems.map((item, idx) => (
                  <div key={item.id} className="sidebar-item-card">
                    <div className="flex justify-between items-center">
                      <span className="diff-tag diff-intermedio">{item.type}</span>
                      <button
                        type="button"
                        className="text-rose-500 hover:text-rose-700"
                        onClick={() => setPkgItems(prev => prev.filter((_, i) => i !== idx))}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <strong className="text-xs block mt-1">{item.question || item.audioText}</strong>
                    <span className="text-xs text-emerald-600 block">✓ {item.correct}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                className="btn-primary w-full"
                onClick={handleSaveFullPackage}
                disabled={pkgItems.length === 0 || !pkgTitle.trim()}
              >
                <Check size={18} /> Guardar Paquete Completo
              </button>
              <button
                type="button"
                className="btn-outline w-full"
                onClick={() => setIsCreatingPackage(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
