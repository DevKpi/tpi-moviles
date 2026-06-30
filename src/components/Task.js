import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Task({ task, onToggleCompleted, onDelete, onPressDetail }) {
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
      <View style={styles.taskContainer}>
        {/* Contenedor de Textos */}
        <View style={styles.taskInfo}>
          <Text style={[
              styles.taskTitle, 
              { color: colors.text },
              task.completed && { textDecorationLine: 'line-through', color: colors.textSecondary }
          ]}>
            {task.priority === 'Alta' ? '🔴 ' : task.priority === 'Baja' ? '🔵 ' : '🟡 '}{task.title}
          </Text>
          {task.description ? (
            <Text 
              style={[
                styles.taskMeta, 
                { color: colors.textSecondary },
                task.completed && { color: colors.textSecondary }
              ]}
              numberOfLines={1} // Limita a 1 línea en la lista para no romper el diseño
            >
              {task.description}
            </Text>
          ) : null}
        </View>

        {/* Nuevo botón para ir al Detalle */}
        <TouchableOpacity 
          style={[styles.detailButton, { backgroundColor: '#3b82f6' }]} // Puedes usar colors.primary si lo tienes
          onPress={onPressDetail}
        >
          <Text style={styles.detailButtonText}>Detalles</Text>
        </TouchableOpacity>
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
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskInfo: {
    flex: 1,
    marginRight: 12, // Espacio entre el texto y el botón
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  taskMeta: {
    fontSize: 14,
  },
  detailButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  }
});