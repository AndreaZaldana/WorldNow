import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import { MaterialCommunityIcons, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons'
import React from 'react'

const { width } = Dimensions.get('window');

const StatsCard = ({dayForecast, t}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View style={{
          width: width-32,
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-evenly',
          alignContent: 'center',
          flexWrap:'wrap',
          rowGap: 5
        }}>
          <View style={{...styles.statsView}}>
            <View style={{flexDirection:'row'}}>
              <Feather name='wind' size={20} color='black' style={{ alignSelf:'center', opacity:0.6}}/>
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statsTitle}>
                  {t('wind')}
              </Text>
            </View>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statsText}>
              {dayForecast?.current.wind_kph} km/h
            </Text>
          </View>

          <View style={{...styles.statsView}}>
            <View style={{flexDirection:'row'}}>
              <FontAwesome5 name='temperature-high' size={20} color='black' style={{alignSelf:'center', opacity:0.6}}/>
              <Text numberOfLines={2} adjustsFontSizeToFit style={styles.statsTitle}>
                  {t('feels like')}
              </Text>
            </View>
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.statsText}>
              {dayForecast?.current.feelslike_c}°
            </Text>
          </View>

          <View style={{...styles.statsView}}>
            <View style={{flexDirection:'row'}}>
              <MaterialCommunityIcons name='latitude' size={20} color='black' style={{alignSelf:'center', opacity:0.6}}/>
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statsTitle}>
                  {t('latitude')}
              </Text>
            </View>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statsText}>
              {dayForecast?.location.lat}
            </Text>
          </View>

          <View style={{...styles.statsView}}>
            <View style={{flexDirection:'row'}}>
              <MaterialCommunityIcons name='longitude' size={20} color='black' style={{alignSelf:'center', opacity:0.6}}/>
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statsTitle}>
                  {t('longitude')}
              </Text>
            </View>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statsText}>
              {dayForecast?.location.lon}
            </Text>
          </View>

          <View style={{...styles.statsView}}>
            <View style={{flexDirection:'row'}}>
              <FontAwesome5 name='tachometer-alt' size={20} color='black' style={{alignSelf:'center',opacity:0.6}}/>
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statsTitle}>
                  {t('pressure')}
              </Text>
            </View>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statsText}>
              {dayForecast?.current.pressure_mb} mb
            </Text>
          </View>

          <View style={{...styles.statsView}}>
            <View style={{flexDirection:'row'}}>
              <Ionicons name='water' size={20} color="black" style={{ alignSelf:'center',opacity:0.6}}/>
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statsTitle}>
                  {t('humidity')}
              </Text>
            </View>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.statsText}>
              {dayForecast?.current.humidity}%
            </Text>
          </View>

        </View>
      </ScrollView>
  )
}

export default StatsCard

const styles = StyleSheet.create({
    statsView: {
        flexDirection: 'column', 
        justifyContent:'space-around',
        borderRadius: 16,
        padding:8,
        width: 100,
        height:100
    },
    statsText: {
        alignSelf:'center', 
        marginLeft: 5, 
        fontSize:14, 
        fontWeight:'500',
        shadowColor: '#F5F5FA'
      },
      
    statsTitle: {
        alignSelf:'center', 
        marginLeft: 5, 
        fontSize:12, 
        opacity:0.6
    }  
})