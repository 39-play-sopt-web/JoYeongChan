import styled from '@emotion/styled';

import NumberCell from './NumberCell';

function Game({ size, cells, nextNumber, total, onNumberClick }) {
  const isFinished = nextNumber > total;

  return (
    <Wrapper>
      <NextNumber>
        다음 숫자 <strong>{isFinished ? '-' : nextNumber}</strong>
        <Progress>
          ({Math.min(nextNumber, total)} / {total})
        </Progress>
      </NextNumber>

      <Board columns={size}>
        {cells.map((number, index) => (
          <NumberCell key={`${index}-${number}`} number={number} onClick={onNumberClick} />
        ))}
      </Board>
    </Wrapper>
  );
}

export default Game;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 40px 24px;
`;

const NextNumber = styled.p`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0;
  color: ${({ theme }) => theme.color.subText};

  strong {
    font-size: 28px;
    color: ${({ theme }) => theme.color.text};
  }
`;

const Progress = styled.span`
  font-size: 14px;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
  gap: 8px;
  width: min(100%, ${({ columns }) => columns * 100}px);
`;
