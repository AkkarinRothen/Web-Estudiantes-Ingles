import React, { useState, useEffect } from 'react';
import { VOCABULARY_DATA, getAllWords } from '../data/vocabulary';
import { speakText, playSuccessSound, playErrorSound, triggerConfetti } from '../utils/audio';
import { Volume2, RefreshCw, CheckCircle, XCircle, Shuffle, Type, List, Award, ArrowRight, ArrowLeft } from 'lucide-react';

export default function VocabModule({ addStars, initialCategory, onBackToPath }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'ALL');
  const [direction, setDirection] = useState('es-to-en'); // 'es-to-en', 'en-to-es', 'random'
  const [quizMode, setQuizMode] = useState('choice'); // 'choice' or 'write'
  
  const [currentWord, setCurrentWord] = useState(null);
  const [choices, setChoices] = useState([]);
  const [userTyped, setUserTyped] = useState('');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  const [currentDir, setCurrentDir] = useState('es-to-en');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const getFilteredWords = () => {
    if (selectedCategory === 'ALL') {
      return getAllWords();
    }
    const cat = VOCABULARY_DATA.find(c => c.category === selectedCategory);
    return cat ? cat.words.map(w => ({ ...w, category: cat.category })) : getAllWords();
  };

  const pickNewWord = () => {
    const words = getFilteredWords();
    if (words.length === 0) return;

    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setUserTyped('');
    setSelectedChoice(null);
    setFeedback(null);

    let activeDir = direction;
    if (direction === 'random') {
      activeDir = Math.random() > 0.5 ? 'es-to-en' : 'en-to-es';
    }
    setCurrentDir(activeDir);

    const isEsToEn = activeDir === 'es-to-en';
    const correctAnswerText = isEsToEn ? randomWord.en : randomWord.es;
    
    const otherWords = words.filter(w => (isEsToEn ? w.en : w.es) !== correctAnswerText);
    const shuffledOthers = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [randomWord, ...shuffledOthers].sort(() => 0.5 - Math.random());
    
    setChoices(options);
  };

  useEffect(() => {
    pickNewWord();
  }, [selectedCategory, direction, quizMode]);

  if (!currentWord) return null;

  const isEsToEn = currentDir === 'es-to-en';
  const promptText = isEsToEn ? currentWord.es : currentWord.en;
  const targetAnswer = isEsToEn ? currentWord.en : currentWord.es;

  const checkAnswer = (givenAnswer) => {
    if (feedback) return;

    let isCorrect = false;
    const cleanGiven = givenAnswer.toLowerCase().trim();
    const cleanTarget = targetAnswer.toLowerCase().trim();

    if (isEsToEn) {
      const validAnswers = [cleanTarget, ...(currentWord.altEn || []).map(a => a.toLowerCase().trim())];
      isCorrect = validAnswers.some(ans => ans === cleanGiven || cleanGiven.includes(ans) || ans.includes(cleanGiven));
    } else {
      isCorrect = cleanGiven === cleanTarget || cleanTarget.includes(cleanGiven);
    }

    if (isCorrect) {
      playSuccessSound();
      setFeedback({ isCorrect: true, message: `¡Excelente! Respuesta correcta: ${targetAnswer}` });
      if (addStars) addStars(1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 5 === 0) {
        triggerConfetti();
      }
      speakText(currentWord.en);
    } else {
      playErrorSound();
      setFeedback({ isCorrect: false, message: `Respuesta incorrecta. La respuesta correcta era: "${targetAnswer}"` });
      setStreak(0);
    }
  };

  const handleChoiceClick = (choiceObj) => {
    const chosenText = isEsToEn ? choiceObj.en : choiceObj.es;
    setSelectedChoice(chosenText);
    checkAnswer(chosenText);
  };

  const handleWriteSubmit = (e) => {
    e.preventDefault();
    if (!userTyped.trim()) return;
    checkAnswer(userTyped);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {onBackToPath && (
        <div style={{ marginBottom: '-0.5rem' }}>
          <button
            type="button"
            className="btn-back-path"
            onClick={onBackToPath}
          >
            <ArrowLeft size={18} />
            <span>Volver a Mi Ruta</span>
          </button>
        </div>
      )}

      {/* Controls & Category Filter */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Categoría de Vocabulario
            </label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-control"
              style={{ minWidth: '220px', fontWeight: '600', cursor: 'pointer' }}
            >
              <option value="ALL">🌟 Todas las Categorías</option>
              {VOCABULARY_DATA.map((c, idx) => (
                <option key={idx} value={c.category}>{c.category} ({c.words.length})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', borderRadius: 'var(--radius-pill)', padding: '3px' }}>
              <button 
                onClick={() => setDirection('es-to-en')}
                className={`btn btn-sm ${direction === 'es-to-en' ? 'btn-primary' : ''}`}
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                Esp → Ing
              </button>
              <button 
                onClick={() => setDirection('en-to-es')}
                className={`btn btn-sm ${direction === 'en-to-es' ? 'btn-primary' : ''}`}
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                Ing → Esp
              </button>
              <button 
                onClick={() => setDirection('random')}
                className={`btn btn-sm ${direction === 'random' ? 'btn-primary' : ''}`}
                style={{ borderRadius: 'var(--radius-pill)' }}
                title="Modo aleatorio de dirección"
              >
                <Shuffle size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', borderRadius: 'var(--radius-pill)', padding: '3px' }}>
              <button 
                onClick={() => setQuizMode('choice')}
                className={`btn btn-sm ${quizMode === 'choice' ? 'btn-primary' : ''}`}
                style={{ borderRadius: 'var(--radius-pill)' }}
                title="Modo Selección Múltiple"
              >
                <List size={14} /> Opciones
              </button>
              <button 
                onClick={() => setQuizMode('write')}
                className={`btn btn-sm ${quizMode === 'write' ? 'btn-primary' : ''}`}
                style={{ borderRadius: 'var(--radius-pill)' }}
                title="Modo Escribir"
              >
                <Type size={14} /> Escribir
              </button>
            </div>
          </div>
        </div>

        {/* Streak badge & Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Total en esta categoría: <strong>{getFilteredWords().length} palabras</strong></span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: streak >= 3 ? 'var(--accent-amber)' : 'var(--text-muted)', fontWeight: '700' }}>
            <Award size={16} /> Racha de aciertos: {streak}
          </div>
        </div>
      </div>

      {/* Main Flashcard / Question Area */}
      <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
          <button 
            onClick={pickNewWord} 
            className="btn btn-secondary btn-icon"
            title="Saltar a otra palabra"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-block' }}>
          {currentWord.category || selectedCategory}
        </span>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
          {isEsToEn ? "¿Cómo se dice en inglés?" : "¿Qué significa en español?"}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            {promptText}
          </h1>
          <button 
            onClick={() => speakText(currentWord.en)} 
            className="btn btn-secondary btn-icon" 
            style={{ width: '40px', height: '40px' }}
            title="Escuchar pronunciación"
          >
            <Volume2 size={20} />
          </button>
        </div>

        {/* Options Grid or Typing Input */}
        {quizMode === 'choice' ? (
          <div className="choices-grid" style={{ maxWidth: '650px', margin: '0 auto' }}>
            {choices.map((choiceObj, idx) => {
              const optionText = isEsToEn ? choiceObj.en : choiceObj.es;
              let extraClass = '';
              if (feedback) {
                if (optionText === targetAnswer || (isEsToEn && (choiceObj.altEn || []).includes(targetAnswer))) {
                  extraClass = 'correct';
                } else if (selectedChoice === optionText) {
                  extraClass = 'incorrect';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleChoiceClick(choiceObj)}
                  disabled={!!feedback}
                  className={`choice-btn ${extraClass}`}
                >
                  <span>{optionText}</span>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(choiceObj.en);
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '4px' }}
                    title="Escuchar palabra"
                  >
                    <Volume2 size={16} />
                  </button>
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleWriteSubmit} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text"
              value={userTyped}
              onChange={(e) => setUserTyped(e.target.value)}
              disabled={!!feedback}
              placeholder={isEsToEn ? "Escribe en inglés..." : "Escribe en español..."}
              className="form-control"
              autoFocus
            />
            {!feedback ? (
              <button type="submit" className="btn btn-primary">
                Comprobar
              </button>
            ) : null}
          </form>
        )}

        {/* Feedback Message */}
        {feedback && (
          <div className={`feedback-box ${feedback.isCorrect ? 'correct' : 'incorrect'}`} style={{ maxWidth: '650px', margin: '1.5rem auto 0 auto' }}>
            {feedback.isCorrect ? <CheckCircle size={24} /> : <XCircle size={24} />}
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>
                {feedback.isCorrect ? "¡Muy bien! 🎉" : "¡Casi lo tienes!"}
              </div>
              <div>{feedback.message}</div>
            </div>
            <button onClick={pickNewWord} className="btn btn-primary" style={{ alignSelf: 'center' }}>
              Siguiente <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
