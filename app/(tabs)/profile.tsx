import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';

export default function ProfileScreen() {
  const { signOut, user } = useAuth();

  const firstLetter = user?.email?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.card}>
        {/* Avatar simple con la inicial del correo */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.email}>{user?.email}</Text>

          {user?.id && (
            <>
              <Text style={[styles.label, { marginTop: 12 }]}>ID de usuario</Text>
              <Text style={styles.userId}>{user.id}</Text>
            </>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={signOut}
        activeOpacity={0.9}
      >
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: '#F2F2F7',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4B5563',
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 4,
  },
  userId: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
