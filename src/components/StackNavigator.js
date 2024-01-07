import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyDrawer from './DrawerNavigator';
import EditScreen from '../screens/EditScreen';
import Login from '../screens/Login';
//raczej do usunięcia

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            
            <Stack.Screen
                name="MyDrawer"
                component={MyDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditScreen"
                component={EditScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={optionScreen}
                initialParams={{ setIsLoggedIn }}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
        );
};

export default StackNavigator;
