import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';

const Payment1 = ({ navigation }) => {
<<<<<<< HEAD
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
=======
  const [recipientName, setInput1] = useState("");
  const [accountNumber, setInput2] = useState("");
  const [title, setInput3] = useState("");
  const [description, setInput4] = useState("");
  const [amount, setInput5] = useState("");
>>>>>>> branchPatryk
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
<<<<<<< HEAD
        console.error('Error fetching the logged-in user login:', error);
=======
        console.error('Error fetching the login of the logged-in user:', error);
>>>>>>> branchPatryk
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
<<<<<<< HEAD
        console.error('Error fetching recipient login:', error);
=======
        console.error('Error fetching the recipient login:', error);
>>>>>>> branchPatryk
      }
    };

    fetchData();
  }, [recipientName]);

<<<<<<< HEAD
  const checkAccountNumber = async (recipientName, accountNumber) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}/users?name=${recipientName}&accountNumber=${accountNumber}`
=======
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
        `${API_CONFIG.BASE_URL}/users?name=${Name}&nrkonta=${Number}`
>>>>>>> branchPatryk
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
<<<<<<< HEAD

=======
  
    const enteredAmount = parseFloat(amount);
  
    const senderResponse = await axios.get(`${API_CONFIG.BASE_URL}/users?login=${loggedInUser}`);
    const recipientResponse = await axios.get(`${API_CONFIG.BASE_URL}/users?accountNumber=${accountNumber}`);
  
    if (enteredAmount <= 0 || enteredAmount > parseFloat(senderResponse.data[0].balance)) {
      Alert.alert('Error', 'The entered amount is too large or too small.');
      return;
    }
  
    const recipientAccountNumber = recipientResponse.data[0].accountNumber;
>>>>>>> branchPatryk
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/transactions`, {
        loggedInUser,
        title,
<<<<<<< HEAD
        toUserLogin,
        description,
        type: 'normal',
        amount: parseFloat(amount),
        transactionDate: new Date().toISOString(),
      });

=======
        toUserLogin: recipientResponse.data[0].login,
        description,
        type: 'normal',
        amount: enteredAmount,
        transactionDate: new Date().toISOString(),
      });
  
      const senderId = senderResponse.data[0].id;
      const senderNewBalance = senderResponse.data[0].balance - enteredAmount;
      await axios.patch(`${API_CONFIG.BASE_URL}/users/${senderId}`, { balance: senderNewBalance });
  
      const recipientId = recipientResponse.data[0].id;
      const recipientNewBalance = recipientResponse.data[0].balance + parseFloat(amount);
      await axios.patch(`${API_CONFIG.BASE_URL}/users/${recipientId}`, { balance: recipientNewBalance });
  
>>>>>>> branchPatryk
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
<<<<<<< HEAD
          placeholder="Recipient's Name:"
          value={recipientName}
          onChangeText={(text) => setRecipientName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Account Number:"
          value={accountNumber}
          onChangeText={(text) => setAccountNumber(text)}
=======
          placeholder="Recipient's name and surname:"
          value={recipientName}
          onChangeText={(text) => setInput1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Account number:"
          value={accountNumber}
          onChangeText={(text) => setInput2(text)}
>>>>>>> branchPatryk
        />
        <TextInput
          style={styles.input}
          placeholder="Title:"
          value={title}
<<<<<<< HEAD
          onChangeText={(text) => setTitle(text)}
=======
          onChangeText={(text) => setInput3(text)}
>>>>>>> branchPatryk
        />
        <TextInput
          style={styles.input}
          placeholder="Description:"
          value={description}
<<<<<<< HEAD
          onChangeText={(text) => setDescription(text)}
=======
          onChangeText={(text) => setInput4(text)}
>>>>>>> branchPatryk
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
<<<<<<< HEAD
          onChangeText={(text) => setAmount(text)}
=======
          onChangeText={(text) => setInput5(text)}
>>>>>>> branchPatryk
        />
        <TouchableOpacity style={styles.check} onPress={handleCheck}>
          <Text style={styles.pp}>Check</Text>
        </TouchableOpacity>
      </View>
    </View>
<<<<<<< HEAD
    );
=======
  );
>>>>>>> branchPatryk
};

export default Payment1;
