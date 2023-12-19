import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from './DrawerNavigator';
import { Login } from '../screens/Login';
import RegisterScreen from '../screens/RegisterScreen';
import Edit from '../screens/Edit';
import Edit2 from '../screens/Edit2';
import Edit3 from '../screens/Edit3';
import Edit4 from '../screens/Edit4';
import Edit5 from '../screens/Edit5';
import Edit6 from '../screens/Edit6';
import Payment1 from '../screens/Payment1';
import Payment2 from '../screens/Payment2';
import frame_one from '../screens/frame_one';

import OfferFirst from '../screens/OfferFirst';
import OfferSecond from '../screens/OfferSecond';
import OfferThird from '../screens/OfferThird';

const Stack = createNativeStackNavigator();

const optionScreen = {
  headerShown: false,
};

const StackNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

 

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
        
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
                  <Stack.Screen name="Edit2" component={Edit2} />
                  <Stack.Screen name="Edit3" component={Edit3} />
                  <Stack.Screen name="Edit4" component={Edit4} />
                  <Stack.Screen name="Edit5" component={Edit5} />
                  <Stack.Screen name="Edit6" component={Edit6} />
                  <Stack.Screen name="Payment1" component={Payment1} />
                  <Stack.Screen name="Payment2" component={Payment2} />
         
                  <Stack.Screen name="OfferFirst" component={OfferFirst} />
                  <Stack.Screen name="OfferSecond" component={OfferSecond} />
                  <Stack.Screen name="OfferThird" component={OfferThird} />


        </>
        ) : (
                  <>
          <Stack.Screen name="frame_one" component={frame_one} />
          <Stack.Screen
            name="Login"
            options={optionScreen}
            children={() => <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Stack.Screen name="RegisterScreen"
            component={RegisterScreen} />
          </>
          )}
    </Stack.Navigator>
    );
};

export default StackNav;
