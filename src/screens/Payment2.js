import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity,TextInput,Alert } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';

const Payment2 = ({navigation}) => {
  
  const [nr_telefonu, setInput1] = useState('');
  const [tytul, setInput2] = useState('');
  const [opis, setInput3] = useState('');
  const [kwota, setInput4] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [toUser, setUser] = useState(null);

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
        const response = await axios.get(`${API_CONFIG.BASE_URL}/users?tel=${nr_telefonu}`);
        if (response.data.length > 0) {
          const toUser = response.data[0].login; // Załóżmy, że login znajduje się w polu "login" obiektu
          setUser(toUser); // Ustaw login odbiorcy w stanie komponentu

          // Zapisz login odbiorcy w AsyncStorage
          await AsyncStorage.setItem('toUserLogin', JSON.stringify({ login: toUser }));
        }
      } catch (error) {
        console.error('Błąd podczas pobierania loginu odbiorcy:', error);
      }
    };

    fetchData();
  }, [nr_telefonu]);

  const checknrtel = async (nrtel) => {
    // Sprawdzenie, czy istnieje odbiorca o podanym imieniu w bazie users
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}/users?tel=${nrtel}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('Błąd podczas sprawdzania odbiorcy:', error);
      return false;
    }
  };
  const handleCheck = async () => {

    const recipientExists = await checknrtel(nr_telefonu);
    if (!recipientExists) {
      Alert.alert('Błąd', 'Odbiorca o podanym numerze telefonu nie istnieje.');
      return;
    }

    try {
      // Tworzenie obiektu z danymi do wysłania
      await axios.post("http://192.168.1.193:3001/transaction", {
        loggedInUser,
        tytul,
        toUser,
        opis,
        kwota
      });

      alert('Przelew udany');
      navigation.goBack();
      // Przetworzenie odpowiedzi, np. obsługa komunikatu zwrotnego
      //console.log('Odpowiedź z serwera:', response.data);

    } catch (error) {
      console.error('Błąd podczas wysyłania danych:', error);
    }
  };

  return (
    <View style={styles.header}>
        <View style={styles.sectionContainerp1}>
            <View style={styles.sectionContent}>
            <Icon name="mobile" light size={35}/>
                <Text style={styles.sectionText}>Przelew Na Telefon</Text>
            </View>
        </View>
        <View style={styles.sectionContainer}>
       
        
        <TextInput
        style={styles.input}
        placeholder="Numer Telefonu Odbiorcy:"
        value={nr_telefonu}
        onChangeText={(text) => setInput1(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tytuł:"
        value={tytul}
        onChangeText={(text) => setInput2(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Opis:"
        value={opis}
        onChangeText={(text) => setInput3(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Kwota:"
        value={kwota}
        onChangeText={(text) => setInput4(text)}
      />
      <TouchableOpacity style={styles.check} onPress={handleCheck}>
        <Text style={styles.pp}>Check</Text>
      </TouchableOpacity>
        </View>
    </View>
  );
};


export default Payment2;
