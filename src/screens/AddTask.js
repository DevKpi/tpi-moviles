import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import PopUpSub from './PopUpSub';

export default function AddTask({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Media');
  const { addTask } = useContext(TaskContext);
  const { colors, isDarkMode } = useContext(ThemeContext);
  const [subModalVisible, setSubModalVisible] = useState(false);
  
  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Por favor ingresa un título para la tarea.');
      return;
    }
    addTask(title, description, priority);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.text }]}>Título de la tarea</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        placeholder="Ej. Comprar leche"
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />
      
      <Text style={[styles.label, { color: colors.text }]}>Descripción (Opcional)</Text>
      <TextInput
        style={[styles.input, styles.textArea, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        placeholder="Añade detalles adicionales..."
        placeholderTextColor={colors.textSecondary}
        value={description}
        onChangeText={setDescription}
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
        <Text style={styles.saveButtonText}>Guardar Tarea</Text>
      </TouchableOpacity>
      <PopUpSub visible={subModalVisible} onClose={() => setSubModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  saveButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 32,
    elevation: 4,
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
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
