# 🇬🇧 English Practice • Plataforma Educativa Interactiva

Plataforma web de aprendizaje y práctica de inglés para estudiantes de nivel primario y secundario, orientada al repaso y consolidación de estructuras gramaticales, vocabulario y habilidades de comunicación.

🌐 **Demo en vivo en GitHub Pages**: [https://akkarinrothen.github.io/Web-Estudiantes-Ingles/](https://akkarinrothen.github.io/Web-Estudiantes-Ingles/)

---

## 🌟 Características Principales

1. **🧭 Ruta de Aprendizaje Guiada con 4 Unidades Progresivas**:
   - **Unidad 1**: Sujetos y Pronombres (*¿Quién realiza la acción?*).
   - **Unidad 2**: Verbos de Acción (*¿Qué hace el sujeto? Regla de 3ra persona -s*).
   - **Unidad 3**: La Oración Simple (*Sujeto + Verbo + Complemento*).
   - **Unidad 4**: Habilidades y Modales (*Can & Can't + Artículos A/An*).

2. **🏆 Desafíos Integradores de Unidad**:
   - Evaluación formativa de 5 preguntas mixtas al finalizar cada unidad.
   - Criterio de dominio del 70% para obtener la insignia de Maestría.
   - Ruta de refuerzo automática en caso de requerir repaso adicional.

3. **💡 Retroalimentación Didáctica Combinada**:
   - Micro-pistas previas opcionales (💡).
   - Explicación de la regla gramatical al responder.
   - Pronunciación en audio nativo (SpeechSynthesis).
   - Panel de resumen con botón para *"Repasar solo errores"*.

4. **📱 Experiencia Móvil & Accesibilidad**:
   - Formato Wizard (1 pregunta a la vez).
   - Botones táctiles ergonómicos (≥48px) y barra de navegación inferior fija.
   - Navegación por teclado nativa con atajos numéricos (`1`, `2`, `3`, `4`) y foco de alto contraste.
   - Soporte para movimiento reducido (`prefers-reduced-motion`).

5. **👥 Gestión Multi-Perfil Local y Exportación Dual**:
   - Múltiples perfiles de alumnos en un mismo dispositivo sin cuentas en la nube.
   - Generación de informe visual imprimible/PDF para familias.
   - Exportación de métricas analíticas en CSV para docentes.

---

## 🚀 Despliegue en GitHub Pages

El proyecto incluye un pipeline automatizado con **GitHub Actions** (`.github/workflows/deploy.yml`).

### Pasos para habilitar en el repositorio:
1. En GitHub, ve a **Settings** > **Pages**.
2. En la sección **Build and deployment** > **Source**, selecciona **GitHub Actions**.
3. Haz un `git push` a la rama `main` y GitHub compilará y desplegará la página automáticamente.

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Validar linter
npm run lint
```
