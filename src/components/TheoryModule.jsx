import React, { useState, useEffect } from 'react';
import { GRAMMAR_THEORY_DATA } from '../data/grammarTheory';
import { speakText } from '../utils/audio';
import { BookOpen, Volume2, HelpCircle, CheckCircle, ChevronDown, ChevronUp, Sparkles, Lightbulb, ArrowLeft } from 'lucide-react';

export default function TheoryModule({ initialTheoryId, onBackToPath }) {
  const [openCardId, setOpenCardId] = useState(initialTheoryId || GRAMMAR_THEORY_DATA[0].id);

  useEffect(() => {
    if (initialTheoryId) {
      setOpenCardId(initialTheoryId);
    }
  }, [initialTheoryId]);

  const toggleCard = (id) => {
    setOpenCardId(openCardId === id ? null : id);
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

      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div className="brand-icon" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
            <BookOpen size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>Fichas de Teoría Gramatical</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Conceptos clave explicados de forma clara con ejemplos audibles y reglas estructuradas.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {GRAMMAR_THEORY_DATA.map((item) => {
          const isOpen = openCardId === item.id;

          return (
            <div 
              key={item.id} 
              className="glass-card"
              style={{
                borderColor: isOpen ? 'var(--primary)' : 'var(--border-color)',
                transition: 'all 0.25s ease'
              }}
            >
              {/* Header bar of accordion card */}
              <div 
                onClick={() => toggleCard(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="badge badge-primary">{item.badge}</span>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                </div>

                <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Card Body */}
              {isOpen && (
                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px dashed var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-text)', fontWeight: '600' }}>
                    <HelpCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '1.05rem' }}>{item.question}</span>
                  </div>

                  <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {item.answer.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: 'var(--primary)' }}>{part}</strong> : part)}
                  </p>

                  {item.formula && (
                    <div style={{
                      background: 'var(--primary-light)',
                      border: '1px solid var(--border-color)',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: '700',
                      color: 'var(--primary-text)',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Sparkles size={18} />
                      <span>Fórmula: {item.formula}</span>
                    </div>
                  )}

                  {item.hint && (
                    <div style={{
                      background: 'rgba(245, 158, 11, 0.12)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      color: '#d97706',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: '600',
                      fontSize: '0.92rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Lightbulb size={18} />
                      <span>{item.hint}</span>
                    </div>
                  )}

                  {/* Details List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {item.details.map((d, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem' }}>
                        <CheckCircle size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>{d.highlight}: </strong>
                          <span style={{ color: 'var(--text-secondary)' }}>{d.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Audible Examples */}
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      Ejemplos (Toca el altavoz para escuchar):
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {item.examples.map((ex, idx) => (
                        <div 
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'rgba(0,0,0,0.03)',
                            padding: '0.65rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)'
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: '700', color: 'var(--text-primary)', marginRight: '0.75rem' }}>
                              {ex.text}
                            </span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                              ({ex.translation})
                            </span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => speakText(ex.text)}
                            className="btn btn-secondary btn-icon"
                            style={{ width: '32px', height: '32px' }}
                            title="Escuchar ejemplo"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
