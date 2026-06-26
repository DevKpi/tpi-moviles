import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen'
import TaskScreen from '../screens/TaskScreen';
import TaskDetail from '../screens/TaskDetail';
import AddTask from '../screens/AddTask';
import EditTask from '../screens/EditTask';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tasks"
          component={TaskScreen}
          options={{ title: 'Todas las Tareas' }}
        />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetail}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTask}
          options={{ title: 'Crear Tarea' }}
        />

        <Stack.Screen 
          name="EditTask" 
          component={EditTask} 
          options={{ title: 'Editar Tarea' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
    );
}