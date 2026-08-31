// Centralized multi-profile progress and gamification store with LocalStorage persistence

const PROFILES_LIST_KEY = 'english_student_profiles_list';
const ACTIVE_PROFILE_KEY = 'english_student_active_profile_id';
const LEGACY_STARS_KEY = 'english_app_stars';
const HAS_SEEN_ONBOARDING_KEY = 'english_student_seen_onboarding';

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
    name: 'Maestría en Sujetos',
    desc: 'Superaste el Desafío Maestro de la Unidad 1 con ≥70% de precisión',
    icon: 'Crown',
    color: '#8b5cf6'
  },
  {
    id: 'action_hero',
    name: 'Maestría en Acciones',
    desc: 'Superaste el Desafío Maestro de la Unidad 2 con ≥70% de precisión',
    icon: 'Zap',
    color: '#10b981'
  },
  {
    id: 'sentence_architect',
    name: 'Maestría en Oraciones',
    desc: 'Superaste el Desafío Maestro de la Unidad 3 con ≥70% de precisión',
    icon: 'Layers',
    color: '#ec4899'
  },
  {
    id: 'can_do_attitude',
    name: 'Maestría en Habilidades',
    desc: 'Superaste el Desafío Maestro de la Unidad 4 con ≥70% de precisión',
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

export const getInitialProfile = (name = 'Estudiante', id = null) => {
  const profileId = id || `profile_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const legacyStars = parseInt(localStorage.getItem(LEGACY_STARS_KEY) || '0', 10);
  
  return {
    id: profileId,
    studentName: name,
    avatar: '🎓',
    createdAt: new Date().toISOString(),
    stars: legacyStars,
    xp: legacyStars * 15,
    level: Math.floor((legacyStars * 15) / 100) + 1,
    currentStreak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    unitProgress: {
      'unit-1': { completed: false, percentage: 0, levelsCompleted: [], challengeScore: null, mastered: false },
      'unit-2': { completed: false, percentage: 0, levelsCompleted: [], challengeScore: null, mastered: false },
      'unit-3': { completed: false, percentage: 0, levelsCompleted: [], challengeScore: null, mastered: false },
      'unit-4': { completed: false, percentage: 0, levelsCompleted: [], challengeScore: null, mastered: false }
    },
    activityStats: {},
    unlockedBadges: legacyStars > 0 ? ['first_step'] : [],
    mistakesLog: [],
    sessionsLog: [] // Array of { timestamp, unitId, levelId, correctCount, totalCount, durationSecs }
  };
};

export const getProfilesList = () => {
  try {
    const raw = localStorage.getItem(PROFILES_LIST_KEY);
    if (!raw) {
      const defaultProf = getInitialProfile('Estudiante', 'default_profile');
      const list = [{ id: defaultProf.id, name: defaultProf.studentName, avatar: defaultProf.avatar }];
      localStorage.setItem(PROFILES_LIST_KEY, JSON.stringify(list));
      localStorage.setItem(ACTIVE_PROFILE_KEY, defaultProf.id);
      saveProfileData(defaultProf);
      return list;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading profiles list:', e);
    return [{ id: 'default_profile', name: 'Estudiante', avatar: '🎓' }];
  }
};

export const getActiveProfileId = () => {
  const activeId = localStorage.getItem(ACTIVE_PROFILE_KEY);
  if (activeId) return activeId;
  const list = getProfilesList();
  const firstId = list[0]?.id || 'default_profile';
  localStorage.setItem(ACTIVE_PROFILE_KEY, firstId);
  return firstId;
};

export const saveProfileData = (profileData) => {
  try {
    const profileKey = `english_profile_data_${profileData.id}`;
    localStorage.setItem(profileKey, JSON.stringify(profileData));
    
    // Keep profiles list metadata updated
    const list = getProfilesList();
    const idx = list.findIndex(p => p.id === profileData.id);
    if (idx !== -1) {
      list[idx] = { id: profileData.id, name: profileData.studentName, avatar: profileData.avatar || '🎓' };
    } else {
      list.push({ id: profileData.id, name: profileData.studentName, avatar: profileData.avatar || '🎓' });
    }
    localStorage.setItem(PROFILES_LIST_KEY, JSON.stringify(list));
    localStorage.setItem(LEGACY_STARS_KEY, (profileData.stars || 0).toString());
  } catch (e) {
    console.error('Error saving profile data:', e);
  }
};

export const loadProgress = () => {
  try {
    const activeId = getActiveProfileId();
    const profileKey = `english_profile_data_${activeId}`;
    const raw = localStorage.getItem(profileKey);
    if (!raw) {
      const initial = getInitialProfile('Estudiante', activeId);
      saveProfileData(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    return { ...getInitialProfile(parsed.studentName || 'Estudiante', activeId), ...parsed };
  } catch (e) {
    console.error('Error loading active profile:', e);
    return getInitialProfile('Estudiante', 'default_profile');
  }
};

export const saveProgress = (progress) => {
  saveProfileData(progress);
};

export const createNewProfile = (studentName, avatar = '⭐') => {
  const newProf = getInitialProfile(studentName);
  newProf.avatar = avatar;
  saveProfileData(newProf);
  localStorage.setItem(ACTIVE_PROFILE_KEY, newProf.id);
  return newProf;
};

export const switchActiveProfile = (profileId) => {
  localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);
  return loadProgress();
};

export const deleteProfile = (profileId) => {
  let list = getProfilesList();
  list = list.filter(p => p.id !== profileId);
  localStorage.removeItem(`english_profile_data_${profileId}`);
  
  if (list.length === 0) {
    const fallback = getInitialProfile('Estudiante', 'default_profile');
    list = [{ id: fallback.id, name: fallback.studentName, avatar: fallback.avatar }];
    saveProfileData(fallback);
  }
  
  localStorage.setItem(PROFILES_LIST_KEY, JSON.stringify(list));
  localStorage.setItem(ACTIVE_PROFILE_KEY, list[0].id);
  return loadProgress();
};

export const hasSeenOnboarding = () => {
  return localStorage.getItem(HAS_SEEN_ONBOARDING_KEY) === 'true';
};

export const markOnboardingAsSeen = () => {
  localStorage.setItem(HAS_SEEN_ONBOARDING_KEY, 'true');
};

export const updateStreak = (currentProgress) => {
  const today = new Date().toISOString().split('T')[0];
  const last = currentProgress.lastActiveDate;

  if (!last) {
    return { ...currentProgress, lastActiveDate: today, currentStreak: 1 };
  }

  if (last === today) {
    return currentProgress;
  }

  const lastDate = new Date(last);
  const nowDate = new Date(today);
  const diffDays = Math.round((nowDate - lastDate) / (1000 * 60 * 60 * 24));

  let newStreak = currentProgress.currentStreak || 1;
  if (diffDays === 1) {
    newStreak += 1;
  } else if (diffDays > 1) {
    newStreak = 1;
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
  mistakes = [],
  isMasterChallenge = false,
  isDailyMission = false
}) => {
  let progress = loadProgress();
  progress = updateStreak(progress);

  const newStars = (progress.stars || 0) + starsEarned;
  const newXp = (progress.xp || 0) + xpEarned;
  const newLevel = Math.floor(newXp / 100) + 1;
  const accuracy = Math.round((correctCount / (totalCount || 1)) * 100);

  let unlockedBadges = [...(progress.unlockedBadges || [])];
  if (!unlockedBadges.includes('first_step')) {
    unlockedBadges.push('first_step');
  }
  if (correctCount === totalCount && totalCount > 0 && !unlockedBadges.includes('perfect_score')) {
    unlockedBadges.push('perfect_score');
  }

  // Update unit progress & challenges
  const unitProgress = { ...progress.unitProgress };
  if (unitId) {
    const currentUnit = unitProgress[unitId] || { completed: false, percentage: 0, levelsCompleted: [], challengeScore: null, mastered: false };
    const levelsCompleted = new Set(currentUnit.levelsCompleted || []);
    
    if (levelId && accuracy >= 60 && !isMasterChallenge) {
      levelsCompleted.add(levelId);
    }

    let isMastered = currentUnit.mastered || false;
    let challengeScore = currentUnit.challengeScore;

    if (isMasterChallenge) {
      challengeScore = accuracy;
      if (accuracy >= 70) {
        isMastered = true;
        // Grant unit mastery badge
        if (unitId === 'unit-1' && !unlockedBadges.includes('subject_master')) unlockedBadges.push('subject_master');
        if (unitId === 'unit-2' && !unlockedBadges.includes('action_hero')) unlockedBadges.push('action_hero');
        if (unitId === 'unit-3' && !unlockedBadges.includes('sentence_architect')) unlockedBadges.push('sentence_architect');
        if (unitId === 'unit-4' && !unlockedBadges.includes('can_do_attitude')) unlockedBadges.push('can_do_attitude');
      }
    }

    const totalLevels = 3;
    const completedCount = levelsCompleted.size;
    let percentage = Math.min(90, Math.round((completedCount / totalLevels) * 90));
    if (isMastered) percentage = 100;

    unitProgress[unitId] = {
      completed: percentage >= 90,
      percentage,
      levelsCompleted: Array.from(levelsCompleted),
      challengeScore,
      mastered: isMastered
    };
  }

  // Record Session Log for teachers / study evaluation
  const sessionsLog = [...(progress.sessionsLog || [])];
  sessionsLog.push({
    timestamp: new Date().toISOString(),
    unitId: unitId || 'general',
    levelId: levelId || activityId,
    correctCount,
    totalCount,
    accuracy,
    isMasterChallenge: !!isMasterChallenge,
    isDailyMission: !!isDailyMission
  });

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
    bestScore: Math.max(currentStat.bestScore, accuracy),
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
    sessionsLog: sessionsLog.slice(-50), // keep last 50 session records
    activityStats
  };

  saveProgress(updatedProgress);
  return updatedProgress;
};

export const exportProgressCSV = (progress) => {
  const headers = ['Estudiante', 'Fecha Sesion', 'Unidad / Nivel', 'Aciertos', 'Total', 'Precision %', 'Es Desafio Final', 'Racha Actual', 'Nivel XP'];
  const rows = [];
  
  const student = `"${progress.studentName || 'Estudiante'}"`;
  const streak = progress.currentStreak || 1;
  const lvl = progress.level || 1;

  if (progress.sessionsLog && progress.sessionsLog.length > 0) {
    progress.sessionsLog.forEach(s => {
      rows.push([
        student,
        `"${new Date(s.timestamp).toLocaleDateString()} ${new Date(s.timestamp).toLocaleTimeString()}"`,
        `"${s.unitId || 'General'}: ${s.levelId}"`,
        s.correctCount,
        s.totalCount,
        `${s.accuracy}%`,
        s.isMasterChallenge ? 'SI' : 'NO',
        streak,
        lvl
      ]);
    });
  } else {
    rows.push([
      student,
      `"${new Date().toLocaleDateString()}"`,
      '"Sin sesiones registradas aun"',
      0, 0, '0%', 'NO', streak, lvl
    ]);
  }

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  return csvContent;
};

export const importProfileBackup = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (!data.id || !data.studentName) {
      throw new Error('Formato de perfil invalido.');
    }
    saveProfileData(data);
    localStorage.setItem(ACTIVE_PROFILE_KEY, data.id);
    return { success: true, profile: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
