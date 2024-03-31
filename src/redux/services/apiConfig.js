import axios from 'axios';

export const API_BASE_URL = 'https://wallet.b.goit.study/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});
