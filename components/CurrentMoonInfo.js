import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { lunarData } from '../constants/lunarData';
import React from 'react'

const { width } = Dimensions.get('window');

const CurrentMoonInfo = ({phase, t}) => {
  return (
    <View style={styles.boxContainer}>
      <Text adjustsFontSizeToFit style={{fontSize: 14, color:'#F5F5FA', textAlign: 'justify', fontWeight:'600', paddingHorizontal:10}}>{t(lunarData[phase])}</Text>
      <Text style={{fontSize: 10, color:'#fff', textAlign: 'justify'}}>{t('credits')}</Text>
    </View>
  )
}

export default CurrentMoonInfo

const styles = StyleSheet.create({
    boxContainer: {
        width,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        opacity: 0.8,
        paddingHorizontal: 20
    }
})