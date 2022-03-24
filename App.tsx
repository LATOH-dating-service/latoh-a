// In App.js in a new project

import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/home';
import { IconButton } from 'react-native-paper';
import { Chat, ChatList } from './components/chat';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          options={{
            headerShown: false,
          }} name='Home' component={HomeScreen} />
        <Stack.Screen name='Chat' component={Chat} />
        <Stack.Screen name='ChatList' component={ChatList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
