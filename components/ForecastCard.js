import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import React, {useState} from 'react'

const ForecastCard = ({daily, timeLoc, t}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const currentDayForecast = daily?.forecastday[0]?.hour;
  const nextDayForecast = daily?.forecastday[1]?.hour;

  const forecastData = currentDayForecast?.concat(nextDayForecast);

  const localTime = new Date(timeLoc?.localtime);
  let localTimeValue = localTime.getHours();

  const handleItemPress = (item) => {
    setSelectedItem(item)
    setModalVisible(true)
  };

  const closeModal = () => {
    setSelectedItem(null)
    setModalVisible(false)
  };


  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          forecastData?.slice(localTimeValue,localTimeValue+12).map((item, index) =>{
            const time = new Date(item.time);
            let hourTime = time.getHours();
              return (
                <TouchableOpacity key={index} style={styles.containerBox}
                  onPress={() => handleItemPress(item)}
                >
                  {
                    (hourTime === localTimeValue) ? (
                      <Text style={{ textAlign: 'center', marginBottom: 5 }}>{t('now')}</Text>
                    ) : <Text style={{ textAlign: 'center', marginBottom: 5 }}>{hourTime}:00</Text>
                  }
                  <Image source={{ uri: 'https:' + item?.condition?.icon }} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                  <Text style={{ textAlign: 'center' }}>{item?.temp_c}°</Text>
                </TouchableOpacity>
              )
          })
        }
      </ScrollView>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        statusBarTranslucent={true}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{elevation: 5, width: 200, height:170 }}>
            <ImageBackground source={selectedItem?.is_day? require('../assets/images/popupday.jpg'):require('../assets/compass/night.jpg')} style={{flex:1, padding: 20, justifyContent:'center'}} borderRadius={16}>
              <Image source={{ uri: 'https:' + selectedItem?.condition.icon }} height={60} width={60} style={{alignSelf:'center'}}/>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.boxText}>{selectedItem?.condition.text}</Text>
              <Text adjustsFontSizeToFit style={{ ...styles.boxText, fontSize:16  }}>{selectedItem?.temp_c}°</Text>
            </ImageBackground>
          </View>
          <TouchableOpacity style={styles.btn} onPress={closeModal}>
            <Text>{t('popupclose')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default ForecastCard

const styles = StyleSheet.create({
  containerBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginRight: 36,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: 120,
    height: 135
  },
  
  btn: {
    backgroundColor: '#F5F5FA',
    borderRadius: 16,
    paddingVertical: 18,
    width: 200,
    alignItems: 'center',
    margin: 16
  },

  boxText: {
    textAlign: 'center', 
    marginBottom: 10, 
    color:'#F5F5FA', 
    fontWeight:'700',
    shadowColor:"#1c1c1c",
    shadowOpacity:0.4,
    shadowOffset:{width:0, height:2}
  }
})