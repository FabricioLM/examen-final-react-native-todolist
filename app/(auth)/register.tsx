import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { authService } from '../../src/services/authService';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);

      const response = await authService.register({ email, password });

      if (response.success) {
        Alert.alert(
          '¡Cuenta creada!',
          'Usuario registrado correctamente. Ahora puedes iniciar sesión.',
          [{ text: 'Ir al login', onPress: () => router.back() }]
        );
      } else {
        throw new Error(response.error || 'No se pudo registrar');
      }
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Ocurrió un error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.appTitle}>TodoList App</Text>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>
          Ingresa tus datos para comenzar a usar la app
        </Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#A1A1A1"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#A1A1A1"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creando cuenta…' : 'Registrarse'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.linkContainer} onPress={() => router.back()}>
          <Text style={styles.linkText}>
            ¿Ya tienes cuenta?{' '}
            <Text style={styles.linkTextBold}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 24,
    textAlign: 'center',
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#F9FAFB',
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#34C759',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 18,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#4B5563',
  },
  linkTextBold: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
