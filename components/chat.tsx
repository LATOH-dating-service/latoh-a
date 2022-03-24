import * as React from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { IconButton, Surface, TextInput } from 'react-native-paper';

export function ChatList(){
    return (
        <View>
            <Text>Chat list</Text>
        </View>
    );
}

export function Chat(){
    const [messages,setMessages] = React.useState([]);
    const onSend = React.useCallback((messages=[])=>{
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    },[]);
    return (
        <GiftedChat 
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id:1
            }} />
    );
}
