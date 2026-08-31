export const LEARNING_UNITS = [
  {
    id: 'unit-1',
    number: 1,
    title: 'Sujetos y Pronombres',
    tagline: '¿Quién realiza la acción?',
    description: 'Aprende los pronombres personales (I, He, She, We, They) y a identificar al protagonista de la oración.',
    icon: 'UserCheck',
    themeColor: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    vocabCategory: 'Pronombres Personales',
    grammarId: 'sentence-min',
    levels: [
      {
        id: 'u1_l1',
        name: 'Nivel 1: Descubriendo Pronombres',
        difficulty: 'Básico',
        activityType: 'vocab',
        vocabFilter: 'Pronombres Personales',
        description: 'Reconoce y escucha los pronombres personales en inglés con sus traducciones.',
        xp: 30,
        stars: 3
      },
      {
        id: 'u1_l2',
        name: 'Nivel 2: ¿Quién es el Sujeto?',
        difficulty: 'Intermedio',
        activityType: 'who-what',
        description: 'Identifica quién realiza la acción en oraciones cortas.',
        xp: 45,
        stars: 4
      },
      {
        id: 'u1_l3',
        name: 'Nivel 3: El Intruso de Sujetos',
        difficulty: 'Avanzado',
        activityType: 'intruder',
        filterType: 'subjects',
        description: 'Encuentra la palabra que no pertenece al grupo de sujetos.',
        xp: 60,
        stars: 5
      }
    ]
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'Verbos de Acción',
    tagline: '¿Qué hace el sujeto?',
    description: 'Descubre los verbos de movimiento y actividades diarias (run, swim, cook, study) y la regla de 3ra persona singular (-s).',
    icon: 'Zap',
    themeColor: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    vocabCategory: 'Verbos: Movimiento y Habilidades',
    grammarId: 'sentence-verb-rule',
    levels: [
      {
        id: 'u2_l1',
        name: 'Nivel 1: Banco de Verbos',
        difficulty: 'Básico',
        activityType: 'vocab',
        vocabFilter: 'Verbos: Movimiento y Habilidades',
        description: 'Aprende los verbos de acción más comunes y practica su pronunciación.',
        xp: 30,
        stars: 3
      },
      {
        id: 'u2_l2',
        name: 'Nivel 2: Sujeto vs. Verbo',
        difficulty: 'Intermedio',
        activityType: 'subject-verb',
        description: 'Clasifica palabras rápidamente entre Sujetos y Verbos.',
        xp: 50,
        stars: 4
      },
      {
        id: 'u2_l3',
        name: 'Nivel 3: El Intruso de Verbos',
        difficulty: 'Avanzado',
        activityType: 'intruder',
        filterType: 'verbs',
        description: 'Detecta palabras intrusas que no son verbos de acción.',
        xp: 60,
        stars: 5
      }
    ]
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'La Oración Simple',
    tagline: 'Sujeto + Verbo + Complemento',
    description: 'Une todas las piezas: aprende la fórmula mínima de la oración y construye oraciones correctas en inglés.',
    icon: 'Layers',
    themeColor: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    vocabCategory: 'Sustantivos Comunes',
    grammarId: 'sentence-min',
    levels: [
      {
        id: 'u3_l1',
        name: 'Nivel 1: Partes de la Oración',
        difficulty: 'Básico',
        activityType: 'sentence-elements',
        description: 'Separa el sujeto del verbo en oraciones completas.',
        xp: 40,
        stars: 4
      },
      {
        id: 'u3_l2',
        name: 'Nivel 2: Acción vs. Estado',
        difficulty: 'Intermedio',
        activityType: 'who-what',
        description: 'Distingue si el verbo expresa una acción o un estado.',
        xp: 50,
        stars: 4
      },
      {
        id: 'u3_l3',
        name: 'Nivel 3: Constructor de Oraciones',
        difficulty: 'Avanzado',
        activityType: 'structure-builder',
        description: 'Transforma oraciones afirmativas, negativas e interrogativas.',
        xp: 70,
        stars: 6
      }
    ]
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'Habilidades y Modales',
    tagline: 'Can & Can\'t + Artículos A/An',
    description: 'Expresa lo que puedes y no puedes hacer, y usa correctamente los artículos indefinidos A y An.',
    icon: 'Sparkles',
    themeColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
    vocabCategory: 'Animales y Habilidades',
    grammarId: 'can-cant',
    levels: [
      {
        id: 'u4_l1',
        name: 'Nivel 1: ¿Puede o No Puede?',
        difficulty: 'Básico',
        activityType: 'can-cant',
        description: 'Completa oraciones de habilidades con Can o Can\'t.',
        xp: 45,
        stars: 4
      },
      {
        id: 'u4_l2',
        name: 'Nivel 2: Regla de Artículos A vs. An',
        difficulty: 'Intermedio',
        activityType: 'theory',
        theoryId: 'a-an',
        description: 'Comprende cuándo usar "A" (consonante) y "An" (vocal).',
        xp: 40,
        stars: 3
      },
      {
        id: 'u4_l3',
        name: 'Nivel 3: Desafío Maestro de Estructuras',
        difficulty: 'Avanzado',
        activityType: 'structure-builder',
        description: 'Domina preguntas y respuestas con Can / Can\'t.',
        xp: 80,
        stars: 6
      }
    ]
  }
];
