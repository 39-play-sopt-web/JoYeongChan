import { Link } from 'react-router';
import styled from 'styled-components';

import type { Post } from '../types/post';
import { formatDateTime } from '../utils/format';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  return (
    <Card to={`/posts/${post.id}`}>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <Meta>
        <span>{post.author}</span>
        <span>{formatDateTime(post.createdAt)}</span>
      </Meta>
    </Card>
  );
}

export default PostCard;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.medium};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color.primary};
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  }
`;

const Title = styled.h2`
  font-size: 18px;
`;

const Content = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.6;
  color: ${({ theme }) => theme.color.subText};
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: ${({ theme }) => theme.color.mutedText};
`;
