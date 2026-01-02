import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/Login');
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <FontAwesome5 name="leaf" size={64} color="#43a047" style={styles.icon} />
      <Text style={styles.appName}>EcoScan+</Text>
      <Text style={styles.tagline}>Smart City Sustainability & Civic Engagement</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6f9f0',
  },
  icon: {
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#388e3c',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});