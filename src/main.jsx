import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error atrapado en la aplicación:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('english_active_course_id');
      localStorage.removeItem('english_student_seen_onboarding');
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f0f4fd, #e6eefc)',
          color: '#1e1b4b',
          fontFamily: 'sans-serif'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🇬🇧 English Practice</h2>
          <p style={{ maxWidth: '480px', color: '#475569', marginBottom: '1.5rem' }}>
            Hubo una interrupción al cargar los datos locales de tu sesión. Toca el botón abajo para restaurar y continuar:
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff',
              border: 'none',
              padding: '0.85rem 1.75rem',
              borderRadius: '9999px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)'
            }}
          >
            🔄 Recargar y Restaurar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
