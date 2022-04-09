// In App.js in a new project

import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/home';
import { IconButton } from 'react-native-paper';
import { Chat, ChatList } from './components/chat';
import { Login } from './components/login-logout';

const Stack = createNativeStackNavigator();
export const UserContext = React.createContext({});

function App() {
  const [user,setUser] = React.useState(null);
  return (
    <UserContext.Provider value={{
      id: 1
    }} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ Boolean(user) ? 'Home':'Login' }>
          <Stack.Screen 
            options={{
              headerShown: false,
            }} name='Home' component={HomeScreen} />
          <Stack.Screen name='ChatList' component={ChatList} />
          <Stack.Screen name='Chat' component={Chat} />
          <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
