import * as React from 'react';
import { View,Text, ScrollView, Image, RefreshControl } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton, Card, Paragraph, FAB, ActivityIndicator, Button, TextInput, Avatar } from 'react-native-paper';
import Profile from './profile';
import { AppContext } from './utils';
import { useLinkProps } from '@react-navigation/native';
import { baseUrl, getFullMeets, postMeet } from '../sdk';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

export function Meet(props:any){
    const [loading,setLoading] = React.useState(false);
    const [meets,setMeets] = React.useState([]);
    const [loadMeets,setLoadMeets] = React.useState(true);
    const appContext = React.useContext(AppContext);

    React.useEffect(()=>{
        if(loadMeets){
            if(appContext.userData !== null){
                setLoading(true);
                getFullMeets(appContext.userData.token,(response:any)=>{
                    response.reverse();
                    setMeets(response);
                    setLoading(false);
                },(error:any)=>{
                    console.warn(error);
                    setLoading(false);
                })
                setLoadMeets(false);
            }
        }
    })
    
    return (
        <View>
            <ScrollView
                refreshControl={<RefreshControl refreshing={loading} onRefresh={()=>{setLoadMeets(true)}} />}>
                {meets.map((meet,i)=>(
                    <Card key={i} style={{
                            marginVertical: 8
                        }}>
                        <Card.Title 
                            title={meet.user.username}
                            left={(props:any)=><Avatar.Image {...props} source='' />} />
                        <Card.Cover source={{uri:`${baseUrl}${meet.photo}`}} />
                        <Card.Content>
                            <Paragraph>{meet.description}</Paragraph>
                        </Card.Content>
                        <Card.Actions style={{justifyContent:'center'}}>
                            <IconButton color='red' icon='heart' />
                        </Card.Actions>
                    </Card>
                ))}
            </ScrollView>
            <FAB icon='plus' style={{
                position: Boolean(meets.length > 0) ? 'absolute' : 'relative',
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
        description:'',
        photo:null
    });
    const user = React.useContext(AppContext);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
  
      if (!result.cancelled) {
          let fileDetails = result.uri.split(".");
          let ext = fileDetails.pop()
          let p = {
              uri:result.uri,
              type:`${result.type}/${ext}`,
              name:`${uuid.v4()}.${ext}`
          }
          console.log(p);
          setMeetForm({description:meetForm.description,photo:p});
      }
    };

    const postMe = () => {
        setLoading(true);
        let me = new FormData();
        me.append('description',meetForm.description);
        me.append('photo',meetForm.photo);
        me.append('user',user.userData.user.id);
        postMeet(user.userData.token,me,(response:any)=>{
            console.log(response);
            setLoading(false);
            if(response.id !== undefined){
                props.navigation.navigate('Meet');
            }
        },(error:any)=>{
            console.warn(error);
            setLoading(false);
        });
    }
    return(
        <View style={{
            padding:8,
        }}>
            <Card>
                <Card.Cover source={{uri: Boolean(meetForm.photo) ? meetForm.photo.uri : null}} />
                <Card.Content>
                    {loading?<ActivityIndicator style={{margin:10}} />:null}
                    <Button disabled={loading} icon={'image'} onPress={pickImage}>Pick Image</Button>
                    <TextInput disabled={loading} onChangeText={(value:string)=>{setMeetForm({
                        description:value,
                        photo:meetForm.photo
                    })}} value={meetForm.description} disabled={loading} label={'Description'} style={{marginBottom:10}} />
                </Card.Content>
                <Card.Actions>
                    <Button onPress={()=>{postMe();}} loading={loading} disabled={loading} icon={'arrow-up'}>Post Me</Button>
                    <Button disabled={loading} icon={'arrow-left'} onPress={()=>{props.navigation.pop()}}>Cancel</Button>
                </Card.Actions>
            </Card>
        </View>
    )
}