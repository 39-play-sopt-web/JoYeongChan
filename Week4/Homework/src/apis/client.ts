import axios from 'axios';

import { getAuthCode } from '../utils/auth';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const authHeader = () => ({
  Authorization: getAuthCode() ?? '',
});

export default client;
