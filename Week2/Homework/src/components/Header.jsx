import styled from '@emotion/styled';

import { LEVEL_OPTIONS, MENU } from '../constants/game';
import { formatSeconds } from '../utils/format';

const MENU_ITEMS = [
  { value: MENU.GAME, label: '게임' },
  { value: MENU.RANKING, label: '랭킹' },
];

function Header({ menu, onMenuChange, level, onLevelChange, elapsedTime }) {
  return (
    <Wrapper>
      <Title>🔢 숫자 클릭 게임</Title>

      <Menu>
        {MENU_ITEMS.map((item) => (
          <MenuButton
            key={item.value}
            type="button"
            isActive={menu === item.value}
            onClick={() => onMenuChange(item.value)}
          >
            {item.label}
          </MenuButton>
        ))}
      </Menu>

      <Right>
        {menu === MENU.GAME && (
          <>
            <LevelSelect
              aria-label="레벨 선택"
              value={level}
              onChange={(event) => onLevelChange(Number(event.target.value))}
            >
              {LEVEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </LevelSelect>
            <Timer>{formatSeconds(elapsedTime)}초</Timer>
          </>
        )}
      </Right>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  height: ${({ theme }) => theme.headerHeight};
  padding: 0 24px;
  background-color: ${({ theme }) => theme.color.background};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  white-space: nowrap;
`;

const Menu = styled.nav`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const MenuButton = styled.button`
  padding: 6px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.small};
  font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
  color: ${({ theme, isActive }) => (isActive ? theme.color.primary : theme.color.subText)};
  background-color: ${({ theme, isActive }) => (isActive ? theme.color.primaryLight : 'transparent')};
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme, isActive }) => (isActive ? theme.color.primaryLight : theme.color.hover)};
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

const LevelSelect = styled.select`
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.small};
  background-color: ${({ theme }) => theme.color.background};
  cursor: pointer;
`;

const Timer = styled.span`
  min-width: 80px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.small};
  font-weight: 700;
  text-align: center;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.primaryLight};
`;
