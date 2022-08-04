import * as React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { UserContext } from './utils';

export default function Profile(){
    const user = React.useContext(UserContext);
    return(
        <View>
            <List.Section title='User information'>
                <List.Item title={'user.userData.user.username'} />
                <List.Item title={'user.userData.user.email'} />
            </List.Section>
        </View>
    );
}