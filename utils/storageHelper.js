import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native';

export const storeData = async (key, value) => {
    try{
        if (typeof value === 'string') {
            await AsyncStorage.setItem(key, value);
        } else {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        }
    }
    catch(error) {
        Alert.alert('404', error.message)
    }
}

export const getItemFor = async (key) => {
    try{
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
            try {
                // Attempt to parse as JSON
                return JSON.parse(storedValue);
            } catch (error) {
                // If parsing fails, return the string value
                return storedValue;
            }
        } else {
            return null;
        }
    }

    catch(error) {
        Alert.alert('404', error.message)
    }
}

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
        console.log('AsyncStorage has been cleared successfully.');
    } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
    }
};