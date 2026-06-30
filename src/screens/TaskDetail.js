import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { TaskContext } from '../context/TaskContext';

export default function TaskDetail({ route, navigation }) {
  const { tasks, deleteTask } = useContext(TaskContext);
  const { colors } = useContext(ThemeContext);

  // Buscamos la tarea en tiempo real dentro del contexto usando el ID recibido
  const taskParam = route.params.task;
  const task = tasks.find(t => t.id === taskParam.id);

  // Si por alguna razón la tarea ya no existe (ej. fue eliminada), regresamos de inmediato
  if (!task) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>La tarea ya no está disponible.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Eliminar Tarea",
      `¿Estás seguro de que deseas eliminar "${task.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: () => {
            deleteTask(task.id);
            navigation.goBack(); 
          } 
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
        
        <Text style={[styles.label, { color: colors.textSecondary }]}>Descripción:</Text>
        <Text style={[styles.description, { color: colors.text }]}>
          {task.description || "No hay descripción detallada."}
        </Text>
        
        <Text style={[styles.label, { color: colors.textSecondary }]}>Estado:</Text>
        <Text style={[styles.status, { color: task.completed ? '#10b981' : '#f59e0b' }]}>
          {task.completed ? "Completada ✅" : "Pendiente ⏳"}
        </Text>
        
        <Text style={[styles.label, { color: colors.textSecondary }]}>Prioridad:</Text>
        <Text style={[styles.status, { color: colors.text }]}>
          {task.priority === 'Alta' ? '🔴 Alta' : task.priority === 'Baja' ? '🔵 Baja' : '🟡 Media'}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        {/* Ahora navegamos a la nueva pantalla EditTask */}
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => navigation.navigate('EditTask', { task })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 20, borderRadius: 16, marginBottom: 24, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 4 },
  description: { fontSize: 16, lineHeight: 24 },
  status: { fontSize: 16, marginTop: 4 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  actionButton: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  editButton: { backgroundColor: '#3b82f6' },
  deleteButton: { backgroundColor: '#ef4444' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});