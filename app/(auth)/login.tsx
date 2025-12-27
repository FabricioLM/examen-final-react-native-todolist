import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const { signIn, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa todos los datos');
      return;
    }

    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert(
        'Error al iniciar sesión',
        error?.message || 'Credenciales incorrectas'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.appTitle}>TodoList App</Text>
        <Text style={styles.title}>Bienvenido al Examen Final</Text>
        <Text style={styles.subtitle}>Por favor inicia sesión</Text>

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
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Ingresando…' : 'Ingresar'}
            </Text>
          </TouchableOpacity>
        </View>

        <Link href="/(auth)/register" asChild>
          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.linkText}>
              ¿No tienes cuenta? <Text style={styles.linkTextBold}>Regístrate aquí</Text>
            </Text>
          </TouchableOpacity>
        </Link>
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
    backgroundColor: '#007AFF',
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
