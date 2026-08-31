// Courses & Programs Catalog for English Practice
import { LEARNING_UNITS } from './learningUnits';
import { FOUNDATIONS_UNITS } from './foundationsCurriculum';

export const COURSES_CATALOG = [
  {
    id: 'starter_4u',
    name: 'Curso 1: Starter • Fundamentos',
    subtitle: 'Nivel Inicial / Primaria & Secundaria Temprana',
    levelTag: 'A1 Principiante',
    badgeIcon: 'Compass',
    unitsCount: 4,
    description: 'Ruta inicial enfocada en Pronombres, Verbos de Acción, la Oración Simple y Habilidades (Can/Can\'t).',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    units: LEARNING_UNITS
  },
  {
    id: 'foundations_14u',
    name: 'Curso 2: Great Writing: Foundations',
    subtitle: 'Programa Curricular Completo • 14 Unidades',
    levelTag: 'A1 - A2 Elemental',
    badgeIcon: 'BookOpen',
    unitsCount: 14,
    description: 'Basado en Great Writing: Foundations. Cubre fonética vocálica, verbo Be, Presente Simple, Nouns, Adjetivos, Conectores, Pasado y Progresivo.',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
    units: FOUNDATIONS_UNITS
  },
  {
    id: 'writing_b',
    name: 'Curso 3: Grammar for Great Writing B',
    subtitle: 'Nivel Intermedio • Redacción y Cohesión',
    levelTag: 'B1 Intermedio',
    badgeIcon: 'Award',
    unitsCount: 15,
    description: 'Enfocado en la construcción de párrafos, oraciones complejas, conectores y concordancia académica avanzada.',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
    units: [] // Accessible via teacher packages
  }
];
