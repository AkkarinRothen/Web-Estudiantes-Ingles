// Teacher Content Manager & Custom Packages Store

const PACKAGES_KEY = 'english_teacher_packages_v1';

export const TEMPLATE_TYPES = [
  {
    type: 'choice',
    name: 'Opción Múltiple',
    desc: 'Pregunta con 4 opciones y explicación pedagógica',
    defaultData: {
      question: '¿Cuál es la forma correcta?',
      options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
      correct: 'Opción A',
      hint: 'Pista para ayudar al estudiante...',
      explanation: 'Explicación detallada de la regla...'
    }
  },
  {
    type: 'listening',
    name: 'Comprensión Auditiva (Listening)',
    desc: 'Audio audible con opciones de respuesta o transcripción',
    defaultData: {
      audioText: 'She reads a good book.',
      question: 'Escucha el audio y selecciona la opción correcta:',
      options: ['Ella lee un buen libro.', 'Ella escribe un libro.', 'Él lee un buen libro.', 'Ellos leen un libro.'],
      correct: 'Ella lee un buen libro.',
      hint: 'Presta atención al sujeto y al verbo.',
      explanation: "'She' es Ella y 'reads' es lee."
    }
  },
  {
    type: 'scramble',
    name: 'Ordenar Palabras (Scramble)',
    desc: 'Palabras desordenadas para que el alumno arme la oración',
    defaultData: {
      question: 'Ordena las palabras para formar la oración:',
      words: ['school.', 'They', 'go', 'to'],
      correct: 'They go to school.',
      hint: 'El sujeto va al inicio de la frase.',
      explanation: 'Sujeto (They) + Verbo (go) + Complemento (to school).'
    }
  },
  {
    type: 'spot_error',
    name: 'Detector de Errores',
    desc: 'Identificar la palabra u oración con error gramatical',
    defaultData: {
      question: '¿Cuál opción contiene un error gramatical?',
      options: ['He run fast.', 'He runs fast.', 'They run fast.', 'We run fast.'],
      correct: 'He run fast.',
      hint: 'Recuerda la regla de la 3ra persona singular (-s).',
      explanation: "Con 'He' se debe agregar -s: 'He runs fast.'."
    }
  }
];

export const getCustomPackages = () => {
  try {
    const raw = localStorage.getItem(PACKAGES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading custom packages:', e);
    return [];
  }
};

export const saveCustomPackage = (pkg) => {
  try {
    const list = getCustomPackages();
    const existingIdx = list.findIndex(p => p.id === pkg.id);
    if (existingIdx !== -1) {
      list[existingIdx] = { ...pkg, updatedAt: new Date().toISOString() };
    } else {
      list.push({ ...pkg, createdAt: new Date().toISOString() });
    }
    localStorage.setItem(PACKAGES_KEY, JSON.stringify(list));
    return list;
  } catch (e) {
    console.error('Error saving custom package:', e);
    return [];
  }
};

export const deleteCustomPackage = (pkgId) => {
  try {
    let list = getCustomPackages();
    list = list.filter(p => p.id !== pkgId);
    localStorage.setItem(PACKAGES_KEY, JSON.stringify(list));
    return list;
  } catch (e) {
    console.error('Error deleting package:', e);
    return [];
  }
};

export const validatePackageSchema = (data) => {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'El archivo no contiene un objeto JSON válido.' };
  }
  if (!data.title || typeof data.title !== 'string') {
    return { valid: false, error: 'Falta el título de la tarea o lección.' };
  }
  if (!Array.isArray(data.items) || data.items.length === 0) {
    return { valid: false, error: 'El paquete debe contener al menos 1 ejercicio o pregunta.' };
  }
  return { valid: true };
};

export const exportPackageJSON = (pkg) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pkg, null, 2));
  const a = document.createElement('a');
  a.href = dataStr;
  a.download = `tarea_docente_${pkg.title.toLowerCase().replace(/\s+/g, '_')}_v${pkg.version || 1}.json`;
  a.click();
  a.remove();
};

export const importPackageJSON = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    const validation = validatePackageSchema(data);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    const newPkg = {
      ...data,
      id: data.id || `pkg_${Date.now()}`,
      importedAt: new Date().toISOString()
    };
    saveCustomPackage(newPkg);
    return { success: true, package: newPkg };
  } catch (err) {
    return { success: false, error: `Error de lectura: ${err.message}` };
  }
};
