import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={styles.switchContainer}>
      <Text style={[styles.label, { color: isDark ? '#fff' : '#222' }]}>🌞</Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme} // ✅ toggles between light/dark
        thumbColor={isDark ? '#fff' : '#222'}
        trackColor={{ false: '#bdbdbd', true: '#388e3c' }}
      />
      <Text style={[styles.label, { color: isDark ? '#fff' : '#222' }]}>🌙</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  label: {
    fontSize: 20,
    marginHorizontal: 8,
  },
});
