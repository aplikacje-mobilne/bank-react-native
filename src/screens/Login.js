import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import API_CONFIG from '../components/config'
import { CommonActions } from '@react-navigation/native';

export function Login({ setIsLoggedIn }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
    const handleLogin = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.BASE_URL}/users`);

            if (!response.data) {
                console.log("User not found.");
                return;
            }

            const users = response.data || [];
            const user = users.find((user) => user.login === login && user.pass === password);

            if (user) {
                await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
                setIsLoggedIn(true);

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'DrawerNavigator' }],
                    })
                );

      } else {
        alert('Invalid login or password');
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleRegister = () => {
    
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title}>Login to your account</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="Login"
        placeholderTextColor="#808080"
        value={login}
        onChangeText={(text) => setLogin(text)}
      />
      <TextInput
        style={loginStyles.input}
        placeholder="Password"
        placeholderTextColor="#808080"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={loginStyles.orangeButton} onPress={handleLogin}>
        <Text style={loginStyles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      
     
    </View>
    );
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  
  orangeButton: {
    backgroundColor: '#FF570C',
    width: 200, 
    height: 40, 
    borderRadius: 50,
    bottom: 5,
    right: 10,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center', 
  },
});

export default Login;
