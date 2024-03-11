import { StyleSheet, SafeAreaView, Text, View, FlatList,  Animated, ScrollView, Dimensions, StatusBar } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { fetchWeatherLocation} from '../api/weather';
import LunarWeek from '../components/LunarWeek';
import { useTranslation } from 'react-i18next';
import CurrentMoon from '../components/CurrentMoon';
import CurrentMoonInfo from '../components/CurrentMoonInfo';
import Pagination from '../components/Pagination';

const MoonInfo = () => {
  const [moonData, getMoonData] = useState(null);
  const {t} = useTranslation();

  const { height } = Dimensions.get('window');

  const slideshowData = [
    <CurrentMoon key="1" current={moonData} t={t}/>,
    <CurrentMoonInfo key="2" phase={moonData?.forecast?.forecastday[0]?.astro.moon_phase} t={t}/>,
  ];


  useEffect(() =>{
    fetchWeatherLocation('7','').then(data=>{
      getMoonData(data)
    })

  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event =>{
    Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX
          }
        }
      }
    ], {
      useNativeDriver: false
    }) (event)
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', flexDirection: "column", backgroundColor:"#18111e" }}>
      <StatusBar backgroundColor='transparent' translucent={true} barStyle='light-content'/>
      {/*Moon and Moon Phase*/}
      <View style={{flex:2}}>
        <FlatList 
        data={slideshowData}
        renderItem={({item}) => item}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        />
        <Pagination data={slideshowData} scrollX={scrollX} color='#ccc'/>
      </View>

      <View style={styles.infoContainer}>
      {/*Moon Info*/}
        <View style={styles.statsInfo}>
          <View style={{...styles.infoBox, borderRightWidth: 3, borderColor: "#EBEBEB"}}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.tagTex}>{t('illumination')}</Text>
            <Text style={styles.valueTag}>{moonData?.forecast.forecastday[0].astro.moon_illumination}%</Text>
          </View>
          <View style={{...styles.infoBox}}>
            <Text style={styles.tagTex}>{t('moonrise')}</Text>
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.valueTag}>{moonData?.forecast.forecastday[0].astro.moonrise}</Text>
          </View>
          <View style={{...styles.infoBox, borderLeftWidth: 3, borderColor: "#EBEBEB"}}>
            <Text style={styles.tagTex}>{t('moonset')}</Text>
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.valueTag}>{moonData?.forecast.forecastday[0].astro.moonset}</Text>
          </View>
        </View>

      {/*Moon prediction*/}
        <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:height*1/13}} showsVerticalScrollIndicator={false}>
          <View style={styles.miniCalendar}>
            <Text style={{...styles.valueTag, textAlign:'justify', padding:8}}>{t("next days")}</Text>
            <LunarWeek lunar={moonData?.forecast?.forecastday} t={t} time={moonData?.location}/>
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  )
};

export default MoonInfo

const styles = StyleSheet.create({


  infoContainer:{
    flex:1.5, 
    backgroundColor: '#F5F5FA',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },

  statsInfo: {
    flex: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 16,
  },

  infoBox : {
    flexDirection: 'column',
    justifyContent: 'space-between',

    padding:5,
    width: 100,
    height:60
  },

  tagTex: {
    fontSize: 15,
    color: '#000',
    opacity: 0.7,
    textAlign: 'center'
  },

  valueTag : {
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.7,
    color: '#000',
    textAlign: 'center'
  },

  miniCalendar: {
    flex:1,
    justifyContent: 'flex-start',
    marginHorizontal: 16
  }


})