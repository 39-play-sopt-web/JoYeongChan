import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

function NumberCell({ number, onClick }) {
  if (number === null) return <EmptyCell />;

  return (
    <Cell type="button" onClick={() => onClick(number)}>
      {number}
    </Cell>
  );
}

export default NumberCell;

const appear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Cell = styled.button`
  aspect-ratio: 1 / 1;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.medium};
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.background};
  cursor: pointer;
  animation: ${appear} 0.2s ease;
  transition: background-color 0.1s ease, transform 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  &:active {
    transform: scale(0.92);
    background-color: ${({ theme }) => theme.color.primaryLight};
  }
`;

const EmptyCell = styled.div`
  aspect-ratio: 1 / 1;
  border: 1px dashed ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.medium};
`;
