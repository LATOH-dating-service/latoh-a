import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { IconButton, Surface, List } from 'react-native-paper';
import { rootTest } from '../sdk';

export function ChatList({ navigation }:any){
    return (
        <View>
            <List.Section>
                <List.Item title='John Smith' onPress={()=>{
                    navigation.navigate('Chat');
                }} />
            </List.Section>
        </View>
    );
}

function ChatScreen(props:any){
    const [messages,setMessages] = React.useState([]);
    const s = props.socket;
    s.onmessage = React.useCallback(function(e:any) {
        const data = JSON.parse(e.data);
        const m = {
            _id: new Date(),
            createdAt: new Date(),
            text: data.message,
            user: {
                _id: data.user.id
            }
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [m]))
        console.log(m);
    },[]);
    s.onclose = function(e:any) {
        console.error('Socket closed');
    }
    const onSend = React.useCallback((messages=[])=>{
        const ml = messages.map((message:any)=>({
            message: message.text,
            group: 'my_chat'
        }));
        s.send(JSON.stringify(ml[0]));
    },[]);
    return (
        <GiftedChat 
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id:2
            }} />
    );
}

export function Chat(){
    const s = new WebSocket('ws://192.168.43.144:8000/ws/chat/stream/?auth=7c673a3f195d0a5d1712fd26c1dd0c4361fb19b6')
    const get_chat_messages = () => {
        //
    }
    React.useEffect(function(){
        test();
    })
    const test = () => {
        rootTest(function(response:any){
            console.log(response);
        },function(error:any){
            console.log(error);
        });
    }
    
    return (
        <ChatScreen socket={s} />
    );
}
