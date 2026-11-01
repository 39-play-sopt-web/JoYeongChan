import type { Part } from '../types/member';

const AUTH_CODE_KEY = 'authorizationCode';
const PART_KEY = 'part';

export const getAuthCode = () => localStorage.getItem(AUTH_CODE_KEY);

export const getPart = () => localStorage.getItem(PART_KEY);

export const saveAuth = (authorizationCode: string, part: Part) => {
  localStorage.setItem(AUTH_CODE_KEY, authorizationCode);
  localStorage.setItem(PART_KEY, part);
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_CODE_KEY);
  localStorage.removeItem(PART_KEY);
};
