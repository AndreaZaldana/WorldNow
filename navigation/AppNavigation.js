import { StyleSheet, Platform } from 'react-native'
import React from 'react'
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WelcomeScreen from '../screens/WelcomeScreen'
import HomeScreen from '../screens/HomeScreen'
import CompassScreen from '../screens/CompassScreen'
import MoonInfo from '../screens/MoonInfo';
import { lanContext } from '../utils/context';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export const BarNavigation = () =>{
  return(
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar}}>
      <Tab.Screen name='Compass' component={CompassScreen} options={{tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name="compass-rose" size={24} color= {focused ? "#727372" : "black"} />), tabBarShowLabel: false,
      tabBarIconStyle: styles.icon}}/>
      <Tab.Screen name='Home' component={HomeScreen} options={{tabBarIcon: ({ focused }) => (<AntDesign name="home" size={24} color={focused ? "#727372" : "black"}/>), tabBarShowLabel: false,
      tabBarIconStyle: styles.icon}}/>
      <Tab.Screen name='Moon' component={MoonInfo} options={{tabBarIcon: ({ focused }) => (<Feather name="moon" size={24} color={focused ? "#727372" : "black"} />), tabBarShowLabel: false,
      tabBarIconStyle: styles.icon}}/>
    </Tab.Navigator>
  )
}

export const StackNavigation = () => {
  const { lang }=useContext(lanContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      { lang? (
        <Stack.Screen name="BottomNav" component={BarNavigation} />
      ): <Stack.Screen name="Welcome" component={WelcomeScreen} />}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: "space-between",
      position: 'absolute',
      height: Platform.OS === 'ios'? 80 : 50,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      shadowColor: "#fff",
      shadowOffset: {width: 0, height:0},
      shadowOpacity: 0.4,
      backgroundColor: "#F5F5FA"
  },

  icon: {
    alignSelf:"center", marginTop:5
  }
})