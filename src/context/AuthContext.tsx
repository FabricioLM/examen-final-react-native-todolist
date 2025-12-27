// src/context/AuthContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api'; // Importamos la instancia de axios
import { authService } from '../services/authService';

// Definimos qué datos y funciones tendrá nuestro contexto
interface AuthContextProps {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

// Este es el Hook que usaremos en las pantallas para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// El proveedor que envuelve la app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Al iniciar la app, verificamos si ya existe un token guardado
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken && storedUser) {
          // Si existen, actualizamos el estado y axios
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (e) {
        console.error('Error cargando datos del storage', e);
      } finally {
        setIsLoading(false); // Dejamos de cargar (quitamos el splash screen)
      }
    };
    loadStorageData();
  }, []);

  // 2. Función para Iniciar Sesión
  const signIn = async (email: string, pass: string) => {
    try {
      const response = await authService.login({ email, password: pass });
      
      if (response.success && response.data) {
        const { token: newToken, userId } = response.data;
        
        // Guardamos en el estado
        setToken(newToken);
        setUser({ id: userId, email }); // Guardamos datos básicos del usuario

        // Guardamos en el dispositivo (Persistencia)
        await AsyncStorage.setItem('token', newToken);
        await AsyncStorage.setItem('user', JSON.stringify({ id: userId, email }));

        // Configuramos Axios para futuras peticiones
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      } else {
        throw new Error(response.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      throw error; // Lanzamos el error para que la pantalla de Login lo muestre
    }
  };

  // 3. Función para Cerrar Sesión
  const signOut = async () => {
    // Borramos todo
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setToken(null);
    setUser(null);
    // Quitamos el token de axios
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};