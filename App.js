import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import ContainerGradiente from './components/ContainerGradiente';

import Dolar from './components/Dolar';
import Euro from './components/Euro';
import Yuan from './components/Yuan';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='US$ Dolar' 
      screenOptions={{ headerShown: false, 
      tabBarStyle:{backgroundColor:'#80D0C7'},
      tabBarInactiveTintColor:'#3b5998',
      tabBarActiveTintColor:'#fff'
       }} >
          <Tab.Screen name="€ Euro" component={Euro} 
          options={{
            tabBarLabel: '€ Euro',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="currency-eur" color={color} size={26} />
              ),
            }}
            />
          <Tab.Screen name="US$ Dolar" component={Dolar} 
           options={{
             tabBarLabel: 'US$ Dolar',
             tabBarIcon: ({ color }) => (
               <MaterialCommunityIcons name="currency-usd" color={color} size={30} />
               ),
              }}/>
          <Tab.Screen name="¥ Chinês" component={Yuan} 
          options={{
            tabBarLabel: '¥ Chinês',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="currency-cny" color={color} size={30} />
              ),
            }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});


