import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen'
import TaskScreen from '../screens/TaskScreen';

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
          name="Task"
          component={TaskScreen}
        />


      </Stack.Navigator>


    </NavigationContainer>
    );
}