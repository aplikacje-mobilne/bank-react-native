import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { styles } from '../screens/styles';

import ListScreen from '../screens/ListScreen';
import History from '../screens/History';
import Payment from '../screens/Payment';
import Offers from '../screens/Offers';
import Edit from '../screens/Edit';

import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MyDrawer = ({setIsLoggedIn}) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#FF570C',
        tabBarInactiveTintColor: '#606470',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'History':
              iconName = 'clock';
              break;
            case 'Payment':
              iconName = 'arrow-up-circle';
              break;
            case 'Offers':
              iconName = 'credit-card';
              break;
            case 'Edit':
              iconName = 'settings';
              break;
            default:
              iconName = 'circle';
          }

          return (
            <Feather
              name={iconName}
              size={size}
              color={color}
              style={styles.tabBarIcon} 
            />
          );
        },
        tabBarLabel: ({ focused, color, size }) => {
          const labelStyle = focused ? styles.tabBarLabelFocused : styles.tabBarLabel;

          return <Text style={labelStyle}>{route.name}</Text>;
        },
        tabBarLabelStyle: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      })}
    >
      <Tab.Screen name="Home"  children={() => <ListScreen setIsLoggedIn={setIsLoggedIn}/>} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Offers" component={Offers} />
      <Tab.Screen name="Edit" component={Edit} />
    </Tab.Navigator>
    );
};

export default MyDrawer;