// app/_layout.tsx
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../src/context/AuthContext';

// Componente que maneja la navegación inicial
const InitialLayout = () => {
  const { token, isLoading } = useAuth();
  const segments = useSegments(); // Nos dice en qué parte de la app estamos
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Esperamos a que se verifique el token

    const inAuthGroup = segments[0] === '(auth)';

    if (token && inAuthGroup) {
      // Si hay token y está en login/register -> Mándalo al Home
      router.replace('/(tabs)');
    } else if (!token && !inAuthGroup) {
      // Si NO hay token y quiere entrar a la app -> Mándalo al Login
      router.replace('/(auth)/login');
    }
  }, [token, isLoading, segments]);

  // Mientras carga, mostramos un spinner
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Slot renderiza la ruta actual (Login o Tabs)
  return <Slot />;
};

// El Layout Principal envuelve todo con el AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}