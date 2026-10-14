import { useState } from 'react';
import styled from '@emotion/styled';

import Game from './components/Game';
import Header from './components/Header';
import Ranking from './components/Ranking';
import ResultModal from './components/ResultModal';
import { LEVELS, MENU } from './constants/game';
import { useNumberGame } from './hooks/useNumberGame';

function App() {
  const [menu, setMenu] = useState(MENU.GAME);
  const [level, setLevel] = useState(1);
  const { cells, nextNumber, total, elapsedTime, finishedTime, clickNumber, resetGame } =
    useNumberGame(level);

  const handleMenuChange = (nextMenu) => {
    setMenu(nextMenu);
    resetGame();
  };

  const handleLevelChange = (nextLevel) => {
    setLevel(nextLevel);
    resetGame(nextLevel);
  };

  return (
    <>
      <Header
        menu={menu}
        onMenuChange={handleMenuChange}
        level={level}
        onLevelChange={handleLevelChange}
        elapsedTime={elapsedTime}
      />

      <Main>
        {menu === MENU.GAME ? (
          <Game
            size={LEVELS[level].size}
            cells={cells}
            nextNumber={nextNumber}
            total={total}
            onNumberClick={clickNumber}
          />
        ) : (
          <Ranking />
        )}
      </Main>

      {finishedTime !== null && <ResultModal playTime={finishedTime} onConfirm={() => resetGame()} />}
    </>
  );
}

export default App;

const Main = styled.main`
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
`;
