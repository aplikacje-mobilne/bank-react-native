import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from './DrawerNavigator';
import { Login } from '../screens/Login';
import RegisterScreen from '../screens/RegisterScreen';
import Edit from '../screens/Edit';
import Edit2 from '../screens/Edit2';

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

        </>
        ) : (
          <>
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
