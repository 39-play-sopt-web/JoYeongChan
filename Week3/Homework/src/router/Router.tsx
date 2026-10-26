import { createBrowserRouter } from 'react-router';

import Layout from '../components/Layout';
import MovieDetail from '../pages/MovieDetail';
import MovieList from '../pages/MovieList';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: MovieList },
      { path: 'movie/:movieId', Component: MovieDetail },
    ],
  },
]);

export default router;
