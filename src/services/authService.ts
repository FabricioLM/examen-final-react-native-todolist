// src/services/authService.ts
import { AuthResponse } from '../interfaces';
import api from './api';

// Definimos qué datos necesitamos para entrar (según el Swagger)
interface AuthPayload {
  email: string;
  password: string;
}

export const authService = {
  // Función para registrarse
  register: async (data: AuthPayload) => {
    // POST /auth/register
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  // Función para iniciar sesión
  login: async (data: AuthPayload) => {
    // POST /auth/login
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  }
};