import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { IconButton, Surface, List } from 'react-native-paper';
import { UserContext } from '../App';
import { getChatMessages, rootTest } from '../sdk';

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

    const user = React.useContext(UserContext);

    React.useEffect(()=>{
        if(messages.length === 0){
            get_chat_messages()
        }
    },[])
    const get_chat_messages = () => {
        getChatMessages(user.userData.token,1,(response:any)=>{
            let m = response.map((message:any)=>(makeMG(message)));
            setMessages(previousMessages => GiftedChat.append(previousMessages, m))
        },(error:any)=>{
            console.warn(error);
        })
    }

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
                _id:user.userData.user.id
            }} />
    );
}

export function Chat(){
    const [messages,setMessages] = React.useState([]);
    const user = React.useContext(UserContext);
    const s = user.chatSocket;
    
    return (
        <ChatScreen socket={s} messages={messages} />
    );
}
