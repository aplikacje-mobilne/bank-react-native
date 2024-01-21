import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';

const Payment1 = ({ navigation }) => {
  const [recipientName, setInput1] = useState("");
  const [accountNumber, setInput2] = useState("");
  const [title, setInput3] = useState("");
  const [description, setInput4] = useState("");
  const [amount, setInput5] = useState("");
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
        console.error('Error fetching the login of the logged-in user:', error);
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
        console.error('Error fetching the recipient login:', error);
      }
    };

    fetchData();
  }, [recipientName]);

  const checkRecipientName = async (Name) => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}/users?name=${Name}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking recipient:', error);
      return false;
    }
  };

  const checkAccountNumber = async (Name, Number) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}/users?name=${Name}&accountNumber=${Number}`
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
  
    const enteredAmount = parseFloat(amount);
  
    const senderResponse = await axios.get(`${API_CONFIG.BASE_URL}/users?login=${loggedInUser}`);
    const recipientResponse = await axios.get(`${API_CONFIG.BASE_URL}/users?accountNumber=${accountNumber}`);
  
    if (enteredAmount <= 0 || enteredAmount > parseFloat(senderResponse.data[0].balance)) {
      Alert.alert('Error', 'The entered amount is too large or too small.');
      return;
    }
  
    const recipientAccountNumber = recipientResponse.data[0].accountNumber;
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/transactions`, {
        loggedInUser,
        title,
        toUserLogin: recipientResponse.data[0].login,
        description,
        type: 'normal',
        amount: enteredAmount,
        recipientAccountNumber: recipientAccountNumber,
        transactionDate: new Date().toISOString(),
      });
  
      const senderId = senderResponse.data[0].id;
      const senderNewBalance = senderResponse.data[0].balance - enteredAmount;
      await axios.patch(`${API_CONFIG.BASE_URL}/users/${senderId}`, { balance: senderNewBalance });
  
      const recipientId = recipientResponse.data[0].id;
      const recipientNewBalance = recipientResponse.data[0].balance + parseFloat(amount);
      await axios.patch(`${API_CONFIG.BASE_URL}/users/${recipientId}`, { balance: recipientNewBalance });
  
      const storedLoggedInUser = await AsyncStorage.getItem('loggedInUser');
      if (storedLoggedInUser) {
        const parsedLoggedInUser = JSON.parse(storedLoggedInUser);
        const updatedLoggedInUser = { ...parsedLoggedInUser, balance: senderNewBalance };
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedLoggedInUser));
      }

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
          placeholder="Recipient's name:"
          value={recipientName}
          onChangeText={(text) => setInput1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Account number:"
          value={accountNumber}
          onChangeText={(text) => setInput2(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Title:"
          value={title}
          onChangeText={(text) => setInput3(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description:"
          value={description}
          onChangeText={(text) => setInput4(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setInput5(text)}
        />
        <TouchableOpacity style={styles.check} onPress={handleCheck}>
          <Text style={styles.pp}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment1;
