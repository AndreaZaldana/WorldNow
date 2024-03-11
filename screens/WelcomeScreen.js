import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { storeData, getItemFor } from '../utils/storageHelper'
import { useTranslation } from 'react-i18next'
import { lanContext } from '../utils/context'

const LANGUAGE_KEY = 'LANGUAGE';


const WelcomeScreen = () => {
  const [Loading, setLoading]=useState(true);
  const { setLang }=useContext(lanContext);
  const {i18n} = useTranslation();

  useEffect(() => {
    const retrieveLanguage = async () => {
      try {
        const storedLanguage = await getItemFor(LANGUAGE_KEY);
        if (storedLanguage) {
          setLang(true)
          i18n.changeLanguage(storedLanguage)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error retrieving language preference:', error)
      }

    };

    retrieveLanguage()
  }, []);
  
  const pressHandler = async (language) => {
    try {
      // Store the selected language preference
      await storeData(LANGUAGE_KEY, language)
      i18n.changeLanguage(language)
      setLang(true)
    } catch (error) {
      console.error('Error storing language preference:', error)
    }
  };

  if(Loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5FA'}}>
        <ActivityIndicator size='large' color="#000"/>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5FA'}}>
      <StatusBar backgroundColor='transparent' translucent={true} barStyle='light-content'/>
      <TouchableOpacity 
        onPress={() => pressHandler('es')}
        style={styles.btnLan}>
        <Text style={styles.btnText}>Español</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => pressHandler('en')}
        style={styles.btnLan}>
        <Text style={styles.btnText}>English</Text>
      </TouchableOpacity>
    </View>
  )
};

export default WelcomeScreen

const styles = StyleSheet.create({

  btnLan: {
    backgroundColor: "#f6b26b",
    borderRadius: 16,
    paddingVertical: 18,
    width: "80%",
    alignItems: 'center',
    margin: 16
  },

  btnText: {
    fontSize: 18, color: "#fff", fontWeight: "700"
  }

})