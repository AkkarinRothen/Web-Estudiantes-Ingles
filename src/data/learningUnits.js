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
    ],
    masterChallenge: {
      id: 'u1_challenge',
      title: 'Desafío Maestro: Sujetos y Pronombres',
      description: 'Demuestra tu dominio identificando pronombres, sujetos y roles en 5 preguntas mixtas.',
      passingScore: 70,
      xp: 80,
      stars: 6,
      questions: [
        {
          type: 'choice',
          question: "¿Cuál es el pronombre en inglés para 'Ella'?",
          options: ["He", "She", "They", "It"],
          correct: "She",
          hint: "Se escribe con 'Sh...'",
          explanation: "'She' significa 'Ella'. 'He' es Él y 'They' es Ellos/as."
        },
        {
          type: 'choice',
          question: "En la oración: 'The teacher writes on the board.', ¿quién es el Sujeto (Who)?",
          options: ["The teacher", "writes", "on the board", "board"],
          correct: "The teacher",
          hint: "Pregúntate: ¿Quién realiza la acción de escribir?",
          explanation: "'The teacher' es el Sujeto porque es la persona que realiza la acción."
        },
        {
          type: 'choice',
          question: "¿Cuál de las siguientes palabras NO es un sujeto?",
          options: ["My mother", "They", "The dog", "Jump"],
          correct: "Jump",
          hint: "'Jump' es la acción de saltar (un verbo).",
          explanation: "'Jump' es un verbo de acción (saltar), los demás son sujetos."
        },
        {
          type: 'choice',
          question: "¿Qué pronombre usarías para reemplazar a 'Lucas and I' (Lucas y yo)?",
          options: ["They", "We", "You", "He"],
          correct: "We",
          hint: "Si estás incluido tú mismo ('and I'), somos...",
          explanation: "'We' (Nosotros) reemplaza a 'Lucas and I'."
        },
        {
          type: 'choice',
          question: "¿Cuál es el pronombre neutral para animales u objetos singulares?",
          options: ["He", "She", "It", "They"],
          correct: "It",
          hint: "Se usa para cosas inanimadas o animales en singular.",
          explanation: "'It' se usa para referirse a una cosa, lugar o animal singular."
        }
      ]
    }
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
    ],
    masterChallenge: {
      id: 'u2_challenge',
      title: 'Desafío Maestro: Verbos de Acción',
      description: 'Demuestra que distingues verbos y aplicas la regla de 3ra persona singular.',
      passingScore: 70,
      xp: 80,
      stars: 6,
      questions: [
        {
          type: 'choice',
          question: "¿Cuál de las siguientes palabras expresa una ACCIÓN física?",
          options: ["Teacher", "Run", "Sister", "Student"],
          correct: "Run",
          hint: "Es la acción de correr.",
          explanation: "'Run' (correr) es un verbo de acción. Las demás opciones son personas/sujetos."
        },
        {
          type: 'choice',
          question: "Completa la oración con la 3ra persona correcta: 'She ______ (dance) every day.'",
          options: ["dance", "dances", "dancing", "danced"],
          correct: "dances",
          hint: "Con He/She/It se agrega '-s' o '-es' al verbo.",
          explanation: "Como el sujeto es 'She' (3ra persona singular), agregamos -s: 'dances'."
        },
        {
          type: 'choice',
          question: "¿Cuál es la forma correcta para: 'They ______ (study) in the library.'?",
          options: ["study", "studies", "studying", "is study"],
          correct: "study",
          hint: "Con 'They' (plural) el verbo queda en su forma base.",
          explanation: "Con 'They' el verbo no lleva '-s', queda 'study'."
        },
        {
          type: 'choice',
          question: "Encuentra la palabra intrusa que NO es un verbo:",
          options: ["cook", "read", "swim", "my brother"],
          correct: "my brother",
          hint: "Tres son acciones y una es una persona.",
          explanation: "'my brother' es un Sujeto, no un verbo."
        },
        {
          type: 'choice',
          question: "¿Qué significa el verbo 'write' en español?",
          options: ["Leer", "Escribir", "Dibujar", "Escuchar"],
          correct: "Escribir",
          hint: "Lo que haces con un lápiz o teclado.",
          explanation: "'Write' significa 'Escribir'. 'Read' es leer y 'Draw' es dibujar."
        }
      ]
    }
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
    ],
    masterChallenge: {
      id: 'u3_challenge',
      title: 'Desafío Maestro: La Oración Simple',
      description: 'Construye y analiza oraciones completas respetando el orden sintáctico.',
      passingScore: 70,
      xp: 90,
      stars: 7,
      questions: [
        {
          type: 'choice',
          question: "¿Cuáles son los 2 elementos mínimos que toda oración en inglés debe tener?",
          options: ["Sujeto + Verbo", "Verbo + Adjetivo", "Artículo + Sustantivo", "Sujeto + Puntuación"],
          correct: "Sujeto + Verbo",
          hint: "Alguien que realiza la acción + la acción misma (Who? + Action).",
          explanation: "Toda oración con sentido completo necesita al menos un Sujeto y un Verbo."
        },
        {
          type: 'choice',
          question: "¿Cuál de las siguientes opciones es una oración correctamente ordenada?",
          options: ["Runs the dog.", "The dog runs.", "Dog runs the.", "The runs dog."],
          correct: "The dog runs.",
          hint: "El orden estándar en inglés es: Sujeto primero, luego Verbo.",
          explanation: "'The dog runs.' sigue el patrón Sujeto (The dog) + Verbo (runs)."
        },
        {
          type: 'choice',
          question: "En la oración 'She is happy.', ¿el verbo 'is' expresa acción o estado?",
          options: ["Estado (State)", "Acción física (Action)", "Ninguna de las anteriores", "Movimiento"],
          correct: "Estado (State)",
          hint: "El verbo to be (is/are) describe cómo se siente o es el sujeto.",
          explanation: "'Is' es el verbo To Be y describe un estado o condición ('Ella está feliz')."
        },
        {
          type: 'choice',
          question: "¿Cómo se transforma 'They study.' a forma negativa con Don't?",
          options: ["They don't study.", "They not study.", "They study not.", "Don't they study."],
          correct: "They don't study.",
          hint: "Colocamos el auxiliar 'don't' entre el sujeto y el verbo.",
          explanation: "La negación del presente simple para 'They' es 'They don't study.'."
        },
        {
          type: 'choice',
          question: "En 'The students write.', ¿cuál es el Sujeto?",
          options: ["The students", "write", "students write", "The"],
          correct: "The students",
          hint: "Todo el grupo que realiza la acción.",
          explanation: "'The students' es el Sujeto completo de la oración."
        }
      ]
    }
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
    ],
    masterChallenge: {
      id: 'u4_challenge',
      title: 'Desafío Maestro: Habilidades y Modales',
      description: 'Demuestra tu maestría usando Can, Can\'t y los artículos A y An.',
      passingScore: 70,
      xp: 90,
      stars: 7,
      questions: [
        {
          type: 'choice',
          question: "Completa la oración lógica: 'A bird ______ fly, but a dog ______ fly.'",
          options: ["can / can't", "can't / can", "can / can", "can't / can't"],
          correct: "can / can't",
          hint: "Un pájaro sí puede volar, un perro no.",
          explanation: "'A bird can fly (puede), but a dog can't fly (no puede)'."
        },
        {
          type: 'choice',
          question: "¿Cuál es la forma interrogativa correcta de: 'She can swim.'?",
          options: ["Can she swim?", "She can swim?", "Can swim she?", "Does she can swim?"],
          correct: "Can she swim?",
          hint: "Para preguntar, invertimos colocando 'Can' al principio.",
          explanation: "Invertimos el orden modal: Can + Sujeto + Verbo? = 'Can she swim?'."
        },
        {
          type: 'choice',
          question: "¿Cuál es el artículo correcto para 'apple' (manzana)?",
          options: ["An apple", "A apple", "Thes apple", "An apples"],
          correct: "An apple",
          hint: "'apple' comienza con sonido de vocal (A).",
          explanation: "Usamos 'An' antes de palabras que empiezan con sonido vocálico: 'An apple'."
        },
        {
          type: 'choice',
          question: "¿Cuál es el artículo correcto para 'car' (auto)?",
          options: ["A car", "An car", "A cars", "An a car"],
          correct: "A car",
          hint: "'car' empieza con sonido consonántico (C).",
          explanation: "Usamos 'A' antes de consonantes: 'A car', 'A student', 'A dog'."
        },
        {
          type: 'choice',
          question: "¿Cómo se responde afirmativamente de forma corta a: 'Can you speak English?'?",
          options: ["Yes, I can.", "Yes, I do.", "Yes, I am.", "Yes, I speak."],
          correct: "Yes, I can.",
          hint: "Si la pregunta empieza con 'Can', la respuesta corta usa 'can'.",
          explanation: "La respuesta corta a preguntas con Can es 'Yes, I can.' o 'No, I can't.'."
        }
      ]
    }
  }
];
