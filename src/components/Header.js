import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Header({
  userName = 'Usuario',
  searchValue = '',
  onSearchChange = () => {},
  onPressCreateTask = () => {},
  onPressViewTasks = () => {},
  onPressToggleTheme = () => {},
  onPressNotifications = () => {},
  appName = 'App Tareas',
}) {
  return (
    <View style={styles.header}>
      <View style={styles.appRow}>
        <Text style={styles.appName}>{appName}</Text>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onPressNotifications}
        >
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Hola {userName}</Text>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchValue}
          onChangeText={onSearchChange}
          placeholder="Buscar tarea"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navButton} onPress={onPressCreateTask}>
          <Text style={styles.navButtonText}>Crear tarea</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={onPressViewTasks}>
          <Text style={styles.navButtonText}>Ver tareas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={onPressToggleTheme}>
          <Text style={styles.navButtonText}>Theme</Text>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f2f2f7',
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
    color: '#111',
  },
  searchContainer: {
    marginTop: 14,
  },
  searchInput: {
    height: 44,
    backgroundColor: '#f2f2f7',
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#111',
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