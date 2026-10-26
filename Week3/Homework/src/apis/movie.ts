import client from './client';
import type { MovieDetail, MovieListResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_API_KEY;

interface GetMoviesParams {
  page: number;
  minRating: number;
  maxRating: number;
}

export const getMovies = ({ page, minRating, maxRating }: GetMoviesParams) => {
  return client
    .get('discover/movie', {
      searchParams: {
        api_key: API_KEY,
        language: 'ko-KR',
        sort_by: 'popularity.desc',
        include_adult: false,
        page,
        'vote_average.gte': minRating,
        'vote_average.lte': maxRating,
      },
    })
    .json<MovieListResponse>();
};

export const getMovieDetail = (movieId: string) => {
  return client
    .get(`movie/${movieId}`, {
      searchParams: {
        api_key: API_KEY,
        language: 'ko-KR',
      },
    })
    .json<MovieDetail>();
};
