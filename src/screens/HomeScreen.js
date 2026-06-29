import React, { useMemo, useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import Task from '../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUpLogin from './PopUpLogin';
import PopUpConfig from './PopUpConfig';




export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const { tasks, toggleTaskCompleted, deleteTask } = useContext(TaskContext);
  const { colors, isDarkMode } = useContext(ThemeContext);
  const [userName, setUserName] = useState('Usuario');
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [configNameInput, setConfigNameInput] = useState('');

  useEffect(() => {
  const loadUserName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('@userName');
      if (storedName) {
        setUserName(storedName);
      } else {
        setNameModalVisible(true);
      }
    } catch (e) {
      console.error('Error cargando nombre', e);
    }
  };

  loadUserName();
}, []);


const handleSaveName = async () => {
  const trimmedName = nameInput.trim();
  if (!trimmedName) return;

  try {
    await AsyncStorage.setItem('@userName', trimmedName);
    setUserName(trimmedName);
    setNameModalVisible(false);
    setNameInput('');
  } catch (e) {
    console.error('Error guardando nombre', e);
  }
};

const handleSaveConfigName = async () => {
  const trimmedName = configNameInput.trim();
  if (!trimmedName) return;

  try {
    await AsyncStorage.setItem('@userName', trimmedName);
    setUserName(trimmedName);
    setConfigModalVisible(false);
  } catch (e) {
    console.error('Error guardando nombre desde config', e);
  }
};

  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    ).slice(0, 5);
  }, [searchText, tasks]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        userName={userName}
        appName="App Tareas"
        searchValue={searchText}
        onSearchChange={setSearchText}
        onPressCreateTask={() => navigation.navigate('AddTask')}
        onPressViewTasks={() => navigation.navigate('Tasks')}
        onPressNotifications={() => {}}
        onPressConfig={() => {
          setConfigNameInput(userName);
          setConfigModalVisible(true);
        }}
      />
          <PopUpLogin
      visible={nameModalVisible}
      name={nameInput}
      setName={setNameInput}
      onSave={handleSaveName}
    />
    <PopUpConfig
      visible={configModalVisible}
      onClose={() => setConfigModalVisible(false)}
      name={configNameInput}
      setName={setConfigNameInput}
      onSave={handleSaveConfigName}
    />

      <View style={styles.main}>
        <View style={styles.buttonRow}>
          {/* <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('AddTask')}
          >
            <Text style={styles.buttonText}>Crear tarea</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={[styles.secondaryButton, { backgroundColor: isDarkMode ? '#374151' : '#e2e8f0' }]}
            onPress={() => navigation.navigate('Tasks')}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Ir a tareas</Text>
          </TouchableOpacity> */}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Próximas tareas</Text>

        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Task 
              task={item} 
              onToggleCompleted={toggleTaskCompleted}
              onDelete={deleteTask}
              // Agregamos esta línea para navegar al detalle y enviarle la tarea
              onPressDetail={() => navigation.navigate('TaskDetail', { task: item })}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>
              No hay tareas recientes.
            </Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  main: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  primaryButton: {
    flex: 1, marginRight: 8, backgroundColor: '#3b82f6', paddingVertical: 14, borderRadius: 14, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
  secondaryButton: {
    flex: 1, marginLeft: 8, paddingVertical: 14, borderRadius: 14, alignItems: 'center',
  },
  secondaryButtonText: { fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  listContent: { paddingBottom: 120 },
});