import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen'
import TaskScreen from '../screens/TaskScreen';
import TaskDetail from '../screens/TaskDetail';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
return (
    <NavigationContainer>


      <Stack.Navigator>


        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />


        <Stack.Screen
          name="Tasks"
          component={TaskScreen}
        />

        <Stack.Screen
          name="TaskDetail"
          component={TaskDetail}
        />

      </Stack.Navigator>


    </NavigationContainer>
    );
}