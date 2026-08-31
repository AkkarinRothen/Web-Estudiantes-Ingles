import React, { useState, useRef } from 'react';
import { 
  X, 
  Volume2, 
  Mic, 
  Square, 
  Sparkles, 
  Headphones, 
  CheckCircle2, 
  HelpCircle,
  Play
} from 'lucide-react';
import { VOWEL_SOUNDS, MINIMAL_PAIRS_DRILLS } from '../../data/phoneticsData';
import { speakText, playSuccessSound, playErrorSound } from '../../utils/audio';

export default function PhoneticsLabModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('sounds'); // 'sounds', 'minimal_pairs', 'recorder'
  const [selectedSoundId, setSelectedSoundId] = useState(VOWEL_SOUNDS[0].id);
  const [audioSpeed, setAudioSpeed] = useState(0.9);

  // Minimal Pairs Game State
  const [mpIndex, setMpIndex] = useState(0);
  const [mpSelectedOpt, setMpSelectedOpt] = useState(null);
  const [mpStatus, setMpStatus] = useState(null); // 'correct', 'incorrect'

  // Voice Recorder State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recorderText, setRecorderText] = useState('The cat is on the bed.');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const currentSound = VOWEL_SOUNDS.find(s => s.id === selectedSoundId) || VOWEL_SOUNDS[0];
  const currentMp = MINIMAL_PAIRS_DRILLS[mpIndex] || MINIMAL_PAIRS_DRILLS[0];

  // Voice recording handlers
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert('Para grabar tu pronunciación, permite el acceso al micrófono en tu navegador.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSelectMinimalPair = (opt) => {
    if (mpStatus) return;
    setMpSelectedOpt(opt);
    if (opt === currentMp.correct) {
      playSuccessSound();
      setMpStatus('correct');
    } else {
      playErrorSound();
      setMpStatus('incorrect');
    }
  };

  const handleNextMinimalPair = () => {
    if (mpIndex + 1 < MINIMAL_PAIRS_DRILLS.length) {
      setMpIndex(prev => prev + 1);
      setMpSelectedOpt(null);
      setMpStatus(null);
    } else {
      setMpIndex(0);
      setMpSelectedOpt(null);
      setMpStatus(null);
    }
  };

  return (
    <div className="summary-overlay animate-fade-in" role="dialog" aria-modal="true">
      <div className="report-modal-card animate-pop-in" style={{ maxWidth: '760px', height: '88vh' }}>
        {/* Header */}
        <div className="report-modal-header">
          <div className="flex items-center gap-2">
            <Headphones size={24} className="text-cyan-500" />
            <div>
              <h2 className="report-title">Laboratorio de Fonética & Ortografía</h2>
              <p className="report-subtitle">Entrena los 14 sonidos vocálicos del inglés y perfecciona tu pronunciación</p>
            </div>
          </div>
          <button type="button" className="icon-btn-close" onClick={onClose} aria-label="Cerrar">
            <X size={22} />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="phonetics-subtabs">
          <button
            type="button"
            className={`phonetics-tab-btn ${activeTab === 'sounds' ? 'active' : ''}`}
            onClick={() => setActiveTab('sounds')}
          >
            <Sparkles size={16} />
            <span>14 Sonidos Vocálicos</span>
          </button>

          <button
            type="button"
            className={`phonetics-tab-btn ${activeTab === 'minimal_pairs' ? 'active' : ''}`}
            onClick={() => setActiveTab('minimal_pairs')}
          >
            <Volume2 size={16} />
            <span>Pares Mínimos (Juego)</span>
          </button>

          <button
            type="button"
            className={`phonetics-tab-btn ${activeTab === 'recorder' ? 'active' : ''}`}
            onClick={() => setActiveTab('recorder')}
          >
            <Mic size={16} />
            <span>Grabador Comparativo</span>
          </button>
        </div>

        {/* TAB 1: 14 VOWEL SOUNDS EXPLORER */}
        {activeTab === 'sounds' && (
          <div className="phonetics-sounds-layout">
            {/* Left selector of 14 sounds */}
            <div className="sounds-sidebar-chips">
              {VOWEL_SOUNDS.map(sound => (
                <button
                  key={sound.id}
                  type="button"
                  className={`sound-chip-btn ${selectedSoundId === sound.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSoundId(sound.id);
                    speakText(sound.sampleWord, audioSpeed);
                  }}
                >
                  <strong className="sound-chip-symbol">{sound.symbol}</strong>
                  <span className="sound-chip-word">{sound.sampleWord}</span>
                </button>
              ))}
            </div>

            {/* Right details card */}
            <div className="sound-details-panel glass-card">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="sound-huge-symbol">{currentSound.symbol}</span>
                    <div>
                      <h3 className="text-xl font-bold">{currentSound.sampleWord}</h3>
                      <span className="diff-tag diff-básico">{currentSound.name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Velocidad:</span>
                  <button
                    type="button"
                    className={`btn-speed-toggle ${audioSpeed === 0.8 ? 'active' : ''}`}
                    onClick={() => setAudioSpeed(0.8)}
                  >
                    0.8x
                  </button>
                  <button
                    type="button"
                    className={`btn-speed-toggle ${audioSpeed === 1.0 ? 'active' : ''}`}
                    onClick={() => setAudioSpeed(1.0)}
                  >
                    1.0x
                  </button>
                  <button
                    type="button"
                    className="icon-btn-secondary"
                    onClick={() => speakText(currentSound.sampleWord, audioSpeed)}
                    title="Escuchar palabra modelo"
                  >
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>

              {/* Articulation guidance in Spanish */}
              <div className="phonetics-tip-box mt-3">
                <div className="flex items-center gap-1 text-cyan-600 font-bold text-sm mb-1">
                  <HelpCircle size={16} /> ¿Cómo se pronuncia este sonido?
                </div>
                <p className="text-xs text-secondary leading-relaxed">{currentSound.articulation}</p>
              </div>

              {/* Spelling patterns */}
              <div className="mt-3">
                <strong className="text-xs font-bold text-muted block mb-1">Patrones Ortográficos Comunes:</strong>
                <div className="flex gap-2 flex-wrap">
                  {currentSound.spellingPatterns.map((pat, idx) => (
                    <span key={idx} className="spelling-pattern-chip">
                      {pat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Example words list */}
              <div className="mt-4">
                <strong className="text-xs font-bold text-muted block mb-2">Palabras de Ejemplo (Toca para escuchar):</strong>
                <div className="sound-examples-grid">
                  {currentSound.examples.map((ex, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="sound-example-card"
                      onClick={() => speakText(ex.word, audioSpeed)}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-base text-primary">{ex.word}</strong>
                        <Volume2 size={16} className="text-cyan-500" />
                      </div>
                      <span className="text-xs text-muted block">{ex.translation}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MINIMAL PAIRS GAME */}
        {activeTab === 'minimal_pairs' && (
          <div className="minimal-pairs-container animate-fade-in">
            <div className="text-center mb-4">
              <span className="diff-tag diff-intermedio">Discriminación Auditiva • Par {mpIndex + 1} de {MINIMAL_PAIRS_DRILLS.length}</span>
              <h3 className="text-lg font-bold mt-1">¿Qué palabra escuchas en el audio?</h3>
              <p className="text-xs text-muted">Contrasta los sonidos {currentMp.soundA} y {currentMp.soundB}.</p>
            </div>

            <div className="listening-spotlight-box">
              <button
                type="button"
                className="btn-play-audio-huge"
                onClick={() => speakText(currentMp.audioWord, 0.85)}
              >
                <Volume2 size={36} />
                <span>Toca para escuchar la palabra</span>
              </button>
            </div>

            <div className="tactile-options-grid-2x2 mt-4">
              {currentMp.options.map((opt, idx) => {
                let stateClass = '';
                if (mpStatus) {
                  if (opt === currentMp.correct) stateClass = 'opt-correct';
                  else if (mpSelectedOpt === opt) stateClass = 'opt-incorrect';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`btn-tactile-choice ${stateClass}`}
                    onClick={() => handleSelectMinimalPair(opt)}
                    disabled={mpStatus !== null}
                  >
                    <span className="key-shortcut-tag">{idx + 1}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {mpStatus && (
              <div className="mt-4 animate-fade-in">
                <div className={`feedback-banner ${mpStatus === 'correct' ? 'feedback-success' : 'feedback-error'}`}>
                  <strong>{mpStatus === 'correct' ? '¡Excelente oído fonético! 🎯' : '¡Casi! Escuchemos la diferencia:'}</strong>
                  <p className="text-xs mt-1">{currentMp.explanation}</p>
                </div>
                <div className="flex justify-end mt-3">
                  <button type="button" className="btn-primary" onClick={handleNextMinimalPair}>
                    Siguiente Par Mínimo →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VOICE RECORDER COMPARATOR */}
        {activeTab === 'recorder' && (
          <div className="voice-recorder-container animate-fade-in">
            <div className="text-center mb-4">
              <span className="diff-tag diff-avanzado">Práctica Oral Comparativa</span>
              <h3 className="text-lg font-bold mt-1">Graba tu voz y compárala con el modelo nativo</h3>
              <p className="text-xs text-muted">Escucha tu propia pronunciación sin puntuaciones forzadas para ganar confianza.</p>
            </div>

            <div className="glass-card mb-4">
              <label className="text-xs font-bold text-muted block mb-1">Frase para Practicar (puedes editarla):</label>
              <input
                type="text"
                className="form-control text-lg font-bold text-center"
                value={recorderText}
                onChange={(e) => setRecorderText(e.target.value)}
              />
            </div>

            {/* Side-by-side audio controls */}
            <div className="recorder-duo-grid">
              {/* Left: Native Model */}
              <div className="recorder-box glass-card text-center">
                <span className="text-xs font-bold text-cyan-600 uppercase block mb-2">1. Modelo Nativo (Voz en Inglés)</span>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => speakText(recorderText, 0.85)}
                >
                  <Volume2 size={20} />
                  <span>Escuchar Modelo</span>
                </button>
              </div>

              {/* Right: Student Recording */}
              <div className="recorder-box glass-card text-center">
                <span className="text-xs font-bold text-purple-600 uppercase block mb-2">2. Tu Grabación</span>
                <div className="flex flex-col items-center gap-2">
                  {!isRecording ? (
                    <button
                      type="button"
                      className="btn-start-mission"
                      style={{ background: '#ef4444' }}
                      onClick={handleStartRecording}
                    >
                      <Mic size={20} />
                      <span>Grabar mi Voz</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-start-mission animate-pulse"
                      style={{ background: '#dc2626' }}
                      onClick={handleStopRecording}
                    >
                      <Square size={20} />
                      <span>Detener Grabación</span>
                    </button>
                  )}

                  {recordedAudioUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <audio src={recordedAudioUrl} controls className="h-8" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="hint-box mt-4 text-center">
              💡 <strong>Consejo del Docente:</strong> Concéntrate en la melodía y en alargar los sonidos vocálicos largos (/i/ en "bed", /æ/ en "cat"). ¡La práctica continua genera fluidez!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
