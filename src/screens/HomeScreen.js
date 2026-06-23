import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {


    return (
        <View>
            
            <Text>Home Screen</Text>

            <Button
                title="Ver todas las tareas"
                onPress={() => navigation.navigate('Tasks')}
            />

        </View>
    );
}