import { FontAwesome5 } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide current screen's button
  const showDashboard = pathname !== '/(tabs)/Dashboard';
  const showProfile = pathname !== '/(tabs)/Profile';
  const showRewards = pathname !== '/(tabs)/Rewards';

  return (
    <SafeAreaView edges={["bottom"]} style={styles.bar}>
      {showDashboard && (
        <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(tabs)/Dashboard')}>
          <FontAwesome5 name="home" size={22} color="#43a047" />
        </TouchableOpacity>
      )}
      {showProfile && (
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/(tabs)/Profile')}>
          <FontAwesome5 name="user" size={22} color="#388e3c" />
        </TouchableOpacity>
      )}
      {showRewards && (
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/(tabs)/Rewards')}>
          <FontAwesome5 name="trophy" size={22} color="#388e3c" />
        </TouchableOpacity>
      )}
      {/* Map button removed as requested */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#b2dfdb',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 10,
  },
  btn: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 16,
  },
});
