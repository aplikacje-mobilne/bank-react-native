import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';

const Payment2 = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [toUserLogin, setToUserLogin] = useState(null);

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
        const response = await axios.get(`${API_CONFIG.BASE_URL}/users?phoneNumber=${phoneNumber}`);
        if (response.data.length > 0) {
          const toUser = response.data[0].login;
          setToUserLogin(toUser);

          await AsyncStorage.setItem('toUserLogin', JSON.stringify({ login: toUser }));
        }
      } catch (error) {
        console.error('Error fetching recipient login:', error);
      }
    };

    fetchData();
  }, [phoneNumber]);

  const checkPhoneNumber = async (phoneNumber) => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}/users?phoneNumber=${phoneNumber}`);

      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking recipient:', error);
      return false;
    }
  };
  const [transactionResponse, setTransactionResponse] = useState(null);

  const handleCheck = async () => {
    try {
      const recipientResponse =  await axios.get(`${API_CONFIG.BASE_URL}/users?phoneNumber=${phoneNumber}`);

      if (!recipientResponse || recipientResponse.length === 0) {
        Alert.alert('Error', 'Recipient with the provided phone number does not exist.');
        return;
      }

      const senderResponse = await axios.get(`${API_CONFIG.BASE_URL}/users?login=${loggedInUser}`);
      const validAmount = parseFloat(amount);

      if (validAmount <= 0 || validAmount > parseFloat(senderResponse.data[0].balance)) {
        Alert.alert('Error', 'The entered amount is too large or too small.');
        return;
      }

      const recipientAccountNumber = recipientResponse.data[0].accountNumber;

      const transactionResponse = await axios.post(`${API_CONFIG.BASE_URL}/transactions`, {
        loggedInUser: loggedInUser,
        title: title,
        description: description,
        type: 'mobile',
        amount: parseFloat(amount),
        toUserLogin: recipientResponse.data[0].login,
        recipientAccountNumber: recipientAccountNumber,
        transactionDate: new Date().toISOString(),
      });

      const senderId = senderResponse.data[0].id;
      const senderNewBalance = senderResponse.data[0].balance - parseFloat(amount);
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

      setTransactionResponse(transactionResponse.data);

      Alert.alert('Transfer successful');
      navigation.goBack();
    } catch (error) {
      console.error('Error handling transaction:', error);
      Alert.alert('Error', 'An error occurred while processing the transaction.');
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.sectionContainerp1}>
        <View style={styles.sectionContent}>
          <Icon name="mobile" light size={35} />
          <Text style={styles.sectionText}>Mobile Transfer</Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <TextInput
          style={styles.input}
          placeholder="Recipient's Phone Number:"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
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
          placeholder="Amount:"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <TouchableOpacity style={styles.check} onPress={handleCheck}>
          <Text style={styles.pp}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
};

export default Payment2;
