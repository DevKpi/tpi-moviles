import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Task({ task, onToggleCompleted, onDelete }) {
  const { colors } = useContext(ThemeContext);

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
      style={[
        styles.taskCard, 
        { backgroundColor: colors.card, shadowColor: colors.text },
        task.completed && { backgroundColor: colors.completedCard, opacity: 0.6 }
      ]}
      onPress={() => onToggleCompleted(task.id)}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.taskInfo}>
        <Text style={[
            styles.taskTitle, 
            { color: colors.text },
            task.completed && { textDecorationLine: 'line-through', color: colors.textSecondary }
        ]}>
          {task.title}
        </Text>
        {task.description ? (
          <Text style={[
              styles.taskMeta, 
              { color: colors.textSecondary },
              task.completed && { color: colors.textSecondary }
          ]}>
            {task.description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  taskMeta: {
    fontSize: 14,
  }
});
