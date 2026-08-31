import React, { useState } from 'react';
import { Compass, Sparkles, Trophy, Star, ArrowRight } from 'lucide-react';

export default function WelcomeOnboardingModal({ onStartFirstLesson, onClose }) {
  const [step, setStep] = useState(1);

  return (
    <div className="summary-overlay animate-fade-in" role="dialog" aria-modal="true">
      <div className="summary-card onboarding-card animate-pop-in">
        {step === 1 ? (
          <>
            <div className="summary-header">
              <div className="onboarding-icon-circle bg-indigo-100 text-indigo-600">
                <Compass size={40} />
              </div>
              <h2 className="summary-title">¡Bienvenido a tu Ruta de Inglés! 🎉</h2>
              <p className="summary-subtitle">
                Aprende paso a paso con 4 unidades diseñadas para que hables y construyas oraciones con confianza.
              </p>
            </div>

            <div className="onboarding-features-list">
              <div className="onboarding-feature-item">
                <div className="feat-icon-box text-amber-500">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <strong>Aprende a tu propio ritmo</strong>
                  <p className="text-xs text-muted">Cada unidad cuenta con 3 niveles: Básico, Intermedio y Avanzado.</p>
                </div>
              </div>

              <div className="onboarding-feature-item">
                <div className="feat-icon-box text-emerald-500">
                  <Sparkles size={20} />
                </div>
                <div>
                  <strong>Pistas y Explicaciones 💡</strong>
                  <p className="text-xs text-muted">Si tienes dudas, toca el botón de pista. Al responder verás la regla explicada.</p>
                </div>
              </div>

              <div className="onboarding-feature-item">
                <div className="feat-icon-box text-purple-500">
                  <Trophy size={20} />
                </div>
                <div>
                  <strong>Gana XP y Medallas de Maestría</strong>
                  <p className="text-xs text-muted">Completa los desafíos finales para desbloquear tus insignias de logro.</p>
                </div>
              </div>
            </div>

            <div className="summary-actions mt-4">
              <button
                type="button"
                className="btn-outline flex-1"
                onClick={onClose}
              >
                Explorar por mi cuenta
              </button>
              <button
                type="button"
                className="btn-primary flex-1"
                onClick={() => setStep(2)}
              >
                <span>Siguiente Paso</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="summary-header">
              <div className="onboarding-icon-circle bg-emerald-100 text-emerald-600">
                <Sparkles size={40} />
              </div>
              <h2 className="summary-title">¡Tu primera misión te espera! 🚀</h2>
              <p className="summary-subtitle">
                Comenzaremos con la <strong>Unidad 1: Sujetos y Pronombres</strong> para aprender quién realiza las acciones.
              </p>
            </div>

            <div className="onboarding-first-mission-box">
              <span className="rec-unit-tag">Misión Inicial • Unidad 1</span>
              <h3 className="text-lg font-bold text-primary mt-1">Descubriendo Pronombres</h3>
              <p className="text-sm text-secondary mt-1">
                Aprende y escucha los pronombres personales (I, He, She, We, They) en menos de 2 minutos.
              </p>
            </div>

            <div className="summary-actions mt-4">
              <button
                type="button"
                className="btn-outline flex-1"
                onClick={() => setStep(1)}
              >
                Atrás
              </button>
              <button
                type="button"
                className="btn-primary flex-1 btn-finish-highlight"
                onClick={onStartFirstLesson}
              >
                <span>¡Comenzar Primera Lección!</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
