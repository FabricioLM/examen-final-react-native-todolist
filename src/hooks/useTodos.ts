// src/hooks/useTodos.ts
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Todo } from '../interfaces';
import { todoService } from '../services/todoService';

export const useTodos = () => {
  const { token, isLoading: authLoading } = useAuth();
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    if (authLoading || !token) return;

    try {
      setIsLoading(true);
      const data = await todoService.getAll(token);
      setTodos(data);
      setError(null);
    } catch (err: any) {
      console.log('Error fetching todos', err?.message);
      if (err?.response?.status === 401) {
        setError('No autorizado: revisa tu inicio de sesión.');
      } else {
        setError('Error al cargar las tareas');
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, authLoading]);

  useEffect(() => {
    if (!authLoading && token) {
      fetchTodos();
    }
  }, [fetchTodos, authLoading, token]);

  const addTodo = async (title: string, photoUri?: string) => {
    if (!token) return;
    try {
      const newTodo = await todoService.create(token, title, photoUri);
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      Alert.alert('Error', 'No se pudo crear la tarea');
    }
  };

  const toggleTodo = async (id: string, currentStatus: boolean) => {
    if (!token) return;
    try {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, completed: !currentStatus } : todo
        )
      );
      await todoService.update(token, id, !currentStatus);
    } catch (err) {
      Alert.alert('Error', 'No se pudo actualizar');
      fetchTodos();
    }
  };

  const deleteTodo = async (id: string) => {
    if (!token) return;
    try {
      await todoService.delete(token, id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      Alert.alert('Error', 'No se pudo eliminar');
    }
  };

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos: fetchTodos,
  };
};
