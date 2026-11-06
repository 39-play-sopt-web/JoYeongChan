import client, { authHeader } from './client';
import { PAGE_SIZE } from '../constants/post';
import type { ApiResponse } from '../types/api';
import type { CreatePostRequest, Post, PostListResponse, UpdatePostRequest } from '../types/post';

interface GetPostsParams {
  keyword: string;
  cursor: number;
}

export const getPosts = async ({ keyword, cursor }: GetPostsParams) => {
  const response = await client.get<ApiResponse<PostListResponse>>('/posts', {
    params: {
      keyword: keyword || undefined,
      cursor: cursor || undefined,
      size: PAGE_SIZE,
    },
  });
  return response.data.data;
};

export const getPost = async (postId: number) => {
  const response = await client.get<ApiResponse<Post>>(`/posts/${postId}`);
  return response.data.data;
};

export const createPost = async (body: CreatePostRequest) => {
  const response = await client.post<ApiResponse<Post>>('/posts', body, {
    headers: authHeader(),
  });
  return response.data.data;
};

export const updatePost = async (postId: number, body: UpdatePostRequest) => {
  const response = await client.put<ApiResponse<Post>>(`/posts/${postId}`, body, {
    headers: authHeader(),
  });
  return response.data.data;
};

export const deletePost = async (postId: number) => {
  await client.delete(`/posts/${postId}`, {
    headers: authHeader(),
  });
};
