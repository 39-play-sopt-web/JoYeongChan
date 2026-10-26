import styled from 'styled-components';

import { RATING_FILTERS } from '../constants/rating';
import type { RatingFilter } from '../constants/rating';

interface RatingFilterBarProps {
  selected: RatingFilter;
  onSelect: (filter: RatingFilter) => void;
}

function RatingFilterBar({ selected, onSelect }: RatingFilterBarProps) {
  return (
    <Wrapper>
      {RATING_FILTERS.map((filter) => (
        <Tab
          key={filter.label}
          type="button"
          $isActive={filter.label === selected.label}
          onClick={() => onSelect(filter)}
        >
          {filter.label}
        </Tab>
      ))}
    </Wrapper>
  );
}

export default RatingFilterBar;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Tab = styled.button<{ $isActive: boolean }>`
  padding: 12px 0;
  border: none;
  border-bottom: 2px solid
    ${({ theme, $isActive }) => ($isActive ? theme.color.primary : 'transparent')};
  margin-bottom: -1px;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 400)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.color.primary : theme.color.subText)};
  background-color: transparent;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;
