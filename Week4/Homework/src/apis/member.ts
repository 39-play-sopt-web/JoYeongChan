import client from './client';
import type { ApiResponse } from '../types/api';
import type { AuthorizationCodeResponse, Part } from '../types/member';

export const issueAuthorizationCode = async (part: Part) => {
  const response = await client.post<ApiResponse<AuthorizationCodeResponse>>(
    '/members/authorization-code',
    { part }
  );
  return response.data.data.authorizationCode;
};
