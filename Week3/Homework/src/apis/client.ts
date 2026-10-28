import ky from 'ky';

const client = ky.create({
  prefix: import.meta.env.VITE_API_BASE_URL,
});

export default client;
