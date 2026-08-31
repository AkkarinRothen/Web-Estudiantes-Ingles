// 14 Units Curriculum of Great Writing: Foundations (Bilingual Adaptive Edition)

export const FOUNDATIONS_UNITS = [
  {
    id: 'gw_unit_1',
    number: 1,
    title: 'Unidad 1: Sentences (La Oración)',
    tagline: 'Sujeto, Verbo, Mayúsculas y Punto Final',
    description: 'Aprende qué compone una oración en inglés, la regla obligatoria de Sujeto + Verbo y las mayúsculas iniciales.',
    vowelSound: '/æ/ en Cat',
    themeColor: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    levels: [
      {
        id: 'gw1_lvl1',
        name: 'Nivel 1: ¿Qué es una Oración?',
        difficulty: 'Básico',
        stars: 3,
        xp: 30,
        activityType: 'sentence-elements',
        description: 'Distingue entre frases incompletas y oraciones con Sujeto + Verbo.'
      },
      {
        id: 'gw1_lvl2',
        name: 'Nivel 2: Mayúsculas y Puntuación',
        difficulty: 'Intermedio',
        stars: 4,
        xp: 45,
        activityType: 'structure-builder',
        description: 'Corrige la puntuación y el orden de los elementos oracionales.'
      },
      {
        id: 'gw1_lvl3',
        name: 'Nivel 3: Ensamblaje Sintáctico',
        difficulty: 'Avanzado',
        stars: 5,
        xp: 60,
        activityType: 'structure-builder',
        description: 'Construye oraciones completas con sentido propio.'
      }
    ],
    masterChallenge: {
      id: 'gw1_challenge',
      title: 'Desafío Maestro: La Oración',
      description: 'Evaluación de 5 preguntas sobre componentes de la oración y mayúsculas.',
      stars: 5,
      xp: 80,
      badgeId: 'sentence_architect',
      questions: [
        {
          id: 'gw1_c1',
          type: 'choice',
          question: '¿Cuál de las siguientes es una oración COMPLETA en inglés?',
          options: ['The students write in class.', 'In the morning.', 'Running fast.', 'The red book.'],
          correct: 'The students write in class.',
          hint: 'Una oración completa necesita Sujeto y Verbo conjugado.',
          explanation: "'The students write in class' tiene Sujeto (The students) y Verbo (write)."
        },
        {
          id: 'gw1_c2',
          type: 'choice',
          question: 'En inglés, el pronombre "I" (yo) SIEMPRE se escribe en:',
          options: ['Mayúscula siempre', 'Minúscula al medio', 'Mayúscula solo al inicio', 'Indistinto'],
          correct: 'Mayúscula siempre',
          hint: 'En cualquier posición de la oración, "I" va con mayúscula.',
          explanation: 'El pronombre "I" siempre va en mayúscula, sin importar su lugar en la frase.'
        },
        {
          id: 'gw1_c3',
          type: 'choice',
          question: '¿Qué elemento falta en: "Walks to school every day"?',
          options: ['El Sujeto', 'El Verbo', 'El Complemento', 'El Punto'],
          correct: 'El Sujeto',
          hint: '¿Quién realiza la acción de caminar?',
          explanation: 'En inglés el sujeto es obligatorio; no se puede omitir como en español.'
        },
        {
          id: 'gw1_c4',
          type: 'choice',
          question: 'Elige la opción con puntuación y mayúsculas CORRECTAS:',
          options: ['My teacher is from Canada.', 'my teacher is from canada', 'My teacher is from Canada', 'my Teacher is from Canada.'],
          correct: 'My teacher is from Canada.',
          hint: 'Inicia con mayúscula, nombre propio con mayúscula y termina en punto.',
          explanation: 'Inicia con "My", el país "Canada" va en mayúscula y cierra con punto.'
        },
        {
          id: 'gw1_c5',
          type: 'choice',
          question: '¿Cuál es el sonido vocálico destacado en "c-a-t" y "m-a-p"?',
          options: ['/æ/ (A abierta)', '/i/ (I larga)', '/u/ (U larga)', '/oʊ/ (O larga)'],
          correct: '/æ/ (A abierta)',
          hint: 'Es la vocal corta de la Unidad 1.',
          explanation: 'El sonido /æ/ se encuentra en palabras como cat, map, black y hand.'
        }
      ]
    }
  },
  {
    id: 'gw_unit_2',
    number: 2,
    title: 'Unidad 2: The Simple Present of Be',
    tagline: 'Am, Is, Are • Afirmativo y Negativo',
    description: 'Domina las formas del verbo To Be (am, is, are), contracciones (I\'m, he\'s, they\'re) y oraciones negativas.',
    vowelSound: '/ɛ/ en Bed',
    themeColor: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    levels: [
      {
        id: 'gw2_lvl1',
        name: 'Nivel 1: Concordancia Am / Is / Are',
        difficulty: 'Básico',
        stars: 3,
        xp: 30,
        activityType: 'subject-verb',
        description: 'Une cada pronombre con su forma correcta del verbo Be.'
      },
      {
        id: 'gw2_lvl2',
        name: 'Nivel 2: Contracciones y Negación',
        difficulty: 'Intermedio',
        stars: 4,
        xp: 45,
        activityType: 'sentence-elements',
        description: 'Aplica not (isn\'t, aren\'t) y contracciones comunes.'
      },
      {
        id: 'gw2_lvl3',
        name: 'Nivel 3: Descripciones con Be',
        difficulty: 'Avanzado',
        stars: 5,
        xp: 60,
        activityType: 'structure-builder',
        description: 'Escribe descripciones completas de personas y profesiones.'
      }
    ],
    masterChallenge: {
      id: 'gw2_challenge',
      title: 'Desafío Maestro: Verbo Be',
      description: 'Evaluación de 5 preguntas sobre formas y negación del verbo Be.',
      stars: 5,
      xp: 80,
      badgeId: 'action_hero',
      questions: [
        {
          id: 'gw2_c1',
          type: 'choice',
          question: 'Completa: "Maria and Lucas ______ from Argentina."',
          options: ['are', 'is', 'am', 'be'],
          correct: 'are',
          hint: '"Maria and Lucas" equivale al pronombre plural "They".',
          explanation: 'Con sujetos plurales (They) utilizamos "are".'
        },
        {
          id: 'gw2_c2',
          type: 'choice',
          question: '¿Cuál es la forma negativa correcta para "He is a doctor"?',
          options: ['He is not a doctor.', 'He not is a doctor.', 'He don\'t is a doctor.', 'He doesn\'t be a doctor.'],
          correct: 'He is not a doctor.',
          hint: 'En el verbo Be, "not" va DESPUÉS de is/are/am.',
          explanation: 'La negación del verbo Be se forma agregando "not" después del verbo: "is not" o "isn\'t".'
        },
        {
          id: 'gw2_c3',
          type: 'choice',
          question: 'Elige la contracción correcta de "We are":',
          options: ['We\'re', 'Were', 'We\'s', 'We\'m'],
          correct: 'We\'re',
          hint: 'Se sustituye la letra "a" por el apóstrofe.',
          explanation: '"We are" se contrae como "We\'re".'
        },
        {
          id: 'gw2_c4',
          type: 'choice',
          question: '¿Qué sonido vocálico comparten "bed", "pen" y "red"?',
          options: ['/ɛ/ (E corta)', '/æ/ (A abierta)', '/i/ (I larga)', '/u/ (U larga)'],
          correct: '/ɛ/ (E corta)',
          hint: 'Es la vocal corta de la Unidad 2.',
          explanation: 'El sonido /ɛ/ aparece en bed, pen, desk, red y bread.'
        },
        {
          id: 'gw2_c5',
          type: 'choice',
          question: 'Completa: "I ______ very happy to learn English today."',
          options: ['am', 'is', 'are', 'be'],
          correct: 'am',
          hint: 'Con el pronombre "I" la forma exclusiva de Be es...',
          explanation: 'El pronombre "I" siempre concuerda con "am".'
        }
      ]
    }
  },
  {
    id: 'gw_unit_3',
    number: 3,
    title: 'Unidad 3: The Simple Present',
    tagline: 'Verbos en Presente y Regla de 3ra Persona (-s/-es)',
    description: 'Aprende las rutinas diarias, la adición de -s/-es con He/She/It y el uso de Don\'t / Doesn\'t.',
    vowelSound: '/ɪ/ en Fish',
    themeColor: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    levels: [
      {
        id: 'gw3_lvl1',
        name: 'Nivel 1: Verbos de Rutina',
        difficulty: 'Básico',
        stars: 3,
        xp: 30,
        activityType: 'who-what',
        description: 'Identifica acciones cotidianas (study, eat, live, work).'
      },
      {
        id: 'gw3_lvl2',
        name: 'Nivel 2: Regla de 3ra Persona (-s/-es)',
        difficulty: 'Intermedio',
        stars: 4,
        xp: 45,
        activityType: 'subject-verb',
        description: 'Aplica la regla de la terminación -s con He, She e It.'
      },
      {
        id: 'gw3_lvl3',
        name: 'Nivel 3: Negativos (Don\'t / Doesn\'t)',
        difficulty: 'Avanzado',
        stars: 5,
        xp: 60,
        activityType: 'structure-builder',
        description: 'Forma oraciones negativas en Presente Simple.'
      }
    ],
    masterChallenge: {
      id: 'gw3_challenge',
      title: 'Desafío Maestro: Presente Simple',
      description: 'Evaluación de 5 preguntas sobre la regla -s y negaciones en presente.',
      stars: 5,
      xp: 80,
      badgeId: 'subject_master',
      questions: [
        {
          id: 'gw3_c1',
          type: 'choice',
          question: 'Elige la forma verbal correcta: "My sister ______ (study) French."',
          options: ['studies', 'studys', 'study', 'is study'],
          correct: 'studies',
          hint: 'Los verbos que terminan en consonante + "y" cambian a "-ies".',
          explanation: 'Con He/She/It, "study" cambia a "studies".'
        },
        {
          id: 'gw3_c2',
          type: 'choice',
          question: 'Completa en negativo: "Lucas ______ (not eat) meat."',
          options: ['doesn\'t eat', 'don\'t eat', 'doesn\'t eats', 'not eat'],
          correct: 'doesn\'t eat',
          hint: 'Con Lucas (He) usamos doesn\'t + verbo en forma base.',
          explanation: 'El auxiliar "doesn\'t" ya lleva la marca de 3ra persona, por lo que el verbo va en forma base: "eat".'
        },
        {
          id: 'gw3_c3',
          type: 'choice',
          question: '¿Qué sonido vocálico corto tienen "fish", "sit" y "list"?',
          options: ['/ɪ/ (I corta relajada)', '/i/ (I larga)', '/æ/ (A corta)', '/ʌ/ (U corta)'],
          correct: '/ɪ/ (I corta relajada)',
          hint: 'Es la vocal corta y relajada de la Unidad 3.',
          explanation: 'El sonido /ɪ/ se pronuncia con la lengua relajada en el centro de la boca.'
        },
        {
          id: 'gw3_c4',
          type: 'choice',
          question: 'Completa: "We ______ in a big house near the park."',
          options: ['live', 'lives', 'living', 'are live'],
          correct: 'live',
          hint: 'Con "We" el verbo NO lleva -s.',
          explanation: 'La -s solo se agrega con He, She e It.'
        },
        {
          id: 'gw3_c5',
          type: 'choice',
          question: '¿Cuál oración es GRAMATICALMENTE CORRECTA?',
          options: ['She plays tennis on weekends.', 'She play tennis on weekends.', 'She playes tennis on weekends.', 'She is play tennis on weekends.'],
          correct: 'She plays tennis on weekends.',
          hint: '"play" termina en vocal + y, solo se agrega "-s".',
          explanation: 'Vocal + "y" (play -> plays).'
        }
      ]
    }
  },
  {
    id: 'gw_unit_4',
    number: 4,
    title: 'Unidad 4: Nouns & Plurals',
    tagline: 'Sustantivos Comunes, Propios y Plurales',
    description: 'Aprende la diferencia entre sustantivos propios (con mayúscula) y comunes, y las reglas de plurales regulares e irregulares.',
    vowelSound: '/ɑ/ en Hot',
    themeColor: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    levels: [
      {
        id: 'gw4_lvl1',
        name: 'Nivel 1: Sustantivos Comunes y Propios',
        difficulty: 'Básico',
        stars: 3,
        xp: 30,
        activityType: 'sentence-elements',
        description: 'Reconoce nombres de lugares, personas y objetos.'
      },
      {
        id: 'gw4_lvl2',
        name: 'Nivel 2: Plurales Regulares (-s/-es/-ies)',
        difficulty: 'Intermedio',
        stars: 4,
        xp: 45,
        activityType: 'structure-builder',
        description: 'Aplica las reglas de pluralización ortográfica.'
      },
      {
        id: 'gw4_lvl3',
        name: 'Nivel 3: Plurales Irregulares',
        difficulty: 'Avanzado',
        stars: 5,
        xp: 60,
        activityType: 'intruder',
        description: 'Domina formas irregulares (child/children, man/men, foot/feet).'
      }
    ],
    masterChallenge: {
      id: 'gw4_challenge',
      title: 'Desafío Maestro: Sustantivos y Plurales',
      description: 'Evaluación de 5 preguntas sobre mayúsculas en nombres propios y plurales irregulares.',
      stars: 5,
      xp: 80,
      badgeId: 'can_do_attitude',
      questions: [
        {
          id: 'gw4_c1',
          type: 'choice',
          question: '¿Cuál es el plural irregular de "child"?',
          options: ['children', 'childs', 'childrens', 'childes'],
          correct: 'children',
          hint: 'Es un plural irregular muy común.',
          explanation: 'El plural de "child" (niño/niña) es "children".'
        },
        {
          id: 'gw4_c2',
          type: 'choice',
          question: '¿Cuál de las siguientes palabras es un SUSTANTIVO PROPIO?',
          options: ['Wednesday (Miércoles)', 'school (escuela)', 'city (ciudad)', 'teacher (profesor)'],
          correct: 'Wednesday (Miércoles)',
          hint: 'Los días de la semana en inglés SIEMPRE van con mayúscula.',
          explanation: 'En inglés, los días de la semana, meses y nombres de países son sustantivos propios.'
        },
        {
          id: 'gw4_c3',
          type: 'choice',
          question: '¿Cuál es el plural correcto de "city"?',
          options: ['cities', 'citys', 'cityes', 'citis'],
          correct: 'cities',
          hint: 'Consonante + "y" cambia a "-ies".',
          explanation: 'City termina en consonante (t) + "y", por lo que su plural es "cities".'
        },
        {
          id: 'gw4_c4',
          type: 'choice',
          question: '¿Qué sonido vocálico comparten "hot", "box" y "clock"?',
          options: ['/ɑ/ (O/A abierta)', '/ʌ/ (U corta)', '/i/ (I larga)', '/æ/ (A corta)'],
          correct: '/ɑ/ (O/A abierta)',
          hint: 'Es el sonido vocálico posterior de la Unidad 4.',
          explanation: 'El sonido /ɑ/ se pronuncia abriendo la mandíbula hacia abajo.'
        },
        {
          id: 'gw4_c5',
          type: 'choice',
          question: 'El plural de "woman" es:',
          options: ['women', 'womans', 'womens', 'womanes'],
          correct: 'women',
          hint: 'Cambia la vocal "a" por una "e".',
          explanation: 'Woman (singular) -> Women (plural).'
        }
      ]
    }
  }
];
