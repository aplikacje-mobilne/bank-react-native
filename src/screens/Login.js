import React, { useState } from 'react';
import { Text, View, Pressable, TextInput, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
export function Login({ setIsLoggedIn }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const response = await axios.get("http://192.168.1.102:3001/users");

      if (!response.data) {
        console.log("User not found.");
      }

      const users = response.data || [];
      const user = users.find((user) => user.login === login && user.pass === password);

      if (user) {
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
        setIsLoggedIn(true);
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
      <Text style={loginStyles.title}>LOGOWANIE</Text>
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
      <Pressable style={loginStyles.loginBtn} onPress={handleLogin}>
        <Text style={loginStyles.loginText}>LOGIN</Text>
      </Pressable>
      <Pressable style={loginStyles.loginBtn} onPress={handleRegister}>
        <Text style={loginStyles.loginText}>REGISTER</Text>
      </Pressable>
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
    fontWeight: 'bold',
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
  loginBtn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Login;
