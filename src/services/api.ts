// src/services/api.ts
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://todo-list.dobleb.cl';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
