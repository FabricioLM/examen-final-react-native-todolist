import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Definimos las pantallas del grupo Auth */}
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}