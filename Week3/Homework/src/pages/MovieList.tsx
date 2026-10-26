import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { getMovies } from '../apis/movie';
import MovieCard from '../components/MovieCard';
import RatingFilterBar from '../components/RatingFilterBar';
import { RATING_FILTERS } from '../constants/rating';
import type { RatingFilter } from '../constants/rating';
import type { Movie } from '../types/movie';

const MAX_PAGE = 500;

function MovieList() {
  const [filter, setFilter] = useState<RatingFilter>(RATING_FILTERS[0]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ignore = false;

    const fetchMovies = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await getMovies({ page, minRating: filter.min, maxRating: filter.max });
        if (ignore) return;

        setMovies((prev) => {
          if (page === 1) return data.results;

          const newMovies = data.results.filter(
            (movie) => !prev.some((prevMovie) => prevMovie.id === movie.id)
          );
          return [...prev, ...newMovies];
        });
        setHasMore(page < Math.min(data.total_pages, MAX_PAGE));
      } catch {
        if (!ignore) setIsError(true);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchMovies();

    return () => {
      ignore = true;
    };
  }, [filter, page]);

  useEffect(() => {
    const target = bottomRef.current;
    if (!target || isLoading || !hasMore || isError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isLoading, hasMore, isError, movies.length]);

  const handleFilterSelect = (nextFilter: RatingFilter) => {
    if (nextFilter.label === filter.label) return;

    setFilter(nextFilter);
    setMovies([]);
    setPage(1);
    setHasMore(true);
    window.scrollTo({ top: 0 });
  };

  return (
    <Wrapper>
      <Intro>
        <Title>오늘은 어떤 영화를 볼까요?</Title>
        <Description>별점으로 골라 보고, 마음에 드는 영화를 눌러 자세히 확인해 보세요.</Description>
      </Intro>

      <RatingFilterBar selected={filter} onSelect={handleFilterSelect} />

      {!isLoading && !isError && movies.length === 0 && (
        <Message>조건에 맞는 영화가 없어요.</Message>
      )}

      <Grid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>

      {movies.length > 0 && <div ref={bottomRef} />}
      {isLoading && <Message>영화를 불러오는 중이에요...</Message>}
      {isError && <Message>영화를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</Message>}
      {!hasMore && movies.length > 0 && <Message>모든 영화를 불러왔어요.</Message>}
    </Wrapper>
  );
}

export default MovieList;

const Wrapper = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.color.subText};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Message = styled.p`
  padding: 40px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.subText};
`;
