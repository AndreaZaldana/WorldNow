import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { weatherImages } from '../constants/weatherConditions'
import { weatherImagesNight } from '../constants/weatherConditionsNight'
import React from 'react'

const { width } = Dimensions.get('window');

const CurrentWeather = ({dayForecast}) => {
  return (
    <View style={{width: width-32, flexDirection: 'column', flex: 1}}>
      <Text numberOfLines={2} adjustsFontSizeToFit style={{...styles.textBoxDefault, marginTop: 10}}>{dayForecast?.location.name}
      </Text>
      <Text numberOfLines={1} adjustsFontSizeToFit style={{...styles.textBoxDefault, fontSize:20, fontWeight:'normal'}}>{dayForecast?.location.country}</Text>
      {
      dayForecast?.current.is_day ? (
        <Image
          source={weatherImages[dayForecast?.current.condition.code] || { uri: 'https:' + dayForecast?.current.condition.icon }}
          style={styles.imgFormat}
        />
      ) :<Image
          source={weatherImagesNight[dayForecast?.current.condition.code] || { uri: 'https:' + dayForecast?.current.condition.icon }}
          style={styles.imgFormat}
        />
      }
      <Text adjustsFontSizeToFit style={{ ...styles.textBoxDefault, flex: 0.5, paddingBottom: 8 }}>
        {dayForecast?.current.temp_c}°
      </Text>
      <Text numberOfLines={3} adjustsFontSizeToFit style={{ ...styles.textBoxDefault, fontSize: 16, flex: 0.5, fontWeight: 'normal', paddingRight: 8 }}>
        {dayForecast?.current.condition.text}
      </Text>   
    </View>
  )
};

export default CurrentWeather

const styles = StyleSheet.create({

  textBoxDefault: {
    color: '#07080B',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    shadowOffset: {width:0, height:4}
  },

  imgFormat : {
    height: '100%', 
    width: '100%', 
    resizeMode: 'contain', 
    flex: 3
  }

})