import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';
import * as LocalAuthentication from 'expo-local-authentication'; // Import LocalAuthentication

const ListScreen = ({ setIsLoggedIn }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [lastTransactions, setLastTransactions] = useState([]); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      await fetchLoggedInUser();
      try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}/transactions`);
        setLastTransactions(response.data);
      } catch (error) {
        console.error('Error fetching last transactions:', error);
      }
    };

    fetchData();
    }, [isFocused]);
  const fetchLoggedInUser = async () => {
    try {
      const userString = await AsyncStorage.getItem('loggedInUser');
      console.log('Stored Logged In User:', userString);
      if (userString) {
        const user = JSON.parse(userString);
        console.log('Parsed Logged In User:', user);
        setLoggedInUser(user);
      }
    } catch (error) {
      console.error('Error fetching logged-in user:', error);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, [isFocused]);
  const handleLogout = async () => {
    try {

      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {loggedInUser ? (
          <Text style={styles.loggedInUserText}>Hello, {loggedInUser.name}!</Text>
        ) : null}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Account Balance: </Text>
          {loggedInUser ? (
            <Text style={styles.balanceAmount}>{loggedInUser.balance} PLN</Text>
          ) : (
            <Text style={styles.balanceAmount}>0.00 PLN</Text>
          )}
        </View>
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userContainer: {
    backgroundColor: '#323643',
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loggedInUserText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  balanceContainer: {
    backgroundColor: '#606470',
    width: '80%',
    height: 80,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceLabel: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 28,
    color: 'white',
  },
  transactionContainer: {
    backgroundColor: '#323643',
    width: '100%',
    borderRadius: 8,
    marginVertical: 20,
    padding: 15,
  },
});

export default ListScreen;
