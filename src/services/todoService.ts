// src/services/todoService.ts
import { ApiResponse, Todo } from '../interfaces';
import api from './api';

export const todoService = {
  // Obtener todas las tareas
  getAll: async (token: string) => {
    const response = await api.get<ApiResponse<Todo[]>>('/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  },

  // Crear una tarea
  create: async (token: string, title: string, photoUri?: string) => {
    const payload = {
      title,
      completed: false,
      photoUri: photoUri || null,
      location: { latitude: 0, longitude: 0 }, // dummy
    };

    const response = await api.post<ApiResponse<Todo>>('/todos', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  },

  // Cambiar estado (completado/pendiente)
  update: async (token: string, id: string, completed: boolean) => {
    const response = await api.patch<ApiResponse<Todo>>(
      `/todos/${id}`,
      { completed },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  },

  // Eliminar tarea
  delete: async (token: string, id: string) => {
    await api.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
