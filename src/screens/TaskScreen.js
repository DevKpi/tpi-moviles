import { View, Text, Button } from 'react-native';


export default function TaskScreen() {
    return (
        <View>
            <Text>Pantalla de lista de Tareas</Text>

            <Button
                title="Ver tarea"
                onPress={() => navigation.navigate('TaskDetail')}
            />

        </View>
    );
}