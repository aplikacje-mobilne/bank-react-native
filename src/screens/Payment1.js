import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';

const Payment1 = ({ navigation }) => {
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [toUserLogin, setUserLogin] = useState(null);

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
        console.error('Error fetching the logged-in user login:', error);
      }
    };

    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}/users?name=${recipientName}`);
        if (response.data.length > 0) {
          const toUserLogin = response.data[0].login;
          setUserLogin(toUserLogin);

          await AsyncStorage.setItem('toUserLogin', JSON.stringify({ login: toUserLogin }));
        }
      } catch (error) {
        console.error('Error fetching recipient login:', error);
      }
    };

    fetchData();
  }, [recipientName]);

  const checkAccountNumber = async (recipientName, accountNumber) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}/users?name=${recipientName}&accountNumber=${accountNumber}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking account number:', error);
      return false;
    }
  };

  const handleCheck = async () => {
    const recipientExists = await checkAccountNumber(recipientName, accountNumber);
    if (!recipientExists) {
      Alert.alert('Error', 'Recipient with the provided account number does not exist.');
      return;
    }

    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/transactions`, {
        loggedInUser,
        title,
        toUserLogin,
        description,
        type: 'normal',
        amount: parseFloat(amount),
        transactionDate: new Date().toISOString(),
      });

      Alert.alert('Transfer successful');
      navigation.goBack();
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.sectionContainerp1}>
        <View style={styles.sectionContent}>
          <Icon name="landmark" size={35} />
          <Text style={styles.sectionText}>Domestic Transfer</Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <TextInput
          style={styles.input}
          placeholder="Recipient's Name:"
          value={recipientName}
          onChangeText={(text) => setRecipientName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Account Number:"
          value={accountNumber}
          onChangeText={(text) => setAccountNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Title:"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description:"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <TouchableOpacity style={styles.check} onPress={handleCheck}>
          <Text style={styles.pp}>Check</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
};

export default Payment1;
