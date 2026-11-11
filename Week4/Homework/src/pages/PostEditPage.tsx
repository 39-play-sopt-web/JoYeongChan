import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

import { updatePost } from '../apis/post';
import Button from '../components/Button';
import { Counter, ErrorMessage, HelperRow, Input, Label, TextArea } from '../components/FormField';
import { MAX_LENGTH } from '../constants/post';
import { QUERY_KEYS } from '../constants/queryKeys';
import { isValidPostId, usePostDetail } from '../hooks/usePostDetail';
import type { Post } from '../types/post';

function PostEditPage() {
  const { postId } = useParams<{ postId: string }>();
  const id = Number(postId);

  const { data: post, isPending, isError } = usePostDetail(id);

  if (!isValidPostId(id)) return <Message>잘못된 게시글 주소예요.</Message>;
  if (isPending) return <Message>게시글을 불러오는 중이에요...</Message>;
  if (isError) return <Message>게시글을 찾을 수 없어요.</Message>;

  return <EditForm post={post} />;
}

interface EditFormProps {
  post: Post;
}

function EditForm({ post }: EditFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const { mutate, isPending } = useMutation({
    mutationFn: () => updatePost(post.id, { title: title.trim(), content: content.trim() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      alert('게시글이 수정되었어요.');
      navigate(`/posts/${post.id}`);
    },
    onError: () => {
      alert('게시글 수정에 실패했어요. 잠시 후 다시 시도해 주세요.');
    },
  });

  const isTitleOver = title.length > MAX_LENGTH.TITLE;
  const isContentOver = content.length > MAX_LENGTH.CONTENT;
  const isDisabled = !title.trim() || !content.trim() || isTitleOver || isContentOver || isPending;

  return (
    <>
      <Title>게시글 수정</Title>

      <Form>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          $hasError={isTitleOver}
        />
        <HelperRow>
          {isTitleOver && <ErrorMessage>제목은 {MAX_LENGTH.TITLE}자까지 쓸 수 있어요.</ErrorMessage>}
          <Counter $isOver={isTitleOver}>
            {title.length} / {MAX_LENGTH.TITLE}
          </Counter>
        </HelperRow>

        <Label htmlFor="content">본문</Label>
        <TextArea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          $hasError={isContentOver}
        />
        <HelperRow>
          {isContentOver && (
            <ErrorMessage>본문은 {MAX_LENGTH.CONTENT}자까지 쓸 수 있어요.</ErrorMessage>
          )}
          <Counter $isOver={isContentOver}>
            {content.length} / {MAX_LENGTH.CONTENT}
          </Counter>
        </HelperRow>
      </Form>

      <Buttons>
        <Button type="button" $variant="outline" onClick={() => navigate(`/posts/${post.id}`)}>
          취소
        </Button>
        <Button type="button" onClick={() => mutate()} disabled={isDisabled}>
          {isPending ? '수정 중...' : '수정 완료'}
        </Button>
      </Buttons>
    </>
  );
}

export default PostEditPage;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 28px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
