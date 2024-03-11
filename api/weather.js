import { Alert } from "react-native";
import * as Location from 'expo-location';
import { Linking } from "react-native";
import { API_KEY } from '@env'


export const fetchWeatherForecast = async (cityName, numDays, lang) =>{
    try{
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=${numDays}&lang=${lang}`)
      if (response.status == 200){
        const data = await response.json();
        return data;
      }
      else {
        Alert.alert('City not found', 'Please search for a valid city')
      }    
    } catch(error) {
      Alert.alert('404', error.message)
    }
}

export const fetchWeatherLocation = async (numDays,lang) =>{
  try{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const currentLocation = await Location.getLastKnownPositionAsync({});
      const coordsLocation = [currentLocation.coords.latitude, currentLocation.coords.longitude]

      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${coordsLocation}&days=${numDays}&lang=${lang}`)
      const data = await response.json();
      return data;
    } else {
      Alert.alert("Location Services Required","Please enable location services to allow the app to show your location", 
      [
        {
          text: "Open settigns",
          onPress: () => {
            // Redirect user to settings to enable location services
            Linking.openSettings();
          }
        }
      ])

      return null;
    }
    

  } catch(error) {
    Alert.alert('404', error.message)
  }
}

export const fetchWeatherSearch = async (cityName) =>{
  try{
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${cityName}`)
    if (response.status == 200){
      const data = await response.json();
      return data;
    }
    else {
      Alert.alert('City not found', 'Please search for a valid city')
    }    
  } catch(error) {
    Alert.alert('404', error.message)
  }
}

