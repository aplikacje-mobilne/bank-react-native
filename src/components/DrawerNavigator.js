// navigation/DrawerNavigator.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListScreen from '../screens/ListScreen';
import History from '../screens/History';
import Payment from '../screens/Payment';
import Offers from '../screens/Offers';
import Edit from '../screens/Edit';

import AddScreen from '../screens/AddScreen';
import EditScreen from '../screens/EditScreen';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function MyDrawer() {
  return (
    /*
    <Drawer.Navigator   >
      <Drawer.Screen name="ListScreen" component={ListScreen} />
      <Drawer.Screen name="AddScreen" component={AddScreen} />
      
    </Drawer.Navigator>
    */
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={ListScreen}
      options={{

        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-home" size={size} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="History"
      component={History}
      options={{
        tabBarLabel: 'History',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-add" size={size} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="Payment"
      component={Payment}
      options={{
        tabBarLabel: 'Payment',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-add" size={size} color={color} />
        ),
      }}
      
      
    />


    <Tab.Screen
      name="Offers"
      component={Offers}
      options={{
        tabBarLabel: 'Offers',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-add" size={size} color={color} />
        ),
      }}
    />


    <Tab.Screen
      name="Edit"
      component={Edit}
      options={{
        tabBarLabel: 'Edit',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-add" size={size} color={color} />
        ),
        
      }}
    />
  
  </Tab.Navigator>
    );
}

export default MyDrawer;
