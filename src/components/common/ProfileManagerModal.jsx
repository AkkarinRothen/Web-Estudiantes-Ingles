import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Check, 
  Trash2, 
  Download, 
  Upload, 
  Users 
} from 'lucide-react';
import { 
  getProfilesList, 
  getActiveProfileId, 
  createNewProfile, 
  switchActiveProfile, 
  deleteProfile, 
  importProfileBackup 
} from '../../utils/progressStore';

const AVATARS = ['🎓', '⭐', '🚀', '🦁', '🦉', '🎨', '⚽', '🎸'];

export default function ProfileManagerModal({ onClose, onProfileChanged }) {
  const [profiles, setProfiles] = useState(getProfilesList);
  const [activeId, setActiveId] = useState(getActiveProfileId);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('🎓');
  
  // Confirmation state for deleting or overwriting
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [importStatus, setImportStatus] = useState(null);

  const handleSwitch = (id) => {
    const updated = switchActiveProfile(id);
    setActiveId(id);
    if (onProfileChanged) onProfileChanged(updated);
    onClose();
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const created = createNewProfile(newName.trim(), newAvatar);
    setProfiles(getProfilesList());
    setActiveId(created.id);
    setIsCreating(false);
    setNewName('');
    if (onProfileChanged) onProfileChanged(created);
    onClose();
  };

  const handleDelete = (id) => {
    const updated = deleteProfile(id);
    setProfiles(getProfilesList());
    setActiveId(getActiveProfileId());
    setConfirmDeleteId(null);
    if (onProfileChanged) onProfileChanged(updated);
  };

  const handleExport = (profId) => {
    const raw = localStorage.getItem(`english_profile_data_${profId}`);
    if (!raw) return;
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `perfil_ingles_${profId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importProfileBackup(event.target.result);
      if (res.success) {
        setImportStatus('¡Perfil restaurado exitosamente! 🎉');
        setProfiles(getProfilesList());
        setActiveId(res.profile.id);
        if (onProfileChanged) onProfileChanged(res.profile);
      } else {
        setImportStatus(`Error al importar: ${res.error}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="summary-overlay animate-fade-in" role="dialog" aria-modal="true">
      <div className="report-modal-card animate-pop-in" style={{ maxWidth: '540px' }}>
        <div className="report-modal-header">
          <div className="flex items-center gap-2">
            <Users size={22} className="text-indigo-500" />
            <div>
              <h2 className="report-title">Perfiles de Estudiantes</h2>
              <p className="report-subtitle">Gestiona múltiples alumnos en este dispositivo</p>
            </div>
          </div>
          <button type="button" className="icon-btn-close" onClick={onClose} aria-label="Cerrar">
            <X size={22} />
          </button>
        </div>

        {/* Import status alert if any */}
        {importStatus && (
          <div className="hint-box animate-fade-in">
            {importStatus}
          </div>
        )}

        {/* Profiles List */}
        {!isCreating ? (
          <div className="flex flex-col gap-3">
            <div className="profiles-list-scroll">
              {profiles.map(p => {
                const isActive = p.id === activeId;
                return (
                  <div key={p.id} className={`profile-item-row ${isActive ? 'profile-active' : ''}`}>
                    <div className="flex items-center gap-3" onClick={() => !isActive && handleSwitch(p.id)} style={{ cursor: isActive ? 'default' : 'pointer', flex: 1 }}>
                      <span className="profile-avatar-emoji">{p.avatar || '🎓'}</span>
                      <div>
                        <strong className="profile-row-name">{p.name}</strong>
                        {isActive && <span className="profile-active-tag">Activo</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="icon-btn-micro"
                        onClick={() => handleExport(p.id)}
                        title="Exportar copia de seguridad en JSON"
                      >
                        <Download size={16} />
                      </button>

                      {profiles.length > 1 && (
                        confirmDeleteId === p.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="btn-danger-xs"
                              onClick={() => handleDelete(p.id)}
                              title="Confirmar eliminación"
                            >
                              Confirmar
                            </button>
                            <button
                              type="button"
                              className="btn-sm-cancel"
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="icon-btn-micro text-rose-500"
                            onClick={() => setConfirmDeleteId(p.id)}
                            title="Eliminar perfil"
                          >
                            <Trash2 size={16} />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons: Add profile & Import Backup */}
            <div className="profile-modal-actions mt-2">
              <button
                type="button"
                className="btn-primary flex-1"
                onClick={() => setIsCreating(true)}
              >
                <UserPlus size={18} />
                <span>Crear Nuevo Perfil</span>
              </button>

              <label className="btn-outline flex-1 flex-center gap-2" style={{ cursor: 'pointer', margin: 0 }}>
                <Upload size={18} />
                <span>Restaurar JSON</span>
                <input type="file" accept=".json" onChange={handleFileImport} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
        ) : (
          /* Create New Profile Form */
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-bold text-secondary block mb-1">Nombre o Alias del Estudiante:</label>
              <input
                type="text"
                className="form-control"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ej: Lucas, Sofía, Alumno 1..."
                autoFocus
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-secondary block mb-1">Elige un Avatar:</label>
              <div className="avatars-selector-grid">
                {AVATARS.map(av => (
                  <button
                    key={av}
                    type="button"
                    className={`avatar-choice-btn ${newAvatar === av ? 'selected' : ''}`}
                    onClick={() => setNewAvatar(av)}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-2">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setIsCreating(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={!newName.trim()}
              >
                <Check size={18} />
                <span>Crear Perfil</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
