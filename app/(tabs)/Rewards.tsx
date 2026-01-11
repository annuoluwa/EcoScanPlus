import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../components/ThemeContext';
import { Colors } from '../../constants/theme';

/**
 * Reward types
 * Makes this screen scalable
 */
type RewardType = 'points' | 'badge' | 'perk';

type Reward = {
  id: string;
  title: string;
  description: string;
  value?: number;
  type: RewardType;
};

const REWARDS: Reward[] = [
  {
    id: '1',
    title: 'EcoPoints',
    value: 120,
    description: 'Total points earned for recycling and reporting.',
    type: 'points',
  },
  {
    id: '2',
    title: 'Bronze Recycler Badge',
    description: 'Awarded for 5 successful scans.',
    type: 'badge',
  },
  {
    id: '3',
    title: 'Free Coffee Coupon',
    description: 'Redeem 100 EcoPoints for a free coffee at Green Cafe.',
    type: 'perk',
  },
];

export default function RewardsScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const renderIcon = (type: RewardType) => {
    switch (type) {
      case 'points':
        return (
          <View style={styles.iconPoints}>
            <FontAwesome5 name="leaf" size={28} color="#43a047" />
          </View>
        );
      case 'badge':
        return (
          <View style={styles.iconBadge}>
            <MaterialIcons name="emoji-events" size={28} color="#fff" />
          </View>
        );
      case 'perk':
        return (
          <View style={styles.iconPerk}>
            <FontAwesome5 name="coffee" size={26} color="#fff" />
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}> 
      <Text style={[styles.pageTitle, { color: Colors[theme].text }]}>Your Rewards</Text>

      <FlatList
        data={REWARDS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme === 'dark' ? '#222' : '#fff' }]}> 
            {renderIcon(item.type)}

            <Text style={[styles.titleText, { color: Colors[theme].text }]}>{item.title}</Text>

            {item.value !== undefined && (
              <Text style={[styles.valueText, { color: Colors[theme].tint }]}>{item.value}</Text>
            )}

            <Text style={[styles.descriptionText, { color: Colors[theme].icon }]}>{item.description}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(tabs)/Dashboard')}
      >
        <Text style={styles.buttonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f9f0',
    padding: 24,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 24,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },

  iconPoints: {
    backgroundColor: '#e8f5e9',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  iconBadge: {
    backgroundColor: '#ffb300',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  iconPerk: {
    backgroundColor: '#795548',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 4,
    textAlign: 'center',
  },

  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#43a047',
    marginBottom: 4,
  },

  descriptionText: {
    fontSize: 15,
    color: '#388e3c',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#43a047',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
