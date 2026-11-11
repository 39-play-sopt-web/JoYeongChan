import { useQuery } from '@tanstack/react-query';

import { getPost } from '../apis/post';
import { QUERY_KEYS } from '../constants/queryKeys';

export const isValidPostId = (postId: number) => Number.isInteger(postId) && postId > 0;

export const usePostDetail = (postId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.POST_DETAIL(postId),
    queryFn: () => getPost(postId),
    enabled: isValidPostId(postId),
  });
};
