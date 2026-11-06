import axios from 'axios';

import { useAuthStore } from '../stores/authStore';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const authHeader = () => ({
  Authorization: useAuthStore.getState().authorizationCode ?? '',
});

export default client;
