import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import PopUpSub from './PopUpSub';

export default function EditTask({ route, navigation }) {
  const { task } = route.params; // Recibimos la tarea original
  const { updateTask } = useContext(TaskContext);
  const { colors } = useContext(ThemeContext);
  const [subModalVisible, setSubModalVisible] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'Media');

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Error", "El título de la tarea no puede estar vacío.");
      return;
    }

    // Guardamos los cambios manteniendo el ID y el estado 'completed' originales
    updateTask(task.id, {
      title: title.trim(),
      description: description.trim(),
      priority,
    });
    
    // Volver directo sin el Alert
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.text }]}>Editar Título</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.textSecondary }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Título de la tarea"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={[styles.label, { color: colors.text }]}>Editar Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.textSecondary }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción (opcional)"
        placeholderTextColor={colors.textSecondary}
        multiline
        numberOfLines={4}
      />

      <Text style={[styles.label, { color: colors.text }]}>Prioridad</Text>
      <View style={styles.priorityContainer}>
        {['Baja', 'Media', 'Alta'].map(p => (
          <TouchableOpacity 
            key={p} 
            style={[styles.priorityButton, priority === p && styles[`priority${p}`]]}
            onPress={() => setPriority(p)}
          >
            <Text style={[styles.priorityText, priority === p && {color: '#fff'}]}>
              {p === 'Alta' ? '🔴 Alta' : p === 'Media' ? '🟡 Media' : '🔵 Baja'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
  style={[styles.subButton, { backgroundColor: '#8b5cf6' }]}
  onPress={() => setSubModalVisible(true)}
>
  <Text style={styles.saveButtonText}>Adjuntar Archivos</Text>
</TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
      <PopUpSub visible={subModalVisible} onClose={() => setSubModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, marginTop: 12 },
  input: { padding: 14, borderRadius: 12, borderWidth: 1, fontSize: 16, marginBottom: 12 },
  textArea: { height: 100, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#10b981', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subButton: {
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: 'center',
  marginTop: 16,
},
  priorityContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  priorityButton: { flex: 1, paddingVertical: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  priorityText: { fontWeight: '600', color: '#666' },
  priorityBaja: { backgroundColor: '#3b82f6', borderColor: 'transparent' },
  priorityMedia: { backgroundColor: '#f59e0b', borderColor: 'transparent' },
  priorityAlta: { backgroundColor: '#ef4444', borderColor: 'transparent' },
});