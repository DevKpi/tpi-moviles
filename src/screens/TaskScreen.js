import React, { useContext, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import Task from '../components/Task';

export default function TaskScreen({ navigation }) {
    const { tasks, toggleTaskCompleted, deleteTask } = useContext(TaskContext);
    const { colors } = useContext(ThemeContext);
    const [filter, setFilter] = useState('Todas');
    const [modalVisible, setModalVisible] = useState(false);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (filter === 'Pendientes') return !task.completed;
            if (filter === 'Completadas') return task.completed;
            if (filter === 'Prioridad Alta') return task.priority === 'Alta';
            if (filter === 'Prioridad Media') return task.priority === 'Media';
            if (filter === 'Prioridad Baja') return task.priority === 'Baja';
            return true;
        });
    }, [tasks, filter]);

    const filterOptions = ['Todas', 'Pendientes', 'Completadas', 'Prioridad Alta', 'Prioridad Media', 'Prioridad Baja'];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header / Filter Row */}
            <View style={styles.headerRow}>
                <TouchableOpacity 
                    style={[styles.dropdownButton, { backgroundColor: colors.card, borderColor: colors.border }]} 
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={[styles.dropdownButtonText, { color: colors.text }]}>Filtro: {filter} ▾</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for Dropdown List */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={[styles.dropdownMenu, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        {filterOptions.map(option => (
                            <TouchableOpacity
                                key={option}
                                style={[styles.dropdownItem, filter === option && { backgroundColor: colors.background }]}
                                onPress={() => {
                                    setFilter(option);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={[
                                    styles.dropdownItemText, 
                                    { color: filter === option ? '#3b82f6' : colors.text },
                                    filter === option && { fontWeight: 'bold' }
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>

            {filteredTasks.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No hay tareas para este filtro.</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Task 
                            task={item} 
                            onToggleCompleted={toggleTaskCompleted}
                            onDelete={deleteTask}
                            onPressDetail={() => navigation.navigate('TaskDetail', { task: item })}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    dropdownButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
    },
    dropdownButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 60, // position just below the header row
        right: 16,
        width: 180,
        borderRadius: 12,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        overflow: 'hidden',
    },
    dropdownItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    dropdownItemText: {
        fontSize: 15,
    },
    listContent: { padding: 16, paddingBottom: 80 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontSize: 16, textAlign: 'center' }
});