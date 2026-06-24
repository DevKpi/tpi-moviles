import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Task({ task, onToggleCompleted, onDelete }) {
  const handleLongPress = () => {
    Alert.alert(
      "Eliminar Tarea",
      `¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => onDelete(task.id) }
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={[styles.taskCard, task.completed && styles.taskCardCompleted]}
      onPress={() => onToggleCompleted(task.id)}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
          {task.title}
        </Text>
        {task.description ? (
          <Text style={[styles.taskMeta, task.completed && styles.taskMetaCompleted]}>
            {task.description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  taskCardCompleted: {
    backgroundColor: '#f8fafc',
    opacity: 0.8,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111827',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  taskMeta: {
    color: '#6b7280',
    fontSize: 14,
  },
  taskMetaCompleted: {
    color: '#9ca3af',
  }
});
