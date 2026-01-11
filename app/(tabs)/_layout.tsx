import React from 'react';
import { Tabs } from 'expo-router';
import BottomNavBar from '../../components/BottomNavBar';

export default function TabLayout() {
  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="Dashboard" />
        <Tabs.Screen name="Map" />
        <Tabs.Screen name="Rewards" />
        <Tabs.Screen name="Profile" />
      </Tabs>
      <BottomNavBar />
    </>
  );
}
