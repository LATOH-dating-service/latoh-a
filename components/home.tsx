import * as React from 'react';
import { View,Text, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton, Card, Paragraph } from 'react-native-paper';

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

function Meet(){
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
                        <IconButton icon='heart' />
                    </Card.Actions>
                </Card>
            ))}
        </ScrollView>
    );
}

const Tabs = createBottomTabNavigator();

const HomeScreen = (props:any) => {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerRight: () => (
                    <IconButton icon='message' onPress={()=>{props.navigation.navigate('ChatList')}} />
                )
            }} >
            <Tabs.Screen name='Meet' component={Meet} />
            <Tabs.Screen name='LikesYou' component={LikesYou} />
        </Tabs.Navigator>
    );
}
export default HomeScreen;