import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from './DrawerNavigator';
import { Login } from '../screens/Login';
import RegisterScreen from '../screens/RegisterScreen';
import Edit2 from '../screens/Edit2';
import Edit3 from '../screens/Edit3';
import Edit4 from '../screens/Edit4';
import Edit5 from '../screens/Edit5';
import Edit6 from '../screens/Edit6';
import Edit7 from '../screens/Edit7';
import Payment1 from '../screens/Payment1';
import Payment2 from '../screens/Payment2';
import frame_one from '../screens/frame_one';
import OfferFirst from '../screens/OfferFirst';
import OfferSecond from '../screens/OfferSecond';
import OfferThird from '../screens/OfferThird';
import TakePhoto from '../screens/TakePhoto';
import PhotoDisplay from '../screens/PhotoDisplay';

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
                <Stack.Screen
                    name="DrawerNavigator"
                    component={DrawerNavigator}
                    options={{ headerShown: false }}
                />
            ) : (
                <>
                    <Stack.Screen
                        name="frame_one"
                        component={frame_one}
                        options={optionScreen}
                    />
                    <Stack.Screen
                        name="Login"
                        options={optionScreen}
                        children={({ navigation }) => (
                            <Login
                                setIsLoggedIn={setIsLoggedIn}
                                navigation={navigation}
                            />
                        )}
                    />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                </>
            )}
            <Stack.Screen name="Edit2" component={Edit2} options={{ title: 'Dane i personalizacja' }} />
            <Stack.Screen name="Edit3" component={Edit3} options={{ title: 'Bezpieczeństwo' }} />
            <Stack.Screen name="Edit4" component={Edit4} options={{ title: 'Płatność' }} />
            <Stack.Screen name="Edit5" component={Edit5} options={{ title: 'Wyloguj się' }} />
            <Stack.Screen name="Edit6" component={Edit6} />
            <Stack.Screen name="Edit7" component={Edit7} options={{ title: 'Zmiana hasła do konta' }} />
            <Stack.Screen name="TakePhoto" component={TakePhoto} />
            <Stack.Screen name="PhotoDisplay" component={PhotoDisplay} />
            <Stack.Screen name="Payment1" component={Payment1} options={{ title: 'Przelew' }} />
            <Stack.Screen name="Payment2" component={Payment2} options={{ title: 'Przelew' }} />
            <Stack.Screen name="OfferFirst" component={OfferFirst} options={{ title: 'Oferty' }} />
            <Stack.Screen name="OfferSecond" component={OfferSecond} options={{ title: 'Oferty' }} />
            <Stack.Screen name="OfferThird" component={OfferThird} options={{ title: 'Oferty' }} />
        </Stack.Navigator>
    );
};

export default StackNav;

