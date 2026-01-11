import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/Login');
    }, 2000); // 2-second splash
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash-image.png')}
        style={styles.splashImage}
        resizeMode="contain"
      />
      <Text style={styles.appName}>EcoScan+</Text>
      <Text style={styles.tagline}>
        Smart City Sustainability & Civic Engagement
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e6f9f0' },
  splashImage: { width: 200, height: 200, marginBottom: 24 },
  appName: { fontSize: 32, fontWeight: 'bold', color: '#2e7d32', marginTop: 16 },
  tagline: { fontSize: 16, color: '#388e3c', marginTop: 8, textAlign: 'center', marginHorizontal: 20 },
});
