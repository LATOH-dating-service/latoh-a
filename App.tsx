// In App.js in a new project

import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/home';
import { IconButton } from 'react-native-paper';
import { ChatList, ChatPage } from './components/chat';
import { Login } from './components/login-logout';
import { PostMeet } from './components/meet';
import { AppContext, UserContext } from './components/utils';
import {
  wsBaseUrl
} from './sdk';

const Stack = createNativeStackNavigator();

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavDefaultTheme.colors,
    primary: 'tomato',
    accent: 'tomato',
    card: 'white',
  }
}

function App(props:any) {
  const [user,setUser] = React.useState(null);
  const [ws,setWs] = React.useState(Boolean(user) ? new WebSocket(`${wsBaseUrl}/ws/chat/stream/?auth=${user.token}`) : new WebSocket(`${wsBaseUrl}/ws/chat/stream/`));

  return (
    <AppContext.Provider value={{
      userData: user,
      setUser: setUser,
      chatSocket: ws,
      chatSendMessage: (callBack:CallableFunction)=>{
        ws.onmessage = (e:any)=>{
          callBack(JSON.parse(e.data));
        }
      },
      onChatMessage: (callBack:CallableFunction)=>{
        if(ws != null){
          if(ws.onmessage !== undefined){
            ws.onmessage = (e:any) => {
              callBack(JSON.parse(e.data));
            }
          } else {
            callBack(null);
          }
        }
      },
      onChatClosed: (callBack:CallableFunction)=>{
        if(ws != null){
          if(ws.onclose !== undefined){
            ws.onclose = (e:any) => {
              callBack();
            }
          } else {
            callBack(null);
          }
        }
      },
      reconnectSockets: ()=>{
        setWs(Boolean(user) ? new WebSocket(`${wsBaseUrl}/ws/chat/stream/?auth=${user.token}`) : new WebSocket(`${wsBaseUrl}/ws/chat/stream/`));
      }

    }} >
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          <Stack.Navigator initialRouteName={ Boolean(user) ? 'Home':'Login' }>
            <Stack.Screen 
              options={{
                headerShown: false,
              }} name='Home' component={HomeScreen} />
            <Stack.Screen name='PostMeet' component={PostMeet} />
            <Stack.Screen name='ChatList' component={ChatList} />
            <Stack.Screen name='Chat' component={ChatPage} />
            <Stack.Screen name='Login' component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  );
}

export default App;
