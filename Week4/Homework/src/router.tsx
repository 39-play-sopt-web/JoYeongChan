import { createBrowserRouter, redirect } from 'react-router';

import Layout from './components/Layout';
import MemberCodePage from './pages/MemberCodePage';
import PostDetailPage from './pages/PostDetailPage';
import PostEditPage from './pages/PostEditPage';
import PostListPage from './pages/PostListPage';
import PostWritePage from './pages/PostWritePage';
import { getAuthCode } from './utils/auth';

const requireAuth = () => {
  if (!getAuthCode()) {
    alert('회원 코드를 먼저 발급받아 주세요.');
    return redirect('/auth');
  }
  return null;
};

const router = createBrowserRouter([
  { path: '/auth', Component: MemberCodePage },
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: PostListPage },
      { path: 'write', Component: PostWritePage, loader: requireAuth },
      { path: 'posts/:postId', Component: PostDetailPage },
      { path: 'posts/:postId/edit', Component: PostEditPage, loader: requireAuth },
    ],
  },
]);

export default router;
