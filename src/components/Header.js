import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Header({
  userName = 'Usuario',
  searchValue = '',
  onSearchChange = () => {},
  onPressCreateTask = () => {},
  onPressViewTasks = () => {},
  onPressNotifications = () => {},
  appName = 'App Tareas',
}) {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);

  return (
    <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      <View style={styles.appRow}>
        <Text style={[styles.appName, { color: colors.text }]}>{appName}</Text>

        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.background }]}
          onPress={onPressNotifications}
        >
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.greeting, { color: colors.text }]}>Hola {userName}</Text>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchValue}
          onChangeText={onSearchChange}
          placeholder="Buscar tarea"
          placeholderTextColor={colors.textSecondary}
          style={[styles.searchInput, { backgroundColor: colors.background, color: colors.text }]}
        />
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navButton} onPress={onPressCreateTask}>
          <Text style={styles.navButtonText}>Crear tarea</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={onPressViewTasks}>
          <Text style={styles.navButtonText}>Ver tareas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navButton, { backgroundColor: isDarkMode ? '#4b5563' : '#1f2937' }]} onPress={toggleTheme}>
          <Text style={styles.navButtonText}>{isDarkMode ? 'Tema Claro' : 'Tema Oscuro'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 18,
    borderBottomWidth: 1,
  },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  greeting: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: '700',
  },
  searchContainer: {
    marginTop: 14,
  },
  searchInput: {
    height: 44,
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  navRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 2,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});