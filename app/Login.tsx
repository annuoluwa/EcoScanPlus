import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { Colors } from '../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Enter both email and password.');
      return;
    }
    setError('');
    router.replace('/(tabs)/Dashboard');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <Text style={[styles.title, { color: Colors[theme].text }]}>EcoScan+</Text>
      <Text style={[styles.subtitle, { color: Colors[theme].icon }]}>Sign in to continue</Text>

      <TextInput
        style={[styles.input, { borderColor: Colors[theme].tint, color: Colors[theme].text }]}
        placeholder="Email"
        placeholderTextColor={Colors[theme].icon}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, { borderColor: Colors[theme].tint, color: Colors[theme].text }]}
        placeholder="Password"
        placeholderTextColor={Colors[theme].icon}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8, letterSpacing: 2 },
  subtitle: { fontSize: 18, marginBottom: 24 },
  input: { width: '100%', height: 48, borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, marginBottom: 16, backgroundColor: '#fff' },
  button: { width: '100%', paddingVertical: 14, borderRadius: 8, backgroundColor: '#43a047', alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  error: { color: 'red', marginBottom: 8 },
});
