import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

import { deletePost } from '../apis/post';
import Button from '../components/Button';
import { QUERY_KEYS } from '../constants/queryKeys';
import { isValidPostId, usePostDetail } from '../hooks/usePostDetail';
import { useAuthStore } from '../stores/authStore';
import { formatDateTime } from '../utils/format';

function PostDetailPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authorizationCode = useAuthStore((state) => state.authorizationCode);
  const { postId } = useParams<{ postId: string }>();
  const id = Number(postId);

  const { data: post, isPending, isError } = usePostDetail(id);

  const { mutate: removePost, isPending: isDeleting } = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POST_LISTS });
      alert('게시글이 삭제되었어요.');
      navigate('/');
    },
    onError: () => {
      alert('게시글 삭제에 실패했어요. 잠시 후 다시 시도해 주세요.');
    },
  });

  const handleDelete = () => {
    if (!authorizationCode) {
      alert('회원 코드를 먼저 발급받아 주세요.');
      navigate('/auth');
      return;
    }

    if (!confirm('정말 삭제할까요?')) return;
    removePost();
  };

  if (!isValidPostId(id)) {
    return (
      <>
        <Message>잘못된 게시글 주소예요.</Message>
        <Button type="button" $variant="outline" onClick={() => navigate('/')}>
          ← 목록으로
        </Button>
      </>
    );
  }
  if (isPending) return <Message>게시글을 불러오는 중이에요...</Message>;
  if (isError) {
    return (
      <>
        <Message>게시글을 찾을 수 없어요.</Message>
        <Button type="button" $variant="outline" onClick={() => navigate('/')}>
          ← 목록으로
        </Button>
      </>
    );
  }

  return (
    <>
      <BackButton type="button" onClick={() => navigate('/')}>
        ← 목록으로
      </BackButton>

      <Article>
        <Title>{post.title}</Title>
        <Meta>
          <span>{post.author}</span>
          <span>{formatDateTime(post.createdAt)}</span>
        </Meta>
        <Content>{post.content}</Content>
      </Article>

      <Buttons>
        <Button type="button" $variant="outline" onClick={() => navigate(`/posts/${id}/edit`)}>
          수정
        </Button>
        <Button type="button" $variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? '삭제 중...' : '삭제'}
        </Button>
      </Buttons>
    </>
  );
}

export default PostDetailPage;

const BackButton = styled.button`
  margin-bottom: 24px;
  padding: 0;
  border: none;
  color: ${({ theme }) => theme.color.subText};
  background: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Title = styled.h1`
  font-size: 30px;
`;

const Meta = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.mutedText};
`;

const Content = styled.p`
  line-height: 1.8;
  white-space: pre-wrap;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;

const Message = styled.p`
  padding: 40px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.subText};
`;
