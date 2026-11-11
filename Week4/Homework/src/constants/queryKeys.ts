export const QUERY_KEYS = {
  POSTS: ['posts'],
  POST_LISTS: ['posts', 'list'],
  POST_LIST: (keyword: string) => ['posts', 'list', keyword],
  POST_DETAIL: (postId: number) => ['posts', 'detail', postId],
};
