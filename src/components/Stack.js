import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from './DrawerNavigator';
import { Login } from '../screens/Login';
import RegisterScreen from '../screens/RegisterScreen';
import PinLogin from '../screens/PinLogin';
import EditDataPersonalization from '../screens/EditDataPersonalization';
import EditSecurityAccess from '../screens/EditSecurityAccess';
import EditPayments from '../screens/EditPayments';
import EditLogOut from '../screens/EditLogOut';
import EditChangePinScreen from '../screens/EditChangePinScreen';
import EditChangePassScreen from '../screens/EditChangePassScreen';
import EditBiomPinLogout from '../screens/EditBiomPinLogout';
import Payment1 from '../screens/Payment1';
import Payment2 from '../screens/Payment2';
import Start from '../screens/Start';
import TakePhoto from '../screens/TakePhoto';
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
                  <Stack.Screen name="EditDataPersonalization" component={EditDataPersonalization} options={{ title: 'Data and Customization' }} />
                  <Stack.Screen name="EditSecurityAccess" component={EditSecurityAccess} options={{ title: 'Security' }} />
                  <Stack.Screen name="EditPayments" component={EditPayments} options={{ title: 'Payment' }} />
                  <Stack.Screen name="EditLogOut" children={() => <EditLogOut setIsLoggedIn={setIsLoggedIn} />} options={{ title: 'Log Out' }} />
                  <Stack.Screen name="EditChangePinScreen" children={() => <EditChangePinScreen setIsLoggedIn={setIsLoggedIn} />} options={{ title: 'Change PIN' }} />
                  <Stack.Screen name="EditChangePassScreen" children={() => <EditChangePassScreen setIsLoggedIn={setIsLoggedIn} />} options={{ title: 'Change Account Password' }} />
                  <Stack.Screen name="EditBiomPinLogout" children={() => <EditBiomPinLogout setIsLoggedIn={setIsLoggedIn} />} options={{ title: 'Set up authentication' }} />
                  <Stack.Screen name="Payment1" component={Payment1} options={{ title: 'Transfer' }} />
                  <Stack.Screen name="Payment2" component={Payment2} options={{ title: 'Transfer' }} />
                  <Stack.Screen name="TakePhoto" component={TakePhoto} options={{ title: 'Take Photo' }} />
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