import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../components/ThemeContext';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { Colors } from '../../constants/theme';

const CARD_WIDTH = (Dimensions.get('window').width - 64) / 2;

// Mock user and recycling center locations
const userLocation = { latitude: 40.7128, longitude: -74.006 };
const recyclingCenters = [
  { id: '1', name: 'Green City Recycling', latitude: 40.7138, longitude: -74.002 },
  { id: '2', name: 'EcoDrop Center', latitude: 40.7108, longitude: -74.008 },
];

export default function DashboardScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const ecoPoints = 120;
  const reports = 5;
  const userName = 'Eco User';
  const region = {
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}> 
      <TouchableOpacity
        style={{ position: 'absolute', top: 40, right: 16, zIndex: 10, backgroundColor: Colors[theme].tint, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 }}
        onPress={() => router.replace('/Login')}
      >
        <Text style={{ color: Colors[theme].background, fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
      <ThemeSwitcher />
      <Text style={[styles.welcome, { color: Colors[theme].text }]}>Welcome, {userName}!</Text>
      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: theme === 'dark' ? '#222' : '#fff' }]}> 
          <Text style={[styles.statValue, { color: Colors[theme].tint }]}>{ecoPoints}</Text>
          <Text style={[styles.statLabel, { color: Colors[theme].icon }]}>EcoPoints</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: theme === 'dark' ? '#222' : '#fff' }]}> 
          <Text style={[styles.statValue, { color: Colors[theme].tint }]}>{reports}</Text>
          <Text style={[styles.statLabel, { color: Colors[theme].icon }]}>Reports</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.heroCard} onPress={() => router.push('/(tabs)/Rewards')}>
        <FontAwesome5 name="trophy" size={48} color="#fff" style={styles.heroIcon} />
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Rewards</Text>
          <Text style={styles.heroDesc}>See your points, achievements, and climb the leaderboard!</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.gridRow}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/ReportCamera')}>
          <MaterialIcons name="report-problem" size={36} color="#388e3c" />
          <Text style={styles.cardTitle}>Report Issue</Text>
          <Text style={styles.cardDesc}>Report a city issue with a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/ScanItem')}>
          <FontAwesome5 name="recycle" size={36} color="#388e3c" />
          <Text style={styles.cardTitle}>Scan Item</Text>
          <Text style={styles.cardDesc}>Scan and identify recyclables</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f9f0',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 26,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#43a047',
  },
  statLabel: {
    fontSize: 14,
    color: '#388e3c',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  map: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
    gap: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: '#388e3c',
    textAlign: 'center',
  },
  heroCard: {
    width: '100%',
    backgroundColor: '#43a047',
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  heroIcon: {
    marginRight: 24,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  heroDesc: {
    fontSize: 15,
    color: '#e0f2f1',
    fontWeight: '500',
  },
});
