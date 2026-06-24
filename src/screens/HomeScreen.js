import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';

const TASKS = [
  {
    id: '1',
    title: 'Revisar propuesta de diseño',
    dueDate: '2026-06-24',
    priority: 'Alta',
    completed: false,
  },
  {
    id: '2',
    title: 'Enviar informe de progreso',
    dueDate: '2026-06-25',
    priority: 'Media',
    completed: false,
  },
  {
    id: '3',
    title: 'Diseñar pantalla de detalle',
    dueDate: '2026-06-26',
    priority: 'Alta',
    completed: false,
  },
  {
    id: '4',
    title: 'Probar navegación',
    dueDate: '2026-06-27',
    priority: 'Baja',
    completed: false,
  },
  {
    id: '5',
    title: 'Actualizar README',
    dueDate: '2026-06-28',
    priority: 'Media',
    completed: false,
  },
];

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  const filteredTasks = useMemo(() => {
    return TASKS.filter(task =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    ).slice(0, 7);
  }, [searchText]);

  return (
    <View style={styles.container}>
      <Header
        userName="Usuario"
        appName="App Tareas"
        searchValue={searchText}
        onSearchChange={setSearchText}
        onPressCreateTask={() => navigation.navigate('AddTask')}
        onPressViewTasks={() => navigation.navigate('Tasks')}
        onPressToggleTheme={() => {}}
        onPressNotifications={() => {}}
      />

      <View style={styles.main}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('AddTask')}
          >
            <Text style={styles.buttonText}>Crear tarea</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Tasks')}
          >
            <Text style={styles.secondaryButtonText}>Ir a tareas</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Próximas tareas</Text>

        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskMeta}>
                Vence: {item.dueDate} · {item.priority}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.navButtonText}>Tareas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  main: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  primaryButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#e2e8f0',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1f2937',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 120,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  taskMeta: {
    color: '#6b7280',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
});