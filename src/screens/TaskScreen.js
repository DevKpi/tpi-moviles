import { View, Text, Button, FlatList } from 'react-native';
import { styles } from '../styles/theme-taskscreen';

const productos = [
    { id: '1', nombre: 'Mouse Gamer', precio: 15000 },
    { id: '2', nombre: 'Teclado Mecánico', precio: 45000 },
    { id: '3', nombre: 'Monitor', precio: 120000 },
];


export default function TaskScreen() {
    return (
        <View>
            <Text>Pantalla de lista de Tareas</Text>

            <Button
                title="Ver tarea"
                onPress={() => navigation.navigate('TaskDetail')}
            />

            <View style={styles.container}>
                <FlatList
                    data={productos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.nombre}>{item.nombre}</Text>
                            <Text>${item.precio}</Text>
                        </View>
                    )}
                />
            </View>


        </View>
    );
}