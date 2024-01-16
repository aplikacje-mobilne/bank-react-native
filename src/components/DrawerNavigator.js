// navigation/DrawerNavigator.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListScreen from '../screens/ListScreen';
import History from '../screens/History';
import Payment from '../screens/Payment';
import Offers from '../screens/Offers';
import Edit from '../screens/Edit';
import frame_one from '../screens/frame_one';
import AddScreen from '../screens/AddScreen';
import EditScreen from '../screens/EditScreen';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';




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

        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#FF570C',
            tabBarStyle: [
                {
                    display: 'flex',
                },
                null,
            ],
        }}>

            <Tab.Screen
                name="Menu"
                component={ListScreen}
                options={{

                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-home" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Historia"
                component={History}
                options={{
                    tabBarLabel: 'Historia',
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="history" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Płatność"
                component={Payment}
                options={{
                    tabBarLabel: 'Płatność',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="payment" size={size} color={color} />
                    ),
                }}


            />


            <Tab.Screen
                name="Oferty"
                component={Offers}
                options={{
                    tabBarLabel: 'Oferty',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="offer" size={size} color={color} />
                    ),
                }}
            />


            <Tab.Screen
                name="Edytuj"
                component={Edit}
                options={{
                    tabBarLabel: 'Edytuj',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-settings-outline" size={size} color={color} />
                    ),

                }}
            />

        </Tab.Navigator>
    );
}

export default MyDrawer;
