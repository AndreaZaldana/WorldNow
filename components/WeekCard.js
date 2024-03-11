import { ScrollView, StyleSheet, Text, View, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native'
import { getDate, getDay } from '../utils/dates';
import React, {useState} from 'react'

const WeekCard = ({weekly, time, t}) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const currentDate = getDate(time?.localtime);

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
          weekly?.map((item, index) =>{
            let dayName = getDay(item.date);

            if (item.date > currentDate && item.date!==currentDate) {
              return (
                <TouchableOpacity key={index} style={styles.containerBox}
                onPress={() => handleItemPress(item)}
                >
                <Text adjustsFontSizeToFit numberOfLines={1} style={{textAlign: 'center', marginBottom: 5}}>{t(dayName)}</Text>
                <Image source={{uri: 'https:'+item?.day?.condition?.icon}} style={{width:50, height:50, alignSelf: 'center'}}/>
                <Text style={{textAlign: 'center'}}>{item?.day?.avgtemp_c}°</Text>
                </TouchableOpacity>
              )
            }
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
            <ImageBackground source={require('../assets/images/popupday.jpg')} style={{flex:1, padding: 20, justifyContent:'center'}} borderRadius={16}>
              <Image source={{ uri: 'https:' + selectedItem?.day.condition.icon }} height={60} width={60} style={{alignSelf:'center'}}/>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.boxText}>{selectedItem?.day.condition.text}</Text>
              <Text adjustsFontSizeToFit style={{ ...styles.boxText, fontSize:14  }}>Max: {selectedItem?.day.maxtemp_c}°</Text>
              <Text adjustsFontSizeToFit style={{ ...styles.boxText, fontSize:14  }}>Min: {selectedItem?.day.mintemp_c}°</Text>
            </ImageBackground>
          </View>
          <TouchableOpacity style={styles.btn} onPress={closeModal}>
            <Text>{t('popupclose')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
};

export default WeekCard

const styles = StyleSheet.create({
  containerBox: {
    backgroundColor:'rgba(255, 255, 255, 0.5)',
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