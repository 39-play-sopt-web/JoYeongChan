import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import styled from 'styled-components';

import { getMovieDetail } from '../apis/movie';
import { getBackdropUrl, getPosterUrl } from '../constants/image';
import type { MovieDetail as MovieDetailType } from '../types/movie';
import { formatDate, formatMoney, formatRuntime } from '../utils/format';

const languageNames = new Intl.DisplayNames(['ko'], { type: 'language' });

function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    let ignore = false;

    const fetchMovie = async () => {
      try {
        const data = await getMovieDetail(movieId);
        if (!ignore) setMovie(data);
      } catch {
        if (!ignore) setIsError(true);
      }
    };

    fetchMovie();

    return () => {
      ignore = true;
    };
  }, [movieId]);

  if (isError) {
    return (
      <Wrapper>
        <BackLink to="/">← 목록으로 돌아가기</BackLink>
        <Message>영화 정보를 찾을 수 없어요.</Message>
      </Wrapper>
    );
  }

  if (!movie) {
    return (
      <Wrapper>
        <Message>영화 정보를 불러오는 중이에요...</Message>
      </Wrapper>
    );
  }

  const posterUrl = getPosterUrl(movie.poster_path);
  const backdropUrl = getBackdropUrl(movie.backdrop_path);

  const infoList = [
    { label: '원제', value: movie.original_title },
    { label: '원어', value: languageNames.of(movie.original_language) ?? movie.original_language },
    {
      label: '제작 국가',
      value: movie.production_countries.map((country) => country.name).join(', ') || '-',
    },
    {
      label: '사용 언어',
      value: movie.spoken_languages.map((language) => language.english_name).join(', ') || '-',
    },
    { label: '예산', value: formatMoney(movie.budget) },
    { label: '수익', value: formatMoney(movie.revenue) },
  ];

  const statList = [
    { label: '평점', value: `★ ${movie.vote_average.toFixed(1)}` },
    { label: '개봉일', value: formatDate(movie.release_date) },
    { label: '상영 시간', value: formatRuntime(movie.runtime) },
    { label: '투표 수', value: `${movie.vote_count.toLocaleString()}명` },
  ];

  return (
    <Wrapper>
      <BackLink to="/">← 목록으로 돌아가기</BackLink>

      <Banner>
        {backdropUrl ? <BannerImage src={backdropUrl} alt="" /> : <EmptyBanner />}
      </Banner>

      <Top>
        {posterUrl ? (
          <Poster src={posterUrl} alt={`${movie.title} 포스터`} />
        ) : (
          <NoPoster>포스터 없음</NoPoster>
        )}

        <TitleBox>
          <Status>{movie.status}</Status>
          <Title>{movie.title}</Title>
          {movie.tagline && <Tagline>{movie.tagline}</Tagline>}
          <GenreList>
            {movie.genres.map((genre) => (
              <Genre key={genre.id}>#{genre.name}</Genre>
            ))}
          </GenreList>
        </TitleBox>
      </Top>

      <StatGrid>
        {statList.map((stat) => (
          <Stat key={stat.label}>
            <StatLabel>{stat.label}</StatLabel>
            <StatValue>{stat.value}</StatValue>
          </Stat>
        ))}
      </StatGrid>

      <Content>
        <Section>
          <SectionTitle>줄거리</SectionTitle>
          <Overview>{movie.overview || '등록된 줄거리가 없습니다.'}</Overview>
        </Section>

        <Section>
          <SectionTitle>기본 정보</SectionTitle>
          <InfoList>
            {infoList.map((info) => (
              <InfoRow key={info.label}>
                <dt>{info.label}</dt>
                <dd>{info.value}</dd>
              </InfoRow>
            ))}
          </InfoList>
        </Section>
      </Content>
    </Wrapper>
  );
}

export default MovieDetail;

const Wrapper = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.color.subText};

  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const Banner = styled.div`
  height: 320px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.large};
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EmptyBanner = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.primaryLight};
`;

const Top = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 28px;
  padding: 0 32px;
  margin-top: -110px;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Poster = styled.img`
  flex-shrink: 0;
  width: 200px;
  aspect-ratio: 2 / 3;
  border: 4px solid ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.radius.medium};
  object-fit: cover;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
`;

const NoPoster = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 200px;
  aspect-ratio: 2 / 3;
  border: 4px solid ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.radius.medium};
  color: ${({ theme }) => theme.color.mutedText};
  background-color: ${({ theme }) => theme.color.hover};
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding-bottom: 8px;
`;

const Status = styled.span`
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.round};
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.primaryLight};
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.color.subText};
`;

const GenreList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Genre = styled.li`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.primary};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 32px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.large};

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px 12px;

  & + & {
    border-left: 1px solid ${({ theme }) => theme.color.border};
  }
`;

const StatLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.color.mutedText};
`;

const StatValue = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
`;

const Overview = styled.p`
  line-height: 1.8;
  color: ${({ theme }) => theme.color.subText};
`;

const InfoList = styled.dl`
  margin: 0;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  dt {
    flex-shrink: 0;
    width: 72px;
    color: ${({ theme }) => theme.color.mutedText};
  }

  dd {
    margin: 0;
    font-weight: 600;
  }
`;

const Message = styled.p`
  padding: 80px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.subText};
`;
