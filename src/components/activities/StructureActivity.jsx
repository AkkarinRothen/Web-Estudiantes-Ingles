import { playSuccessSound, playErrorSound, speakText } from '../../utils/audio';
import FeedbackCard from '../common/FeedbackCard';
import ActivitySummaryModal from '../common/ActivitySummaryModal';
import { Volume2, Sparkles } from 'lucide-react';

export default function StructureActivity({ onComplete, addStars }) {
  // Generate wizard tasks: convert sentences between positive, negative, and questions
  const tasks = [
    {
      id: 'st_1',
      base: "She can dance.",
      targetType: 'Negativa (−)',
      question: "Transforma a Negativa (−): 'She can dance.'",
      correct: "She can't dance.",
      hint: "Cambia 'can' por 'can't'.",
      explanation: "En la forma negativa agregamos not o usamos la contracción: can + not = can't.",
      words: ["She", "can't", "dance.", "can", "sing.", "They"]
    },
    {
      id: 'st_2',
      base: "She can dance.",
      targetType: 'Pregunta (?)',
      question: "Transforma a Pregunta (?): 'She can dance.'",
      correct: "Can she dance?",
      hint: "En las preguntas colocamos 'Can' al inicio de la oración.",
      explanation: "Para preguntar con modales, invertimos el orden: Can + Sujeto + Verbo? (Can she dance?).",
      words: ["Can", "she", "dance?", "He", "can't", "swim?"]
    },
    {
      id: 'st_3',
      base: "He can't cook.",
      targetType: 'Positiva (+)',
      question: "Transforma a Positiva (+): 'He can't cook.'",
      correct: "He can cook.",
      hint: "Elimina la negación y usa 'can'.",
      explanation: "Para la forma afirmativa o positiva usamos: Sujeto + can + verbo (He can cook).",
      words: ["He", "can", "cook.", "can't", "cooks.", "She"]
    },
    {
      id: 'st_4',
      base: "Can they sing?",
      targetType: 'Positiva (+)',
      question: "Responde de forma Positiva (+): 'Can they sing?'",
      correct: "They can sing.",
      hint: "El sujeto 'They' va primero, luego 'can' y después 'sing'.",
      explanation: "Estructura positiva: Sujeto (They) + can + verbo base (sing).",
      words: ["They", "can", "sing.", "singing.", "can't", "We"]
    },
    {
      id: 'st_5',
      base: "We can read.",
      targetType: 'Negativa (−)',
      question: "Transforma a Negativa (−): 'We can read.'",
      correct: "We can't read.",
      hint: "Usa 'can't' después del sujeto 'We'.",
      explanation: "Estructura negativa: Sujeto (We) + can't + verbo base (read).",
      words: ["We", "can't", "read.", "can", "reads.", "They"]
    }
  ];

  const [items, setItems] = useState(tasks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [assembledWords, setAssembledWords] = useState([]);
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const currentItem = items[currentIndex];

  const handleAddWord = (word) => {
    if (status) return;
    setAssembledWords(prev => [...prev, word]);
  };

  const handleRemoveWord = (indexToRemove) => {
    if (status) return;
    setAssembledWords(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const clean = str => str.toLowerCase().replace(/[.?!]/g, '').trim();

  const handleVerify = () => {
    if (status) return;
    const userSentence = assembledWords.join(' ');
    const isCorrect = clean(userSentence) === clean(currentItem.correct);

    if (isCorrect) {
      playSuccessSound();
      setStatus('correct');
      if (addStars) addStars(1);
    } else {
      playErrorSound();
      setStatus('incorrect');
      const mistakeObj = {
        id: `structure_${currentIndex}_${currentItem.id}`,
        question: currentItem.question,
        userAns: userSentence || '(Vacío)',
        correctAns: currentItem.correct,
        hint: currentItem.hint,
        explanation: currentItem.explanation,
        category: 'Constructor de Estructuras'
      };
      setMistakes(prev => [...prev.filter(m => m.id !== mistakeObj.id), mistakeObj]);
    }

    setResults(prev => [...prev, { item: currentItem, isCorrect }]);
  };

  const handleRetryWithHint = () => {
    setStatus(null);
    setAssembledWords([]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < items.length) {
      setCurrentIndex(prev => prev + 1);
      setAssembledWords([]);
      setStatus(null);
    } else {
      const correctCount = results.filter(r => r.isCorrect).length + (status === 'correct' ? 1 : 0);
      const totalCount = items.length;
      const starsEarned = Math.max(1, Math.round((correctCount / totalCount) * 5));
      const xpEarned = correctCount * 15;

      setIsFinished(true);
      if (onComplete) {
        onComplete({
          activityId: 'structure-builder',
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
    const reviewItems = tasks.filter(item => 
      mistakes.some(m => m.question === item.question)
    );
    setItems(reviewItems);
    setCurrentIndex(0);
    setAssembledWords([]);
    setStatus(null);
    setResults([]);
    setIsFinished(false);
    setIsReviewMode(true);
  };

  const handleRestart = () => {
    setItems(tasks);
    setCurrentIndex(0);
    setAssembledWords([]);
    setStatus(null);
    setResults([]);
    setMistakes([]);
    setIsFinished(false);
    setIsReviewMode(false);
  };

  return (
    <div className="activity-wizard-container">
      {/* Header */}
      <div className="activity-wizard-header">
        <div className="activity-meta">
          <span className="activity-badge-pill">
            <Sparkles size={14} /> Constructor de Oraciones
          </span>
          <span className="step-counter">
            Desafío {currentIndex + 1} de {items.length}
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
          <div className="target-type-badge">
            Objetivo: <strong>{currentItem.targetType}</strong>
          </div>
          <button
            type="button"
            className="icon-btn-secondary"
            onClick={() => speakText(currentItem.correct)}
            title="Escuchar pronunciación correcta"
            aria-label="Escuchar pronunciación"
          >
            <Volume2 size={20} />
          </button>
        </div>

        {/* Big Spotlight Question */}
        <div className="sentence-spotlight-box">
          <span className="spotlight-sub-label">Oración Base:</span>
          <h3 className="spotlight-sentence-text">"{currentItem.base}"</h3>
          <p className="spotlight-sub-inst">{currentItem.question}</p>
        </div>

        {/* Assembly Dropzone */}
        <div className="assembly-dropzone">
          <div className="dropzone-label">Tu Oración Construida (Toca las palabras para quitar):</div>
          <div className="dropzone-words-row">
            {assembledWords.length === 0 ? (
              <span className="dropzone-placeholder">Toca los bloques de abajo para formar la frase...</span>
            ) : (
              assembledWords.map((word, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="assembled-word-chip animate-pop-in"
                  onClick={() => handleRemoveWord(idx)}
                  disabled={status !== null}
                  title="Toca para remover"
                >
                  <span>{word}</span>
                  <span className="chip-remove-icon">×</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Words Blocks */}
        <div className="available-words-section">
          <span className="available-label">Bloques de palabras disponibles:</span>
          <div className="available-chips-row">
            {currentItem.words.map((w, idx) => (
              <button
                key={idx}
                type="button"
                className="available-word-btn"
                onClick={() => handleAddWord(w)}
                disabled={status !== null}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button when no feedback */}
        {!status && (
          <div className="mt-4 flex justify-end gap-2">
            {assembledWords.length > 0 && (
              <button
                type="button"
                className="btn-outline"
                onClick={() => setAssembledWords([])}
              >
                Limpiar
              </button>
            )}
            <button
              type="button"
              className="btn-primary btn-submit-analysis"
              onClick={handleVerify}
              disabled={assembledWords.length === 0}
            >
              <span>Verificar Oración</span>
            </button>
          </div>
        )}

        {/* Feedback Card */}
        <FeedbackCard
          status={status}
          hint={currentItem.hint}
          explanation={
            status === 'correct'
              ? `¡Excelente! "${currentItem.correct}" — ${currentItem.explanation}`
              : `La estructura correcta es "${currentItem.correct}". ${currentItem.explanation}`
          }
          speakContent={currentItem.correct}
          onNext={handleNext}
          onRetry={handleRetryWithHint}
          allowRetry={true}
          nextLabel={currentIndex + 1 === items.length ? 'Ver Resultados 🎉' : 'Siguiente Desafío'}
        />
      </div>

      {/* Summary Modal */}
      {isFinished && (
        <ActivitySummaryModal
          title={isReviewMode ? 'Repaso: Constructor de Oraciones' : 'Actividad: Constructor de Oraciones'}
          correctCount={results.filter(r => r.isCorrect).length}
          totalCount={items.length}
          starsEarned={Math.max(1, Math.round((results.filter(r => r.isCorrect).length / items.length) * 5))}
          xpEarned={results.filter(r => r.isCorrect).length * 15}
          mistakes={mistakes}
          onRetryAll={handleRestart}
          onReviewMistakes={mistakes.length > 0 ? handleReviewMistakesOnly : null}
          onFinish={() => {
            if (onComplete) onComplete({ close: true });
          }}
          finishLabel="Volver a la Ruta"
        />
      )}
    </div>
  );
}
