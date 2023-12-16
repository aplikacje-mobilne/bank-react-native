import React, { useState } from 'react';
import { Text, View, Pressable, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try {
      if (pass !== pass2) {
        Alert.alert("Błąd", "Hasła nie są identyczne");
        return;
      }
      const loginCheckResponse = await axios.get(`http://192.168.1.20:3001/users?login=${login}`);
      const isLoginUnique = !loginCheckResponse.data || loginCheckResponse.data.length === 0;

      if (!isLoginUnique) {
        Alert.alert("Błąd", "Podany login już istnieje. Wybierz inny login.");
        return;
      }

      await axios.post("http://192.168.1.20:3001/users", {
        name,
        login,
        pass,
      });

      alert('Rejestracja udana');
      navigation.goBack();
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
    }
  };

  return (
    <View style={registerStyles.container}>
      <Text style={registerStyles.title}>REJESTRACJA</Text>
      <TextInput
        style={registerStyles.input}
        placeholder="NAME"
        placeholderTextColor="#808080"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={registerStyles.input}
        placeholder="LOGIN"
        placeholderTextColor="#808080"
        value={login}
        onChangeText={(text) => setLogin(text)}
      />
      <TextInput
        style={registerStyles.input}
        placeholder="PASS"
        placeholderTextColor="#808080"
        secureTextEntry
        value={pass}
        onChangeText={(text) => setPass(text)}
      />
      <TextInput
        style={registerStyles.input}
        placeholder="PASS2"
        placeholderTextColor="#808080"
        secureTextEntry
        value={pass2}
        onChangeText={(text) => setPass2(text)}
      />

      <Pressable style={registerStyles.registerBtn} onPress={handleRegister}>
        <Text style={registerStyles.registerText}>REGISTER</Text>
      </Pressable>
    </View>
  );
};

const registerStyles = StyleSheet.create({
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
  registerBtn: {
    backgroundColor: 'green',
    padding: 10,
      borderRadius: 5,
      marginTop: 10,
  },
    registerText: {
      color: 'white',
        textAlign: 'center',
    },
});

export default RegisterScreen;
