import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Card, TextInput } from 'react-native-paper';

export function Login(){
    const [loading,setLoading] = React.useState(false);
    const [loginForm,setLoginForm] = React.useState({
        username:'',
        password:''
    });
    const login = () => {
        console.log(loginForm);
    }
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