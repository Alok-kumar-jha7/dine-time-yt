// import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { Colors } from '../../assets/Colors';
import {FontAwesome,Ionicons} from '@expo/vector-icons';



const TabLayout = () => {
  return (
      <Tabs screenOptions={{
          headerShown: false, tabBarActiveTintColor: Colors.PRIMARY,
          tabBarInactiveTintColor: Colors.dark.text, tabBarStyle: {
              backgroundColor: "#414a4c",
              paddingBottom: 15,
              height: 75
          }, 
          tabBarLabelStyle:{ fontSize: 14, fontWeight: 'bold' }

           }}>
          <Tabs.Screen name="home" options={{
              title: 'Home', tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={22} color={color} /> 
          ) }} />
          <Tabs.Screen name="bookings" options={{ title: 'My Bookings',tabBarIcon: ({ color }) => (
              <FontAwesome name="ticket" size={22} color={color} /> 
          )  }} />
          <Tabs.Screen name="profile" style={{backgroundColor:"#fff"}} options={{ title: 'Profile',tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle" size={22} color={color} />
          )  }} />
    </Tabs> 
  )
}

export default TabLayout;