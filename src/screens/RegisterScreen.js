import React, { useState } from 'react';
import { Text, View, Pressable, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import API_CONFIG from '../components/config';

const RegisterScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(1000);



  const handleRegister = async () => {
    try {
      if (pass !== pass2) {
        Alert.alert("Error", "Password are not the same");
        return;
      }
      const loginCheckResponse = await axios.get(`${API_CONFIG.BASE_URL}/users?login=${login}`);
      const isLoginUnique = !loginCheckResponse.data || loginCheckResponse.data.length === 0;

      if (!isLoginUnique) {
        Alert.alert("Error", "This login already exists.");
        return;
      }

      await axios.post(`${API_CONFIG.BASE_URL}/users`, {
        name,
        surname,
        login,
        pass,
        email,
        phoneNumber,
        balance,
      });

      alert('Registration successful');
      navigation.goBack();
    } catch (error) {
      console.error("Registration error ", error);
    }
  };

  return (
      <View style={registerStyles.container}>
          <View style={registerStyles.inputy}>
      <TextInput
        style={registerStyles.input}
        placeholder="Imię"
        placeholderTextColor="#808080"
        value={name}
        onChangeText={(text) => setName(text)}
      />
       <TextInput
        style={registerStyles.input}
        placeholder="Nazwisko"
        placeholderTextColor="#808080"
        value={surname}
        onChangeText={(text) => setSurname(text)}
      />
        <TextInput
        style={registerStyles.input}
        placeholder="E-mail"
        placeholderTextColor="#808080"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
        <TextInput
        style={registerStyles.input}
        placeholder="Numer telefonu"
        placeholderTextColor="#808080"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={registerStyles.input}
        placeholder="Login"
        placeholderTextColor="#808080"
        value={login}
        onChangeText={(text) => setLogin(text)}
      />
      <TextInput
        style={registerStyles.input}
        placeholder="Hasło"
        placeholderTextColor="#808080"
        secureTextEntry
        value={pass}
        onChangeText={(text) => setPass(text)}
      />
      <TextInput
        style={registerStyles.input}
        placeholder="Powtórz hasło"
        placeholderTextColor="#808080"
        secureTextEntry
        value={pass2}
        onChangeText={(text) => setPass2(text)}
      />
      </View>
      <Pressable style={registerStyles.registerBtn} onPress={handleRegister}>
        <Text style={registerStyles.registerText}>REGISTER</Text>
      </Pressable>
    </View>
  );
};

const registerStyles = StyleSheet.create({
  container: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    inputy: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '85%',
        marginTop: '10%',
    },
  input: {
      backgroundColor: "#fefefe",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 10,
      height: 40,
      overflow: "hidden",
      position: "relative",
      marginVertical: 10,
      paddingLeft: 10,
  },
  registerBtn: {
      backgroundColor: "#ff570c",
      borderRadius: 50,
      width: '90%',
      position: "relative",
      justifyContent: 'center',
      alignSelf: 'center',
      height: '8%',
      alignItems: 'center',
      marginTop: '10%',
  },
    registerText: {
        color: "#f7f7f7",
        fontSize: 24,
        fontWeight: "400",
        letterSpacing: 0,
        lineHeight: 28,
        position: "absolute",
    },
});

export default RegisterScreen;
