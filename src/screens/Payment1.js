import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment1 = ({ navigation }) => {
  const [dane, setInput1] = useState("");
  const [nr_rachunku, setInput2] = useState("");
  const [tytul, setInput3] = useState("");
  const [opis, setInput4] = useState("");
  const [kwota, setInput5] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [toUserLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const storedLoggedInUser = await AsyncStorage.getItem('loggedInUser');
        if (storedLoggedInUser) {
          const parsedUser = JSON.parse(storedLoggedInUser);
          const userLogin = parsedUser.login; // Załóżmy, że pole login zawiera login użytkownika
          setLoggedInUser(userLogin);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania loginu zalogowanego użytkownika:', error);
      }
    };

    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.20:3001/users?name=${dane}`);
        if (response.data.length > 0) {
          const toUserLogin = response.data[0].login; // Załóżmy, że login znajduje się w polu "login" obiektu
          setUserLogin(toUserLogin); // Ustaw login odbiorcy w stanie komponentu

          // Zapisz login odbiorcy w AsyncStorage
          await AsyncStorage.setItem('toUserLogin', JSON.stringify({ login: toUserLogin }));
        }
      } catch (error) {
        console.error('Błąd podczas pobierania loginu odbiorcy:', error);
      }
    };

    fetchData();
  }, [dane]);

  const checkName = async (Name) => {
    try {
      const response = await axios.get(`http://192.168.1.20:3001/users?name=${Name}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('Błąd podczas sprawdzania odbiorcy:', error);
      return false;
    }
  };

  const checknrkonta = async (Name, Number) => {
    try {
      const response = await axios.get(
        `http://192.168.8.179:3001/users?name=${Name}&nrkonta=${Number}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error('Błąd podczas sprawdzania numeru rachunku:', error);
      return false;
    }
  };

  const handleCheck = async () => {
    const recipientExists = await checkName(dane);
    if (!recipientExists) {
      Alert.alert('Błąd', 'Odbiorca o podanym imieniu nie istnieje.');
      return;
    }

    const accountNumberMatches = await checknrkonta(dane, nr_rachunku);
    if (!accountNumberMatches) {
      Alert.alert('Błąd', 'Numer rachunku nie jest zgodny z odbiorcą.');
      return;
    }

    try {
      await axios.post("http://192.168.1.20:3001/transaction", {
        loggedInUser,
        nr_rachunku,
        toUserLogin,
        opis,
        kwota
      });

      Alert.alert('Przelew udany');
      navigation.goBack();
    } catch (error) {
      console.error('Błąd podczas wysyłania danych:', error);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.sectionContainerp1}>
        <View style={styles.sectionContent}>
          <Icon name="landmark" size={35} />
          <Text style={styles.sectionText}>Przelew Krajowy</Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <TextInput
          style={styles.input}
          placeholder="Imię i nazwisko odbiorcy:"
          value={dane}
          onChangeText={(text) => setInput1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Numer rachunku:"
          value={nr_rachunku}
          onChangeText={(text) => setInput2(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tytuł:"
          value={tytul}
          onChangeText={(text) => setInput3(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Opis:"
          value={opis}
          onChangeText={(text) => setInput4(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Kwota"
          value={kwota}
          onChangeText={(text) => setInput5(text)}
        />
        <TouchableOpacity style={styles.check} onPress={handleCheck}>
          <Text style={styles.pp}>Check</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment1;
