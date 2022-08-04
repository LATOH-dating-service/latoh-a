import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { IconButton, Surface, List, Button, ActivityIndicator } from 'react-native-paper';
import { AppContext } from './utils';
import { getChatMessages, rootTest } from '../sdk';

export function ChatList({ navigation }:any){
    return (
        <View>
            <Button>New message</Button>
            <List.Section>
                <List.Item title='John Smith' onPress={()=>{
                    navigation.navigate('Chat');
                }} />
            </List.Section>
        </View>
    );
}

export function ChatPage(props:any){
    const [messages,setMessages] = React.useState([]);
    const [loadMessages,setLoadMessages] = React.useState(true);
    const [loading,setLoading] = React.useState(false);
    const [load,setLoad] = React.useState(true);
    const appContext = React.useContext(AppContext);

    const makeMG = (data:any) =>{
        const m = {
            _id: data.id,
            createdAt: new Date(data.date),
            text: data.text,
            user: {
                _id: data.user
            }
        };
        return m;
    }

    const get_chat_messages = () => {
        if(loadMessages){
            getChatMessages(appContext.userData.token,1,(response:any)=>{
                let m = response.map((message:any)=>(makeMG(message)));
                m.reverse();
                setMessages(previousMessages => GiftedChat.append(previousMessages, m))
            },(error:any)=>{
                console.warn(error);
            })
            setLoadMessages(false);
        }
    }

    appContext.onChatClosed(()=>{
        console.error('Socket closed');
    })

    const onSend = React.useCallback((messages=[])=>{
        const ml = messages.map((message:any)=>({
            message: message.text,
            group: 'my_chat'
        }));
        if(appContext.chatSocket.readyState === 1){
            console.log(ml);
            appContext.chatSocket.send(JSON.stringify(ml[0]));
        }else{
            appContext.reconnectSockets();
            appContext.chatSocket.send(JSON.stringify(ml[0]));
            console.warn(appContext.chatSocket.readyState);
        }
    },[messages]);

    appContext.onChatMessage((data:any)=>{
        const m = {
            _id: new Date(),
            createdAt: new Date(),
            text: data.message,
            user: {
                _id: data.user.id
            }
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [m]))
    })

    React.useEffect(()=>{
        console.log(appContext.chatSocket.readyState)
        if(load){
            if(appContext.chatSocket.readyState === 1){
                setLoading(false);
            } else {
                setLoading(true);
            }
            setLoad(false);
        }
        get_chat_messages();
    })

    return(
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id:appContext.userData.user.id
            }}
            renderLoading={()=>(
                <ActivityIndicator animating={loading} />
            )} />
    )
}
