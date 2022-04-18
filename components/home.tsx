import * as React from 'react';
import { View,Text, ScrollView, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton, Card, Paragraph, FAB } from 'react-native-paper';
import Profile from './profile';
import { UserContext } from '../App';
import { useLinkProps } from '@react-navigation/native';
import { Meet } from './meet';

function LikesYou(){
    const people = [
        {username:'fshangala',bio:'Hello World'},
        {username:'fshangala',bio:'Hello World'},
        {username:'fshangala',bio:'Hello World'},
        {username:'fshangala',bio:'Hello World'},
        {username:'fshangala',bio:'Hello World'},
        {username:'fshangala',bio:'Hello World'},
        {username:'fshangala',bio:'Hello World'},
        {username:'fshangala',bio:'Hello World'},
        {username:'fshangala',bio:'Hello World'},
    ]
    return (
        <ScrollView>
            {people.map((person,i)=>(
                <Card key={i} style={{
                        marginVertical: 8
                    }}>
                    <Card.Title title={person.username} />
                    <Card.Content>
                        <Paragraph>{person.bio}</Paragraph>
                    </Card.Content>
                    <Card.Actions style={{justifyContent:'center'}}>
                        <IconButton icon='message' />
                    </Card.Actions>
                </Card>
            ))}
        </ScrollView>
    );
}

const Tabs = createBottomTabNavigator();

const HomeScreen = (props:any) => {
    const user = React.useContext(UserContext);
    return (
        <Tabs.Navigator
            screenOptions={{
                headerRight: () => (
                    <IconButton color='blue' icon='message' onPress={()=>{props.navigation.navigate('ChatList')}} />
                ),
                tabBarActiveTintColor: 'tomato'
            }} >
            <Tabs.Screen options={{
                tabBarIcon: (props:any)=>{
                    return <IconButton color={props.focused?'tomato':'gray'} icon={'diamond'} />
                }
            }} name='Meet' component={Meet} />
            <Tabs.Screen options={{
                tabBarIcon: (props:any)=>{
                    return <IconButton color={props.focused?'tomato':'gray'} icon={'heart'} />
                }
            }} name='LikesYou' component={LikesYou} />
            <Tabs.Screen options={{
                title: user.userData.user.username,
                tabBarIcon: (props:any)=>{
                    return <IconButton color={props.focused?'tomato':'gray'} icon={'account'} />
                }
            }} name='Profile' component={Profile} />
        </Tabs.Navigator>
    );
}
export default HomeScreen;