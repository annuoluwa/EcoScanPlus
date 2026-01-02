
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleLogin = () => {
		// Simple validation (replace with real auth logic)
		if (!email || !password) {
			setError('Please enter both email and password.');
			return;
		}
		setError('');
		alert('Login successful!');
		router.push('/(tabs)/Profile');
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<Text style={styles.title}>EcoScan+</Text>
			<Text style={styles.subtitle}>Sign in to continue</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				placeholderTextColor="#8bc34a"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				placeholderTextColor="#8bc34a"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			{error ? <Text style={styles.error}>{error}</Text> : null}
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
			<Text style={styles.footer}>Forgot password? | Create account</Text>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e6f9f0',
		padding: 24,
	},
	title: {
		fontSize: 32,
		color: '#2e7d32',
		fontWeight: 'bold',
		marginBottom: 8,
		letterSpacing: 2,
	},
	subtitle: {
		fontSize: 16,
		color: '#388e3c',
		marginBottom: 24,
	},
	input: {
		width: '100%',
		maxWidth: 320,
		height: 48,
		backgroundColor: '#fff',
		borderRadius: 8,
		paddingHorizontal: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: '#b2dfdb',
		fontSize: 16,
		color: '#2e7d32',
	},
	button: {
		width: '100%',
		maxWidth: 320,
		backgroundColor: '#43a047',
		paddingVertical: 14,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 8,
		marginBottom: 16,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	error: {
		color: '#d32f2f',
		marginBottom: 8,
	},
	footer: {
		color: '#388e3c',
		marginTop: 12,
		fontSize: 14,
		textAlign: 'center',
	},
});
