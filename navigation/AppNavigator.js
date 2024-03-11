import { StyleSheet } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { LanguageProvider } from '../utils/context';
import { StackNavigation } from './AppNavigation';


const AppNavigator = () => {

  return (
    <LanguageProvider>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </LanguageProvider>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})