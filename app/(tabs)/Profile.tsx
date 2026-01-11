import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../components/ThemeContext';
import { Colors } from '../../constants/theme';

// Mock user data
const USER = {
  name: 'Eco User',
  email: 'user@email.com',
  ecoPoints: 120,
  nextReward: 200,
};

// Mock scan history
const SCAN_HISTORY = [
  { id: '1', item: 'Coke Bottle', date: '2026-01-01', recyclable: true },
  { id: '2', item: 'Plastic Bag', date: '2025-12-30', recyclable: false },
  { id: '3', item: 'Water Bottle', date: '2025-12-28', recyclable: true },
];

// Mock badges
const BADGES = [
  { id: 'b1', name: 'Bronze Recycler', earned: true },
  { id: 'b2', name: 'Silver Recycler', earned: false },
];

export default function ProfileScreen() {
  const { theme } = useTheme();
  const progress = Math.min(USER.ecoPoints / USER.nextReward, 1);

  const renderHistoryItem = ({ item }: { item: typeof SCAN_HISTORY[number] }) => (
    <View style={styles.historyRow}>
      <Text style={styles.historyItem}>{item.item}</Text>
      <Text style={item.recyclable ? styles.recyclable : styles.notRecyclable}>
        {item.recyclable ? 'Recyclable' : 'Not Recyclable'}
      </Text>
      <Text style={styles.historyDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}> 
      {/* User Header */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>EcoPoints</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={[styles.progressText, { color: Colors[theme].text }]}> 
          {USER.ecoPoints} EcoPoints (next reward at {USER.nextReward})
        </Text>
      </View>

      {/* Badges */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>Badges</Text>
        <View style={styles.badgesRow}>
          {BADGES.map((badge) => (
            <View
              key={badge.id}
              style={[styles.badge, !badge.earned && styles.badgeLocked]}
            >
              <Text style={styles.badgeText}>{badge.name}</Text>
              {!badge.earned && <Text style={styles.badgeLockedText}>Locked</Text>}
            </View>
          ))}
        </View>
      </View>

      {/* Scan History */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>Recent Scans</Text>
        <FlatList
          data={SCAN_HISTORY}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 48,
    // background and shadow removed for seamless blend
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBarBg: {
    width: '100%',
    height: 16,
    backgroundColor: '#b2dfdb',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#43a047',
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  badge: {
    backgroundColor: '#b2dfdb',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  badgeLocked: {
    backgroundColor: '#e0e0e0',
  },
  badgeText: {
    fontWeight: 'bold',
  },
  badgeLockedText: {
    color: '#888',
    fontSize: 12,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  historyItem: {
    flex: 1,
    fontSize: 15,
  },
  historyDate: {
    fontSize: 13,
    color: '#888',
    marginLeft: 8,
  },
  recyclable: {
    color: '#388e3c',
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  notRecyclable: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
});

