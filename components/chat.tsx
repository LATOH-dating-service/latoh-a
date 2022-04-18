import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { IconButton, Surface, List, Button } from 'react-native-paper';
import { UserContext } from '../App';
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
    const user = React.useContext(UserContext);

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
            getChatMessages(user.userData.token,1,(response:any)=>{
                let m = response.map((message:any)=>(makeMG(message)));
                m.reverse();
                setMessages(previousMessages => GiftedChat.append(previousMessages, m))
            },(error:any)=>{
                console.warn(error);
            })
            setLoadMessages(false);
        }
    }

    user.chatSocket.onclose = function(e:any) {
        console.error('Socket closed');
    }

    const onSend = React.useCallback((messages=[])=>{
        const ml = messages.map((message:any)=>({
            message: message.text,
            group: 'my_chat'
        }));
        user.chatSocket.send(JSON.stringify(ml[0]));
    },[messages]);

    user.chatSocket.onmessage = React.useCallback(function(e:any) {
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
    },[]);

    React.useEffect(()=>{
        get_chat_messages();
    })

    return(
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id:user.userData.user.id
            }}  />
    )
}
