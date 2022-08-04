import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';

export const storeData = async (key:string, value:string) => {
    return await AsyncStorage.setItem(key,value);
}
export const getData = async (key:string) => {
    const item = await AsyncStorage.getItem(key);
    return JSON.parse(item);
}
export const removeData = async (key:string) => {
    return await AsyncStorage.removeItem(key);
}

export const UserContext = React.createContext({});
export const AppContext = React.createContext({});
