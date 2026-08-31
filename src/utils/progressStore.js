// Centralized progress and gamification store with LocalStorage persistence

const STORAGE_KEY = 'english_student_progress_v2';
const LEGACY_STARS_KEY = 'english_app_stars';

export const BADGES = [
  {
    id: 'first_step',
    name: 'Primer Paso',
    desc: 'Completaste tu primera actividad de inglés',
    icon: 'Footprints',
    color: '#3b82f6'
  },
  {
    id: 'streak_3',
    name: 'Racha Constante (3 Días)',
    desc: 'Practicaste inglés durante 3 días consecutivos',
    icon: 'Flame',
    color: '#f97316'
  },
  {
    id: 'subject_master',
    name: 'Experto en Sujetos',
    desc: 'Dominaste la Unidad 1 de Pronombres y Sujetos',
    icon: 'Crown',
    color: '#8b5cf6'
  },
  {
    id: 'action_hero',
    name: 'Héroe de la Acción',
    desc: 'Dominaste la Unidad 2 de Verbos de Acción',
    icon: 'Zap',
    color: '#10b981'
  },
  {
    id: 'sentence_architect',
    name: 'Arquitecto de Oraciones',
    desc: 'Dominaste la Unidad 3 de Oraciones Simples',
    icon: 'Layers',
    color: '#ec4899'
  },
  {
    id: 'can_do_attitude',
    name: '¡Yo Puedo! (Can & Can\'t)',
    desc: 'Dominaste la Unidad 4 de Habilidades y Modales',
    icon: 'Sparkles',
    color: '#eab308'
  },
  {
    id: 'perfect_score',
    name: 'Puntaje Perfecto',
    desc: 'Terminaste una actividad con 100% de aciertos en el primer intento',
    icon: 'Trophy',
    color: '#f59e0b'
  },
  {
    id: 'error_slayer',
    name: 'Superando Desafíos',
    desc: 'Repasaste y corregiste tus preguntas erróneas en el panel de repaso',
    icon: 'ShieldCheck',
    color: '#06b6d4'
  }
];

export const getInitialProgress = () => {
  const legacyStars = parseInt(localStorage.getItem(LEGACY_STARS_KEY) || '0', 10);
  
  return {
    studentName: 'Estudiante',
    stars: legacyStars,
    xp: legacyStars * 15,
    level: Math.floor((legacyStars * 15) / 100) + 1,
    currentStreak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    unitProgress: {
      'unit-1': { completed: false, percentage: 0, levelsCompleted: [] },
      'unit-2': { completed: false, percentage: 0, levelsCompleted: [] },
      'unit-3': { completed: false, percentage: 0, levelsCompleted: [] },
      'unit-4': { completed: false, percentage: 0, levelsCompleted: [] }
    },
    activityStats: {},
    unlockedBadges: legacyStars > 0 ? ['first_step'] : [],
    mistakesLog: [],
    history: []
  };
};

export const loadProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialProgress();
      saveProgress(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    return { ...getInitialProgress(), ...parsed };
  } catch (e) {
    console.error('Error loading progress:', e);
    return getInitialProgress();
  }
};

export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    // Keep legacy stars in sync for backward compatibility
    localStorage.setItem(LEGACY_STARS_KEY, (progress.stars || 0).toString());
  } catch (e) {
    console.error('Error saving progress:', e);
  }
};

export const updateStreak = (currentProgress) => {
  const today = new Date().toISOString().split('T')[0];
  const last = currentProgress.lastActiveDate;

  if (!last) {
    return { ...currentProgress, lastActiveDate: today, currentStreak: 1 };
  }

  if (last === today) {
    return currentProgress; // Already counted today
  }

  const lastDate = new Date(last);
  const nowDate = new Date(today);
  const diffDays = Math.round((nowDate - lastDate) / (1000 * 60 * 60 * 24));

  let newStreak = currentProgress.currentStreak || 1;
  if (diffDays === 1) {
    newStreak += 1;
  } else if (diffDays > 1) {
    newStreak = 1; // Reset streak
  }

  let unlockedBadges = [...(currentProgress.unlockedBadges || [])];
  if (newStreak >= 3 && !unlockedBadges.includes('streak_3')) {
    unlockedBadges.push('streak_3');
  }

  const updated = {
    ...currentProgress,
    lastActiveDate: today,
    currentStreak: newStreak,
    unlockedBadges
  };

  saveProgress(updated);
  return updated;
};

export const recordActivityAttempt = ({
  unitId,
  levelId,
  activityId,
  correctCount,
  totalCount,
  starsEarned = 0,
  xpEarned = 0,
  mistakes = []
}) => {
  let progress = loadProgress();
  progress = updateStreak(progress);

  const newStars = (progress.stars || 0) + starsEarned;
  const newXp = (progress.xp || 0) + xpEarned;
  const newLevel = Math.floor(newXp / 100) + 1;

  let unlockedBadges = [...(progress.unlockedBadges || [])];
  if (!unlockedBadges.includes('first_step')) {
    unlockedBadges.push('first_step');
  }
  if (correctCount === totalCount && totalCount > 0 && !unlockedBadges.includes('perfect_score')) {
    unlockedBadges.push('perfect_score');
  }

  // Update unit progress
  const unitProgress = { ...progress.unitProgress };
  if (unitId) {
    const currentUnit = unitProgress[unitId] || { completed: false, percentage: 0, levelsCompleted: [] };
    const levelsCompleted = new Set(currentUnit.levelsCompleted || []);
    if (levelId && correctCount >= Math.ceil(totalCount * 0.6)) {
      levelsCompleted.add(levelId);
    }

    const totalLevels = 3;
    const completedCount = levelsCompleted.size;
    const percentage = Math.min(100, Math.round((completedCount / totalLevels) * 100));

    unitProgress[unitId] = {
      completed: percentage === 100,
      percentage,
      levelsCompleted: Array.from(levelsCompleted)
    };

    // Check unit mastery badges
    if (percentage === 100) {
      if (unitId === 'unit-1' && !unlockedBadges.includes('subject_master')) unlockedBadges.push('subject_master');
      if (unitId === 'unit-2' && !unlockedBadges.includes('action_hero')) unlockedBadges.push('action_hero');
      if (unitId === 'unit-3' && !unlockedBadges.includes('sentence_architect')) unlockedBadges.push('sentence_architect');
      if (unitId === 'unit-4' && !unlockedBadges.includes('can_do_attitude')) unlockedBadges.push('can_do_attitude');
    }
  }

  // Update mistake log
  let mistakesLog = [...(progress.mistakesLog || [])];
  if (mistakes && mistakes.length > 0) {
    mistakes.forEach(m => {
      if (!mistakesLog.some(existing => existing.id === m.id)) {
        mistakesLog.push({ ...m, timestamp: Date.now() });
      }
    });
  }

  // Update activity stats
  const activityStats = { ...progress.activityStats };
  const currentStat = activityStats[activityId] || { attempts: 0, bestScore: 0 };
  activityStats[activityId] = {
    attempts: currentStat.attempts + 1,
    bestScore: Math.max(currentStat.bestScore, Math.round((correctCount / (totalCount || 1)) * 100)),
    lastPlayed: new Date().toISOString()
  };

  const updatedProgress = {
    ...progress,
    stars: newStars,
    xp: newXp,
    level: newLevel,
    unlockedBadges,
    unitProgress,
    mistakesLog,
    activityStats
  };

  saveProgress(updatedProgress);
  return updatedProgress;
};

export const clearResolvedMistake = (mistakeId) => {
  let progress = loadProgress();
  const filtered = (progress.mistakesLog || []).filter(m => m.id !== mistakeId);
  let unlockedBadges = [...(progress.unlockedBadges || [])];
  if (!unlockedBadges.includes('error_slayer')) {
    unlockedBadges.push('error_slayer');
  }
  const updated = {
    ...progress,
    mistakesLog: filtered,
    unlockedBadges
  };
  saveProgress(updated);
  return updated;
};

export const generateStudentReport = (studentName = 'Estudiante') => {
  const progress = loadProgress();
  const date = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    studentName: studentName || progress.studentName || 'Estudiante',
    date,
    level: progress.level,
    xp: progress.xp,
    stars: progress.stars,
    streak: progress.currentStreak,
    unitProgress: progress.unitProgress,
    badges: BADGES.filter(b => (progress.unlockedBadges || []).includes(b.id)),
    totalMistakesToReview: (progress.mistakesLog || []).length,
    activityStats: progress.activityStats
  };
};
