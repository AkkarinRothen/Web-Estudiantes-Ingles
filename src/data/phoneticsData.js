// Complete 14 English Vowel Sounds Data for Phonetics & Spelling Lab
// Based on Great Writing: Foundations Vowel Sounds Curriculum

export const VOWEL_SOUNDS = [
  {
    id: 'ae_cat',
    symbol: '/æ/',
    sampleWord: 'Cat',
    name: 'Sonido "A" corta (Abierta)',
    articulation: 'Abre la boca como si fueras a decir una "A" amplia en español, pero tensa un poco la lengua hacia adelante como una "E".',
    spellingPatterns: ['a (en sílabas cerradas con consonante: cat, map, black)'],
    examples: [
      { word: 'cat', translation: 'gato' },
      { word: 'map', translation: 'mapa' },
      { word: 'black', translation: 'negro' },
      { word: 'hand', translation: 'mano' },
      { word: 'apple', translation: 'manzana' },
      { word: 'family', translation: 'familia' }
    ],
    unitReference: 'Unidad 1: Sentences'
  },
  {
    id: 'e_bed',
    symbol: '/ɛ/',
    sampleWord: 'Bed',
    name: 'Sonido "E" corta',
    articulation: 'Similar a la "E" en español ("mesa"), con los labios relajados y la mandíbula ligeramente abierta.',
    spellingPatterns: ['e (en sílabas cerradas: bed, pen, red)', 'ea (en palabras comunes: head, bread)'],
    examples: [
      { word: 'bed', translation: 'cama' },
      { word: 'pen', translation: 'bolígrafo' },
      { word: 'red', translation: 'rojo' },
      { word: 'desk', translation: 'escritorio' },
      { word: 'bread', translation: 'pan' },
      { word: 'ten', translation: 'diez' }
    ],
    unitReference: 'Unidad 2: Simple Present of Be'
  },
  {
    id: 'i_fish',
    symbol: '/ɪ/',
    sampleWord: 'Fish',
    name: 'Sonido "I" corta y relajada',
    articulation: 'No es la "I" tensa del español. Deja la lengua relajada en el centro de la boca, sonando casi como un punto medio entre "I" y "E".',
    spellingPatterns: ['i (en sílabas cerradas: fish, sit, big, list)'],
    examples: [
      { word: 'fish', translation: 'pez' },
      { word: 'sit', translation: 'sentarse' },
      { word: 'big', translation: 'grande' },
      { word: 'list', translation: 'lista' },
      { word: 'swim', translation: 'nadar' },
      { word: 'live', translation: 'vivir' }
    ],
    unitReference: 'Unidad 3: The Simple Present'
  },
  {
    id: 'a_hot',
    symbol: '/ɑ/',
    sampleWord: 'Hot',
    name: 'Sonido "O/A" abierta posterior',
    articulation: 'Abre la mandíbula hacia abajo como cuando el médico te examina la garganta diciendo "Ah".',
    spellingPatterns: ['o (en sílabas cortas: hot, box, stop)', 'a (tras w/qu: wash, watch)'],
    examples: [
      { word: 'hot', translation: 'caliente' },
      { word: 'clock', translation: 'reloj' },
      { word: 'box', translation: 'caja' },
      { word: 'stop', translation: 'detenerse' },
      { word: 'doctor', translation: 'médico' },
      { word: 'job', translation: 'trabajo' }
    ],
    unitReference: 'Unidad 4: Nouns'
  },
  {
    id: 'u_cup',
    symbol: '/ʌ/',
    sampleWord: 'Cup',
    name: 'Sonido "U/A" corta gutural',
    articulation: 'Sonido corto y neutro que sale desde la garganta con la boca relajada y casi sin mover los labios.',
    spellingPatterns: ['u (en sílabas cerradas: cup, bus, sun, run)', 'o (en palabras comunes: son, love, money)'],
    examples: [
      { word: 'cup', translation: 'taza' },
      { word: 'bus', translation: 'autobús' },
      { word: 'sun', translation: 'sol' },
      { word: 'run', translation: 'correr' },
      { word: 'mother', translation: 'madre' },
      { word: 'love', translation: 'amor' }
    ],
    unitReference: 'Unidad 5: Pronouns'
  },
  {
    id: 'ei_cake',
    symbol: '/eɪ/',
    sampleWord: 'Cake',
    name: 'Diptongo "EI" (A larga)',
    articulation: 'Comienza en una "E" clara y desliza suavemente hacia una "I" cerrada.',
    spellingPatterns: ['a_e (cake, name, late)', 'ai (rain, train)', 'ay (play, day)'],
    examples: [
      { word: 'cake', translation: 'pastel' },
      { word: 'name', translation: 'nombre' },
      { word: 'train', translation: 'tren' },
      { word: 'play', translation: 'jugar' },
      { word: 'today', translation: 'hoy' },
      { word: 'paper', translation: 'papel' }
    ],
    unitReference: 'Unidad 6: Adjectives'
  },
  {
    id: 'i_eat',
    symbol: '/i/',
    sampleWord: 'Eat',
    name: 'Sonido "I" larga y tensa (Sonrisa)',
    articulation: 'Estira las comisuras de los labios en una amplia sonrisa y mantén la lengua tensa contra el paladar.',
    spellingPatterns: ['ea (eat, teach, read)', 'ee (see, meet, tree)', 'y final (happy, city)'],
    examples: [
      { word: 'eat', translation: 'comer' },
      { word: 'see', translation: 'ver' },
      { word: 'team', translation: 'equipo' },
      { word: 'read', translation: 'leer' },
      { word: 'happy', translation: 'feliz' },
      { word: 'green', translation: 'verde' }
    ],
    unitReference: 'Unidad 7: The Conjunction And'
  },
  {
    id: 'ai_rice',
    symbol: '/aɪ/',
    sampleWord: 'Rice',
    name: 'Diptongo "AI" (I larga)',
    articulation: 'Comienza con la boca bien abierta en "A" y desliza rápidamente hacia la "I".',
    spellingPatterns: ['i_e (rice, time, white)', 'igh (night, light)', 'y (fly, my, try)'],
    examples: [
      { word: 'rice', translation: 'arroz' },
      { word: 'time', translation: 'tiempo' },
      { word: 'night', translation: 'noche' },
      { word: 'white', translation: 'blanco' },
      { word: 'fly', translation: 'volar' },
      { word: 'write', translation: 'escribir' }
    ],
    unitReference: 'Unidad 8: Articles'
  },
  {
    id: 'ou_hello',
    symbol: '/oʊ/',
    sampleWord: 'Hello',
    name: 'Diptongo "OU" (O larga)',
    articulation: 'Comienza en una "O" redondeada y cierra los labios hacia una "U" pequeña.',
    spellingPatterns: ['o_e (home, phone)', 'oa (boat, coat)', 'ow (snow, yellow)', 'o final (go, hello)'],
    examples: [
      { word: 'hello', translation: 'hola' },
      { word: 'go', translation: 'ir' },
      { word: 'boat', translation: 'bote' },
      { word: 'home', translation: 'hogar' },
      { word: 'snow', translation: 'nieve' },
      { word: 'open', translation: 'abrir' }
    ],
    unitReference: 'Unidad 9: Prepositions'
  },
  {
    id: 'u_school',
    symbol: '/u/',
    sampleWord: 'School',
    name: 'Sonido "U" larga y tensa',
    articulation: 'Redondea los labios hacia adelante como para dar un beso, manteniendo el sonido prolongado.',
    spellingPatterns: ['oo (school, moon, food)', 'u_e (rule, tune)', 'ue/ew (blue, new)'],
    examples: [
      { word: 'school', translation: 'escuela' },
      { word: 'blue', translation: 'azul' },
      { word: 'moon', translation: 'luna' },
      { word: 'food', translation: 'comida' },
      { word: 'music', translation: 'música' },
      { word: 'room', translation: 'habitación' }
    ],
    unitReference: 'Unidad 10: Simple & Compound Sentences'
  },
  {
    id: 'aw_straw',
    symbol: '/ɔ/',
    sampleWord: 'Straw',
    name: 'Sonido "O" profunda / alargada',
    articulation: 'Boca abierta en forma ovalada vertical, con la lengua abajo y hacia atrás.',
    spellingPatterns: ['aw (straw, draw, law)', 'au (autumn, August)', 'al/all (tall, call, walk)'],
    examples: [
      { word: 'straw', translation: 'pajita / paja' },
      { word: 'draw', translation: 'dibujar' },
      { word: 'call', translation: 'llamar' },
      { word: 'water', translation: 'agua' },
      { word: 'autumn', translation: 'otoño' },
      { word: 'tall', translation: 'alto' }
    ],
    unitReference: 'Unidad 11: The Simple Past'
  },
  {
    id: 'oo_wood',
    symbol: '/ʊ/',
    sampleWord: 'Wood',
    name: 'Sonido "U" corta y relajada',
    articulation: 'Los labios están ligeramente redondeados pero relajados, sonido corto sin tensar.',
    spellingPatterns: ['oo (wood, book, good, look)', 'u (put, push, pull)'],
    examples: [
      { word: 'wood', translation: 'madera' },
      { word: 'book', translation: 'libro' },
      { word: 'good', translation: 'bueno' },
      { word: 'look', translation: 'mirar' },
      { word: 'foot', translation: 'pie' },
      { word: 'cook', translation: 'cocinar' }
    ],
    unitReference: 'Unidad 12: Complex Sentences'
  },
  {
    id: 'au_flower',
    symbol: '/aʊ/',
    sampleWord: 'Flower',
    name: 'Diptongo "AU"',
    articulation: 'Comienza en "A" amplia y desliza redondeando los labios hacia una "U".',
    spellingPatterns: ['ou (house, out, sound, cloud)', 'ow (flower, cow, brown, now)'],
    examples: [
      { word: 'flower', translation: 'flor' },
      { word: 'house', translation: 'casa' },
      { word: 'out', translation: 'afuera' },
      { word: 'cloud', translation: 'nube' },
      { word: 'now', translation: 'ahora' },
      { word: 'town', translation: 'ciudad' }
    ],
    unitReference: 'Unidad 13: Adverbs'
  },
  {
    id: 'oi_boy',
    symbol: '/ɔɪ/',
    sampleWord: 'Boy',
    name: 'Diptongo "OI"',
    articulation: 'Comienza con la "O" abierta redondeada y sube hacia una "I" cerrada y clara.',
    spellingPatterns: ['oy (boy, toy, enjoy)', 'oi (coin, oil, point, noise)'],
    examples: [
      { word: 'boy', translation: 'niño' },
      { word: 'toy', translation: 'juguete' },
      { word: 'coin', translation: 'moneda' },
      { word: 'oil', translation: 'aceite' },
      { word: 'point', translation: 'apuntar' },
      { word: 'voice', translation: 'voz' }
    ],
    unitReference: 'Unidad 14: Present Progressive'
  }
];

export const MINIMAL_PAIRS_DRILLS = [
  {
    id: 'mp_1',
    soundA: '/ɪ/ (Corta)',
    soundB: '/i/ (Larga)',
    audioWord: 'ship',
    options: ['ship (/ɪ/ barco)', 'sheep (/i/ oveja)'],
    correct: 'ship (/ɪ/ barco)',
    explanation: "'Ship' usa la vocal corta /ɪ/, mientras que 'sheep' usa la vocal larga tensa /i/."
  },
  {
    id: 'mp_2',
    soundA: '/æ/ (Cat)',
    soundB: '/ʌ/ (Cup)',
    audioWord: 'cat',
    options: ['cat (/æ/ gato)', 'cut (/ʌ/ cortar)'],
    correct: 'cat (/æ/ gato)',
    explanation: "'Cat' abre la boca hacia adelante /æ/, mientras que 'cut' es un sonido gutural neutro /ʌ/."
  },
  {
    id: 'mp_3',
    soundA: '/ɛ/ (Bed)',
    soundB: '/æ/ (Bad)',
    audioWord: 'bed',
    options: ['bed (/ɛ/ cama)', 'bad (/æ/ malo)'],
    correct: 'bed (/ɛ/ cama)',
    explanation: "'Bed' tiene la 'E' corta /ɛ/, y 'bad' requiere abrir más la mandíbula en /æ/."
  },
  {
    id: 'mp_4',
    soundA: '/ʊ/ (Wood)',
    soundB: '/u/ (School)',
    audioWord: 'look',
    options: ['look (/ʊ/ mirar)', 'Luke (/u/ Lucas)'],
    correct: 'look (/ʊ/ mirar)',
    explanation: "'Look' es la 'U' relajada corta /ʊ/, mientras 'Luke' es la 'U' tensa prolongada /u/."
  },
  {
    id: 'mp_5',
    soundA: '/ɑ/ (Hot)',
    soundB: '/ʌ/ (Hut)',
    audioWord: 'hot',
    options: ['hot (/ɑ/ caliente)', 'hut (/ʌ/ choza)'],
    correct: 'hot (/ɑ/ caliente)',
    explanation: "'Hot' abre la boca hacia abajo en /ɑ/, mientras 'hut' es corta y central /ʌ/."
  }
];
