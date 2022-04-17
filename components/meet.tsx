import * as React from 'react';
import { View,Text, ScrollView, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton, Card, Paragraph, FAB, ActivityIndicator, Button, TextInput } from 'react-native-paper';
import Profile from './profile';
import { UserContext } from '../App';
import { useLinkProps } from '@react-navigation/native';
import { getMeets } from '../sdk';

export function Meet(props:any){
    const [meets,setMeets] = React.useState([]);
    const [loadMeets,setLoadMeets] = React.useState(true);
    const user = React.useContext(UserContext);
    React.useEffect(()=>{
        if(loadMeets){
            getMeets(user.userData.token,(response:any)=>{
                setMeets(response);
                console.log(response);
            },(error:any)=>{
                console.warn(error);
            })
            setLoadMeets(false);
        }
    })
    return (
        <View>
            <ScrollView>
                {meets.map((meet,i)=>(
                    <Card key={i} style={{
                            marginVertical: 8
                        }}>
                        <Card.Cover source={{
                            uri:meet.photo
                        }} />
                        <Card.Content>
                            <Paragraph>{meet.description}</Paragraph>
                        </Card.Content>
                        <Card.Actions style={{justifyContent:'center'}}>
                            <IconButton icon='heart' />
                        </Card.Actions>
                    </Card>
                ))}
            </ScrollView>
            <FAB icon='plus' style={{
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0
            }} onPress={()=>{props.navigation.navigate('PostMeet') }} />
        </View>
    );
}

export function PostMeet(props:any){
    const [loading,setLoading] = React.useState(false);
    const [meetForm,setMeetForm] = React.useState({
        description:''
    });
    const user = React.useContext(UserContext);
    const postMe = () => {
        setLoading(true);
        /*loginUser(meetForm,(response:any)=>{
            if(response.token !== undefined){
                user.setUser(response);
                props.navigation.navigate('Home');
            }
        },(error:any)=>{
            console.error(error);
            setLoading(false);
        })*/
    }
    return(
        <View style={{
            padding:8,
        }}>
            <Card>
                <Card.Content>
                    {loading?<ActivityIndicator style={{margin:10}} />:null}
                    <TextInput onChangeText={(value:string)=>{setMeetForm({
                        description:value
                    })}} value={meetForm.description} disabled={loading} label={'Description'} style={{marginBottom:10}} />
                </Card.Content>
                <Card.Actions>
                    <Button onPress={()=>{postMe();}} loading={loading} disabled={loading} icon={'arrow-up'}>Post Me</Button>
                    <Button disabled={loading} icon={'arrow-left'}>Cancel</Button>
                </Card.Actions>
            </Card>
        </View>
    )
}