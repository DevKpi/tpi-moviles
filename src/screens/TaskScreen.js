import React, { useContext, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { ThemeContext } from '../context/ThemeContext';
import Task from '../components/Task';

export default function TaskScreen({ navigation }) {
    const { tasks, toggleTaskCompleted, deleteTask } = useContext(TaskContext);
    const { colors } = useContext(ThemeContext);
    const [filter, setFilter] = useState('Todas');

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (filter === 'Pendientes') return !task.completed;
            if (filter === 'Completadas') return task.completed;
            return true;
        });
    }, [tasks, filter]);

    const tabs = ['Todas', 'Pendientes', 'Completadas'];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollContent}>
                    {tabs.map(tab => (
                        <TouchableOpacity 
                            key={tab} 
                            style={[
                                styles.tabButton, 
                                { backgroundColor: filter === tab ? '#3b82f6' : colors.card, borderColor: filter === tab ? '#3b82f6' : colors.border, borderWidth: 1 }
                            ]}
                            onPress={() => setFilter(tab)}
                        >
                            <Text style={[
                                styles.tabText, 
                                { color: filter === tab ? '#fff' : colors.text }
                            ]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {filteredTasks.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No hay tareas en esta categoría.</Text>
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
    tabsContainer: { paddingVertical: 12 },
    tabsScrollContent: { paddingHorizontal: 16, gap: 10 },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    tabText: {
        fontWeight: '600',
    },
    listContent: { padding: 16, paddingBottom: 80 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontSize: 16, textAlign: 'center' }
});