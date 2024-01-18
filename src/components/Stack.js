﻿import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from './DrawerNavigator';
import { Login } from '../screens/Login';
import RegisterScreen from '../screens/RegisterScreen';
import PinLogin from '../screens/PinLogin';

import Edit from '../screens/Edit';
import Edit2 from '../screens/Edit2';
import Edit3 from '../screens/Edit3';
import Edit4 from '../screens/Edit4';
import Edit5 from '../screens/Edit5';
import Edit6 from '../screens/Edit6';
import Edit7 from '../screens/Edit7';
import Edit8 from '../screens/Edit8';
import Payment1 from '../screens/Payment1';
import Payment2 from '../screens/Payment2';
import Start from '../screens/Start';
import TakePhoto from '../screens/TakePhoto';
import PhotoDisplay from '../screens/PhotoDisplay';
import OfferFirst from '../screens/OfferFirst';
import OfferSecond from '../screens/OfferSecond';
import OfferThird from '../screens/OfferThird';
import History from '../screens/History';


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
          options={{ headerShown: false }}
          children={() => <DrawerNavigator setIsLoggedIn={setIsLoggedIn}/>}
        />
                  <Stack.Screen name="Edit2" component={Edit2} options={{ title: 'Data and Customization' }} />
                  <Stack.Screen name="Edit3" component={Edit3} options={{ title: 'Security' }} />
                  <Stack.Screen name="Edit4" component={Edit4} options={{ title: 'Payment' }} />
                  <Stack.Screen name="Edit5" children={() => <Edit5 setIsLoggedIn={setIsLoggedIn} />} options={{ title: 'Log Out' }} />
                  <Stack.Screen name="Edit6" children={() => <Edit6 setIsLoggedIn={setIsLoggedIn} />} options={{ title: 'Change PIN' }} />
                  <Stack.Screen name="Edit7" children={() => <Edit7 setIsLoggedIn={setIsLoggedIn} />} options={{ title: 'Change Account Password' }} />
                  <Stack.Screen name="Edit8" children={() => <Edit8 setIsLoggedIn={setIsLoggedIn} />} options={{ title: 'Set Biometrics' }} />
                  <Stack.Screen name="Payment1" component={Payment1} options={{ title: 'Transfer' }} />
                  <Stack.Screen name="Payment2" component={Payment2} options={{ title: 'Transfer' }} />
                  <Stack.Screen name="TakePhoto" component={TakePhoto} />
                  <Stack.Screen name="PhotoDisplay" component={PhotoDisplay} />
                  <Stack.Screen name="OfferFirst" component={OfferFirst} options={{ title: 'Offers' }} />
                  <Stack.Screen name="OfferSecond" component={OfferSecond} options={{ title: 'Offers' }} />
                  <Stack.Screen name="OfferThird" component={OfferThird} options={{ title: 'Offers' }} />
                  <Stack.Screen name="History" component={History} options={{ title: 'History' }} />


        </>
      ) : (
          <>
          <Stack.Screen name="Start"
            children={() => <Start setIsLoggedIn={setIsLoggedIn}/>}

            />
              <Stack.Screen
                  name="Login"
                  options={optionScreen}
                  children={() => <Login setIsLoggedIn={setIsLoggedIn}/>}
              />
              <Stack.Screen
                  name="PinLogin"
          children={() => <PinLogin setIsLoggedIn={setIsLoggedIn}/>}
                />

              <Stack.Screen name="RegisterScreen"
                            component={RegisterScreen}/>
          </>
      )}
    </Stack.Navigator>
  );
};

export default StackNav;