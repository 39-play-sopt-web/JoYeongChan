export const MENU = {
  GAME: 'game',
  RANKING: 'ranking',
};

export const LEVELS = {
  1: { size: 3, total: 18 },
  2: { size: 4, total: 32 },
  3: { size: 5, total: 50 },
};

export const LEVEL_OPTIONS = [
  { value: 1, label: 'Level 1 (3x3)' },
  { value: 2, label: 'Level 2 (4x4)' },
  { value: 3, label: 'Level 3 (5x5)' },
];

export const RANKING_STORAGE_KEY = 'number-game-ranking';
