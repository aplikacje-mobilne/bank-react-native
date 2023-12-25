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
          const userLogin = parsedUser.login;
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
          const toUser = response.data[0].login;
          setUser(toUser);

          await AsyncStorage.setItem('toUserLogin', JSON.stringify({ login: toUser }));
        }
      } catch (error) {
        console.error('Błąd podczas pobierania loginu odbiorcy:', error);
      }
    };

    fetchData();
  }, [nr_telefonu]);

  const checknrtel = async (nrtel) => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}/users?tel=${nrtel}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('Błąd podczas sprawdzania odbiorcy:', error);
      return false;
    }
  };
  const handleCheck = async () => {
  try {
    const recipientResponse = await axios.get(`${API_CONFIG.BASE_URL}/users?phoneNumber=${nr_telefonu}`);

    if (recipientResponse.data.length === 0) {
      Alert.alert('Błąd', 'Odbiorca o podanym numerze telefonu nie istnieje.');
      return;
    }

    const recipientAccountNumber = recipientResponse.data[0].nrkonta;

    const transactionResponse = await axios.post(`${API_CONFIG.BASE_URL}/transaction`, {
      loggedInUser,
      tytul,
      opis,
      kwota,
      toUserLogin: recipientResponse.data[0].login,
      recipientAccountNumber,
      dataTransakcji: new Date().toISOString(),

    });

    Alert.alert('Przelew udany');
    navigation.goBack();
    // console.log('Odpowiedź z serwera:', transactionResponse.data);

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
