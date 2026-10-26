export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getPosterUrl = (path: string | null) => (path ? `${IMAGE_BASE_URL}/w500${path}` : null);

export const getBackdropUrl = (path: string | null) =>
  path ? `${IMAGE_BASE_URL}/w1280${path}` : null;
