import React, { useState } from 'react';
import CanCantActivity from './activities/CanCantActivity';
import StructureActivity from './activities/StructureActivity';
import SentenceElementsActivity from './activities/SentenceElementsActivity';
import SubjectVerbClassifierActivity from './activities/SubjectVerbClassifierActivity';
import IntruderActivity from './activities/IntruderActivity';
import WhoWhatActionActivity from './activities/WhoWhatActionActivity';
import { Gamepad2, CheckSquare, Layers, Search, HelpCircle, Sparkles, ArrowLeft } from 'lucide-react';

export default function ActivitiesModule({
  addStars,
  onActivityComplete,
  defaultActivity = 'can-cant',
  filterType,
  onBackToPath
}) {
  const [activeActivity, setActiveActivity] = useState(defaultActivity);

  const activities = [
    { id: 'can-cant', title: '1. Can / Can\'t', icon: CheckSquare, desc: 'Habilidades y modales' },
    { id: 'structure', title: '2. Estructuras (+ − ?)', icon: Layers, desc: 'Constructor de oraciones' },
    { id: 'elements', title: '3. Partes de la Oración', icon: HelpCircle, desc: 'Separar Sujeto y Verbo' },
    { id: 'classifier', title: '4. Sujeto vs. Verbo', icon: Sparkles, desc: 'Clasificador y taller' },
    { id: 'intruder', title: '5. El Intruso', icon: Search, desc: 'Detección de patrones' },
    { id: 'whowhat', title: '6. ¿Quién y Qué Acción?', icon: Gamepad2, desc: 'Análisis gramatical' }
  ];

  const handleComplete = (result) => {
    if (result?.close && onBackToPath) {
      onBackToPath();
      return;
    }
    if (onActivityComplete) {
      onActivityComplete(result);
    }
  };

  return (
    <div className="activities-module-wrap">
      {/* Activity Header and Back to Path Button */}
      <div className="activities-top-bar">
        {onBackToPath && (
          <button
            type="button"
            className="btn-back-path"
            onClick={onBackToPath}
          >
            <ArrowLeft size={18} />
            <span>Volver a Mi Ruta</span>
          </button>
        )}

        <div className="activities-selector-pills">
          {activities.map(act => {
            const Icon = act.icon;
            const isActive = activeActivity === act.id;

            return (
              <button
                key={act.id}
                type="button"
                onClick={() => setActiveActivity(act.id)}
                className={`act-pill-btn ${isActive ? 'active' : ''}`}
                title={act.desc}
              >
                <Icon size={16} />
                <span>{act.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Activity Component */}
      <div className="activity-active-frame">
        {activeActivity === 'can-cant' && (
          <CanCantActivity addStars={addStars} onComplete={handleComplete} />
        )}
        {activeActivity === 'structure' && (
          <StructureActivity addStars={addStars} onComplete={handleComplete} />
        )}
        {activeActivity === 'elements' && (
          <SentenceElementsActivity addStars={addStars} onComplete={handleComplete} />
        )}
        {activeActivity === 'classifier' && (
          <SubjectVerbClassifierActivity addStars={addStars} onComplete={handleComplete} />
        )}
        {activeActivity === 'intruder' && (
          <IntruderActivity addStars={addStars} onComplete={handleComplete} filterType={filterType} />
        )}
        {activeActivity === 'whowhat' && (
          <WhoWhatActionActivity addStars={addStars} onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
}
