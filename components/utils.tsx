import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key:string, value:string) => {
    return await AsyncStorage.setItem(key,value);
}
export const getData = async (key:string) => {
    const item = await AsyncStorage.getItem(key);
    return JSON.parse(item);
}