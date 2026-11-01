import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { createPost } from '../apis/post';
import Button from '../components/Button';
import { Counter, ErrorMessage, HelperRow, Input, Label, TextArea } from '../components/FormField';
import { MAX_LENGTH } from '../constants/post';
import { QUERY_KEYS } from '../constants/queryKeys';

type Step = 'title' | 'content' | 'author';

const STEP_NUMBER: Record<Step, number> = {
  title: 1,
  content: 2,
  author: 3,
};

function PostWritePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [step, setStep] = useState<Step>('title');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POST_LISTS });
      alert(`${post.author}님의 게시글이 작성되었어요!`);
      navigate('/');
    },
    onError: () => {
      alert('게시글 작성에 실패했어요. 잠시 후 다시 시도해 주세요.');
    },
  });

  const isTitleOver = title.length > MAX_LENGTH.TITLE;
  const isContentOver = content.length > MAX_LENGTH.CONTENT;
  const isAuthorOver = author.length > MAX_LENGTH.AUTHOR;

  const handleSubmit = () => {
    mutate({ title: title.trim(), content: content.trim(), author: author.trim() });
  };

  return (
    <>
      <Title>게시글 작성</Title>
      <StepText>{STEP_NUMBER[step]} / 3 단계</StepText>

      <Form>
        {step === 'title' && (
          <>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="제목을 입력해 주세요"
              $hasError={isTitleOver}
              autoFocus
            />
            <HelperRow>
              {isTitleOver && <ErrorMessage>제목은 {MAX_LENGTH.TITLE}자까지 쓸 수 있어요.</ErrorMessage>}
              <Counter $isOver={isTitleOver}>
                {title.length} / {MAX_LENGTH.TITLE}
              </Counter>
            </HelperRow>
          </>
        )}

        {step === 'content' && (
          <>
            <Label htmlFor="content">본문</Label>
            <TextArea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="본문을 입력해 주세요"
              $hasError={isContentOver}
              autoFocus
            />
            <HelperRow>
              {isContentOver && (
                <ErrorMessage>본문은 {MAX_LENGTH.CONTENT}자까지 쓸 수 있어요.</ErrorMessage>
              )}
              <Counter $isOver={isContentOver}>
                {content.length} / {MAX_LENGTH.CONTENT}
              </Counter>
            </HelperRow>
          </>
        )}

        {step === 'author' && (
          <>
            <Label htmlFor="author">작성자</Label>
            <Input
              id="author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="작성자를 입력해 주세요"
              $hasError={isAuthorOver}
              autoFocus
            />
            <HelperRow>
              {isAuthorOver && (
                <ErrorMessage>작성자는 {MAX_LENGTH.AUTHOR}자까지 쓸 수 있어요.</ErrorMessage>
              )}
              <Counter $isOver={isAuthorOver}>
                {author.length} / {MAX_LENGTH.AUTHOR}
              </Counter>
            </HelperRow>
          </>
        )}
      </Form>

      <Buttons>
        <Button type="button" $variant="outline" onClick={() => navigate('/')}>
          목록으로
        </Button>

        {step === 'title' && (
          <Button
            type="button"
            onClick={() => setStep('content')}
            disabled={!title.trim() || isTitleOver}
          >
            다음
          </Button>
        )}
        {step === 'content' && (
          <Button
            type="button"
            onClick={() => setStep('author')}
            disabled={!content.trim() || isContentOver}
          >
            다음
          </Button>
        )}
        {step === 'author' && (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!author.trim() || isAuthorOver || isPending}
          >
            {isPending ? '작성 중...' : '작성'}
          </Button>
        )}
      </Buttons>
    </>
  );
}

export default PostWritePage;

const Title = styled.h1`
  font-size: 28px;
`;

const StepText = styled.p`
  margin: 8px 0 24px;
  color: ${({ theme }) => theme.color.primary};
  font-weight: 600;
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
