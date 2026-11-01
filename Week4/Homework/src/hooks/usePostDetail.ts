import { useQuery } from '@tanstack/react-query';

import { getPost } from '../apis/post';
import { QUERY_KEYS } from '../constants/queryKeys';

export const usePostDetail = (postId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.POST_DETAIL(postId),
    queryFn: () => getPost(postId),
  });
};
