import { 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Image, 
  Platform, 
  Dimensions, 
  Alert, 
  ScrollView, 
  FlatList, 
  Animated, 
  StatusBar, 
  Modal } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { FontAwesome, MaterialIcons} from '@expo/vector-icons'
import ForecastCard from '../components/ForecastCard'
import WeekCard from '../components/WeekCard'
import { fetchWeatherForecast, fetchWeatherLocation, fetchWeatherSearch} from '../api/weather'
import { useTranslation } from 'react-i18next'
import { getItemFor, storeData} from '../utils/storageHelper'
import StatsCard from '../components/StatsCard'
import CurrentWeather from '../components/CurrentWeather'
import Pagination from '../components/Pagination'

const LANGUAGE_KEY = 'LANGUAGE';

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const[city, setCity] = useState('');
  const [dayForecast, setDayForecast] = useState(null);
  const [visible, setVisible] = useState(true);
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [suggestedCities, setSuggestedCities] = useState([]);

  const { height } = Dimensions.get('window');

  const slideshowData = [
    <CurrentWeather key='1' dayForecast={dayForecast} />,
    <StatsCard key='2' dayForecast={dayForecast} t={t}/>,
  ];


  useEffect(() => {
    fetchWeather();
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
    }) (event);
  };


  const fetchWeather = async () => {
    try{
      let cityName = await getItemFor('city');
      if (cityName){
        fetchWeatherForecast(cityName, '7', i18n.language).then(data =>{
          setDayForecast(data)
        })
      } else {
        currentLocation()
      }
    } catch (error) {
      console.error('Error getting data. Try again:', error)
    }
  };

  const currentLocation = async () =>{
    try{
    const data = await fetchWeatherLocation('7',i18n.language)
    setDayForecast(data)
    await storeData('city', [data?.location?.lat, data?.location?.lon])
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  };

  const changeLanguage = async () =>{
    try {
      // Store new language preference in AsyncStorage
      if(i18n.language === 'es') {
        await storeData(LANGUAGE_KEY, 'en');
        i18n.changeLanguage('en')
      } else {
        await storeData(LANGUAGE_KEY, 'es');
        i18n.changeLanguage('es')
      }
      fetchWeather()
    } catch (error) {
      Alert.alert('Error', error.message)
    }
    setModalVisible(false)
  };

  
  const searchHandler = async () =>{
    try{
      if(showSearch && city.length>1) {
        const data = await fetchWeatherForecast(city,'7', i18n.language)
        if (data?.location) {
          setDayForecast(data)
          await storeData('city', [data?.location?.lat, data?.location?.lon])
        }
        toggleSearch(!showSearch)
        setCity('')
        setSuggestedCities([])
      } else {
        toggleSearch(!showSearch)
      }
    } 
    catch (error) {
    Alert.alert('Error', error.message)
    }
  };

  const handleChangeText = (text) => {
    setCity(text);
    if (text.trim() !== ''){
      fetchWeatherSearch(text).then(data=>{
        setSuggestedCities(data)
      })
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    try{
      const data = await fetchWeatherForecast([suggestion.lat, suggestion.lon],'7', i18n.language)
      setDayForecast(data)
      await storeData('city', [data.location.lat, data.location.lon])
    } catch (error) {
      Alert.alert('Error', error.message)
    }
    toggleSearch(!showSearch)
    setCity('')
    setSuggestedCities([])
  };

  
  return (
    <SafeAreaView style={styles.container}>
      {
        dayForecast?.current.is_day? (
          <Image source={require('../assets/images/bg4.png')} style={styles.backgroundImg}/>
        ): <Image source={require('../assets/images/bgNight2.png')} style={styles.backgroundImg}/>
      }
      <StatusBar backgroundColor='transparent' translucent={true} barStyle='light-content'/>

      {/*search bar*/}
      <View style={{...styles.searchBar, backgroundColor:showSearch?  '#faf8f3' : 'transparent',}}>
        {
          showSearch? (
            <TextInput style={{
              paddingLeft: 8, fontSize: 16, 
              color:'#808080', flex:1}} 
              placeholder={t('inputtext')}
              value={city}
              onChangeText={(text)=>handleChangeText(text)}
              />
          ): null
        }
        <TouchableOpacity style={{...styles.searchBtns, backgroundColor: dayForecast?.current.is_day? '#ffdde1': '#cbb4d4'}} onPress={searchHandler}>
          {
            dayForecast?.current.is_day?(
              <FontAwesome name='search' size={20} color='#FFAFBD'/>
            ):<FontAwesome name='search' size={20} color='#734b6d'/>
          }
        </TouchableOpacity>
        {
          showSearch? (
            null
          ):
          <View style={{flexDirection: 'row'}}> 
            <TouchableOpacity style={{...styles.searchBtns, backgroundColor: '#DFDFDF'}} onPress={currentLocation}>
              <MaterialIcons name='my-location' size={20} color='#5A535B'/>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.searchBtns, marginLeft:8, backgroundColor: '#DFDFDF' }} onPress={()=>setModalVisible(true)}>
              <FontAwesome name='language' size={20} color='#5A535B' />
            </TouchableOpacity>
           </View> 
        }
        {suggestedCities?.length > 0  && showSearch? (
          <View style={styles.suggestionsContainer}>
            {suggestedCities.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSelectSuggestion(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion?.name}, {suggestion?.country}</Text>
              </TouchableOpacity>
            )
            )}
          </View>
          ): null
        }
      </View>
      
      {/*Current weather*/}
      <View style={styles.weatherBox}>
        <FlatList 
        data={slideshowData}
        renderItem={({item}) => item}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        />
        <Pagination data={slideshowData} scrollX={scrollX} color={dayForecast?.current.is_day? '#FFAFBD': '#42275a'}/>
      </View>

      {/*prediction area*/}
      <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:height*1/13}} showsVerticalScrollIndicator={false}>
        <View style = {{...styles.weatherBox, flex: 1, justifyContent: 'flex-start', backgroundColor:'transparent'}}>
            <View style={{flexDirection: 'row', justifyContent:'space-evenly', flexWrap:'wrap'}}>
              <TouchableOpacity onPress={()=>setVisible(true)} style={{paddingRight:8}}>
                <Text style={{...styles.forecastTitle, fontWeight: visible && dayForecast? 'bold' : 'normal', color: dayForecast?.current?.is_day? '#29272D' : '#fff'}}>{t('next hours')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setVisible(false)}>
                <Text style={{...styles.forecastTitle, fontWeight: visible? 'normal': 'bold', color: dayForecast?.current?.is_day? '#29272D' : '#fff'}}>{t('next days')}</Text>
              </TouchableOpacity>
            </View>
          {
            visible? (
              <ForecastCard daily={dayForecast?.forecast} timeLoc={dayForecast?.location} t={t}/>
            ): <WeekCard weekly={dayForecast?.forecast?.forecastday} time={dayForecast?.location} t={t}/>
          }
        </View>
      </ScrollView>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
          <View style={styles.modalContent}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={{...styles.modalTitle, fontWeight:'bold', fontSize:16}}>{t('conftitle')}</Text>
            <Text adjustsFontSizeToFit numberOfLines={2} style={{...styles.modalTitle, fontSize:14, paddingHorizontal:5}}>{t('confirmation')}</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={{...styles.modalBtn, borderWidth:1, borderColor:'#5A535B'}} onPress={()=>setModalVisible(false)}>
                <Text adjustsFontSizeToFit numberOfLines={1}>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.modalBtn, backgroundColor: '#5A535B'}} onPress={changeLanguage}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={{color:'#fff'}}>{t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </Modal>
    </SafeAreaView>
  )
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, position: 'relative', flexDirection:'column', justifyContent: 'space-between'
  },

  backgroundImg: {
    position: 'absolute', flex:1
  },

  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    marginVertical: 16,
    marginHorizontal: 16,
    marginTop: Platform.OS === 'ios'? 0 : 30,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    zIndex: 1
  },

  suggestionsContainer: {
    position: 'absolute',
    top: '145%',
    backgroundColor: '#faf8f3',
    borderRadius: 8, 
    width: '100%'
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },

  searchBtns: {
    padding:12, borderRadius:16
  },

  weatherBox : {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flex: 1.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,

    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 16,
  },

  forecastTitle: {
    fontSize: 14,
    marginTop:10, 
    marginBottom: 15
  },

  modalContent: {
    backgroundColor:'#fff', 
    elevation: 5, 
    width: 300, 
    height:200, 
    padding: 20, 
    justifyContent:'space-evenly', 
    borderRadius:16
  },

  modalTitle: {
    flex:1,  
    color: '#000', 
    alignSelf:'center'
  },
  
  btnContainer: {
    flex:0.5,
    flexDirection: 'row', 
    justifyContent:'space-evenly', 
    marginTop:10, 
    paddingTop:8
  },

  modalBtn: {
    borderRadius: 8,
    alignItems: 'center',
    paddingTop:5,
    width: 100
  }
})