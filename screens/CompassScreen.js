import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Magnetometer } from 'expo-sensors'
import { useTranslation } from 'react-i18next';
import { storeData, getItemFor } from '../utils/storageHelper';
import * as Location from 'expo-location';

const CompassScreen = () => {
  const [data, setData] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [location, setLocation] = useState(null);
  const [isOn, setIsOn] = useState(false);

  const {t} = useTranslation();


  const currentLocation = async () => {
    let location = await Location.getLastKnownPositionAsync({});
    setLocation(location)
  };
  
  useEffect(() => {
    getSwitch()
    toggleSub()
    currentLocation()
    return () => {
      RemoveSubscription()
    }
    
    
  }, []);

  const getSwitch = async () => {
    const mode = await getItemFor('switch');
    setIsOn(mode)
  };


  const toggleSub = () => {
    if (subscription) {
      RemoveSubscription()
    } else {
      AddSubscription()
    }
  };

  const AddSubscription = () => {
    setSubscription(
      Magnetometer.addListener((result) => {
        setData(calculateHeading(result))
      })
    )
  };

  const RemoveSubscription = () => {
    subscription && subscription.remove()
    setSubscription(null)
  };

  const calculateHeading = (coords) => {
    let angle = 0

    if(coords){
      let {x,y,z} = coords
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI)
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI)
      }
  
      return Math.round(angle);
    }

  };

  const setAngle = (coords) => {
    return coords- 90 >= 0 ? coords - 90 : coords + 271
  };

  const setSwitch = async () => {
    const newMode = !isOn
    setIsOn(newMode)
    // Save the new mode to AsyncStorage
    await storeData('switch', newMode)
  };


  return (
    <ImageBackground source={ isOn ? require('../assets/compass/night.jpg'): require('../assets/compass/day.jpg')} style={{flex:1}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor='transparent' translucent={true} barStyle='light-content'/>
        <View style={{flex:0.5, flexDirection: "row", justifyContent:"flex-end"}}>
          <TouchableOpacity style={{...styles.outter, 
            justifyContent: isOn ? 'flex-end': 'flex-start', 
            backgroundColor: isOn? '#362059': '#9de8ed'
            }} onPress={setSwitch}>
              {
                isOn ? (
                  null
                ): <Ionicons name="sunny" size={24} color="#fcb33d"/>
              }
              <View style={styles.inner}>
              </View>
              {
                isOn ? (
                  <Ionicons name="moon" size={24} color="black"/>
                ): null
              }
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {
            isOn? (
              <Image source={require('../assets/compass/compass-frame-night.png')} style={{transform: [{ rotate: `${360-data}deg` }], position: 'absolute'}} resizeMode='center'/>
            ): <Image source={require('../assets/compass/compass-frame.png')} style={{transform: [{ rotate: `${360-data}deg` }], position: 'absolute'}} resizeMode='center'/>
          }
          <Image source={require("../assets/compass/pointer.png")} style={styles.arrow}/>
        </View>
        <View style={styles.coordsInfo}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={{...styles.heading, color: isOn ? "#fff" : "#000"}}>{setAngle(data)}°</Text>
          <View style={{flexDirection:'row', alignSelf: 'center', flexWrap:'wrap'}}>
            <Text style={{...styles.coordsText, color: isOn ? "#fff" : "#000", marginRight:4}}>{location?.coords.latitude.toFixed(4)},</Text>
            <Text style={{...styles.coordsText, color: isOn ? "#fff" : "#000", marginLeft:4}}>{location?.coords.longitude.toFixed(4)}</Text>
          </View>
          <Text style={{...styles.coordsText, color: isOn ? "#fff" : "#000"}}>{t('altitude')}: {location?.coords.altitude.toFixed(0)} m</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
};

export default CompassScreen

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',

    shadowColor: "#000",
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1
  },
  arrow: {
    resizeMode: "center",
    marginBottom: 130
  },

  inner:{
    width:30,
    height: 30,
    backgroundColor: 'white',
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 5,
    marginRight:5,
    flex: 1
  },

  outter:{
    flexDirection: 'row',
    width:70,
    height: 40,
    borderRadius: 20,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    alignItems: 'center',
    marginTop: Platform.OS === 'ios'? 10 : 40,
    marginRight: 15
  },

  heading: {
    fontSize: 30,
    alignSelf: "center",
  },

  coordsInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-evenly",
    paddingBottom: 40,
  },

  coordsText: {
    fontSize: 20,
    alignSelf: "center"
  }
})