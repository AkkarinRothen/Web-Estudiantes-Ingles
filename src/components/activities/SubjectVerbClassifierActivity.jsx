import React, { useState } from 'react';
import { SUBJECT_OR_VERB_ITEMS } from '../../data/activitiesData';
import { playSuccessSound, playErrorSound, speakText } from '../../utils/audio';
import FeedbackCard from '../common/FeedbackCard';
import ActivitySummaryModal from '../common/ActivitySummaryModal';
import { Volume2, Sparkles, User, Zap, Plus } from 'lucide-react';

export default function SubjectVerbClassifierActivity({ onComplete, addStars }) {
  const [activeTab, setActiveTab] = useState('classify'); // 'classify' | 'builder'
  
  // Classification state
  const [items, setItems] = useState(SUBJECT_OR_VERB_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState(null); // 'S' | 'V'
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Builder state
  const subjects = ['she', 'the dog', 'my sister', 'they', 'he', 'we', 'the students'];
  const verbs = ['run', 'cook', 'dance', 'study', 'swim', 'read', 'sing'];
  const [selectedSubj, setSelectedSubj] = useState('');
  const [selectedVerb, setSelectedVerb] = useState('');
  const [builtSentences, setBuiltSentences] = useState([]);

  const currentItem = items[currentIndex];

  const handleClassifyChoice = (typeVal) => {
    if (status) return;
    setSelectedType(typeVal);

    const isCorrect = typeVal === currentItem.type;
    if (isCorrect) {
      playSuccessSound();
      setStatus('correct');
      if (addStars) addStars(1);
    } else {
      playErrorSound();
      setStatus('incorrect');
      const mistakeObj = {
        id: `subjverb_${currentIndex}_${currentItem.word}`,
        question: `Clasificar: "${currentItem.word}"`,
        userAns: typeVal === 'S' ? 'Sujeto' : 'Verbo',
        correctAns: currentItem.type === 'S' ? 'Sujeto' : 'Verbo',
        hint: currentItem.type === 'S' 
          ? 'Pregúntate: ¿Quién o qué es? (Persona, animal o cosa)' 
          : 'Pregúntate: ¿Qué acción se realiza? (Correr, bailar, cocinar...)',
        explanation: currentItem.type === 'S'
          ? `"${currentItem.word}" es un Sujeto (Subject) porque nombra a quien realiza la acción.`
          : `"${currentItem.word}" es un Verbo (Verb) porque expresa una acción física o mental.`,
        category: 'Sujeto vs. Verbo'
      };
      setMistakes(prev => [...prev.filter(m => m.id !== mistakeObj.id), mistakeObj]);
    }

    setResults(prev => [...prev, { item: currentItem, choice: typeVal, isCorrect }]);
  };

  const handleRetryWithHint = () => {
    setStatus(null);
    setSelectedType(null);
  };

  const handleNext = () => {
    if (currentIndex + 1 < items.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedType(null);
      setStatus(null);
    } else {
      const correctCount = results.filter(r => r.isCorrect).length + (status === 'correct' ? 1 : 0);
      const totalCount = items.length;
      const starsEarned = Math.max(1, Math.round((correctCount / totalCount) * 4));
      const xpEarned = correctCount * 12;

      setIsFinished(true);
      if (onComplete) {
        onComplete({
          activityId: 'subject-verb',
          correctCount,
          totalCount,
          starsEarned,
          xpEarned,
          mistakes
        });
      }
    }
  };

  const handleReviewMistakesOnly = () => {
    if (mistakes.length === 0) return;
    const reviewItems = SUBJECT_OR_VERB_ITEMS.filter(item => 
      mistakes.some(m => m.question.includes(item.word))
    );
    setItems(reviewItems);
    setCurrentIndex(0);
    setSelectedType(null);
    setStatus(null);
    setResults([]);
    setIsFinished(false);
    setIsReviewMode(true);
  };

  const handleRestart = () => {
    setItems(SUBJECT_OR_VERB_ITEMS);
    setCurrentIndex(0);
    setSelectedType(null);
    setStatus(null);
    setResults([]);
    setMistakes([]);
    setIsFinished(false);
    setIsReviewMode(false);
  };

  // Sentence Builder combination
  const handleCombineSentence = () => {
    if (!selectedSubj || !selectedVerb) return;

    let verbForm = selectedVerb;
    const cleanSubj = selectedSubj.toLowerCase();
    const isThirdPerson = cleanSubj.includes('sister') || cleanSubj === 'she' || cleanSubj.includes('dog') || cleanSubj === 'he';

    if (isThirdPerson) {
      if (selectedVerb === 'dance') verbForm = 'dances';
      else if (selectedVerb === 'run') verbForm = 'runs';
      else if (selectedVerb === 'cook') verbForm = 'cooks';
      else if (selectedVerb === 'study') verbForm = 'studies';
      else if (selectedVerb === 'read') verbForm = 'reads';
      else if (selectedVerb === 'sing') verbForm = 'sings';
      else if (selectedVerb === 'swim') verbForm = 'swims';
      else verbForm = selectedVerb + 's';
    }

    const formattedSubj = selectedSubj.charAt(0).toUpperCase() + selectedSubj.slice(1);
    const finalSentence = `${formattedSubj} ${verbForm}.`;
    const explanation = isThirdPerson 
      ? `Agregamos "-s/-es" al verbo (${verbForm}) porque el sujeto es 3ra persona singular (${formattedSubj}).`
      : `El verbo queda en su forma base (${verbForm}) porque el sujeto es plural o "I/We/They".`;

    if (!builtSentences.some(s => s.text === finalSentence)) {
      setBuiltSentences(prev => [{ text: finalSentence, rule: explanation }, ...prev]);
      playSuccessSound();
      if (addStars) addStars(1);
      speakText(finalSentence);
    }
    setSelectedSubj('');
    setSelectedVerb('');
  };

  return (
    <div className="activity-wizard-container">
      {/* Mode Subtabs */}
      <div className="activity-subnav">
        <button
          type="button"
          className={`subnav-btn ${activeTab === 'classify' ? 'active' : ''}`}
          onClick={() => setActiveTab('classify')}
        >
          <Sparkles size={16} />
          <span>Paso 1: Clasificar (S o V)</span>
        </button>
        <button
          type="button"
          className={`subnav-btn ${activeTab === 'builder' ? 'active' : ''}`}
          onClick={() => setActiveTab('builder')}
        >
          <Plus size={16} />
          <span>Paso 2: Taller de Oraciones</span>
        </button>
      </div>

      {activeTab === 'classify' && (
        <>
          {/* Header */}
          <div className="activity-wizard-header">
            <div className="activity-meta">
              <span className="activity-badge-pill">
                <Sparkles size={14} /> Sujeto vs. Verbo
              </span>
              <span className="step-counter">
                Palabra {currentIndex + 1} de {items.length}
              </span>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Card */}
          <div className="wizard-card animate-fade-in">
            <div className="wizard-instruction-row">
              <p className="wizard-instruction">
                ¿La palabra destacada es un <strong>Sujeto (Subject)</strong> o un <strong>Verbo (Verb)</strong>?
              </p>
              <button
                type="button"
                className="icon-btn-secondary"
                onClick={() => speakText(currentItem.word)}
                title="Escuchar palabra"
                aria-label={`Escuchar ${currentItem.word}`}
              >
                <Volume2 size={20} />
              </button>
            </div>

            {/* Word Spotlight Box */}
            <div className="word-spotlight-box">
              <span className="spotlight-word">{currentItem.word}</span>
            </div>

            {/* 2 Big Choice Buttons */}
            <div className="tactile-options-grid">
              <button
                type="button"
                className={`btn-tactile-option ${selectedType === 'S' ? (status === 'correct' ? 'opt-correct' : 'opt-incorrect') : ''}`}
                onClick={() => handleClassifyChoice('S')}
                disabled={status !== null}
              >
                <div className="opt-icon-circle bg-indigo-100 text-indigo-600">
                  <User size={24} />
                </div>
                <div className="opt-title">SUJETO (Subject)</div>
                <div className="opt-sub">¿Quién o qué hace la acción?</div>
              </button>

              <button
                type="button"
                className={`btn-tactile-option ${selectedType === 'V' ? (status === 'correct' ? 'opt-correct' : 'opt-incorrect') : ''}`}
                onClick={() => handleClassifyChoice('V')}
                disabled={status !== null}
              >
                <div className="opt-icon-circle bg-purple-100 text-purple-600">
                  <Zap size={24} />
                </div>
                <div className="opt-title">VERBO (Verb)</div>
                <div className="opt-sub">¿Qué acción se realiza?</div>
              </button>
            </div>

            {/* Feedback */}
            <FeedbackCard
              status={status}
              hint={currentItem.type === 'S' ? '¿Es una persona, animal o pronombre?' : '¿Es una acción como correr, bailar o estudiar?'}
              explanation={
                status === 'correct'
                  ? `¡Correcto! "${currentItem.word}" es ${currentItem.type === 'S' ? 'un Sujeto' : 'un Verbo'}.`
                  : `"${currentItem.word}" es ${currentItem.type === 'S' ? 'un Sujeto (persona/cosa)' : 'un Verbo (acción)'}.`
              }
              speakContent={currentItem.word}
              onNext={handleNext}
              onRetry={handleRetryWithHint}
              allowRetry={true}
              nextLabel={currentIndex + 1 === items.length ? 'Ver Resultados 🎉' : 'Siguiente Palabra'}
            />
          </div>

          {/* Summary Modal */}
          {isFinished && (
            <ActivitySummaryModal
              title={isReviewMode ? 'Repaso: Sujeto vs. Verbo' : 'Actividad: Sujeto vs. Verbo'}
              correctCount={results.filter(r => r.isCorrect).length}
              totalCount={items.length}
              starsEarned={Math.max(1, Math.round((results.filter(r => r.isCorrect).length / items.length) * 4))}
              xpEarned={results.filter(r => r.isCorrect).length * 12}
              mistakes={mistakes}
              onRetryAll={handleRestart}
              onReviewMistakes={mistakes.length > 0 ? handleReviewMistakesOnly : null}
              onFinish={() => {
                if (onComplete) onComplete({ close: true });
              }}
              finishLabel="Volver a la Ruta"
            />
          )}
        </>
      )}

      {/* Mode 2: Interactive Sentence Builder */}
      {activeTab === 'builder' && (
        <div className="wizard-card animate-fade-in">
          <div className="wizard-instruction-row">
            <div>
              <h3 className="wizard-question-title">Taller: Sujeto + Verbo = Oración</h3>
              <p className="wizard-instruction">
                Selecciona 1 Sujeto y 1 Verbo para descubrir cómo cambia el verbo con la 3ra persona singular (-s).
              </p>
            </div>
          </div>

          {/* Selector Columns */}
          <div className="builder-selection-grid">
            <div className="builder-column">
              <label className="builder-col-label">1. Elige un Sujeto:</label>
              <div className="builder-chips-wrap">
                {subjects.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`builder-chip ${selectedSubj === s ? 'selected-subject' : ''}`}
                    onClick={() => setSelectedSubj(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="builder-column">
              <label className="builder-col-label">2. Elige un Verbo:</label>
              <div className="builder-chips-wrap">
                {verbs.map(v => (
                  <button
                    key={v}
                    type="button"
                    className={`builder-chip ${selectedVerb === v ? 'selected-verb' : ''}`}
                    onClick={() => setSelectedVerb(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Combine Button */}
          <div className="builder-action-box">
            <button
              type="button"
              className="btn-primary btn-combine-action"
              disabled={!selectedSubj || !selectedVerb}
              onClick={handleCombineSentence}
            >
              <Plus size={20} />
              <span>Armar Oración ({selectedSubj || '...'} + {selectedVerb || '...'})</span>
            </button>
          </div>

          {/* Built Sentences List */}
          {builtSentences.length > 0 && (
            <div className="built-sentences-section animate-fade-in">
              <h4 className="built-heading">Tus Oraciones Creadas (+1 estrella por cada nueva):</h4>
              <div className="built-list">
                {builtSentences.map((s, idx) => (
                  <div key={idx} className="built-sentence-card">
                    <div className="built-card-main">
                      <span className="built-text">{s.text}</span>
                      <button
                        type="button"
                        className="icon-btn-secondary"
                        onClick={() => speakText(s.text)}
                        title="Escuchar"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                    <p className="built-rule-note">💡 {s.rule}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
