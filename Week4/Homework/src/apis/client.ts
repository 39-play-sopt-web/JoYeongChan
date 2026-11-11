import axios from 'axios';

import { useAuthStore } from '../stores/authStore';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

client.interceptors.request.use((config) => {
  const authorizationCode = useAuthStore.getState().authorizationCode;

  if (authorizationCode) {
    config.headers.Authorization = authorizationCode;
  }

  return config;
});

export default client;
