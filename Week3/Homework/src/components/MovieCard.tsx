import { Link } from 'react-router';
import styled from 'styled-components';

import { getPosterUrl } from '../constants/image';
import type { Movie } from '../types/movie';
import { formatDate } from '../utils/format';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <Card to={`/movie/${movie.id}`}>
      <PosterBox>
        {posterUrl ? (
          <Poster src={posterUrl} alt={`${movie.title} 포스터`} loading="lazy" />
        ) : (
          <NoPoster>포스터 없음</NoPoster>
        )}
      </PosterBox>

      <Info>
        <Title>{movie.title}</Title>
        <Meta>
          <span>{formatDate(movie.release_date)}</span>
          {movie.vote_average > 0 && <Rating>★ {movie.vote_average.toFixed(1)}</Rating>}
        </Meta>
        <Overview>{movie.overview || '등록된 줄거리가 없습니다.'}</Overview>
        <More>자세히 보기 →</More>
      </Info>
    </Card>
  );
}

export default MovieCard;

const Card = styled(Link)`
  display: flex;
  gap: 20px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.large};
  background-color: ${({ theme }) => theme.color.surface};
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.color.primary};
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
`;

const PosterBox = styled.div`
  flex-shrink: 0;
  width: 120px;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => theme.color.hover};
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoPoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 13px;
  color: ${({ theme }) => theme.color.mutedText};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

const Title = styled.h3`
  font-size: 18px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.subText};
`;

const Rating = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.color.primary};
`;

const Overview = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.color.subText};
`;

const More = styled.span`
  margin-top: auto;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.primary};
`;
