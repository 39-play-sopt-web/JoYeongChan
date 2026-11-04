import client from './client';
import type { MovieDetail, MovieListResponse } from '../types/movie';

const MAX_RATING = 10;

const toExclusiveMax = (max: number) => (max === MAX_RATING ? max : max - 0.001);

interface GetMoviesParams {
  page: number;
  minRating: number;
  maxRating: number;
}

export const getMovies = ({ page, minRating, maxRating }: GetMoviesParams) => {
  return client
    .get('discover/movie', {
      searchParams: {
        sort_by: 'popularity.desc',
        include_adult: false,
        page,
        'vote_average.gte': minRating,
        'vote_average.lte': toExclusiveMax(maxRating),
      },
    })
    .json<MovieListResponse>();
};

export const getMovieDetail = (movieId: string) => {
  return client
    .get(`movie/${movieId}`)
    .json<MovieDetail>();
};
