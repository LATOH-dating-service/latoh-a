import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Card, TextInput } from 'react-native-paper';
import { loginUser } from '../sdk';
import { AppContext } from './utils';
import { getData, storeData } from './utils';

export function Login(props:any){
    const [loading,setLoading] = React.useState(false);
    const [loginForm,setLoginForm] = React.useState({
        username:'',
        password:''
    });
    const [checkUser,setCheckUser] = React.useState(true);
    const appContext = React.useContext(AppContext);
    const login = () => {
        setLoading(true);
        loginUser(loginForm,(response:any)=>{
            if(response.token !== undefined){
                appContext.setUser(response);
                storeData('user',JSON.stringify(response));
                props.navigation.navigate('Home');
            }
        },(error:any)=>{
            console.error(error);
            setLoading(false);
        })
    }
    React.useEffect(()=>{
        if(checkUser){
            setLoading(true);
            getData('user').then((userData:any)=>{
                if(userData){
                    appContext.setUser(userData);
                    props.navigation.navigate('Home');
                }
                setLoading(false);
            }).catch((error:any)=>{
                console.warn(error);
                setLoading(false);
            })
        }
        setCheckUser(false);
    },[checkUser])
    return (
        <View style={{
            padding:8,
        }}>
            <Card>
                <Card.Content>
                    {loading?<ActivityIndicator style={{margin:10}} />:null}
                    <TextInput onChangeText={(value:string)=>{setLoginForm({
                        username:value,
                        password:loginForm.password
                    })}} value={loginForm.username} disabled={loading} label={'Username'} style={{marginBottom:10}} />
                    <TextInput onChangeText={(value:string)=>{setLoginForm({
                        username:loginForm.username,
                        password:value
                    })}} value={loginForm.password} disabled={loading} label={'Password'} secureTextEntry style={{marginBottom:10}} />
                </Card.Content>
                <Card.Actions>
                    <Button onPress={()=>{login();}} loading={loading} disabled={loading} icon={'login'}>Login</Button>
                    <Button disabled={loading} icon={'plus'}>Create Account</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}