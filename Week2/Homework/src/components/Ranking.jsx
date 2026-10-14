import { useState } from 'react';
import styled from '@emotion/styled';

import { formatDateTime, formatSeconds } from '../utils/format';
import { clearRankings, getRankings, sortRankings } from '../utils/ranking';

function Ranking() {
  const [rankings, setRankings] = useState(() => sortRankings(getRankings()));

  const handleReset = () => {
    clearRankings();
    setRankings([]);
  };

  return (
    <Wrapper>
      <TitleRow>
        <Title>🏆 랭킹</Title>
        <ResetButton type="button" onClick={handleReset}>
          초기화
        </ResetButton>
      </TitleRow>

      {rankings.length === 0 ? (
        <Empty>아직 기록이 없어요. 게임을 플레이해보세요!</Empty>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>순위</th>
              <th>레벨</th>
              <th>플레이 시간</th>
              <th>기록 시각</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((record, index) => (
              <tr key={record.playedAt}>
                <td>{index + 1}</td>
                <td>Level {record.level}</td>
                <td>{formatSeconds(record.playTime)}초</td>
                <td>{formatDateTime(record.playedAt)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Wrapper>
  );
}

export default Ranking;

const Wrapper = styled.section`
  width: min(100%, 640px);
  margin: 0 auto;
  padding: 40px 24px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const ResetButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.color.danger};
  border-radius: ${({ theme }) => theme.radius.small};
  color: ${({ theme }) => theme.color.danger};
  background-color: ${({ theme }) => theme.color.background};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color.dangerLight};
  }
`;

const Empty = styled.p`
  margin: 0;
  padding: 48px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.subText};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.medium};
  overflow: hidden;
  font-size: 14px;

  th,
  td {
    padding: 12px 16px;
    text-align: left;
  }

  th {
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.primaryLight};
  }

  tbody tr + tr {
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }
`;
