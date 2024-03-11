import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { lunarPhases } from '../constants/lunarPhases'
import { getDate, getDay } from '../utils/dates'
import React from 'react'

const LunarWeek = ({lunar, t, time}) => {
  const currentDate = getDate(time?.localtime);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          lunar?.map((item, index) =>{
            let dayName = getDay(item.date);

            if (item.date > currentDate && item.date!==currentDate){
            return (
              <View key={index} style={styles.containerBox}
              >
              <Text style={{textAlign: 'center', marginBottom: 5}}>{t(dayName)}</Text>
              <Image source={lunarPhases[item?.astro?.moon_phase || 'other']} style={{width:50, height:50, alignSelf: 'center', resizeMode:'center'}}/>
              <Text style={{textAlign: 'center', marginBottom: 5}}>{t(item?.astro?.moon_phase)}</Text>
              </View>
            )
          }
        })
      }
      </ScrollView>
    </View>
  )
}

export default LunarWeek

const styles = StyleSheet.create({
  containerBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginRight: 25,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10
  }
})