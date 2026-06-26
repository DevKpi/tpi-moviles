import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import PopUpSub from './PopUpSub';

export default function AddTask({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useContext(TaskContext);
  const { colors, isDarkMode } = useContext(ThemeContext);
  const [subModalVisible, setSubModalVisible] = useState(false);
  
  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Por favor ingresa un título para la tarea.');
      return;
    }
    addTask(title, description);
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
});
