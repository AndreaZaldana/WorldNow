import { StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { lunarPhases } from '../constants/lunarPhases'

const { width } = Dimensions.get('window');

const CurrentMoon = ({current, t}) => {
  return (
    <TouchableOpacity style={styles.boxContainer} activeOpacity={1}>
        <Image source={lunarPhases[current?.forecast?.forecastday[0]?.astro.moon_phase || 'other']} style={styles.moonImg} />
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.phaseText}>{t(current?.forecast?.forecastday[0]?.astro.moon_phase)}</Text>
        <Text style={{...styles.tagTex, color:'#fff', flex:0.5}}>{current?.location?.name}</Text>
    </TouchableOpacity>
  )
}

export default CurrentMoon

const styles = StyleSheet.create({
    boxContainer: {
        width,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        opacity: 0.8
    },

    moonImg: {
        height:'100%', 
        width:'100%', 
        resizeMode:'contain',
        flex: 3,
        shadowColor: '#fff',
        shadowOpacity: 0.5,
    },

    phaseText: {
        flex: 0.5,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: {width: 6, height: 0}
    },

    tagTex: {
        fontSize: 15,
        color: '#000',
        opacity: 0.7,
        textAlign: 'center'
    }
})