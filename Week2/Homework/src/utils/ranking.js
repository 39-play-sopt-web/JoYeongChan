import { RANKING_STORAGE_KEY } from '../constants/game';

export const getRankings = () => {
  const saved = localStorage.getItem(RANKING_STORAGE_KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

export const saveRanking = (record) => {
  localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify([...getRankings(), record]));
};

export const clearRankings = () => {
  localStorage.removeItem(RANKING_STORAGE_KEY);
};

export const sortRankings = (rankings) =>
  [...rankings].sort((a, b) => {
    if (a.level !== b.level) return b.level - a.level;
    return a.playTime - b.playTime;
  });
