// Adaptive Learning & Spaced Repetition Engine for English Practice

export const MICRO_SKILLS = [
  {
    id: 'pronouns',
    name: 'Pronombres Personales',
    tagline: 'I, You, He, She, It, We, They',
    icon: 'UserCheck',
    unitId: 'unit-1',
    color: '#6366f1'
  },
  {
    id: 'action_verbs',
    name: 'Verbos de Acción',
    tagline: 'Run, swim, dance, cook, study',
    icon: 'Zap',
    unitId: 'unit-2',
    color: '#10b981'
  },
  {
    id: 'third_person_s',
    name: 'Regla 3ra Persona (-s)',
    tagline: 'He runs, She dances, It swims',
    icon: 'Layers',
    unitId: 'unit-2',
    color: '#06b6d4'
  },
  {
    id: 'sentence_structure',
    name: 'Estructura Sintáctica',
    tagline: 'Sujeto + Verbo + Complemento',
    icon: 'Sparkles',
    unitId: 'unit-3',
    color: '#ec4899'
  },
  {
    id: 'can_cant',
    name: 'Modales de Habilidad',
    tagline: 'Can (Poder) vs. Can\'t (No poder)',
    icon: 'CheckCircle',
    unitId: 'unit-4',
    color: '#f59e0b'
  },
  {
    id: 'articles_a_an',
    name: 'Artículos A vs. An',
    tagline: 'A cat / An apple',
    icon: 'BookOpen',
    unitId: 'unit-4',
    color: '#8b5cf6'
  }
];

export const ADAPTIVE_QUESTION_BANK = [
  // PRONOUNS
  {
    id: 'ad_pro_1',
    skillId: 'pronouns',
    type: 'listening',
    audioText: "They are students.",
    question: "Escucha el audio y selecciona la traducción exacta:",
    options: ["Ellos son estudiantes.", "Nosotros somos estudiantes.", "Ella es estudiante.", "Él es estudiante."],
    correct: "Ellos son estudiantes.",
    hint: "Escucha atentamente el pronombre 'They'.",
    explanation: "'They' significa 'Ellos' o 'Ellas'."
  },
  {
    id: 'ad_pro_2',
    skillId: 'pronouns',
    type: 'scramble',
    audioText: "She is my sister.",
    question: "Ordena las palabras para formar la oración:",
    words: ["sister.", "She", "is", "my"],
    correct: "She is my sister.",
    hint: "El sujeto 'She' va al inicio de la frase.",
    explanation: "Estructura correcta: Sujeto (She) + Verbo (is) + Complemento (my sister)."
  },
  {
    id: 'ad_pro_3',
    skillId: 'pronouns',
    type: 'choice',
    question: "¿Qué pronombre reemplaza correctamente a 'My father'?",
    options: ["He", "She", "They", "It"],
    correct: "He",
    hint: "'My father' es masculino singular.",
    explanation: "'He' (Él) se utiliza para personas masculinas singulares."
  },

  // ACTION VERBS
  {
    id: 'ad_verb_1',
    skillId: 'action_verbs',
    type: 'listening',
    audioText: "The children jump.",
    question: "Escucha el audio y completa la acción:",
    options: ["jump (saltar)", "run (correr)", "swim (nadar)", "sing (cantar)"],
    correct: "jump (saltar)",
    hint: "Presta atención al verbo que suena.",
    explanation: "'Jump' significa saltar."
  },
  {
    id: 'ad_verb_2',
    skillId: 'action_verbs',
    type: 'spot_error',
    question: "Encuentra la palabra que NO es una acción en la lista:",
    options: ["dance", "cook", "read", "pencil"],
    correct: "pencil",
    hint: "Tres son verbos de acción y uno es un objeto escolar.",
    explanation: "'Pencil' (lápiz) es un sustantivo/objeto, mientras que los demás son verbos."
  },

  // THIRD PERSON -S
  {
    id: 'ad_3p_1',
    skillId: 'third_person_s',
    type: 'choice',
    question: "Elige la forma correcta: 'My dog ______ (run) in the park.'",
    options: ["runs", "run", "running", "is run"],
    correct: "runs",
    hint: "'My dog' equivale a 'It' (3ra persona singular).",
    explanation: "Con sujetos singulares como 'My dog', agregamos '-s' al verbo: 'runs'."
  },
  {
    id: 'ad_3p_2',
    skillId: 'third_person_s',
    type: 'spot_error',
    question: "¿Cuál oración tiene un ERROR gramatical de 3ra persona?",
    options: ["She cook every day.", "He cooks every day.", "They cook every day.", "We cook every day."],
    correct: "She cook every day.",
    hint: "Con 'She' el verbo DEBE llevar '-s'.",
    explanation: "Lo correcto es 'She cooks every day.' (falta la '-s' final)."
  },

  // SENTENCE STRUCTURE
  {
    id: 'ad_struct_1',
    skillId: 'sentence_structure',
    type: 'scramble',
    audioText: "The students write poems.",
    question: "Ordena las palabras para formar la oración:",
    words: ["poems.", "write", "students", "The"],
    correct: "The students write poems.",
    hint: "Sujeto (The students) + Verbo (write) + Objeto (poems).",
    explanation: "Patrón estándar en inglés: Sujeto + Verbo + Complemento."
  },
  {
    id: 'ad_struct_2',
    skillId: 'sentence_structure',
    type: 'choice',
    question: "¿Cuál es el Sujeto en la oración 'In the morning, Lucas reads a book.'?",
    options: ["Lucas", "In the morning", "reads", "a book"],
    correct: "Lucas",
    hint: "¿Quién es la persona que realiza la acción de leer?",
    explanation: "'Lucas' es el Sujeto porque realiza la acción del verbo 'reads'."
  },

  // CAN / CAN'T
  {
    id: 'ad_can_1',
    skillId: 'can_cant',
    type: 'listening',
    audioText: "I can swim very well.",
    question: "Escucha el audio. ¿La persona puede o no puede nadar?",
    options: ["Sí puede nadar (can)", "No puede nadar (can't)"],
    correct: "Sí puede nadar (can)",
    hint: "Escucha si dice 'can' (positivo) o 'can't' (negativo).",
    explanation: "El audio dice 'I can swim' (Puedo nadar)."
  },
  {
    id: 'ad_can_2',
    skillId: 'can_cant',
    type: 'scramble',
    audioText: "Can you speak English?",
    question: "Arma la pregunta en el orden correcto:",
    words: ["English?", "you", "Can", "speak"],
    correct: "Can you speak English?",
    hint: "En preguntas con modales, 'Can' va en primera posición.",
    explanation: "Estructura de pregunta: Can + Sujeto (you) + Verbo base (speak) + Complemento?"
  },

  // ARTICLES A / AN
  {
    id: 'ad_art_1',
    skillId: 'articles_a_an',
    type: 'choice',
    question: "Completa correctamente: 'She has ______ elephant toy and ______ cat.'",
    options: ["an / a", "a / an", "a / a", "an / an"],
    correct: "an / a",
    hint: "'elephant' empieza con vocal (E) y 'cat' con consonante (C).",
    explanation: "Usamos 'an elephant' (sonido vocal) y 'a cat' (sonido consonante)."
  },
  {
    id: 'ad_art_2',
    skillId: 'articles_a_an',
    type: 'choice',
    question: "¿Cuál opción es INCORRECTA?",
    options: ["An university / An dog", "A book / A student", "An orange / An egg", "A teacher / A car"],
    correct: "An university / An dog",
    hint: "'dog' empieza con consonante, nunca lleva 'an'.",
    explanation: "Se dice 'A dog', por lo que 'An dog' es incorrecto."
  }
];

export const calculateSkillsMastery = (progress) => {
  const mistakes = progress.mistakesLog || [];
  const unitProgress = progress.unitProgress || {};

  return MICRO_SKILLS.map(skill => {
    // Check mistakes matching this skill
    const skillMistakes = mistakes.filter(m => 
      (m.category && m.category.toLowerCase().includes(skill.id)) ||
      (m.question && m.question.toLowerCase().includes(skill.name.toLowerCase()))
    ).length;

    // Check parent unit progress
    const uProg = unitProgress[skill.unitId] || { percentage: 0, mastered: false };
    
    let basePct = uProg.percentage || 0;
    if (uProg.mastered) basePct = 95;

    // Penalize slightly per pending mistake
    const finalPct = Math.max(15, Math.min(100, basePct - (skillMistakes * 10)));

    return {
      ...skill,
      percentage: finalPct,
      pendingMistakes: skillMistakes,
      mastered: finalPct >= 85
    };
  });
};

export const generateDailyMission = (progress) => {
  const skills = calculateSkillsMastery(progress);
  const sortedSkills = [...skills].sort((a, b) => a.percentage - b.percentage);
  
  // Pick weakest skills first
  const weakestSkillId = sortedSkills[0]?.id || 'pronouns';
  const secondWeakestSkillId = sortedSkills[1]?.id || 'action_verbs';
  const masteredSkillId = sortedSkills.find(s => s.percentage >= 75)?.id || sortedSkills[sortedSkills.length - 1]?.id;

  const missionQuestions = [];

  // 2 from weakest
  const qWeak = ADAPTIVE_QUESTION_BANK.filter(q => q.skillId === weakestSkillId);
  missionQuestions.push(...qWeak.slice(0, 2));

  // 2 from second weakest
  const qSecond = ADAPTIVE_QUESTION_BANK.filter(q => q.skillId === secondWeakestSkillId && !missionQuestions.some(m => m.id === q.id));
  missionQuestions.push(...qSecond.slice(0, 2));

  // 1 spaced retention question
  const qSpaced = ADAPTIVE_QUESTION_BANK.filter(q => q.skillId === masteredSkillId && !missionQuestions.some(m => m.id === q.id));
  if (qSpaced.length > 0) {
    missionQuestions.push(qSpaced[0]);
  }

  // Fallback if less than 5
  if (missionQuestions.length < 5) {
    const remaining = ADAPTIVE_QUESTION_BANK.filter(q => !missionQuestions.some(m => m.id === q.id));
    missionQuestions.push(...remaining.slice(0, 5 - missionQuestions.length));
  }

  return {
    id: `daily_${new Date().toISOString().split('T')[0]}`,
    title: 'Misión Diaria de Refuerzo Inteligente',
    date: new Date().toISOString().split('T')[0],
    description: '5 preguntas balanceadas adaptadas a tus áreas de práctica con bonus de racha.',
    xpReward: 100,
    starsReward: 5,
    questions: missionQuestions.slice(0, 5)
  };
};

export const generateSkillDrill = (skillId, count = 5) => {
  const skill = MICRO_SKILLS.find(s => s.id === skillId);
  const questions = ADAPTIVE_QUESTION_BANK.filter(q => q.skillId === skillId);
  
  // If not enough questions in bank, supplement with related questions
  let selected = [...questions];
  if (selected.length < count) {
    const others = ADAPTIVE_QUESTION_BANK.filter(q => q.skillId !== skillId);
    selected.push(...others.slice(0, count - selected.length));
  }

  return {
    id: `drill_${skillId}_${Date.now()}`,
    skillId,
    title: `Entrenamiento: ${skill?.name || 'Habilidad'}`,
    description: `Práctica focalizada en ${skill?.tagline || 'este concepto'}.`,
    xpReward: 60,
    starsReward: 4,
    questions: selected.slice(0, count)
  };
};
