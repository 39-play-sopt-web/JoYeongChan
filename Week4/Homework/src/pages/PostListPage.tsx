import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { getPosts } from '../apis/post';
import Button from '../components/Button';
import { Input } from '../components/FormField';
import PostCard from '../components/PostCard';
import { QUERY_KEYS } from '../constants/queryKeys';

function PostListPage() {
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: QUERY_KEYS.POST_LIST(keyword),
      queryFn: ({ pageParam }) => getPosts({ keyword, cursor: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext && lastPage.nextCursor !== null ? lastPage.nextCursor : undefined,
    });

  const posts = data ? data.pages.flatMap((page) => page.posts) : [];

  useEffect(() => {
    const target = bottomRef.current;
    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, posts.length]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (!value.trim()) setKeyword('');
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(inputValue.trim());
  };

  return (
    <>
      <Title>게시글 목록</Title>

      <SearchForm onSubmit={handleSearch}>
        <Input
          value={inputValue}
          onChange={(event) => handleInputChange(event.target.value)}
          placeholder="제목으로 검색해 보세요"
        />
        <Button type="submit" disabled={!inputValue.trim()}>
          검색
        </Button>
      </SearchForm>

      {isPending && <Message>게시글을 불러오는 중이에요...</Message>}
      {isError && <Message>게시글을 불러오지 못했어요.</Message>}
      {!isPending && !isError && posts.length === 0 && <Message>게시글이 없어요.</Message>}

      <List>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </List>

      {posts.length > 0 && <div ref={bottomRef} />}
      {isFetchingNextPage && <Message>더 불러오는 중이에요...</Message>}
    </>
  );
}

export default PostListPage;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 28px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;

  button {
    flex-shrink: 0;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Message = styled.p`
  padding: 40px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.subText};
`;
