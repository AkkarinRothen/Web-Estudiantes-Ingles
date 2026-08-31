export const CAN_CANT_ITEMS = [
  { sentence: "A fish ______ swim.", correct: "can", hint: "Un pez tiene la habilidad de nadar" },
  { sentence: "A bird ______ fly.", correct: "can", hint: "Un pájaro puede volar" },
  { sentence: "A dog ______ read.", correct: "can't", hint: "Un perro NO puede leer" },
  { sentence: "A teacher ______ write.", correct: "can", hint: "Un maestro puede escribir" },
  { sentence: "A baby ______ drive a car.", correct: "can't", hint: "Un bebé NO puede manejar" },
  { sentence: "A singer ______ sing.", correct: "can", hint: "Un cantante puede cantar" },
  { sentence: "A cat ______ cook.", correct: "can't", hint: "Un gato NO puede cocinar" },
  { sentence: "A student ______ study.", correct: "can", hint: "Un estudiante puede estudiar" }
];

export const STRUCTURE_ITEMS = [
  {
    base: "I can swim.",
    positive: "I can swim.",
    negative: "I can't swim.",
    interrogative: "Can I swim?"
  },
  {
    base: "She can dance.",
    positive: "She can dance.",
    negative: "She can't dance.",
    interrogative: "Can she dance?"
  },
  {
    base: "He can't cook.",
    positive: "He can cook.",
    negative: "He can't cook.",
    interrogative: "Can he cook?"
  },
  {
    base: "Can they sing?",
    positive: "They can sing.",
    negative: "They can't sing.",
    interrogative: "Can they sing?"
  },
  {
    base: "We can read.",
    positive: "We can read.",
    negative: "We can't read.",
    interrogative: "Can we read?"
  }
];

export const SENTENCE_ELEMENTS_ITEMS = [
  { fullSentence: "I swim.", subject: "I", verb: "swim" },
  { fullSentence: "She sings.", subject: "She", verb: "sings" },
  { fullSentence: "They dance.", subject: "They", verb: "dance" },
  { fullSentence: "He cooks.", subject: "He", verb: "cooks" },
  { fullSentence: "We study.", subject: "We", verb: "study" },
  { fullSentence: "The dog runs.", subject: "The dog", verb: "runs" },
  { fullSentence: "My mother reads.", subject: "My mother", verb: "reads" },
  { fullSentence: "The students write.", subject: "The students", verb: "write" }
];

export const SUBJECT_OR_VERB_ITEMS = [
  { word: "she", type: "S", label: "Subject" },
  { word: "run", type: "V", label: "Verb" },
  { word: "the dog", type: "S", label: "Subject" },
  { word: "cook", type: "V", label: "Verb" },
  { word: "my sister", type: "S", label: "Subject" },
  { word: "dance", type: "V", label: "Verb" },
  { word: "they", type: "S", label: "Subject" },
  { word: "study", type: "V", label: "Verb" }
];

export const BUILD_SENTENCE_EXAMPLES = [
  { subject: "my sister", verb: "dance", result: "My sister dances." },
  { subject: "the dog", verb: "run", result: "The dog runs." },
  { subject: "she", verb: "cook", result: "She cooks." },
  { subject: "they", verb: "study", result: "They study." }
];

export const INTRUDER_ITEMS = [
  {
    question: "Which word is NOT a subject? (¿Cuál NO es un sujeto?)",
    options: ["she", "they", "run", "my brother"],
    intruder: "run",
    reason: "'run' es un Verbo (acción), no un Sujeto."
  },
  {
    question: "Which word is NOT a subject? (¿Cuál NO es un sujeto?)",
    options: ["the dog", "cook", "I", "we"],
    intruder: "cook",
    reason: "'cook' es un Verbo (cocinar), no un Sujeto."
  },
  {
    question: "Which word is NOT a subject? (¿Cuál NO es un sujeto?)",
    options: ["he", "my mother", "the students", "swim"],
    intruder: "swim",
    reason: "'swim' es un Verbo (nadar), no un Sujeto."
  },
  {
    question: "Which word is NOT a verb? (¿Cuál NO es un verbo?)",
    options: ["run", "swim", "she", "dance"],
    intruder: "she",
    reason: "'she' es un Pronombre / Sujeto (Ella), no un Verbo."
  },
  {
    question: "Which word is NOT a verb? (¿Cuál NO es un verbo?)",
    options: ["cook", "read", "study", "my brother"],
    intruder: "my brother",
    reason: "'my brother' es un Sujeto (Mi hermano), no un Verbo."
  }
];

export const WHO_WHAT_ITEMS = [
  {
    sentence: "The girl dances.",
    who: "The girl",
    verb: "dances",
    type: "action",
    typeLabel: "Acción (action)"
  },
  {
    sentence: "My brother reads.",
    who: "My brother",
    verb: "reads",
    type: "action",
    typeLabel: "Acción (action)"
  },
  {
    sentence: "The students write.",
    who: "The students",
    verb: "write",
    type: "action",
    typeLabel: "Acción (action)"
  },
  {
    sentence: "The dog runs.",
    who: "The dog",
    verb: "runs",
    type: "action",
    typeLabel: "Acción (action)"
  },
  {
    sentence: "She is happy.",
    who: "She",
    verb: "is",
    type: "state",
    typeLabel: "Estado (state)"
  }
];
