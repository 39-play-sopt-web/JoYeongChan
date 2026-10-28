import { useEffect, useRef, useState } from 'react';

import { LEVELS } from '../constants/game';
import { saveRanking } from '../utils/ranking';
import { range, shuffle } from '../utils/shuffle';

const createBoard = (level) => {
  const { size, total } = LEVELS[level];
  const cellCount = size * size;

  return {
    cells: shuffle(range(1, cellCount)),
    pool: shuffle(range(cellCount + 1, total)),
  };
};

export const useNumberGame = (level) => {
  const [board, setBoard] = useState(() => createBoard(level));
  const [nextNumber, setNextNumber] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [finishedTime, setFinishedTime] = useState(null);
  const startTimeRef = useRef(0);

  const total = LEVELS[level].total;

  useEffect(() => {
    if (!isPlaying) return;

    const timerId = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 10);

    return () => clearInterval(timerId);
  }, [isPlaying]);

  const resetGame = (targetLevel = level) => {
    setBoard(createBoard(targetLevel));
    setNextNumber(1);
    setElapsedTime(0);
    setIsPlaying(false);
    setFinishedTime(null);
  };

  const finishGame = () => {
    const playTime = Date.now() - startTimeRef.current;

    setIsPlaying(false);
    setElapsedTime(playTime);
    setFinishedTime(playTime);
    saveRanking({ level, playTime, playedAt: new Date().toISOString() });
  };

  const clickNumber = (number) => {
    if (number !== nextNumber) return;

    if (number === 1) {
      startTimeRef.current = Date.now();
      setIsPlaying(true);
    }

    setBoard((prev) => {
      const newNumber = prev.pool.length > 0 ? prev.pool[0] : null;

      return {
        cells: prev.cells.map((cell) => (cell === number ? newNumber : cell)),
        pool: prev.pool.slice(1),
      };
    });
    setNextNumber(number + 1);

    if (number === total) finishGame();
  };

  return {
    cells: board.cells,
    nextNumber,
    total,
    elapsedTime,
    finishedTime,
    clickNumber,
    resetGame,
  };
};
