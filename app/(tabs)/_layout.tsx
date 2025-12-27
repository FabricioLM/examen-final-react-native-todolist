import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// Puedes usar iconos simples de Ionicons que vienen con Expo
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Queremos ver el título arriba ("Mis Tareas", "Perfil")
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mis Tareas',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"  // <--- ¡IMPORTANTE! Debe coincidir con el nombre de tu archivo profile.tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}